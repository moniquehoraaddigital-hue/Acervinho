// Use global fetch available in Node 18+ or provide a fetch polyfill in your environment
declare const fetch: any

export interface JiraConfig {
  baseUrl?: string
  email?: string
  apiToken?: string
}

function buildHeaders(cfg: JiraConfig) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) {
    throw new Error('missing_jira_credentials')
  }

  return {
    Authorization: `Basic ${Buffer.from(`${cfg.email}:${cfg.apiToken}`).toString('base64')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
}

// Test connection to Jira — real call when credentials exist.
export async function testJiraConnection(cfg: JiraConfig) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) {
    return { ok: false, reason: 'missing_credentials' }
  }

  try {
    const res = await fetch(`${cfg.baseUrl}/rest/api/3/myself`, {
      headers: buildHeaders(cfg),
    })

    if (!res.ok) {
      const text = await res.text()
      return { ok: false, reason: `status_${res.status}`, details: text }
    }

    const me = await res.json()
    return { ok: true, user: me }
  } catch (err: any) {
    return { ok: false, reason: 'request_failed', error: err?.message ?? String(err) }
  }
}

export async function getIssue(cfg: JiraConfig, issueKey: string) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) throw new Error('missing_jira_credentials')

  const url = `${cfg.baseUrl}/rest/api/3/issue/${issueKey}`
  const res = await fetch(url, {
    headers: buildHeaders(cfg),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`jira_fetch_failed_${res.status}: ${text}`)
  }

  return res.json()
}

export async function searchIssues(cfg: JiraConfig, query: string, maxResults = 10) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) throw new Error('missing_jira_credentials')

  const safeQuery = (query || '').trim()
  if (!safeQuery) throw new Error('missing_query')

  const jql = `text ~ "${safeQuery.replace(/"/g, '\\"')}" ORDER BY updated DESC`
  const url = `${cfg.baseUrl}/rest/api/3/search?jql=${encodeURIComponent(jql)}&maxResults=${maxResults}`
  const res = await fetch(url, {
    headers: buildHeaders(cfg),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`jira_search_failed_${res.status}: ${text}`)
  }

  return res.json()
}

export async function createIssue(cfg: JiraConfig, payload: {
  projectKey: string
  summary: string
  description?: string
  issueType?: string
}) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) throw new Error('missing_jira_credentials')

  const issueType = payload.issueType || 'Task'
  const projectKey = payload.projectKey || 'PROJ'
  const summary = payload.summary || 'Nova issue'

  const body = {
    fields: {
      project: { key: projectKey },
      summary,
      description: {
        type: 'doc',
        version: 1,
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: payload.description || summary }],
          },
        ],
      },
      issuetype: { name: issueType },
    },
  }

  const res = await fetch(`${cfg.baseUrl}/rest/api/3/issue`, {
    method: 'POST',
    headers: buildHeaders(cfg),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`jira_create_failed_${res.status}: ${text}`)
  }

  return res.json()
}
