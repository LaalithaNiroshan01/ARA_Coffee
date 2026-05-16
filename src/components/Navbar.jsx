import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import './Navbar.css';
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

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} ref={navRef}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>
            <img src={logoImg} alt="ARA Coffee" />
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu Icon */}
        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={(e) => handleSmoothScroll(e, link.href)}>
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
