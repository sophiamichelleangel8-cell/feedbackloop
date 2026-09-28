/**
 * FeedbackLoop API
 *
 * For the prototype/demo, this file is configured to use
 * the mock data from src/mocks/data.ts.
 *
 * When the backend is ready, change USE_MOCKS to false.
 */

import type {
  AskResponse,
  FeedbackItem,
  MemoryOverview,
  Overview,
  Pattern,
} from '../types'

import * as mock from '../mocks/data'

// ============================================================
// DEMO MODE
// ============================================================
// TRUE  = use the feedback data from src/mocks/data.ts
// FALSE = connect to the real backend API
//
// Keep this TRUE for your hackathon prototype.
const USE_MOCKS = true

// Backend URL.
// Leave empty while using mock data.
const BASE = import.meta.env.VITE_API_URL ?? ''

// ============================================================
// SMALL DELAY
// ============================================================
// This makes the prototype feel more realistic by simulating
// a small API loading time.

const later = <T>(value: T, ms = 350): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })

// ============================================================
// HTTP HELPER
// ============================================================
// This is only used when USE_MOCKS = false.

async function http<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(
      `Request failed (${response.status}). Check that the API is running.`,
    )
  }

  return response.json() as Promise<T>
}

// ============================================================
// DEBUG LOG
// ============================================================

console.log(
  '🚀 FeedbackLoop API loaded',
  USE_MOCKS ? '→ USING MOCK DATA' : '→ USING BACKEND API',
)

// ============================================================
// API
// ============================================================

export const api = {

  // ----------------------------------------------------------
  // DASHBOARD
  // ----------------------------------------------------------

  getOverview: () => {
    console.log('📊 Loading overview data...')

    if (USE_MOCKS) {
      console.log('✅ Overview loaded from mock data')
      return later<Overview>(mock.overview)
    }

    return http<Overview>('/api/overview')
  },

  // ----------------------------------------------------------
  // FEEDBACK
  // ----------------------------------------------------------

  getFeedback: () => {
    console.log(
      '💬 Loading feedback...',
      `Total feedback available: ${mock.feedback.length}`,
    )

    if (USE_MOCKS) {
      console.log('✅ Feedback loaded from mock data')
      console.log('📝 First feedback:', mock.feedback[0])
      console.log(
        '📝 Last feedback:',
        mock.feedback[mock.feedback.length - 1],
      )

      return later<FeedbackItem[]>(
        mock.feedback,
        350,
      )
    }

    return http<FeedbackItem[]>('/api/feedback')
  },

  // ----------------------------------------------------------
  // PATTERNS / INSIGHTS
  // ----------------------------------------------------------

  getPatterns: () => {
    console.log('🔎 Loading patterns...')

    if (USE_MOCKS) {
      console.log(
        `✅ ${mock.patterns.length} patterns loaded from mock data`,
      )

      return later<Pattern[]>(
        mock.patterns,
        350,
      )
    }

    return http<Pattern[]>('/api/patterns')
  },

  // ----------------------------------------------------------
  // MEMORY
  // ----------------------------------------------------------

  getMemory: () => {
    console.log('🧠 Loading memory...')

    if (USE_MOCKS) {
      console.log('✅ Memory loaded from mock data')

      return later<MemoryOverview>(
        mock.memory,
        350,
      )
    }

    return http<MemoryOverview>('/api/memory')
  },

  // ----------------------------------------------------------
  // ASK FEEDBACKLOOP
  // ----------------------------------------------------------

  ask: (question: string) => {
    console.log('🤖 Asking FeedbackLoop:', question)

    if (USE_MOCKS) {
      console.log('✅ Answer generated from mock AI response')

      return later<AskResponse>(
        mock.mockAsk(question),
        900,
      )
    }

    return http<AskResponse>(
      '/api/ask',
      {
        method: 'POST',
        body: JSON.stringify({
          question,
        }),
      },
    )
  },
}