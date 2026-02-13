import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import TrainingPage from './components/pages/TrainingPage'
import CoachPage from './components/pages/CoachPage'
import Camp2025Page from './components/pages/Camp2025Page'
import CallbackButton from './components/CallbackButton/CallbackButton'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/camp2025" element={<Camp2025Page />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <CallbackButton />
    </Router>
  )
}

export default App
