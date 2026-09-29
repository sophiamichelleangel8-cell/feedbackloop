import { api } from '../api'
import { useAsync } from '../hooks/useAsync'
import { href } from '../router'
import { fmtDate } from '../lib'

import {
  Async,
  EmptyState,
  PageHeader,
  Panel,
  Stat,
  btnPrimary,
} from '../components/ui'

import {
  SentimentBars,
  TrendBars,
} from '../components/charts'

import { PatternRow } from '../components/PatternRow'

export default function Dashboard() {
  const overview = useAsync(api.getOverview)
  const patterns = useAsync(api.getPatterns)

  return (
    <>
      <PageHeader
        title="Product Feedback Intelligence"
        description="See what customers are saying, what keeps coming up, and what FeedbackLoop has learned over time."
        action={
          <a
            href={href('ask')}
            className={btnPrimary}
          >
            Ask FeedbackLoop
          </a>
        }
      />

      <Async state={overview}>
        {(o) => (
          <div className="space-y-6">

            {/* ================================================== */}
            {/* HERO / MEMORY INTRO */}
            {/* ================================================== */}

            <section className="relative overflow-hidden rounded-panel border border-brand/20 bg-brand-gradient shadow-soft">
              <div className="relative z-10 p-6 sm:p-8">
                <div className="max-w-3xl">

                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white">
                      ✦
                    </span>

                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      FeedbackLoop Memory
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
                    Your customer feedback, remembered over time.
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    FeedbackLoop doesn't just collect feedback.
                    It connects what customers said yesterday,
                    last month, and today to uncover patterns
                    your team might otherwise miss.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={href('feedback')}
                      className="inline-flex items-center justify-center rounded-control bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                    >
                      Explore feedback
                    </a>

                    <a
                      href={href('insights')}
                      className="inline-flex items-center justify-center rounded-control border border-brand/20 bg-surface px-4 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand/40"
                    >
                      View insights →
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative memory circles */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-brand/10" />
              <div className="pointer-events-none absolute -bottom-28 right-8 h-64 w-64 rounded-full border border-brand/10" />
            </section>

            {/* ================================================== */}
            {/* KEY METRICS */}
            {/* ================================================== */}

            <section>
              <div className="mb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Product overview
                </p>

                <p className="mt-1 text-sm text-muted">
                  A snapshot of what FeedbackLoop has learned.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-4">
                <Stat
                  label="Total feedback"
                  value={o.totalFeedback}
                  note={`${o.addedThisWeek} added this week`}
                />

                <Stat
                  label="Recurring issues"
                  value={o.counts.recurring}
                  note="Reported in more than one month"
                />

                <Stat
                  label="Feature requests"
                  value={o.counts.emerging}
                  note="New and growing"
                />

                <Stat
                  label="Unresolved issues"
                  value={o.counts.unresolved}
                  note="No fix on record"
                />
              </div>
            </section>

            {/* ================================================== */}
            {/* INTELLIGENCE FLOW */}
            {/* ================================================== */}

            <section className="rounded-panel border border-line bg-surface shadow-soft">
              <div className="border-b border-line px-5 py-4 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  From feedback to intelligence
                </p>

                <h2 className="mt-1 text-lg font-semibold tracking-tight">
                  How FeedbackLoop finds the signal
                </h2>
              </div>

              <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

                <div className="p-5">
                  <span className="text-xs font-bold text-brand">
                    01
                  </span>

                  <h3 className="mt-3 font-semibold">
                    Feedback
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Customer comments, complaints, and requests enter the system.
                  </p>
                </div>

                <div className="p-5">
                  <span className="text-xs font-bold text-brand">
                    02
                  </span>

                  <h3 className="mt-3 font-semibold">
                    Memory
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Previous feedback stays available instead of disappearing into a backlog.
                  </p>
                </div>

                <div className="p-5">
                  <span className="text-xs font-bold text-brand">
                    03
                  </span>

                  <h3 className="mt-3 font-semibold">
                    Patterns
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Related feedback is connected to reveal recurring themes.
                  </p>
                </div>

                <div className="p-5">
                  <span className="text-xs font-bold text-brand">
                    04
                  </span>

                  <h3 className="mt-3 font-semibold">
                    Insights
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    Teams can ask questions and turn those patterns into action.
                  </p>
                </div>

              </div>
            </section>

            {/* ================================================== */}
            {/* TRENDS */}
            {/* ================================================== */}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

              <Panel
                title="Feedback trends"
                description="Feedback volume over the last 12 weeks"
              >
                <div className="p-5">
                  <TrendBars
                    values={o.weeklyVolume}
                    label="Feedback received per week"
                  />

                  <div className="mt-5 rounded-control border border-brand/10 bg-brand-soft p-4">
                    <div className="flex gap-3">
                      <span className="text-brand">
                        ↗
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-brand-ink">
                          What the trend tells us
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {o.trendSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Panel>

              <Panel
                title="Sentiment by month"
                description="How customer sentiment has changed over time"
              >
                <div className="p-5">
                  <SentimentBars
                    data={o.sentimentByMonth}
                  />
                </div>
              </Panel>

            </div>

            {/* ================================================== */}
            {/* PATTERNS + ACTIVITY */}
            {/* ================================================== */}

            <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">

              <Panel
                title="Patterns & recurring issues"
                description="Themes discovered across customer feedback over time."
                action={
                  <a
                    href={href('insights')}
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    See all →
                  </a>
                }
              >
                <Async state={patterns}>
                  {(list) => (
                    <div>
                      <ul className="divide-y divide-line">
                        {list.slice(0, 4).map((p) => (
                          <PatternRow
                            key={p.id}
                            p={p}
                          />
                        ))}
                      </ul>

                      {list.length > 4 && (
                        <div className="border-t border-line px-5 py-3 text-center">
                          <a
                            href={href('insights')}
                            className="text-sm font-medium text-brand hover:underline"
                          >
                            View {list.length - 4} more patterns →
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </Async>
              </Panel>

              <Panel
                title="Recent activity"
                description="Recent actions taken by FeedbackLoop"
              >
                {o.recentActivity.length === 0 ? (
                  <EmptyState
                    title="Nothing yet"
                    hint="Add feedback and the agent's activity will show up here."
                  />
                ) : (
                  <ul className="divide-y divide-line">
                    {o.recentActivity.map((a) => (
                      <li
                        key={a.id}
                        className="px-5 py-4 transition hover:bg-paper/60"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-muted">
                          {fmtDate(a.at)}
                        </p>

                        <p className="mt-1 text-sm leading-relaxed text-brand-ink">
                          {a.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>

            </div>

            {/* ================================================== */}
            {/* FINAL CTA */}
            {/* ================================================== */}

            <section className="relative overflow-hidden rounded-panel bg-brand-ink text-white shadow-panel">
              <div className="relative z-10 p-6 sm:p-8">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                    Ask your product memory
                  </span>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                    Have a product question?
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Ask FeedbackLoop what your customers have been saying,
                    what keeps repeating, and what your team may be missing.
                  </p>

                  <a
                    href={href('ask')}
                    className="mt-5 inline-flex items-center justify-center rounded-control bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition hover:opacity-90"
                  >
                    Ask FeedbackLoop →
                  </a>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 right-12 h-56 w-56 rounded-full border border-white/10" />
            </section>

          </div>
        )}
      </Async>
    </>
  )
}