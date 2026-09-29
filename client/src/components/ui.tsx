import type { ReactNode } from 'react'
import type { AsyncState } from '../hooks/useAsync'

export const btnPrimary =
  'inline-flex items-center justify-center rounded-control bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-ink disabled:opacity-50'
export const btnQuiet =
  'inline-flex items-center justify-center rounded-control border border-line bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-paper'
export const fieldClass =
  'w-full rounded-control border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted'

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 max-w-xl text-muted">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}

export function Panel({ title, description, action, children, className = '' }: {
  title?: string; description?: string; action?: ReactNode; children: ReactNode; className?: string
}) {
  return (
    <section className={`min-w-0 rounded-panel border border-line bg-surface ${className}`}>
      {title && (
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">{title}</h2>
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Stat({ label, value, note }: { label: string; value: number | string; note?: string }) {
  return (
    <div className="bg-surface p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight">{value}</p>
      {note && <p className="mt-1 text-sm text-muted">{note}</p>}
    </div>
  )
}

export function LoadingState() {
  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      <div className="h-24 animate-pulse rounded-panel bg-line/60" />
      <div className="h-48 animate-pulse rounded-panel bg-line/60" />
    </div>
  )
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="px-5 py-12 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-panel border border-bad/30 bg-bad-soft p-5" role="alert">
      <p className="font-semibold text-bad">Couldn't load this page</p>
      <p className="mt-1 text-sm">{message}</p>
      <button onClick={onRetry} className={`${btnQuiet} mt-3`}>Try again</button>
    </div>
  )
}

export function Async<T>({ state, children }: { state: AsyncState<T>; children: (data: T) => ReactNode }) {
  if (state.error) return <ErrorState message={state.error} onRetry={state.reload} />
  if (state.loading || !state.data) return <LoadingState />
  return <>{children(state.data)}</>
}
