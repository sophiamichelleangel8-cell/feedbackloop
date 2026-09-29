import { useMemo, useState } from 'react'
import { api } from '../api'
import { useAsync } from '../hooks/useAsync'
import type { Pattern } from '../types'

import {
  Async,
  EmptyState,
  PageHeader,
  Panel,
} from '../components/ui'

import { PatternDetail } from '../components/PatternRow'

type Tab =
  | 'all'
  | 'recurring'
  | 'emerging'
  | 'unresolved'

const TABS: {
  id: Tab
  label: string
}[] = [
  { id: 'all', label: 'All insights' },
  { id: 'recurring', label: 'Recurring issues' },
  { id: 'emerging', label: 'Emerging requests' },
  { id: 'unresolved', label: 'Unresolved' },
]

const sum = (values: number[]) =>
  values.reduce(
    (total, value) => total + value,
    0,
  )

const getChange = (pattern: Pattern) => {
  const now = sum(pattern.weekly.slice(-4))
  const before = sum(pattern.weekly.slice(-8, -4))

  return {
    now,
    before,
    delta: now - before,
  }
}

function InsightsView({
  patterns,
}: {
  patterns: Pattern[]
}) {
  const [tab, setTab] = useState<Tab>('all')

  const recurring = patterns.filter(
    (pattern) => pattern.kind === 'recurring',
  )

  const emerging = patterns.filter(
    (pattern) => pattern.kind === 'emerging',
  )

  const unresolved = patterns.filter(
    (pattern) => pattern.status !== 'resolved',
  )

  const list = useMemo(() => {
    return patterns.filter((pattern) => {
      if (tab === 'all') return true

      if (tab === 'unresolved') {
        return pattern.status !== 'resolved'
      }

      return pattern.kind === tab
    })
  }, [patterns, tab])

  const increasingPatterns = patterns.filter(
    (pattern) => getChange(pattern).delta > 0,
  )

  const decreasingPatterns = patterns.filter(
    (pattern) => getChange(pattern).delta < 0,
  )

  return (
    <div className="space-y-6">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="relative overflow-hidden rounded-2xl border border-brand/15 bg-brand-gradient shadow-soft">

        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative p-6 sm:p-8">

          <div className="flex items-center gap-2">

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white shadow-sm">
              ✦
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              AI pattern detection
            </span>

          </div>

          <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
            FeedbackLoop connects the dots.
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
            Instead of treating every customer comment as an
            isolated message, FeedbackLoop remembers previous
            feedback and connects related signals into patterns
            your product team can act on.
          </p>

        </div>

        {/* PROCESS */}

        <div className="relative grid gap-px border-t border-brand/10 bg-brand/10 sm:grid-cols-3">

          <div className="bg-white/75 p-5 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold text-brand">
                01
              </span>

              <h3 className="font-semibold text-brand-ink">
                Detect
              </h3>

            </div>

            <p className="mt-2 text-sm leading-6 text-muted">
              Similar customer comments are identified
              across time.
            </p>

          </div>

          <div className="bg-white/75 p-5 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold text-brand">
                02
              </span>

              <h3 className="font-semibold text-brand-ink">
                Connect
              </h3>

            </div>

            <p className="mt-2 text-sm leading-6 text-muted">
              Related feedback is connected into meaningful
              product patterns.
            </p>

          </div>

          <div className="bg-white/75 p-5 backdrop-blur-sm">

            <div className="flex items-center gap-3">

              <span className="text-xs font-bold text-brand">
                03
              </span>

              <h3 className="font-semibold text-brand-ink">
                Surface
              </h3>

            </div>

            <p className="mt-2 text-sm leading-6 text-muted">
              Recurring problems and growing demands become
              visible to your team.
            </p>

          </div>

        </div>

      </section>

      {/* ================================================== */}
      {/* SUMMARY */}
      {/* ================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Total patterns
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-sm text-brand">
              ✦
            </span>

          </div>

          <p className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink">
            {patterns.length}
          </p>

          <p className="mt-1 text-xs text-muted">
            Detected across customer feedback
          </p>

        </div>

        <div className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Recurring issues
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-bad-soft text-sm text-bad">
              ↻
            </span>

          </div>

          <p className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink">
            {recurring.length}
          </p>

          <p className="mt-1 text-xs text-muted">
            Problems appearing repeatedly
          </p>

        </div>

        <div className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Emerging requests
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warn-soft text-sm text-warn">
              ↗
            </span>

          </div>

          <p className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink">
            {emerging.length}
          </p>

          <p className="mt-1 text-xs text-muted">
            New demand gaining attention
          </p>

        </div>

        <div className="group rounded-2xl border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5">

          <div className="flex items-center justify-between">

            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Unresolved
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-sm text-muted">
              !
            </span>

          </div>

          <p className="mt-4 text-3xl font-semibold tracking-tight text-brand-ink">
            {unresolved.length}
          </p>

          <p className="mt-1 text-xs text-muted">
            Issues without a recorded resolution
          </p>

        </div>

      </div>

      {/* ================================================== */}
      {/* TABS */}
      {/* ================================================== */}

      <div
        role="tablist"
        aria-label="Filter insights"
        className="flex w-full gap-1 overflow-x-auto rounded-xl border border-line bg-white p-1 shadow-soft sm:w-fit"
      >

        {TABS.map((tabItem) => {

          const count =
            tabItem.id === 'all'
              ? patterns.length
              : tabItem.id === 'recurring'
                ? recurring.length
                : tabItem.id === 'emerging'
                  ? emerging.length
                  : unresolved.length

          return (
            <button
              key={tabItem.id}
              type="button"
              role="tab"
              aria-selected={tab === tabItem.id}
              onClick={() => setTab(tabItem.id)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                tab === tabItem.id
                  ? 'bg-brand-soft text-brand-ink shadow-sm'
                  : 'text-muted hover:bg-paper hover:text-ink'
              }`}
            >
              {tabItem.label}

              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  tab === tabItem.id
                    ? 'bg-white text-brand'
                    : 'bg-paper text-muted'
                }`}
              >
                {count}
              </span>

            </button>
          )
        })}

      </div>

      {/* ================================================== */}
      {/* PATTERNS */}
      {/* ================================================== */}

      <Panel
        title="Patterns discovered"
        description="FeedbackLoop connects similar feedback to reveal issues and requests that may otherwise be missed."
      >

        {list.length === 0 ? (
          <EmptyState
            title="Nothing in this group"
            hint="Patterns appear once the agent has seen similar feedback more than once."
          />
        ) : (
          <div className="divide-y divide-line">

            {list.map((pattern) => (
              <div
                key={pattern.id}
                className="transition-colors hover:bg-paper/40"
              >
                <PatternDetail p={pattern} />
              </div>
            ))}

          </div>
        )}

      </Panel>

      {/* ================================================== */}
      {/* CHANGES OVER TIME */}
      {/* ================================================== */}

      <Panel
        title="Changes over time"
        description="Compare mentions from the last four weeks with the four weeks before."
      >

        {patterns.length === 0 ? (
          <EmptyState
            title="No trend data yet"
            hint="More feedback will give the agent enough history to detect changes."
          />
        ) : (
          <div>

            <div className="grid gap-px border-b border-line bg-line sm:grid-cols-2">

              <div className="bg-white p-5">

                <div className="flex items-center gap-2">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand">
                    ↗
                  </span>

                  <p className="text-sm font-semibold text-ink">
                    Patterns gaining mentions
                  </p>

                </div>

                <p className="mt-4 text-2xl font-semibold text-brand-ink">
                  {increasingPatterns.length}
                </p>

                <p className="mt-1 text-xs text-muted">
                  More mentions in the latest period
                </p>

              </div>

              <div className="bg-white p-5">

                <div className="flex items-center gap-2">

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-good-soft text-good">
                    ↘
                  </span>

                  <p className="text-sm font-semibold text-ink">
                    Patterns declining
                  </p>

                </div>

                <p className="mt-4 text-2xl font-semibold text-brand-ink">
                  {decreasingPatterns.length}
                </p>

                <p className="mt-1 text-xs text-muted">
                  Fewer mentions in the latest period
                </p>

              </div>

            </div>

            <ul className="divide-y divide-line">

              {patterns.map((pattern) => {

                const change = getChange(pattern)

                return (
                  <li
                    key={pattern.id}
                    className="flex flex-col gap-4 px-5 py-5 transition-colors hover:bg-paper/40 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="min-w-0">

                      <p className="text-sm font-semibold text-brand-ink">
                        {pattern.title}
                      </p>

                      <p className="mt-1 text-xs text-muted">
                        Previous 4 weeks → Last 4 weeks
                      </p>

                    </div>

                    <div className="flex shrink-0 items-center gap-6">

                      <div className="text-right">

                        <p className="text-sm font-medium text-ink">
                          {change.before} → {change.now}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">
                          mentions
                        </p>

                      </div>

                      <div className="min-w-[70px] text-right">

                        <p
                          className={`text-sm font-bold ${
                            change.delta > 0
                              ? 'text-bad'
                              : change.delta < 0
                                ? 'text-good'
                                : 'text-muted'
                          }`}
                        >
                          {change.delta > 0 ? '+' : ''}
                          {change.delta}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-wide text-muted">
                          change
                        </p>

                      </div>

                    </div>

                  </li>
                )
              })}

            </ul>

          </div>
        )}

      </Panel>

      {/* ================================================== */}
      {/* PRODUCT INTELLIGENCE */}
      {/* ================================================== */}

      <section className="overflow-hidden rounded-2xl border border-brand/15 bg-brand-soft/40">

        <div className="p-6 sm:p-7">

          <div className="flex gap-4">

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-sm">
              ✦
            </span>

            <div>

              <p className="text-sm font-bold uppercase tracking-wide text-brand">
                Product intelligence
              </p>

              <h3 className="mt-1 text-lg font-semibold text-brand-ink">
                From individual feedback to a product signal
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                A single customer complaint may look small.
                When the same problem appears repeatedly across
                different customers and months, it becomes a
                meaningful product pattern.
              </p>

            </div>

          </div>

        </div>

        <div className="grid gap-px border-t border-brand/10 bg-brand/10 sm:grid-cols-3">

          <div className="bg-white/70 p-5">

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Customer signal
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
              “Checkout is taking too long.”
            </p>

          </div>

          <div className="bg-white/70 p-5">

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Memory connection
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
              Similar complaints appeared across multiple months.
            </p>

          </div>

          <div className="bg-white/70 p-5">

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Product signal
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
              Checkout performance may need attention.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

export default function Insights() {
  const state = useAsync(api.getPatterns)

  return (
    <>
      <PageHeader
        title="Product Insights"
        description="Turn customer feedback into recurring problems, emerging demands, and product signals."
      />

      <Async state={state}>
        {(patterns) => (
          <InsightsView patterns={patterns} />
        )}
      </Async>
    </>
  )
}