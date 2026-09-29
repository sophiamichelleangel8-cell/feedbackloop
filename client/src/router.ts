import { useEffect, useState } from 'react'

// Tiny hash router: no dependency. Swap for react-router if the team adds it.
export type Route = 'dashboard' | 'feedback' | 'insights' | 'memory' | 'ask'
const ROUTES: Route[] = ['dashboard', 'feedback', 'insights', 'memory', 'ask']

const read = (): Route => {
  const h = window.location.hash.replace('#/', '')
  return (ROUTES as string[]).includes(h) ? (h as Route) : 'dashboard'
}

export const href = (r: Route) => `#/${r}`

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(read)
  useEffect(() => {
    const on = () => setRoute(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return route
}
