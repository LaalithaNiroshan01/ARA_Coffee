import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Marquee from './components/Marquee'
import Hero from './components/Hero'

import './App.css'

function App() {
  useEffect(() => {
    // Lenis smooth scroll
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
      <CustomCursor />
      <Navbar />

      <Hero />

      <Marquee text="ARA COFFEE • PREMIUM ROASTS • ETHICALLY SOURCED • EST. 2024 • CRAFTED IN SRI LANKA" speed={40} />

      {/* Spacer to allow scrolling */}
      <div style={{ height: '150vh' }} />
    </div>
  )
}

export default App




