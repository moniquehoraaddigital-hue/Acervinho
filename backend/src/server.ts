import express from "express"
import dotenv from "dotenv"
import { openDb } from "./db"
import { getEmbedding } from "./openai"
import { testJiraConnection, getIssue, searchIssues, createIssue } from './services/jira'
import { testConfluenceConnection } from './services/confluence'

dotenv.config()

const app = express()
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

// Simple, no-dependency CORS for local development (allow front-end dev server)
const allowedOrigins = new Set(['http://localhost:5173', 'http://127.0.0.1:5173'])
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(200)
  next()
})

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

// simple helper: cosine similarity
function dot(a: number[], b: number[]) {
  return a.reduce((s, v, i) => s + v * (b[i] ?? 0), 0)
}
function norm(a: number[]) {
  return Math.sqrt(a.reduce((s, v) => s + v * v, 0))
}
function cosine(a: number[], b: number[]) {
  const n = norm(a) * norm(b)
  if (n === 0) return 0
  return dot(a, b) / n
}

// Health
app.get("/", (_req, res) => res.json({ ok: true, env: !!OPENAI_API_KEY, status: 'ready' }))

app.get('/api/docs', async (_req, res) => {
  try {
    const db = await openDb()
    const rows = await db.all(`SELECT id, title, content, created_at FROM documents ORDER BY created_at DESC`)
    res.json({ ok: true, count: rows.length, items: rows })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/docs/:id', async (req, res) => {
  try {
    const db = await openDb()
    const row = await db.get(`SELECT id, title, content, embedding, created_at FROM documents WHERE id = ?`, req.params.id)
    if (!row) return res.status(404).json({ error: 'document_not_found' })
    return res.json({ ok: true, item: row })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
})

app.delete('/api/docs/:id', async (req, res) => {
  try {
    const db = await openDb()
    const result = await db.run(`DELETE FROM documents WHERE id = ?`, req.params.id)
    if (!result || (result as any).changes === 0) return res.status(404).json({ error: 'document_not_found' })
    return res.json({ ok: true, deleted: Number((result as any).changes ?? 0) })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
})

app.get('/api/stats', async (_req, res) => {
  try {
    const db = await openDb()
    const row = await db.get(`SELECT COUNT(*) as total FROM documents`)
    return res.json({ ok: true, totalDocuments: Number(row?.total ?? 0) })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
})

// Add a document (and compute embedding if key available)
app.post("/api/docs", async (req, res) => {
  try {
    const { title, content } = req.body
    if (!content) return res.status(400).json({ error: "missing content" })

    const db = await openDb()

    let embedding: number[] | null = null
    if (OPENAI_API_KEY) {
      try {
        embedding = await getEmbedding(OPENAI_API_KEY, content)
      } catch (err: any) {
        console.warn("Embedding failed:", err.message)
      }
    }

    await db.run(
      `INSERT INTO documents (title, content, embedding) VALUES (?, ?, ?)`,
      title || null,
      content,
      embedding ? JSON.stringify(embedding) : null
    )

    res.json({ ok: true })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// Simple search endpoint
app.post("/api/search", async (req, res) => {
  try {
    const { query, topK } = req.body
    if (!query) return res.status(400).json({ error: "missing query" })

    const db = await openDb()
    const rows = await db.all(`SELECT id, title, content, embedding FROM documents`)

    // If OpenAI key is present and there are stored embeddings, use vector similarity
    if (OPENAI_API_KEY) {
      const queryEmb = await getEmbedding(OPENAI_API_KEY, query)
      if (queryEmb) {
        const scored = rows
          .map((r: any) => {
            const emb = r.embedding ? JSON.parse(r.embedding) as number[] : null
            const score = emb ? cosine(queryEmb, emb) : 0
            return { ...r, score }
          })
          .sort((a: any, b: any) => b.score - a.score)

        return res.json({ ok: true, results: scored.slice(0, topK || 5) })
      }
    }

    // Fallback: keyword match on content
    const q = query.toLowerCase()
    const matched = rows
      .map((r: any) => ({ ...r, score: (r.title + " " + r.content).toLowerCase().includes(q) ? 1 : 0 }))
      .filter((r: any) => r.score > 0)

    res.json({ ok: true, results: matched.slice(0, topK || 5) })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// Integration test endpoints for Jira and Confluence
app.get('/api/integrations/jira/test', async (_req, res) => {
  try {
    const cfg = { baseUrl: process.env.JIRA_BASE_URL, email: process.env.JIRA_EMAIL, apiToken: process.env.JIRA_API_TOKEN }
    const result = await testJiraConnection(cfg)
    res.json(result)
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

app.get('/api/jira/issue/:key', async (req, res) => {
  try {
    const cfg = { baseUrl: process.env.JIRA_BASE_URL, email: process.env.JIRA_EMAIL, apiToken: process.env.JIRA_API_TOKEN }
    const issue = await getIssue(cfg, req.params.key)
    res.json({ ok: true, issue })
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

app.get('/api/jira/search', async (req, res) => {
  try {
    const query = String(req.query.query || req.query.q || '')
    const maxResults = Number(req.query.maxResults || 10)
    if (!query) return res.status(400).json({ error: 'missing_query' })

    const cfg = { baseUrl: process.env.JIRA_BASE_URL, email: process.env.JIRA_EMAIL, apiToken: process.env.JIRA_API_TOKEN }
    const result = await searchIssues(cfg, query, maxResults)
    res.json({ ok: true, result })
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

app.post('/api/jira/issues', async (req, res) => {
  try {
    const { projectKey, summary, description, issueType } = req.body || {}
    if (!summary || !projectKey) return res.status(400).json({ error: 'missing_summary_or_project_key' })

    const cfg = { baseUrl: process.env.JIRA_BASE_URL, email: process.env.JIRA_EMAIL, apiToken: process.env.JIRA_API_TOKEN }
    const result = await createIssue(cfg, { projectKey, summary, description, issueType })
    res.json({ ok: true, result })
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

app.get('/api/integrations/confluence/test', async (_req, res) => {
  try {
    const cfg = { baseUrl: process.env.CONFLUENCE_BASE_URL, email: process.env.CONFLUENCE_EMAIL, apiToken: process.env.CONFLUENCE_API_TOKEN }
    const result = await testConfluenceConnection(cfg)
    res.json(result)
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

// Chat endpoint (RAG-like, simple extractive synthesis without LLM)
app.post('/api/chat', async (req, res) => {
  try {
    const { query, topK } = req.body
    if (!query) return res.status(400).json({ error: 'missing query' })

    const db = await openDb()
    const rows = await db.all(`SELECT id, title, content, embedding FROM documents`)

    // Simple retrieval: reuse keyword fallback when embeddings not available
    const q = query.toLowerCase()
    const matched = rows
      .map((r: any) => ({ ...r, score: (r.title + ' ' + r.content).toLowerCase().includes(q) ? 1 : 0 }))
      .filter((r: any) => r.score > 0)
      .slice(0, topK || 5)

    // Helper: extract a snippet around the first occurrence of query
    function extractSnippet(content: string, query: string, radius = 140) {
      const lower = content.toLowerCase()
      const idx = lower.indexOf(query.toLowerCase())
      if (idx === -1) {
        // fallback: return the opening paragraph (up to 300 chars)
        const pEnd = content.indexOf('\n\n')
        if (pEnd !== -1) return content.slice(0, Math.min(300, pEnd))
        return content.slice(0, Math.min(300, content.length))
      }
      const start = Math.max(0, idx - radius)
      const end = Math.min(content.length, idx + query.length + radius)
      const prefix = start > 0 ? '... ' : ''
      const suffix = end < content.length ? ' ...' : ''
      return prefix + content.slice(start, end).trim() + suffix
    }

    // Build a simple synthesized answer by concatenating snippets with source refs
    if (matched.length === 0) {
      return res.json({ ok: true, answer: `Desculpe, não encontrei informações relevantes para "${query}" em seu acervo. Tente outras palavras-chave.`, sources: [] })
    }

    const sources = matched.map((m: any) => ({ id: m.id, title: m.title, snippet: extractSnippet(m.content, query) }))

    // Compose an answer text
    let answer = `Encontrei ${sources.length} documento(s) que citam "${query}":\n\n`
    for (const s of sources) {
      answer += `- ${s.title || 'Documento ' + s.id}: ${s.snippet}\n\n`
    }
    answer += 'Use os resultados acima como referência. Posso abrir o documento completo ou refinar a busca se quiser.'

    res.json({ ok: true, answer, sources })
  } catch (err:any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// Raw import endpoint: accepts title via query and raw text body (useful for programmatic uploads)
app.post('/api/docs/raw', express.text({ type: '*/*', limit: '2mb' }), async (req, res) => {
  try {
    const title = (req.query.title as string) || 'imported';
    const content = req.body as string;
    if (!content) return res.status(400).json({ error: 'missing content' });
    const db = await openDb();
    await db.run(`INSERT INTO documents (title, content) VALUES (?, ?);`, title, content);
    return res.json({ ok: true });
  } catch (err:any) { console.error(err); return res.status(500).json({ error: err.message }) }
})

app.listen(PORT, () => {
  console.log(`Acervinho backend listening on http://localhost:${PORT}`)
  console.log(`OPENAI configured: ${!!OPENAI_API_KEY}`)
})

