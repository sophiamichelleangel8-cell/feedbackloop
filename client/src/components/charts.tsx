import type { Overview, Trend } from '../types'

/** Weekly bars, oldest to newest. Scales itself to the container width. */
export function TrendBars({ values, label, tone = 'brand' }: { values: number[]; label: string; tone?: 'brand' | 'bad' | 'muted' }) {
  const max = Math.max(...values, 1)
  const w = 100 / values.length
  const fill = { brand: 'fill-brand', bad: 'fill-bad', muted: 'fill-muted' }[tone]
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="h-8 w-full" role="img" aria-label={label}>
      {values.map((v, i) => {
        const h = (v / max) * 28 + 2
        return <rect key={i} x={i * w + w * 0.15} y={32 - h} width={w * 0.7} height={h} className={fill} opacity={v === 0 ? 0.25 : 1} />
      })}
    </svg>
  )
}

export const trendTone = (t: Trend) => (t === 'rising' ? 'bad' : t === 'falling' ? 'muted' : 'brand') as 'bad' | 'muted' | 'brand'

export function SentimentBars({ data }: { data: Overview['sentimentByMonth'] }) {
  return (
    <div className="space-y-4">
      {data.map((m) => {
        const total = m.positive + m.neutral + m.negative
        const pct = (n: number) => `${(n / total) * 100}%`
        return (
          <div key={m.month}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium">{m.month}</span>
              <span className="text-muted">{Math.round((m.negative / total) * 100)}% negative</span>
            </div>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-line" role="img"
              aria-label={`${m.month}: ${m.positive} positive, ${m.neutral} neutral, ${m.negative} negative`}>
              <span className="bg-good" style={{ width: pct(m.positive) }} />
              <span className="bg-muted/50" style={{ width: pct(m.neutral) }} />
              <span className="bg-bad" style={{ width: pct(m.negative) }} />
            </div>
          </div>
        )
      })}
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-muted">
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-good" />Positive</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-muted/50" />Neutral</span>
        <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-bad" />Negative</span>
      </div>
    </div>
  )
}
