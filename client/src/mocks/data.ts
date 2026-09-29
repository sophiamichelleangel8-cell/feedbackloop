/**
 * MOCK DATA: visual development only.
 * Replace this with real backend data when the Hindsight-backed API is ready.
 */
console.log("🔥 NEW FEEDBACK DATA LOADED");


import type {
  AskResponse,
  FeedbackItem,
  MemoryOverview,
  Overview,
  Pattern,
} from '../types'

const fb = (
  id: string,
  date: string,
  customer: string,
  text: string,
  category: FeedbackItem['category'],
  productArea: string,
  sentiment: FeedbackItem['sentiment'],
  status: FeedbackItem['status'],
  patternId?: string,
  patternTitle?: string,
): FeedbackItem => ({
  id,
  date,
  customer,
  text,
  category,
  productArea,
  sentiment,
  status,
  patternId,
  patternTitle,
})

/* -------------------------------------------------------------------------- */
/* Pattern IDs                                                                */
/* -------------------------------------------------------------------------- */

const CHECKOUT = [
  'p-checkout',
  'Checkout performance and payment confirmation',
] as const

const DARK = ['p-dark', 'Dark mode requested'] as const

const ONBOARDING = [
  'p-onboarding',
  'Teammate invitation experience',
] as const

const EDITOR = ['p-editor', 'Task editor reliability'] as const

const PDF_EXPORT = ['p-pdf-export', 'PDF timeline export'] as const

const NOTIFICATIONS = [
  'p-notifications',
  'Project-specific notification hours',
] as const

const DUPLICATE_CHARGE = [
  'p-duplicate-charge',
  'Duplicate payment risk',
] as const

const BILLING_SETTINGS = [
  'p-billing-settings',
  'Invoice billing address settings',
] as const

/* -------------------------------------------------------------------------- */
/* FEEDBACK                                                                    */
/* -------------------------------------------------------------------------- */

