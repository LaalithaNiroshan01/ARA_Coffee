import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
            start: 'top 95%',
            toggleActions: 'play reverse play reverse'
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
            start: 'top 100%',
            toggleActions: 'play reverse play reverse'
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
    <footer className="footer bg-coffee-darker text-coffee-cream pt-[100px] px-[5vw] pb-10 border-t border-coffee-accent/20 relative overflow-hidden" ref={footerRef}>
      {/* Warm Golden Bottom Glow */}
      <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-[radial-gradient(ellipse,rgba(196,164,132,0.14)_0%,transparent_75%)] pointer-events-none z-0"></div>

      <div className="footer-container max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.5fr] gap-[50px] md:gap-[60px] mb-20 relative z-10">

        {/* Column 1: Brand */}
        <div className="footer-column footer-brand footer-animate flex flex-col">
          <a href="#home" className="footer-logo inline-block transition-transform duration-400 ease-premium mb-5 hover:scale-[1.05]">
            <img src={logoImg} alt="ARA Coffee" className="max-w-[140px] h-auto block drop-shadow-[0_0_8px_rgba(196,164,132,0.2)]" />
          </a>
          <p className="footer-tagline font-sans text-[1.1rem] opacity-75 mb-[30px]">Crafting moments, one bean at a time. Every cup tells a story of dedication, and passion.</p>
          <div className="social-icons flex gap-[15px]">
            {/* Magnetic Social Icons with glowing gold hover fills */}
            <div className="social-icon-placeholder group/icon w-[45px] h-[45px] border border-coffee-cream/15 rounded-full flex items-center justify-center text-coffee-cream cursor-pointer transition-all duration-400 ease-premium bg-coffee-cream/[0.02] hover:bg-coffee-accent hover:text-[#0E0907] hover:border-coffee-accent hover:shadow-[0_10px_20px_rgba(196,164,132,0.3)]">
              <svg className="transition-transform duration-300 group-hover/icon:scale-110" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </div>
            <div className="social-icon-placeholder group/icon w-[45px] h-[45px] border border-coffee-cream/15 rounded-full flex items-center justify-center text-coffee-cream cursor-pointer transition-all duration-400 ease-premium bg-coffee-cream/[0.02] hover:bg-coffee-accent hover:text-[#0E0907] hover:border-coffee-accent hover:shadow-[0_10px_20px_rgba(196,164,132,0.3)]">
              <svg className="transition-transform duration-300 group-hover/icon:scale-110" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div className="social-icon-placeholder group/icon w-[45px] h-[45px] border border-coffee-cream/15 rounded-full flex items-center justify-center text-coffee-cream cursor-pointer transition-all duration-400 ease-premium bg-coffee-cream/[0.02] hover:bg-coffee-accent hover:text-[#0E0907] hover:border-coffee-accent hover:shadow-[0_10px_20px_rgba(196,164,132,0.3)]">
              <svg className="transition-transform duration-300 group-hover/icon:scale-110" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column footer-links footer-animate flex flex-col">
          <h4 className="footer-heading font-serif text-[1.4rem] mb-[25px] tracking-[0.05em] font-bold text-coffee-accent">Quick Links</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[15px]">
            <li><a href="#home" className="text-coffee-cream no-underline font-sans opacity-75 transition-all duration-300 ease-premium inline-block relative hover:opacity-100 hover:text-coffee-accent hover:translate-x-2 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-coffee-accent after:transition-[width] after:duration-300">Home</a></li>
            <li><a href="#story" className="text-coffee-cream no-underline font-sans opacity-75 transition-all duration-300 ease-premium inline-block relative hover:opacity-100 hover:text-coffee-accent hover:translate-x-2 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-coffee-accent after:transition-[width] after:duration-300">Story</a></li>
            <li><a href="#products" className="text-coffee-cream no-underline font-sans opacity-75 transition-all duration-300 ease-premium inline-block relative hover:opacity-100 hover:text-coffee-accent hover:translate-x-2 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-coffee-accent after:transition-[width] after:duration-300">Products</a></li>
            <li><a href="#contact" className="text-coffee-cream no-underline font-sans opacity-75 transition-all duration-300 ease-premium inline-block relative hover:opacity-100 hover:text-coffee-accent hover:translate-x-2 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-coffee-accent after:transition-[width] after:duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div className="footer-column footer-newsletter footer-animate flex flex-col md:col-span-2 lg:col-span-1">
          <h4 className="footer-heading font-serif text-[1.4rem] mb-[25px] tracking-[0.05em] font-bold text-coffee-accent">Stay Updated</h4>
          <p className="newsletter-text font-sans text-[0.95rem] opacity-75 mb-[25px] leading-[1.6]">Join our newsletter for the latest roasts and exclusive offers.</p>
          <form className="newsletter-form flex flex-col gap-5 relative" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required className="bg-transparent border-none border-b border-coffee-cream/20 py-[15px] px-0 text-coffee-cream font-sans text-[1rem] outline-none transition-all duration-400 focus:border-b-coffee-accent focus:pl-[10px] placeholder-coffee-cream/30 focus:placeholder-opacity-50" />
            <button type="submit" className="group relative bg-transparent border border-coffee-accent text-coffee-cream px-[30px] py-[15px] font-sans font-semibold uppercase tracking-[0.15em] cursor-pointer rounded-[4px] transition-all duration-400 ease-premium md:self-start self-stretch overflow-hidden hover:text-[#0E0907] hover:border-coffee-accent z-10">
              Subscribe
              <div className="absolute top-0 left-0 w-full h-full bg-coffee-accent scale-x-0 origin-right transition-transform duration-400 ease-premium group-hover:scale-x-100 group-hover:origin-left z-[-1]"></div>
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom footer-animate text-center pt-10 border-t border-coffee-cream/10 font-sans text-[0.85rem] opacity-60 relative z-10">
        <p>&copy; {new Date().getFullYear()} ARA Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
