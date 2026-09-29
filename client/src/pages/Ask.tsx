import { useState } from 'react'
import { api } from '../api'
import { fmtDate, fmtRange } from '../lib'
import type { AskResponse } from '../types'
import {
  PageHeader,
  Panel,
  btnPrimary,
  fieldClass,
} from '../components/ui'

const SUGGESTIONS = [
  'What problems are recurring?',
  'Which requests are increasing?',
  'What issues remain unresolved?',
  'What should the product team focus on?',
]

function InsightAnswer({ r }: { r: AskResponse }) {
  return (
    <Panel>
      <div className="p-5 sm:p-7">

        {/* Question */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-sm text-muted">
            ?
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
              Question
            </p>

            <p className="mt-1 text-sm font-medium leading-6 text-ink">
              {r.question}
            </p>
          </div>
        </div>

        <div className="my-6 h-px bg-line" />

        {/* AI answer */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
              AI
            </span>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              FeedbackLoop insight
            </p>
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">
            {r.headline}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
            {r.answer}
          </p>
        </div>

        {/* Findings */}
        {r.findings.length > 0 && (
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">
                Key findings
              </p>

              <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-medium text-muted">
                {r.findings.length} signals
              </span>
            </div>

            <div className="overflow-hidden rounded-panel border border-line">
              {r.findings.map((f, index) => (
                <div
                  key={f.title}
                  className={`p-4 transition hover:bg-paper/50 ${
                    index !== r.findings.length - 1
                      ? 'border-b border-line'
                      : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        {f.title}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-muted">
                        {f.note}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product action */}
        <div className="mt-7 rounded-panel border border-brand/15 bg-brand-gradient p-5">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              →
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                Suggested product action
              </p>

              <p className="mt-2 text-sm leading-6 text-brand-ink">
                {r.nextStep}
              </p>
            </div>
          </div>
        </div>

        {/* Memory evidence */}
        <details className="mt-6 group">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-control border border-line bg-paper/50 px-4 py-3 text-sm font-medium text-brand transition hover:border-brand/30">
            <span>
              View memory evidence
            </span>

            <span className="text-xs text-muted">
              {r.memoryCount} memories
            </span>
          </summary>

          <div className="mt-3 rounded-panel border border-line bg-surface p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Evidence range
              </p>

              <p className="text-xs font-medium text-brand">
                {fmtRange(r.span.from, r.span.to)}
              </p>
            </div>

            <ul className="mt-5 space-y-5 border-l-2 border-brand-soft pl-5">
              {r.memories.map((m) => (
                <li key={m.date + m.excerpt} className="relative">
                  <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand" />

                  <p className="text-xs font-medium text-muted">
                    {fmtDate(m.date)}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-ink">
                    {m.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </Panel>
  )
}

export default function Ask() {
  const [question, setQuestion] = useState('')
  const [pending, setPending] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<AskResponse[]>([])

  const submit = (text: string) => {
    const q = text.trim()

    if (!q || pending) return

    setPending(q)
    setError(null)

    api.ask(q)
      .then((r) => {
        setAnswers((a) => [r, ...a])
        setQuestion('')
      })
      .catch((e: unknown) => {
        setError(
          e instanceof Error
            ? e.message
            : 'Something went wrong while asking FeedbackLoop.',
        )
      })
      .finally(() => setPending(null))
  }

  return (
    <>
      <PageHeader
        title="Ask FeedbackLoop"
        description="Turn customer feedback into answers using the product's long-term memory."
      />

      <div className="space-y-7">

        {/* AI Hero */}
        <section className="relative overflow-hidden rounded-panel border border-brand/15 bg-brand-gradient shadow-soft">
          <div className="relative p-6 sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-lg text-white shadow-soft">
                    ✦
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                      AI product intelligence
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-brand-ink sm:text-2xl">
                      Ask questions. Find the signal.
                    </h2>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                  FeedbackLoop searches remembered customer feedback,
                  connects related signals, and surfaces the patterns
                  behind what your users need.
                </p>

              </div>

              <div className="hidden shrink-0 rounded-panel border border-brand/15 bg-white/70 px-4 py-3 sm:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                  Memory status
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-good" />

                  <span className="text-sm font-semibold text-brand-ink">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Feedback memory',
                'Pattern detection',
                'Product insights',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand/15 bg-white/75 px-3 py-1.5 text-xs font-medium text-brand-ink"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* Ask box */}
        <Panel>
          <div className="p-5 sm:p-7">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <label
                  htmlFor="question"
                  className="text-sm font-semibold text-ink"
                >
                  What would you like to know?
                </label>

                <p className="mt-1 text-xs leading-5 text-muted">
                  Ask naturally. FeedbackLoop will find the relevant
                  memories and patterns.
                </p>
              </div>

              <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
                AI powered
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                id="question"
                className={`${fieldClass} flex-1`}
                value={question}
                placeholder="e.g. What problems are customers repeatedly reporting?"
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submit(question)
                  }
                }}
                disabled={!!pending}
              />

              <button
                className={`${btnPrimary} shrink-0`}
                disabled={!question.trim() || !!pending}
                onClick={() => submit(question)}
              >
                {pending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Thinking…
                  </span>
                ) : (
                  'Ask FeedbackLoop'
                )}
              </button>
            </div>

            {/* Suggestions */}
            <div className="mt-6">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                Try asking
              </p>

              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={!!pending}
                    onClick={() => {
                      setQuestion(s)
                      submit(s)
                    }}
                    className="rounded-full border border-line bg-surface px-3 py-2 text-xs font-medium text-muted transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </Panel>

        {/* Loading */}
        {pending && (
          <section
            className="rounded-panel border border-brand/15 bg-surface p-6 shadow-soft"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                ✦
              </div>

              <div>
                <p className="text-sm font-semibold text-ink">
                  Searching FeedbackLoop memory…
                </p>

                <p className="mt-1 text-xs text-muted">
                  Connecting related feedback and finding patterns
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-3">
              <div className="h-4 w-2/3 animate-pulse rounded bg-line/70" />
              <div className="h-3 w-full animate-pulse rounded bg-line/70" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-line/70" />
            </div>
          </section>
        )}

        {/* Error */}
        {error && (
          <section
            role="alert"
            className="rounded-panel border border-bad/25 bg-bad-soft p-5"
          >
            <p className="text-sm font-semibold text-ink">
              Couldn't get an answer
            </p>

            <p className="mt-1 text-sm leading-6 text-muted">
              {error}
            </p>
          </section>
        )}

        {/* Answers */}
        {answers.length > 0 && (
          <section className="space-y-4">

            <div>
              <p className="text-sm font-semibold text-ink">
                Recent answers
              </p>

              <p className="mt-1 text-sm text-muted">
                Insights generated from FeedbackLoop's remembered feedback.
              </p>
            </div>

            {answers.map((r) => (
              <InsightAnswer key={r.id} r={r} />
            ))}

          </section>
        )}

        {/* Empty state */}
        {answers.length === 0 && !pending && !error && (
          <section className="rounded-panel border border-dashed border-line bg-surface p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-xl text-brand">
              ✦
            </div>

            <h3 className="mt-4 text-base font-semibold text-ink">
              Your product intelligence starts here
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Ask a question above and FeedbackLoop will search its
              long-term memory to find the evidence behind the answer.
            </p>

          </section>
        )}

      </div>
    </>
  )
}