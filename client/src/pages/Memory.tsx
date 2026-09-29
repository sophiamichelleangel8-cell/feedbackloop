import { useState } from 'react'
import { api } from '../api'
import { useAsync } from '../hooks/useAsync'
import { fmtDate } from '../lib'

import type {
  MemoryOverview,
  Stage,
} from '../types'

import {
  Async,
  EmptyState,
  PageHeader,
  Panel,
} from '../components/ui'

import { StageBadge } from '../components/badges'

const STAGES: {
  stage: Stage
  key: keyof MemoryOverview['counts']
  number: string
  title: string
  text: string
}[] = [
  {
    stage: 'feedback',
    key: 'feedback',
    number: '01',
    title: 'Feedback',
    text: 'Customer feedback enters the system and is analyzed.',
  },
  {
    stage: 'memory',
    key: 'memories',
    number: '02',
    title: 'Memory',
    text: 'Relevant feedback is stored so it can be recalled later.',
  },
  {
    stage: 'pattern',
    key: 'patterns',
    number: '03',
    title: 'Patterns',
    text: 'Related memories are connected across customers and time.',
  },
  {
    stage: 'insight',
    key: 'insights',
    number: '04',
    title: 'Insights',
    text: 'Connected patterns become useful product intelligence.',
  },
]

