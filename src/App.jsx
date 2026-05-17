import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import OurStory from './components/OurStory'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
    <div className="main-wrapper w-full bg-coffee-dark">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee text="ARA COFFEE • PREMIUM ROASTS • ETHICALLY SOURCED • EST. 2024 • CRAFTED IN SRI LANKA" speed={40} />
      <OurStory />
      <Products />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
