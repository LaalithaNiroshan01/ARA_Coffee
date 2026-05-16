import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';
import logoImg from '../images/Logo.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footerElements = gsap.utils.toArray('.footer-animate');
      const footerLinks = gsap.utils.toArray('.footer-links li');

      // Main elements entrance

      gsap.fromTo(footerElements,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Links stagger animation
      gsap.fromTo(footerLinks,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Social icons magnetic hover effect
      const icons = document.querySelectorAll('.social-icon-placeholder');
      icons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
          const rect = icon.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(icon, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        icon.addEventListener('mouseleave', () => {
          gsap.to(icon, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-container">

        {/* Column 1: Brand */}
        <div className="footer-column footer-brand footer-animate">
          <a href="#home" className="footer-logo">
            <img src={logoImg} alt="ARA Coffee" />
          </a>
          <p className="footer-tagline">Crafting moments, one bean at a time. Every cup tells a story of dedication, and passion.</p>
          <div className="social-icons">
            <div className="social-icon-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div className="social-icon-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div className="social-icon-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column footer-links footer-animate">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#story">Story</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className="footer-column footer-newsletter footer-animate">
          <h4 className="footer-heading">Stay Updated</h4>
          <p className="newsletter-text">Join our newsletter for the latest roasts and exclusive offers.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom footer-animate">
        <p>&copy; {new Date().getFullYear()} ARA Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
