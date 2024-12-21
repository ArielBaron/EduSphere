import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar'
import LoginPage from './components/LoginPage/LoginPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <HorizontalNavbar 
          tags={{
            "Home": "/",
            "Login": "/login",
            "timetable": "/timetable",
            "Mail(mashov)": "/mail",
            "Tests": "/tests",
            "vactions": "/vactions",
            "grades": "/grades",
          }}
        />
        
        <Routes>
          <Route path="/" element={<h1>Welcome Home</h1>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
