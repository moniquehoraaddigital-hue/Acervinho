// Use global fetch available in Node 18+ or provide a fetch polyfill in your environment
declare const fetch: any

export interface ConfluenceConfig {
  baseUrl?: string
  apiToken?: string
  email?: string
}

export async function testConfluenceConnection(cfg: ConfluenceConfig) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) {
    return { ok: false, reason: 'missing_credentials' }
  }

  // Example real call (commented):
  // const res = await fetch(`${cfg.baseUrl}/wiki/rest/api/space`, {
  //   headers: { Authorization: `Basic ${Buffer.from(`${cfg.email}:${cfg.apiToken}`).toString('base64')}`, Accept: 'application/json' }
  // })
  // if (!res.ok) return { ok: false, reason: `status_${res.status}` }

  return { ok: true, message: 'credentials_present (simulated)' }
}

export async function getPage(cfg: ConfluenceConfig, pageId: string) {
  if (!cfg.baseUrl || !cfg.apiToken || !cfg.email) throw new Error('missing_confluence_credentials')

  const url = `${cfg.baseUrl}/wiki/rest/api/content/${pageId}?expand=body.storage` 
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${cfg.email}:${cfg.apiToken}`).toString('base64')}`,
      Accept: 'application/json'
    }
  })

  if (!res.ok) throw new Error(`confluence_fetch_failed_${res.status}`)
  return res.json()
}
