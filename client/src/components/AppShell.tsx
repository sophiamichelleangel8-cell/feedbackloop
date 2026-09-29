import type { ReactNode } from 'react'
import { href, type Route } from '../router'
import { Icon, type IconName } from './Icon'

const NAV: { route: Route; label: string; icon: IconName }[] = [
  { route: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { route: 'feedback', label: 'Feedback', icon: 'feedback' },
  { route: 'insights', label: 'Insights', icon: 'insights' },
  { route: 'memory', label: 'Memory', icon: 'memory' },
  { route: 'ask', label: 'Ask', icon: 'ask' },
]

function Wordmark() {
  return (
    <a
      href={href('dashboard')}
      className="group flex items-center gap-3"
      aria-label="FeedbackLoop dashboard"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-control bg-brand text-white shadow-soft transition-transform duration-200 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M20 12a8 8 0 11-3-6.2" />
          <circle
            cx="12"
            cy="12"
            r="2.2"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>

      <div className="leading-none">
        <p className="font-semibold tracking-tight text-ink">
          FeedbackLoop
        </p>

        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
          Product intelligence
        </p>
      </div>
    </a>
  )
}

function Navigation({
  route,
  mobile = false,
}: {
  route: Route
  mobile?: boolean
}) {
  return (
    <nav
      aria-label="Main"
      className={
        mobile
          ? 'grid grid-cols-5'
          : 'mt-8 flex flex-col gap-1.5'
      }
    >
      {NAV.map((n) => {
        const active = n.route === route

        if (mobile) {
          return (
            <a
              key={n.route}
              href={href(n.route)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active
                  ? 'text-brand'
                  : 'text-muted hover:text-ink'
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                  active ? 'bg-brand-soft' : ''
                }`}
              >
                <Icon
                  name={n.icon}
                  className="h-5 w-5"
                />
              </span>

              {n.label}
            </a>
          )
        }

        return (
          <a
            key={n.route}
            href={href(n.route)}
            aria-current={active ? 'page' : undefined}
            className={`group flex items-center gap-3 rounded-control px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              active
                ? 'bg-brand-soft text-brand-ink shadow-sm'
                : 'text-muted hover:bg-paper hover:text-ink'
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-control transition ${
                active
                  ? 'bg-surface text-brand'
                  : 'text-muted group-hover:text-ink'
              }`}
            >
              <Icon name={n.icon} />
            </span>

            <span>
              {n.label === 'Ask'
                ? 'Ask FeedbackLoop'
                : n.label === 'Memory'
                  ? 'Memory & learning'
                  : n.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}

function MemoryStatus() {
  return (
    <div className="mt-auto rounded-panel border border-brand/15 bg-brand-soft/50 p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-xs text-white">
          ✦
        </span>

        <div>
          <p className="text-xs font-semibold text-brand-ink">
            AI memory active
          </p>

          <p className="mt-0.5 text-[11px] text-muted">
            Learning from customer feedback
          </p>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface">
        <div className="h-full w-full rounded-full bg-brand" />
      </div>

      <p className="mt-2 text-[11px] text-muted">
        FeedbackLoop is ready to connect new signals.
      </p>
    </div>
  )
}

export function AppShell({
  route,
  children,
}: {
  route: Route
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-surface px-4 py-6 lg:flex">
        <div className="px-2">
          <Wordmark />
        </div>

        <div className="mt-8 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            Workspace
          </p>
        </div>

        <Navigation route={route} />

        <MemoryStatus />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-col pb-24 lg:pb-0">

        {/* Mobile header */}
        <div className="sticky top-0 z-20 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
          <Wordmark />
        </div>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 lg:py-10">
          {children}
        </main>
      </div>

      {/* Mobile navigation */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <Navigation route={route} mobile />
      </nav>
    </div>
  )
}