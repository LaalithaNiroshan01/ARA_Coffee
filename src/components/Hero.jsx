import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const words = titleRef.current.querySelectorAll('.word');

      gsap.timeline()
        .fromTo(bgRef.current,
          { scale: 1.2, filter: 'blur(10px)' },
          { scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' }
        )
        .fromTo(words,
          { y: 150, rotate: 10, opacity: 0 },
          { y: 0, rotate: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: 'power4.out' },
          "-=1.5"
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, x: -30 },
          { opacity: 0.6, x: 0, duration: 1, ease: 'power3.out' },
          "-=0.8"
        )
        .fromTo(scrollRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        );
    }, heroRef);

    // Mouse Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(contentRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out'
      });

      gsap.to(bgRef.current, {
        x: -xPos * 0.5,
        y: -yPos * 0.5,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const titleLines = ["From Farm", "to Cup"];

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" ref={bgRef}>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content" ref={contentRef}>
        <h1 className="hero-title" ref={titleRef}>
          {titleLines.map((line, i) => (
            <div key={i} className="line-wrapper">
              {line.split(" ").map((word, j) => (
                <span key={j} className="word-wrapper">
                  <span className="word">{word}</span>
                </span>
              ))}
            </div>
          ))}
        </h1>
        <div className="hero-subtitle-container">
          <span className="line"></span>
          <p className="hero-subtitle" ref={subtitleRef}>
            Premium artisan coffee, ethically sourced
          </p>
          <span className="line"></span>
        </div>
      </div>

      <div className="scroll-indicator" ref={scrollRef}>
        <span className="scroll-text">Explore</span>
        <div className="scroll-line">
          <div className="scroll-fill"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

