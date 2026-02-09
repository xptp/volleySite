import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import TrainingPage from './components/pages/TrainingPage'
import CoachPage from './components/pages/CoachPage'
import Camp2025Page from './components/pages/Camp2025Page'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/camp2025" element={<Camp2025Page />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
