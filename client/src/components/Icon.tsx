const PATHS = {
  dashboard: 'M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z',
  feedback: 'M4 5h16v11H9l-5 4z',
  insights: 'M4 19V5M4 19h16M8 15l4-4 3 3 5-6',
  memory: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',
  ask: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  chevron: 'M9 6l6 6-6 6',
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" className={className} aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  )
}
