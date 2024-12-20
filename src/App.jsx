import { useState } from 'react'
import './App.css'
import HorizontalNavbar from './components/HorizontalNavbar/HorizontalNavbar'
import LoginPage from './components/LoginPage/LoginPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HorizontalNavbar tags={{"timetable" : "#","Mail(mashov)" : "#", "Tests" : "#","vactions" : "#","grades" : "#", "Login" :"#"}}/>
      <LoginPage />
    </>
  )
}

export default App
