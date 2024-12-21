import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'; 

import './App.css'
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar'
import LoginPage from './components/LoginPage/LoginPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter> {/* Wrap your entire app in BrowserRouter */}
          <div>
            <HorizontalNavbar 
              tags={{
                "timetable": "/timetable",
                "Mail(mashov)": "/mail",
                "Tests": "/tests",
                "vactions": "/vactions",
                "grades": "/grades",
                "Login": "/login"
              }}
            />
            <LoginPage />
          </div>
      </BrowserRouter>
      <LoginPage />
    </>
  )
}

export default App