export const feedback: FeedbackItem[] = [
  
  fb(
    'FB001',
    '2026-01-06',
    'Northstar Studio',
    "Checkout takes forever when we upgrade seats. The spinner ran for almost a minute and I wasn't sure the payment went through.",
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB002',
    '2026-01-09',
    'Meridian Legal',
    "Inviting new teammates is confusing. We didn't realize invitations were still pending, so onboarding stalled.",
    'issue',
    'Onboarding',
    'negative',
    'open',
    ...ONBOARDING,
  ),

  fb(
    'FB003',
    '2026-01-13',
    'Cedar & Finch',
    'I had to refresh twice before the payment confirmation appeared after changing our plan.',
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB004',
    '2026-01-17',
    'Brightpath Tutors',
    'Could you add a way to export a project timeline as a PDF for client meetings?',
    'request',
    'Reporting',
    'neutral',
    'open',
    ...PDF_EXPORT,
  ),

  fb(
    'FB005',
    '2026-01-21',
    'Atlas Fieldwork',
    'The app logged me out while I was editing a task description. I lost a few sentences.',
    'issue',
    'Task editor',
    'negative',
    'open',
    ...EDITOR,
  ),

  fb(
    'FB006',
    '2026-01-25',
    'Juniper Works',
    'It would help if the workspace had a dark theme for late-night planning.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB007',
    '2026-01-29',
    'Pinecone Labs',
    'The checkout page froze once when I changed from monthly to annual billing. It worked after I tried again.',
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB008',
    '2026-02-03',
    'Northstar Studio',
    'We upgraded another teammate and the billing screen sat there loading. This is becoming a pattern.',
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB009',
    '2026-02-06',
    'Kite & Harbor',
    "I couldn't tell whether our card was charged because the success message arrived so late.",
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB010',
    '2026-02-10',
    'Meridian Legal',
    'The invite flow is still awkward. Several colleagues missed the email and had no clear way to resend it.',
    'issue',
    'Onboarding',
    'negative',
    'open',
    ...ONBOARDING,
  ),

  fb(
    'FB011',
    '2026-02-14',
    'Lumen Accounting',
    'Please consider a proper night mode. The bright white screens are tiring during evening work.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB012',
    '2026-02-18',
    'Oakwell Health',
    'A dark interface option would make long sessions easier on the eyes.',
    'request',
    'Appearance',
    'positive',
    'open',
    ...DARK,
  ),

  fb(
    'FB013',
    '2026-02-22',
    'Redwood Events',
    'Can we set different notification hours for each project? Our clients are in different time zones.',
    'request',
    'Notifications',
    'neutral',
    'open',
    ...NOTIFICATIONS,
  ),

  fb(
    'FB014',
    '2026-02-26',
    'Cobalt Freight',
    "The task editor deleted my draft after a brief connection drop. Autosave didn't seem to kick in.",
    'issue',
    'Task editor',
    'negative',
    'open',
    ...EDITOR,
  ),

  fb(
    'FB015',
    '2026-03-02',
    'Cedar & Finch',
    'Changing plans still takes ages at the payment step. The rest of the app is fine.',
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB016',
    '2026-03-05',
    'Pinecone Labs',
    "Our last two upgrades completed quickly, but today's checkout hung before showing the receipt.",
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB017',
    '2026-03-08',
    'Meridian Legal',
    'The revised teammate invitation screen is much clearer; we got everyone onboard without asking support.',
    'praise',
    'Onboarding',
    'positive',
    'resolved',
    ...ONBOARDING,
  ),

  fb(
    'FB018',
    '2026-03-11',
    'Saffron Media',
    'A dark mode toggle would be useful when reviewing campaign plans at night.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB019',
    '2026-03-15',
    'Bluejay Analytics',
    'Please add dark theme support. I work in low light and the current interface is harsh.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB020',
    '2026-03-19',
    'Harborlight Travel',
    'The new dashboard feels much faster, though I miss the old compact layout with more rows visible.',
    'issue',
    'Dashboard',
    'neutral',
    'open',
  ),

  fb(
    'FB021',
    '2026-03-23',
    'Atlas Fieldwork',
    'The editor signed me out again while I was writing notes. I now copy everything elsewhere first.',
    'issue',
    'Task editor',
    'negative',
    'open',
    ...EDITOR,
  ),

  fb(
    'FB022',
    '2026-03-27',
    'Moss & Maple',
    'I was charged twice after clicking Pay again because the first attempt looked stuck. Support refunded one charge.',
    'issue',
    'Billing & Checkout',
    'negative',
    'resolved',
    ...DUPLICATE_CHARGE,
  ),

  fb(
    'FB023',
    '2026-04-02',
    'Northstar Studio',
    'We still see a long pause after confirming an upgrade. It eventually completes, but it is hard to trust.',
    'issue',
    'Billing & Checkout',
    'negative',
    'investigating',
    ...CHECKOUT,
  ),

  fb(
    'FB024',
    '2026-04-05',
    'Moss & Maple',
    'The duplicate charge was fixed by support, but the checkout gave no indication that the first payment was processing.',
    'issue',
    'Billing & Checkout',
    'negative',
    'resolved',
    ...DUPLICATE_CHARGE,
  ),

  fb(
    'FB025',
    '2026-04-09',
    'Lumen Accounting',
    "Dark mode is now one of our team's most-requested improvements. Please add it soon.",
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB026',
    '2026-04-12',
    'Oakwell Health',
    'A low-light theme would make the product more comfortable for our evening shifts.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB027',
    '2026-04-16',
    'Meridian Legal',
    'Invitations are much easier now, and the resend option solved our biggest onboarding headache.',
    'praise',
    'Onboarding',
    'positive',
    'resolved',
    ...ONBOARDING,
  ),

  fb(
    'FB028',
    '2026-04-20',
    'Brightpath Tutors',
    'PDF timeline export would save us time preparing client updates. Is it on the roadmap?',
    'request',
    'Reporting',
    'neutral',
    'open',
    ...PDF_EXPORT,
  ),

  fb(
    'FB029',
    '2026-04-24',
    'Juniper Works',
    'The dark theme would be especially helpful when presenting plans in a dim room.',
    'request',
    'Appearance',
    'neutral',
    'open',
    ...DARK,
  ),

  fb(
    'FB030',
    '2026-04-28',
    'Westbridge Dental',
    "I can't find where to change the invoice billing address; the setting seems buried.",
    'issue',
    'Billing settings',
    'negative',
    'open',
    ...BILLING_SETTINGS,
  ),
]

