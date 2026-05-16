import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'

import './App.css'

function App() {
  useEffect(() => {
    // Keep Lenis for the smooth scroll feel
    const lenis = new Lenis()
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="main-wrapper">

      <Navbar />
      
      {/* Placeholder to allow scrolling and test the Navbar blur */}
      <div style={{ height: '200vh', padding: '100px 5vw' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', marginTop: '150px' }}>
          Navbar Only View
        </h1>
        <p>Scroll down to see the Navbar blur effect.</p>
      </div>
    </div>
  )
}

export default App