function Flow({
  counts,
}: {
  counts: MemoryOverview['counts']
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-brand/15 bg-brand-gradient shadow-soft">

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />

      <div className="relative p-6 sm:p-8">

        <div className="flex items-center gap-2">

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white shadow-sm">
            🧠
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Long-term AI memory
          </span>

        </div>

        <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
          FeedbackLoop remembers what your customers said.
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted sm:text-base">
          Instead of forgetting yesterday's feedback when new
          feedback arrives, FeedbackLoop builds a growing memory
          of customer problems, requests, and product signals.
        </p>

      </div>

      {/* MEMORY PIPELINE */}

      <div className="relative grid gap-px border-t border-brand/10 bg-brand/10 sm:grid-cols-2 lg:grid-cols-4">

        {STAGES.map((stage, index) => (
          <div
            key={stage.stage}
            className="group bg-white/75 p-5 backdrop-blur-sm transition hover:bg-white"
          >

            <div className="flex items-center justify-between">

              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-[10px] font-bold text-brand">
                {stage.number}
              </span>

              <StageBadge value={stage.stage} />

            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-brand-ink">
              {counts[stage.key]}
            </p>

            <h3 className="mt-1 font-semibold text-brand-ink">
              {stage.title}
            </h3>

            <p className="mt-1 text-sm leading-6 text-muted">
              {stage.text}
            </p>

            {index < STAGES.length - 1 && (
              <div className="mt-4 hidden text-xs font-medium text-brand/60 lg:block">
                ↓
              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  )
}

function Thread({
  events,
}: {
  events: MemoryOverview['events']
}) {
  const threads = [
    ...new Map(
      events.map((event) => [
        event.patternId,
        event.patternTitle,
      ]),
    ).entries(),
  ]

  const [active, setActive] =
    useState(threads[0]?.[0])

  const items = events
    .filter(
      (event) => event.patternId === active,
    )
    .sort((a, b) =>
      a.date.localeCompare(b.date),
    )

  const activeTitle =
    threads.find(([id]) => id === active)?.[1]

  return (
    <Panel
      title="Memory timeline"
      description="Follow how separate customer comments become one connected product story."
    >

      {threads.length === 0 ? (
        <EmptyState
          title="No memory threads yet"
          hint="As the agent processes more feedback, related memories will appear here."
        />
      ) : (
        <>

          {/* THREAD SELECTOR */}

          <div className="border-b border-line bg-paper/40 px-5 py-3">

            <div className="flex gap-2 overflow-x-auto" role="tablist">

              {threads.map(([id, title]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={id === active}
                  onClick={() => setActive(id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                    id === active
                      ? 'border-brand bg-brand-soft text-brand-ink shadow-sm'
                      : 'border-line bg-white text-muted hover:border-brand/30 hover:text-ink'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      id === active
                        ? 'bg-brand'
                        : 'bg-line'
                    }`}
                  />

                  {title}
                </button>
              ))}

            </div>

          </div>

          {/* SELECTED THREAD */}

          {items.length === 0 ? (
            <EmptyState
              title="No events for this thread"
              hint="Select another memory thread to explore how the agent learned from it."
            />
          ) : (
            <div className="p-5 sm:p-6">

              {/* THREAD HEADER */}

              <div className="mb-7 rounded-xl border border-brand/10 bg-brand-soft/40 p-4">

                <div className="flex items-start gap-3">

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm text-white">
                    ↗
                  </span>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                      Memory connection
                    </p>

                    <p className="mt-1 font-semibold text-brand-ink">
                      {activeTitle}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted">
                      FeedbackLoop connected these events
                      because they describe the same underlying
                      product signal.
                    </p>

                  </div>

                </div>

              </div>

              {/* TIMELINE */}

              <ol>

                {items.map((event, index) => (
                  <li
                    key={event.id}
                    className="relative grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-4 pb-9 last:pb-0"
                  >

                    {index < items.length - 1 && (
                      <span
                        className="absolute left-[9px] top-5 h-full w-px bg-line"
                        aria-hidden="true"
                      />
                    )}

                    <span
                      className="relative mt-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-brand shadow-sm"
                      aria-hidden="true"
                    />

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-xs font-medium uppercase tracking-wide text-muted">
                          {fmtDate(event.date)}
                        </span>

                        <StageBadge value={event.stage} />

                      </div>

                      <p className="mt-2 text-sm font-semibold leading-6 text-brand-ink">
                        {event.title}
                      </p>

                      <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                        {event.detail}
                      </p>

                    </div>

                  </li>
                ))}

              </ol>

            </div>
          )}

        </>
      )}

    </Panel>
  )
}

function WhyMemoryMatters() {
  return (
    <section className="overflow-hidden rounded-2xl border border-brand/15 bg-brand-soft/40">

      <div className="p-6 sm:p-7">

        <div className="flex gap-4">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white shadow-sm">
            ✦
          </span>

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
              Why memory matters
            </p>

            <h3 className="mt-1 text-lg font-semibold text-brand-ink">
              A complaint becomes meaningful when the system remembers it.
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              One complaint can be easy to overlook. The same
              complaint appearing across different customers and
              months tells a much stronger story. FeedbackLoop
              connects those moments so product teams can see
              the bigger picture.
            </p>

          </div>

        </div>

      </div>

      {/* EXAMPLE */}

      <div className="grid gap-px border-t border-brand/10 bg-brand/10 sm:grid-cols-3">

        <div className="bg-white/70 p-5">

          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-[10px] font-bold text-muted">
              01
            </span>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              January
            </p>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
            Customer reports a checkout problem.
          </p>

        </div>

        <div className="bg-white/70 p-5">

          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper text-[10px] font-bold text-muted">
              02
            </span>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              February
            </p>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
            Another customer reports a similar issue.
          </p>

        </div>

        <div className="bg-white/70 p-5">

          <div className="flex items-center gap-2">

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              ✓
            </span>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Memory connection
            </p>

          </div>

          <p className="mt-3 text-sm font-semibold leading-6 text-brand-ink">
            FeedbackLoop recognizes the recurring pattern.
          </p>

        </div>

      </div>

    </section>
  )
}

export default function Memory() {
  const state = useAsync(api.getMemory)

  return (
    <>
      <PageHeader
        title="Memory & Learning"
        description="See what FeedbackLoop remembers, what it recalls when new feedback arrives, and how those memories become product insights."
      />

      <Async state={state}>
        {(memory) => (
          <div className="space-y-7">

            <Flow counts={memory.counts} />

            <Thread events={memory.events} />

            <WhyMemoryMatters />

          </div>
        )}
      </Async>
    </>
  )
}