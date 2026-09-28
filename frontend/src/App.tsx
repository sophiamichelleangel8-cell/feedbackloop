import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Feedback from './pages/Feedback'
import Memory from './pages/Memory'
import Insights from './pages/Insights'
import Ask from './pages/Ask'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/ask" element={<Ask />} />
      </Route>
    </Routes>
  )
}