// Use global fetch available in Node 18+ or provide a fetch polyfill in your environment
declare const fetch: any

export interface JiraConfig {
  baseUrl?: string
  email?: string
  apiToken?: string
}

// Test connection to Jira — returns a friendly status object.
export async function testJiraConnection(cfg: JiraConfig) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) {
    return { ok: false, reason: "missing_credentials" }
  }

  // Example real call (commented):
  // const res = await fetch(`${cfg.baseUrl}/rest/api/3/myself`, {
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(`${cfg.email}:${cfg.apiToken}`).toString('base64')}`,
  //     Accept: 'application/json'
  //   }
  // })
  // if (!res.ok) return { ok: false, reason: `status_${res.status}` }
  // const me = await res.json()
  // return { ok: true, user: me }

  // For now, simulate success when credentials provided.
  return { ok: true, message: 'credentials_present (simulated)' }
}

export async function getIssue(cfg: JiraConfig, issueKey: string) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) throw new Error('missing_jira_credentials')

  const url = `${cfg.baseUrl}/rest/api/3/issue/${issueKey}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${cfg.email}:${cfg.apiToken}`).toString('base64')}`,
      Accept: 'application/json'
    }
  })

  if (!res.ok) throw new Error(`jira_fetch_failed_${res.status}`)
  return res.json()
}
