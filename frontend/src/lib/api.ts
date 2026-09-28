const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}) for ${path}`)
  }
  return res.json() as Promise<T>
}

// PROPOSED shapes: must be matched to the real backend
export interface FeedbackItem {
  id: string
  text: string
  createdAt: string
  sentiment?: string
  category?: string
}

export interface AskResponse {
  answer: string
  evidence: string[]
}

export const api = {
  listFeedback: () => request<FeedbackItem[]>('/api/feedback'),
  submitFeedback: (text: string) =>
    request<FeedbackItem>('/api/feedback', { method: 'POST', body: JSON.stringify({ text }) }),
  getInsights: () => request<unknown>('/api/insights'),
  ask: (question: string) =>
    request<AskResponse>('/api/ask', { method: 'POST', body: JSON.stringify({ question }) }),
}