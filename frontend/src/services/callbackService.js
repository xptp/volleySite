import { postJson } from './apiClient'

export async function sendCallback({ name, phone }) {
  await postJson('/api/send-callback', { name, phone })
}

