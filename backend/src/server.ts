import express from "express"
import dotenv from "dotenv"
import { openDb } from "./db"
import { getEmbedding } from "./openai"
import { testJiraConnection } from './services/jira'
import { testConfluenceConnection } from './services/confluence'

dotenv.config()

const app = express()
app.use(express.json())

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
app.get("/", (_req, res) => res.json({ ok: true, env: !!OPENAI_API_KEY }))

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

app.get('/api/integrations/confluence/test', async (_req, res) => {
  try {
    const cfg = { baseUrl: process.env.CONFLUENCE_BASE_URL, email: process.env.CONFLUENCE_EMAIL, apiToken: process.env.CONFLUENCE_API_TOKEN }
    const result = await testConfluenceConnection(cfg)
    res.json(result)
  } catch (err:any) { res.status(500).json({ ok: false, error: err.message }) }
})

app.listen(PORT, () => {
  console.log(`Acervinho backend listening on http://localhost:${PORT}`)
  console.log(`OPENAI configured: ${!!OPENAI_API_KEY}`)
})
