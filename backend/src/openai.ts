// Use global fetch (Node 18+) or provide an alternative fetch implementation in runtime
declare const fetch: any

const OPENAI_URL = "https://api.openai.com/v1/embeddings"

export async function getEmbedding(apiKey: string | undefined, input: string) {
  if (!apiKey) return null

  const body = {
    input,
    model: "text-embedding-3-small"
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenAI embedding request failed: ${res.status} ${text}`)
  }

  const json = await res.json()
  // path: json.data[0].embedding
  if (!json?.data?.[0]?.embedding) return null
  return json.data[0].embedding as number[]
}
