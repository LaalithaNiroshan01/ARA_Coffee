import { useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Example GSAP Animation
    gsap.fromTo('.heading', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app-container">
      <h1 className="heading" style={{ fontFamily: 'Playfair Display, serif' }}>
        React + Vite Setup
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif' }}>
        Configured with GSAP and Lenis for smooth animations and scrolling.
      </p>
    </div>
  )
}

export default App
