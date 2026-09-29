import type { ComponentType } from 'react'

import { AppShell } from './components/AppShell'
import { useRoute, type Route } from './router'

import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import Insights from './pages/Insights'
import Memory from './pages/Memory'
import Ask from './pages/Ask'

const PAGES: Record<Route, ComponentType> = {
  dashboard: Dashboard,
  feedback: Feedback,
  insights: Insights,
  memory: Memory,
  ask: Ask,
}

export default function App() {
  const route = useRoute()
  const Page = PAGES[route]

  return (
    <AppShell route={route}>
      <Page />
    </AppShell>
  )
}