import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      const chars = titleRef.current.querySelectorAll('.char');
      gsap.fromTo(chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form Elements Animation
      const formElements = gsap.utils.toArray('.contact-animate');
      gsap.fromTo(formElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Info Elements Animation
      const infoElements = gsap.utils.toArray('.info-animate');
      gsap.fromTo(infoElements,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, contactRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Get in Touch";

  return (
    <section className="contact" id="contact" ref={contactRef}>
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title" ref={titleRef}>
            {titleText.split('').map((char, index) => (
              <span key={index} className="char-wrapper">
                <span className="char">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            ))}
          </h2>
          <p className="contact-subtitle contact-animate">Let's craft your perfect coffee experience.</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group contact-animate">
                <input type="text" id="name" placeholder="Your Name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-group contact-animate">
                <input type="email" id="email" placeholder="Your Email" required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="form-group contact-animate">
                <textarea id="message" rows="4" placeholder="Your Message" required></textarea>
                <label htmlFor="message">Message</label>
              </div>
              <button type="submit" className="submit-btn contact-animate">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info">
            <div className="info-block info-animate">
              <h4>Visit Us</h4>
              <p>123 Coffee Estate Road<br />Nuwara Eliya, Sri Lanka</p>
            </div>
            <div className="info-block info-animate">
              <h4>Contact</h4>
              <p>hello@aracoffee.lk<br />+94 77 123 4567</p>
            </div>
            <div className="info-block info-animate">
              <h4>Opening Hours</h4>
              <p>Mon - Fri: 8am - 6pm<br />Sat - Sun: 9am - 8pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
