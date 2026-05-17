import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logoImg from '../images/Logo.png';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navRef = useRef(null);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
    );

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSmoothScroll = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu if open
    
    // Smooth scroll using GSAP
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: target, offsetY: 70 }, // offset for fixed navbar
      ease: "power3.inOut"
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Story', href: '#story' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
  ];

  const delays = ['delay-[300ms]', 'delay-[400ms]', 'delay-[500ms]', 'delay-[600ms]'];

  return (
    <nav 
      className={`navbar fixed top-0 left-0 w-full flex items-center z-[100] transition-all duration-500 ease-premium ${
        isScrolled 
          ? 'bg-coffee-darker/90 backdrop-blur-[15px] h-[70px] shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-b border-coffee-accent/25' 
          : 'bg-transparent h-[90px]'
      }`} 
      ref={navRef}
    >
      <div className="navbar-container w-full max-w-[1400px] mx-auto px-5 md:px-10 flex justify-between items-center">
        <div className="navbar-logo">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')} className="flex items-center transition-transform duration-400 ease-premium hover:scale-105">
            <img 
              src={logoImg} 
              alt="ARA Coffee" 
              className={`w-auto transition-[max-height] duration-400 ease-in-out drop-shadow-[0_2px_10px_rgba(196,164,132,0.15)] ${
                isScrolled ? 'max-h-[35px]' : 'max-h-[40px]'
              }`}
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links hidden md:flex list-none gap-10 m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="relative py-[5px] font-sans text-[0.9rem] font-medium text-coffee-cream uppercase tracking-[0.15em] no-underline transition-all duration-300 hover:text-coffee-accent hover:drop-shadow-[0_0_8px_rgba(196,164,132,0.4)] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-coffee-accent after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-premium hover:after:scale-x-100 hover:after:origin-left"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu Icon */}
        <div 
          className={`hamburger md:hidden flex flex-col gap-[6px] cursor-pointer z-[101] ${
            isMobileMenuOpen ? 'open' : ''
          }`} 
          onClick={toggleMobileMenu}
        >
          <span className={`w-[28px] h-[2px] rounded-[2px] transition-all duration-400 ease-premium ${
            isMobileMenuOpen ? 'translate-y-[8px] rotate-45 bg-coffee-accent shadow-[0_0_8px_rgba(196,164,132,0.6)]' : 'bg-coffee-cream'
          }`}></span>
          <span className={`w-[28px] h-[2px] rounded-[2px] transition-all duration-400 ease-premium ${
            isMobileMenuOpen ? 'opacity-0 translate-x-[10px]' : 'bg-coffee-cream'
          }`}></span>
          <span className={`w-[28px] h-[2px] rounded-[2px] transition-all duration-400 ease-premium ${
            isMobileMenuOpen ? '-translate-y-[8px] -rotate-45 bg-coffee-accent shadow-[0_0_8px_rgba(196,164,132,0.6)]' : 'bg-coffee-cream'
          }`}></span>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer fixed top-0 w-full h-screen bg-coffee-darker/[0.98] backdrop-blur-[20px] flex justify-center items-center transition-[right] duration-600 ease-premium z-[99] ${
        isMobileMenuOpen ? 'right-0' : '-right-full'
      }`}>
        <ul className="mobile-nav-links list-none text-center p-0">
          {navLinks.map((link, index) => (
            <li 
              key={link.name}
              className={`my-[35px] transition-all duration-400 ease-out ${
                isMobileMenuOpen 
                  ? `translate-y-0 opacity-100 ${delays[index]}` 
                  : 'translate-y-[20px] opacity-0'
              }`}
            >
              <a 
                href={link.href} 
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="font-serif text-[2.5rem] text-coffee-cream no-underline inline-block transition-all duration-300 hover:text-coffee-accent hover:-skew-x-5 hover:scale-[1.05] hover:drop-shadow-[0_0_12px_rgba(196,164,132,0.5)]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
