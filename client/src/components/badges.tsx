import type { Category, PatternKind, Sentiment, Stage, Status, Trend } from '../types'

const chip = 'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium'

const SENTIMENT: Record<Sentiment, { label: string; dot: string }> = {
  positive: { label: 'Positive', dot: 'bg-good' },
  neutral: { label: 'Neutral', dot: 'bg-muted' },
  negative: { label: 'Negative', dot: 'bg-bad' },
}
export const SentimentBadge = ({ value }: { value: Sentiment }) => (
  <span className="inline-flex items-center gap-2 text-sm">
    <span className={`h-2 w-2 rounded-full ${SENTIMENT[value].dot}`} />
    {SENTIMENT[value].label}
  </span>
)

const STATUS: Record<Status, { label: string; cls: string }> = {
  open: { label: 'Open', cls: 'bg-warn-soft text-warn' },
  investigating: { label: 'Investigating', cls: 'bg-brand-soft text-brand-ink' },
  resolved: { label: 'Resolved', cls: 'bg-good-soft text-good' },
}
export const StatusBadge = ({ value }: { value: Status }) => (
  <span className={`${chip} ${STATUS[value].cls}`}>{STATUS[value].label}</span>
)

const CATEGORY: Record<Category, string> = { issue: 'Issue', request: 'Request', praise: 'Praise' }
export const categoryLabel = (c: Category) => CATEGORY[c]

const KIND: Record<PatternKind, { label: string; cls: string }> = {
  recurring: { label: 'Recurring issue', cls: 'bg-bad-soft text-bad' },
  emerging: { label: 'Emerging request', cls: 'bg-brand-soft text-brand-ink' },
}
export const KindBadge = ({ value }: { value: PatternKind }) => (
  <span className={`${chip} ${KIND[value].cls}`}>{KIND[value].label}</span>
)

const TREND: Record<Trend, { label: string; cls: string }> = {
  rising: { label: 'Rising', cls: 'text-bad' },
  steady: { label: 'Steady', cls: 'text-muted' },
  falling: { label: 'Falling', cls: 'text-good' },
}
export const TrendLabel = ({ value }: { value: Trend }) => (
  <span className={`text-sm font-medium ${TREND[value].cls}`}>{TREND[value].label}</span>
)

export const STAGE: Record<Stage, { label: string; cls: string }> = {
  feedback: { label: 'Feedback', cls: 'bg-paper text-muted border border-line' },
  memory: { label: 'Memory', cls: 'bg-brand-soft text-brand-ink' },
  pattern: { label: 'Pattern', cls: 'bg-warn-soft text-warn' },
  insight: { label: 'Insight', cls: 'bg-ink text-white' },
}
export const StageBadge = ({ value }: { value: Stage }) => (
  <span className={`${chip} ${STAGE[value].cls}`}>{STAGE[value].label}</span>
)