/* -------------------------------------------------------------------------- */
/* PATTERNS                                                                    */
/* -------------------------------------------------------------------------- */

export const patterns: Pattern[] = [
  {
    id: 'p-checkout',
    kind: 'recurring',
    title: 'Checkout performance and payment confirmation',
    productArea: 'Billing & Checkout',
    mentions: 9,
    firstSeen: '2026-01-06',
    lastSeen: '2026-04-02',
    trend: 'rising',
    status: 'investigating',
    weekly: [1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2],
    explanation:
      'Checkout problems appear repeatedly across January, February, March and April. Customers report slow confirmation, frozen payment screens and uncertainty about whether a payment was successful.',
    evidence: [
      {
        date: '2026-01-06',
        quote:
          "Checkout takes forever when we upgrade seats. The spinner ran for almost a minute.",
      },
      {
        date: '2026-04-02',
        quote:
          'We still see a long pause after confirming an upgrade.',
      },
    ],
  },

  {
    id: 'p-dark',
    kind: 'emerging',
    title: 'Dark mode requested',
    productArea: 'Appearance',
    mentions: 7,
    firstSeen: '2026-01-25',
    lastSeen: '2026-04-24',
    trend: 'rising',
    status: 'open',
    weekly: [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    explanation:
      'Dark mode is one of the most repeated feature requests in the dataset. Requests come from teams working at night, in low-light environments, or during long sessions.',
    evidence: [
      {
        date: '2026-01-25',
        quote:
          'It would help if the workspace had a dark theme for late-night planning.',
      },
      {
        date: '2026-04-09',
        quote:
          "Dark mode is now one of our team's most-requested improvements.",
      },
    ],
  },

  {
    id: 'p-onboarding',
    kind: 'recurring',
    title: 'Teammate invitation experience',
    productArea: 'Onboarding',
    mentions: 4,
    firstSeen: '2026-01-09',
    lastSeen: '2026-04-16',
    trend: 'falling',
    status: 'resolved',
    weekly: [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    explanation:
      'Invitation problems were reported early in the year, followed by positive feedback after the invitation flow and resend option were improved.',
    evidence: [
      {
        date: '2026-01-09',
        quote:
          "Inviting new teammates is confusing. We didn't realize invitations were still pending.",
      },
      {
        date: '2026-04-16',
        quote:
          'Invitations are much easier now, and the resend option solved our biggest onboarding headache.',
      },
    ],
  },

  {
    id: 'p-editor',
    kind: 'recurring',
    title: 'Task editor reliability',
    productArea: 'Task editor',
    mentions: 3,
    firstSeen: '2026-01-21',
    lastSeen: '2026-03-23',
    trend: 'steady',
    status: 'open',
    weekly: [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    explanation:
      'Customers reported losing work after being signed out or experiencing a connection drop while editing tasks.',
    evidence: [
      {
        date: '2026-01-21',
        quote:
          'The app logged me out while I was editing a task description.',
      },
      {
        date: '2026-03-23',
        quote:
          'The editor signed me out again while I was writing notes.',
      },
    ],
  },

  {
    id: 'p-pdf-export',
    kind: 'emerging',
    title: 'PDF timeline export',
    productArea: 'Reporting',
    mentions: 2,
    firstSeen: '2026-01-17',
    lastSeen: '2026-04-20',
    trend: 'rising',
    status: 'open',
    weekly: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    explanation:
      'Customers want a simple PDF export for project timelines to make client updates and meetings easier.',
    evidence: [
      {
        date: '2026-01-17',
        quote:
          'Could you add a way to export a project timeline as a PDF?',
      },
      {
        date: '2026-04-20',
        quote:
          'PDF timeline export would save us time preparing client updates.',
      },
    ],
  },

  {
    id: 'p-notifications',
    kind: 'emerging',
    title: 'Project-specific notification hours',
    productArea: 'Notifications',
    mentions: 1,
    firstSeen: '2026-02-22',
    lastSeen: '2026-02-22',
    trend: 'steady',
    status: 'open',
    weekly: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    explanation:
      'A customer requested different notification schedules for projects with clients in different time zones.',
    evidence: [
      {
        date: '2026-02-22',
        quote:
          'Can we set different notification hours for each project?',
      },
    ],
  },

  {
    id: 'p-duplicate-charge',
    kind: 'recurring',
    title: 'Duplicate payment risk',
    productArea: 'Billing & Checkout',
    mentions: 2,
    firstSeen: '2026-03-27',
    lastSeen: '2026-04-05',
    trend: 'steady',
    status: 'resolved',
    weekly: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    explanation:
      'Two reports show that unclear payment processing states can lead customers to retry a payment and risk duplicate charges.',
    evidence: [
      {
        date: '2026-03-27',
        quote:
          'I was charged twice after clicking Pay again because the first attempt looked stuck.',
      },
      {
        date: '2026-04-05',
        quote:
          'The checkout gave no indication that the first payment was processing.',
      },
    ],
  },

  {
    id: 'p-billing-settings',
    kind: 'emerging',
    title: 'Invoice billing address settings',
    productArea: 'Billing settings',
    mentions: 1,
    firstSeen: '2026-04-28',
    lastSeen: '2026-04-28',
    trend: 'steady',
    status: 'open',
    weekly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    explanation:
      'A customer reported difficulty locating the invoice billing address setting.',
    evidence: [
      {
        date: '2026-04-28',
        quote:
          "I can't find where to change the invoice billing address; the setting seems buried.",
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/* DASHBOARD OVERVIEW                                                         */
/* -------------------------------------------------------------------------- */

export const overview: Overview = {
  totalFeedback: 30,
  addedThisWeek: 4,

  counts: {
    recurring: 5,
    emerging: 4,
    unresolved: 6,
  },

  weeklyVolume: [
    2,
    2,
    3,
    2,
    3,
    3,
    2,
    3,
    2,
    3,
    2,
    3,
  ],

  sentimentByMonth: [
    {
      month: 'January',
      positive: 0,
      neutral: 2,
      negative: 5,
    },
    {
      month: 'February',
      positive: 1,
      neutral: 3,
      negative: 4,
    },
    {
      month: 'March',
      positive: 1,
      neutral: 4,
      negative: 5,
    },
    {
      month: 'April',
      positive: 1,
      neutral: 4,
      negative: 2,
    },
  ],

  trendSummary:
    'Billing and checkout problems are the strongest recurring issue, while dark mode is the most repeated feature request. Onboarding feedback improved after changes to teammate invitations, while task editor reliability remains unresolved.',

  recentActivity: [
    {
      id: 'a1',
      at: '2026-04-28',
      text: 'Billing settings feedback identified a new usability issue.',
    },
    {
      id: 'a2',
      at: '2026-04-24',
      text: 'New dark mode request matched the existing emerging pattern.',
    },
    {
      id: 'a3',
      at: '2026-04-20',
      text: 'PDF timeline request matched an earlier reporting request.',
    },
    {
      id: 'a4',
      at: '2026-04-16',
      text: 'Positive onboarding feedback confirmed improvements to invitations.',
    },
  ],
}

/* -------------------------------------------------------------------------- */
/* MEMORY                                                                      */
/* -------------------------------------------------------------------------- */

const ev = (
  id: string,
  date: string,
  stage: MemoryOverview['events'][number]['stage'],
  pid: string,
  ptitle: string,
  title: string,
  detail: string,
) => ({
  id,
  date,
  stage,
  patternId: pid,
  patternTitle: ptitle,
  title,
  detail,
})

export const memory: MemoryOverview = {
  counts: {
    feedback: 30,
    memories: 30,
    patterns: 8,
    insights: 9,
  },

  events: [
    ev(
      'e1',
      '2026-01-06',
      'feedback',
      ...CHECKOUT,
      'First checkout report',
      'A customer reports a very slow checkout confirmation.',
    ),

    ev(
      'e2',
      '2026-01-13',
      'memory',
      ...CHECKOUT,
      'Related checkout issue recalled',
      'The second billing complaint matched the first checkout problem.',
    ),

    ev(
      'e3',
      '2026-02-03',
      'pattern',
      ...CHECKOUT,
      'Recurring checkout pattern formed',
      'Multiple billing complaints across January and February were grouped together.',
    ),

    ev(
      'e4',
      '2026-03-05',
      'memory',
      ...CHECKOUT,
      'Checkout pattern strengthened',
      'Another slow or stuck checkout report matched the existing memory.',
    ),

    ev(
      'e5',
      '2026-04-02',
      'insight',
      ...CHECKOUT,
      'Checkout remains unresolved',
      'Repeated slow confirmation reports suggest the problem is still affecting customers.',
    ),

    ev(
      'd1',
      '2026-01-25',
      'feedback',
      ...DARK,
      'First dark mode request',
      'A customer requests a dark theme for late-night planning.',
    ),

    ev(
      'd2',
      '2026-02-14',
      'memory',
      ...DARK,
      'Dark mode request recalled',
      'Another appearance request matched the earlier dark mode request.',
    ),

    ev(
      'd3',
      '2026-03-15',
      'pattern',
      ...DARK,
      'Dark mode becomes an emerging pattern',
      'Repeated requests across different customers formed a feature-demand pattern.',
    ),

    ev(
      'd4',
      '2026-04-24',
      'insight',
      ...DARK,
      'Dark mode remains highly requested',
      'The request continues appearing across multiple customer contexts.',
    ),

    ev(
      'o1',
      '2026-01-09',
      'feedback',
      ...ONBOARDING,
      'First invitation problem',
      'A customer reports confusion around pending teammate invitations.',
    ),

    ev(
      'o2',
      '2026-02-10',
      'memory',
      ...ONBOARDING,
      'Invitation issue recalled',
      'A second customer reports the same onboarding friction.',
    ),

    ev(
      'o3',
      '2026-03-08',
      'insight',
      ...ONBOARDING,
      'Improvement detected',
      'A customer reports that the revised invitation flow is clearer.',
    ),

    ev(
      'o4',
      '2026-04-16',
      'pattern',
      ...ONBOARDING,
      'Onboarding issue appears resolved',
      'Positive feedback confirms that the resend option solved a major problem.',
    ),

    ev(
      't1',
      '2026-01-21',
      'feedback',
      ...EDITOR,
      'First editor reliability report',
      'A customer loses part of a task description after being logged out.',
    ),

    ev(
      't2',
      '2026-02-26',
      'pattern',
      ...EDITOR,
      'Task editor reliability pattern',
      'A connection drop causes another customer to lose a draft.',
    ),

    ev(
      't3',
      '2026-03-23',
      'insight',
      ...EDITOR,
      'Editor issue remains unresolved',
      'A customer reports being signed out again while writing notes.',
    ),

    ev(
      'p1',
      '2026-01-17',
      'feedback',
      ...PDF_EXPORT,
      'First PDF export request',
      'A customer asks for PDF timeline export for client meetings.',
    ),

    ev(
      'p2',
      '2026-04-20',
      'pattern',
      ...PDF_EXPORT,
      'PDF export request recalled',
      'A second customer requests the same reporting capability.',
    ),
  ],
}

/* -------------------------------------------------------------------------- */
/* ASK FEEDBACKLOOP                                                           */
/* -------------------------------------------------------------------------- */

const mem = (date: string, excerpt: string) => ({
  date,
  excerpt,
})

const answers: Record<
  'recurring' | 'increasing' | 'unresolved',
  Omit<AskResponse, 'id' | 'question'>
> = {
  recurring: {
    headline:
      'Checkout problems keep recurring, while task editor reliability remains unresolved',

    answer:
      'The strongest recurring theme is slow or unclear checkout confirmation. Task editor reliability also appears multiple times, while onboarding complaints became less negative after improvements to the invitation flow.',

    findings: [
      {
        patternId: 'p-checkout',
        title: 'Checkout performance and payment confirmation',
        note: 'Multiple reports across January, February, March and April.',
      },
      {
        patternId: 'p-editor',
        title: 'Task editor reliability',
        note: 'Customers reported lost work after sign-outs and connection drops.',
      },
      {
        patternId: 'p-onboarding',
        title: 'Teammate invitation experience',
        note: 'Early usability problems were followed by positive feedback after improvements.',
      },
    ],

    memories: [
      mem(
        '2026-01-06',
        "Checkout takes forever when we upgrade seats.",
      ),
      mem(
        '2026-02-03',
        'The billing screen sat there loading. This is becoming a pattern.',
      ),
      mem(
        '2026-04-02',
        'We still see a long pause after confirming an upgrade.',
      ),
    ],

    memoryCount: 12,

    span: {
      from: '2026-01-06',
      to: '2026-04-28',
    },

    nextStep:
      'Investigate checkout confirmation time and make payment-processing states clearer to customers.',
  },

  increasing: {
    headline:
      'Dark mode is the clearest growing feature request',

    answer:
      'Dark mode appears repeatedly across the dataset and is requested by customers working at night, in low-light environments, and during long sessions. PDF timeline export is another repeated request.',

    findings: [
      {
        patternId: 'p-dark',
        title: 'Dark mode requested',
        note: 'Seven feedback entries mention dark or low-light themes.',
      },
      {
        patternId: 'p-pdf-export',
        title: 'PDF timeline export',
        note: 'Customers requested PDF exports for client meetings and updates.',
      },
      {
        patternId: 'p-notifications',
        title: 'Project-specific notification hours',
        note: 'A customer wants different notification schedules for different time zones.',
      },
    ],

    memories: [
      mem(
        '2026-01-25',
        'It would help if the workspace had a dark theme for late-night planning.',
      ),
      mem(
        '2026-03-15',
        'Please add dark theme support.',
      ),
      mem(
        '2026-04-09',
        "Dark mode is now one of our team's most-requested improvements.",
      ),
    ],

    memoryCount: 10,

    span: {
      from: '2026-01-25',
      to: '2026-04-24',
    },

    nextStep:
      'Scope dark mode as a potential product improvement and validate the most important use cases.',
  },

  unresolved: {
    headline:
      'Several product issues still have no clear resolution',

    answer:
      'Checkout performance, task editor reliability, billing settings discoverability, and some feature requests remain open or under investigation. The onboarding experience is the clearest example of an issue that improved over time.',

    findings: [
      {
        patternId: 'p-checkout',
        title: 'Checkout performance and payment confirmation',
        note: 'Still under investigation after repeated reports.',
      },
      {
        patternId: 'p-editor',
        title: 'Task editor reliability',
        note: 'Customers continue reporting lost work and unexpected sign-outs.',
      },
      {
        patternId: 'p-billing-settings',
        title: 'Invoice billing address settings',
        note: 'A new usability issue was reported in April.',
      },
      {
        patternId: 'p-dark',
        title: 'Dark mode requested',
        note: 'Repeated request with no implementation recorded.',
      },
    ],

    memories: [
      mem(
        '2026-01-21',
        'The app logged me out while I was editing a task description.',
      ),
      mem(
        '2026-03-23',
        'The editor signed me out again while I was writing notes.',
      ),
      mem(
        '2026-04-28',
        "I can't find where to change the invoice billing address.",
      ),
    ],

    memoryCount: 14,

    span: {
      from: '2026-01-06',
      to: '2026-04-28',
    },

    nextStep:
      'Assign owners to the recurring checkout and editor reliability issues, then investigate billing settings discoverability.',
  },
}

/* -------------------------------------------------------------------------- */
/* ASK FUNCTION                                                               */
/* -------------------------------------------------------------------------- */

export function mockAsk(question: string): AskResponse {
  const q = question.toLowerCase()

  const key =
    /unresolved|open|fix|remaining/.test(q)
      ? 'unresolved'
      : /request|increas|grow|emerg|feature|want/.test(q)
        ? 'increasing'
        : 'recurring'

  return {
    id: `q-${Date.now()}`,
    question,
    ...answers[key],
  }
}