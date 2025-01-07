import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar'
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import PersonalPage from './components/PersonalPage/PersonalPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <HorizontalNavbar 
          tags={{
            "Home": "/",
            "General":"/general",
            "Mashov Based Info":"/personal",
            "About":"/about",
            "Login": "/login",
          }}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/personal' element={<PersonalPage/>}/>
        </Routes>
        <footer>
            <p>&copy; Ariel Baron 2024 eduSphere. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
