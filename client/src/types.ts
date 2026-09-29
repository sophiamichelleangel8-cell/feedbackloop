/**
 * API contract used by the UI. These shapes are PROPOSALS for the backend
 * teammate: match them, or change them here and the compiler will point at
 * every screen that needs updating.
 */
export type Category = 'issue' | 'request' | 'praise'
export type Sentiment = 'positive' | 'neutral' | 'negative'
export type Status = 'open' | 'investigating' | 'resolved'
export type PatternKind = 'recurring' | 'emerging'
export type Trend = 'rising' | 'steady' | 'falling'
export type Stage = 'feedback' | 'memory' | 'pattern' | 'insight'

export interface FeedbackItem {
  id: string
  date: string // ISO date
  customer: string
  text: string
  category: Category
  productArea: string
  sentiment: Sentiment
  status: Status
  patternId?: string
  patternTitle?: string
}

export interface Pattern {
  id: string
  kind: PatternKind
  title: string
  productArea: string
  mentions: number
  firstSeen: string
  lastSeen: string
  trend: Trend
  status: Status
  weekly: number[] // mentions per week, oldest first
  explanation: string // AI-generated
  evidence: { date: string; quote: string }[]
}

export interface Overview {
  totalFeedback: number
  addedThisWeek: number
  counts: { recurring: number; emerging: number; unresolved: number }
  weeklyVolume: number[]
  sentimentByMonth: { month: string; positive: number; neutral: number; negative: number }[]
  trendSummary: string // AI-generated
  recentActivity: { id: string; at: string; text: string }[]
}

export interface MemoryEvent {
  id: string
  date: string
  stage: Stage
  patternId: string
  patternTitle: string
  title: string
  detail: string
}

export interface MemoryOverview {
  counts: { feedback: number; memories: number; patterns: number; insights: number }
  events: MemoryEvent[]
}

export interface AskResponse {
  id: string
  question: string
  headline: string
  answer: string
  findings: { patternId?: string; title: string; note: string }[]
  memories: { date: string; excerpt: string }[]
  memoryCount: number
  span: { from: string; to: string }
  nextStep: string
}
