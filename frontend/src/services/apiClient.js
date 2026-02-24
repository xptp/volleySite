const API_BASE = import.meta.env.VITE_API_URL || ''

function buildUrl(path) {
  if (!path.startsWith('/')) return `${API_BASE}/${path}`
  return `${API_BASE}${path}`
}

async function requestJson(path, { method, body } = {}) {
  const res = await fetch(buildUrl(path), {
    method: method ?? 'GET',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) throw new Error('Request failed')
  return res
}

export async function postJson(path, body) {
  return requestJson(path, { method: 'POST', body })
}

