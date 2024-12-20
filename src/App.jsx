import { useState } from 'react'
import './App.css'
import HorizontalNavbar from './components/HorizontalNavbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HorizontalNavbar />
    </>
  )
}

export default App
