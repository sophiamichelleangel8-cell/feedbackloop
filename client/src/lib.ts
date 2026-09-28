export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

export const fmtRange = (from: string, to: string) => `${fmtDate(from)} to ${fmtDate(to)}`
