const stats = [
  {
    label: 'Total feedback',
    value: '128',
    change: '+18 this month',
  },
  {
    label: 'Recurring issues',
    value: '24',
    change: 'Across 6 themes',
  },
  {
    label: 'Emerging requests',
    value: '8',
    change: 'New this month',
  },
  {
    label: 'Unresolved issues',
    value: '13',
    change: 'Need attention',
  },
]

const recurringIssues = [
  {
    title: 'Login & authentication',
    mentions: 18,
    text: 'Users continue reporting sign-in failures and session issues.',
  },
  {
    title: 'Mobile performance',
    mentions: 14,
    text: 'Slow loading and inconsistent performance on mobile devices.',
  },
  {
    title: 'Export limitations',
    mentions: 11,
    text: 'Customers want faster and more flexible data exports.',
  },
]

const recentActivity = [
  {
    text: 'Export is still taking too long when working with large datasets.',
    category: 'Performance',
    time: '2h ago',
  },
  {
    text: 'Would love to have a better mobile experience for quick updates.',
    category: 'Feature request',
    time: '5h ago',
  },
  {
    text: 'I had to log in twice before the dashboard loaded properly.',
    category: 'Authentication',
    time: 'Yesterday',
  },
]

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-indigo-600">
          PRODUCT INTELLIGENCE
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Feedback overview
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Understand what your users are saying, what keeps coming back,
          and what needs attention.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Main sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recurring issues */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Recurring issues
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Problems appearing repeatedly across feedback.
            </p>
          </div>

          <div className="space-y-3">
            {recurringIssues.map((issue) => (
              <div
                key={issue.title}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-sm font-semibold text-slate-900">
                    {issue.title}
                  </h4>

                  <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    {issue.mentions} mentions
                  </span>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {issue.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Recent activity
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest signals from your users.
            </p>
          </div>

          <div className="space-y-5">
            {recentActivity.map((item) => (
              <div
                key={item.text}
                className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
              >
                <p className="text-sm leading-6 text-slate-700">
                  “{item.text}”
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {item.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Hindsight */}
      <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm">
        <p className="text-xs font-bold tracking-wider text-indigo-600">
          HINDSIGHT MEMORY
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          From feedback to insight
        </h3>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          FeedbackLoop connects new feedback with what the system has already
          learned, helping your team identify patterns that isolated feedback
          would miss.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {[
            ['01', 'Past feedback'],
            ['02', 'Hindsight memory'],
            ['03', 'Accumulated pattern'],
            ['04', 'Current insight'],
          ].map(([number, label]) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl bg-white p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
                {number}
              </span>

              <span className="text-sm font-medium text-slate-700">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}