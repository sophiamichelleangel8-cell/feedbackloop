import { useMemo, useState } from 'react'
import { api } from '../api'
import { useAsync } from '../hooks/useAsync'
import { fmtDate } from '../lib'
import type { FeedbackItem } from '../types'

import {
  Async,
  EmptyState,
  PageHeader,
  Panel,
  fieldClass,
} from '../components/ui'

import {
  SentimentBadge,
  StatusBadge,
  categoryLabel,
} from '../components/badges'

const ALL = 'all'

const COLS =
  'lg:grid-cols-[6.5rem_minmax(0,1fr)_8rem_8rem_9rem] lg:gap-6'

function FeedbackList({
  items,
}: {
  items: FeedbackItem[]
}) {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState(ALL)
  const [sentiment, setSentiment] = useState(ALL)
  const [status, setStatus] = useState(ALL)
  const [area, setArea] = useState(ALL)

  const areas = useMemo(
    () =>
      [...new Set(items.map((item) => item.productArea))].sort(),
    [items],
  )

  const shown = useMemo(() => {
    const search = q.trim().toLowerCase()

    return items.filter((item) => {
      const matchesSearch =
        search === '' ||
        `${item.text} ${item.customer} ${item.productArea} ${item.patternTitle ?? ''}`
          .toLowerCase()
          .includes(search)

      const matchesCategory =
        category === ALL || item.category === category

      const matchesSentiment =
        sentiment === ALL || item.sentiment === sentiment

      const matchesStatus =
        status === ALL || item.status === status

      const matchesArea =
        area === ALL || item.productArea === area

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSentiment &&
        matchesStatus &&
        matchesArea
      )
    })
  }, [
    items,
    q,
    category,
    sentiment,
    status,
    area,
  ])

  const hasFilters =
    q.trim() !== '' ||
    category !== ALL ||
    sentiment !== ALL ||
    status !== ALL ||
    area !== ALL

  const clearFilters = () => {
    setQ('')
    setCategory(ALL)
    setSentiment(ALL)
    setStatus(ALL)
    setArea(ALL)
  }

  const select = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    options: [string, string][],
  ) => (
    <label className="block min-w-0">
      <span className="sr-only">{label}</span>

      <select
        className={fieldClass}
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        aria-label={label}
      >
        <option value={ALL}>{label}</option>

        {options.map(([optionValue, optionLabel]) => (
          <option
            key={optionValue}
            value={optionValue}
          >
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  )

  return (
    <div className="space-y-6">

      {/* ================================================== */}
      {/* INTRO */}
      {/* ================================================== */}

      <section className="relative overflow-hidden rounded-2xl border border-brand/15 bg-brand-gradient p-6 shadow-soft sm:p-7">

        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="max-w-3xl">

            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white shadow-sm">
                ↗
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Feedback intelligence
              </p>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
              Every customer signal in one place.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Explore what customers are saying, filter the
              signals that matter, and see how individual
              feedback connects to recurring product patterns.
            </p>

          </div>

          <div className="relative shrink-0 rounded-2xl border border-brand/10 bg-white/80 px-7 py-5 text-center shadow-sm backdrop-blur">

            <p className="text-3xl font-bold tracking-tight text-brand-ink">
              {items.length}
            </p>

            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
              Feedback memories
            </p>

          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FILTERS */}
      {/* ================================================== */}

      <Panel>

        <div className="border-b border-line p-4 sm:p-5">

          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-sm font-semibold text-ink">
                Explore feedback
              </h3>

              <p className="mt-0.5 text-xs text-muted">
                Search and filter the customer signals stored in memory.
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="self-start text-xs font-semibold text-brand hover:underline sm:self-auto"
              >
                Clear all filters
              </button>
            )}

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_repeat(4,minmax(0,1fr))]">

            {/* SEARCH */}

            <label className="relative block min-w-0 sm:col-span-2 lg:col-span-1">

              <span className="sr-only">
                Search feedback
              </span>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              >
                ⌕
              </span>

              <input
                type="search"
                className={`${fieldClass} pl-9`}
                placeholder="Search feedback, customer, or pattern..."
                value={q}
                onChange={(event) =>
                  setQ(event.target.value)
                }
              />

            </label>

            {select(
              'All categories',
              category,
              setCategory,
              [
                ['issue', 'Issue'],
                ['request', 'Request'],
                ['praise', 'Praise'],
              ],
            )}

            {select(
              'All sentiment',
              sentiment,
              setSentiment,
              [
                ['positive', 'Positive'],
                ['neutral', 'Neutral'],
                ['negative', 'Negative'],
              ],
            )}

            {select(
              'All statuses',
              status,
              setStatus,
              [
                ['open', 'Open'],
                ['investigating', 'Investigating'],
                ['resolved', 'Resolved'],
              ],
            )}

            {select(
              'All product areas',
              area,
              setArea,
              areas.map((item) => [item, item]),
            )}

          </div>

        </div>

        {/* FILTER SUMMARY */}

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-paper/50 px-5 py-3">

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-brand" />

            <span>
              Showing{' '}
              <strong className="text-brand-ink">
                {shown.length}
              </strong>{' '}
              of{' '}
              <strong className="text-brand-ink">
                {items.length}
              </strong>{' '}
              memories
            </span>
          </div>

          {hasFilters && (
            <span className="text-xs font-medium text-brand">
              Filters active
            </span>
          )}

        </div>

        {/* ================================================== */}
        {/* DESKTOP HEADER */}
        {/* ================================================== */}

        <div
          className={`hidden border-b border-line bg-paper/40 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted lg:grid ${COLS}`}
        >
          <span>Date</span>
          <span>Customer signal</span>
          <span>Category</span>
          <span>Sentiment</span>
          <span>Status</span>
        </div>

        {/* ================================================== */}
        {/* RESULTS */}
        {/* ================================================== */}

        {shown.length === 0 ? (
          <div>
            <EmptyState
              title="No feedback matches"
              hint="Try changing your search or removing one of the filters."
            />

            <div className="pb-8 text-center">
              <button
                type="button"
                className="text-sm font-semibold text-brand hover:underline"
                onClick={clearFilters}
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-line">

            {shown.map((item) => (
              <li
                key={item.id}
                className={`group grid gap-4 px-5 py-5 transition-colors hover:bg-paper/60 lg:items-start ${COLS}`}
              >

                {/* DATE */}

                <div className="flex items-center gap-2 lg:block">

                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {fmtDate(item.date)}
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-line lg:hidden" />

                  <span className="text-xs text-muted lg:hidden">
                    {item.productArea}
                  </span>

                </div>

                {/* CUSTOMER SIGNAL */}

                <div className="min-w-0">

                  <div className="flex items-start gap-3">

                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                      {item.customer
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </span>

                    <div className="min-w-0">

                      <p className="break-words text-sm font-semibold leading-6 text-brand-ink">
                        {item.text}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">

                        <span className="font-semibold text-ink">
                          {item.customer}
                        </span>

                        <span>•</span>

                        <span>
                          {item.productArea}
                        </span>

                      </div>

                    </div>

                  </div>

                  {item.patternTitle && (
                    <div className="mt-3 ml-11 inline-flex max-w-full items-center gap-2 rounded-control border border-brand/10 bg-brand-soft/60 px-2.5 py-1.5 text-xs">

                      <span className="font-semibold text-brand">
                        Pattern
                      </span>

                      <span className="truncate text-brand-ink">
                        {item.patternTitle}
                      </span>

                    </div>
                  )}

                </div>

                {/* CATEGORY */}

                <div className="flex items-center lg:pt-1">

                  <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink">
                    {categoryLabel(item.category)}
                  </span>

                </div>

                {/* SENTIMENT */}

                <div className="flex items-center lg:pt-1">
                  <SentimentBadge
                    value={item.sentiment}
                  />
                </div>

                {/* STATUS */}

                <div className="flex items-center lg:pt-1">
                  <StatusBadge
                    value={item.status}
                  />
                </div>

              </li>
            ))}

          </ul>
        )}

        {/* ================================================== */}
        {/* FOOTER */}
        {/* ================================================== */}

        <div className="border-t border-line px-5 py-3 text-xs text-muted">
          FeedbackLoop continuously connects these individual
          signals into long-term product memory.
        </div>

      </Panel>

    </div>
  )
}

export default function Feedback() {
  const state = useAsync(api.getFeedback)

  return (
    <>
      <PageHeader
        title="Customer Feedback"
        description="Explore every piece of feedback the agent has read, analyzed, and remembered."
      />

      <Async state={state}>
        {(items) => (
          <FeedbackList items={items} />
        )}
      </Async>
    </>
  )
}