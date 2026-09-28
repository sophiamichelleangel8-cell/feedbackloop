import type { Pattern } from '../types'
import { fmtDate } from '../lib'
import { KindBadge, StatusBadge, TrendLabel } from './badges'
import { TrendBars, trendTone } from './charts'

/** Compact row: used on the dashboard. */
export function PatternRow({ p }: { p: Pattern }) {
  return (
    <li className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_7rem_5rem] sm:items-center sm:gap-6">
      <div className="min-w-0">
        <p className="font-medium">{p.title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-muted">
          <KindBadge value={p.kind} />
          <span>{p.productArea}</span>
          <span>since {fmtDate(p.firstSeen)}</span>
        </div>
      </div>
      <TrendBars values={p.weekly} tone={trendTone(p.trend)} label={`Weekly mentions of ${p.title}`} />
      <div className="text-sm sm:text-right">
        <p className="font-semibold">{p.mentions} mentions</p>
        <TrendLabel value={p.trend} />
      </div>
    </li>
  )
}

/** Full card: used on the Insights screen. */
export function PatternDetail({ p }: { p: Pattern }) {
  return (
    <article className="px-5 py-6">
      <div className="flex flex-wrap items-center gap-2">
        <KindBadge value={p.kind} />
        <StatusBadge value={p.status} />
        <span className="text-sm text-muted">{p.productArea}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="min-w-0">
          <p className="max-w-prose leading-relaxed">{p.explanation}</p>
          <p className="mt-2 text-xs text-muted">Written by FeedbackLoop from {p.mentions} remembered reports</p>
          <ul className="mt-4 space-y-2 border-l-2 border-line pl-4">
            {p.evidence.map((e) => (
              <li key={e.date + e.quote} className="text-sm">
                <span className="text-muted">{fmtDate(e.date)}: </span>{e.quote}
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 rounded-control bg-paper p-4">
          <p className="text-3xl font-semibold">{p.mentions}</p>
          <p className="text-sm text-muted">mentions, {fmtDate(p.firstSeen)} to {fmtDate(p.lastSeen)}</p>
          <div className="mt-3"><TrendBars values={p.weekly} tone={trendTone(p.trend)} label={`Weekly mentions of ${p.title}`} /></div>
          <p className="mt-1 text-xs text-muted">Last 12 weeks. <TrendLabel value={p.trend} /></p>
        </div>
      </div>
    </article>
  )
}
