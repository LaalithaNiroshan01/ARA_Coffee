import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroVideo from '../video/hero.mp4';

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
    <section className="hero relative w-full h-screen flex items-center justify-center overflow-hidden bg-coffee-dark" ref={heroRef}>
      <div className="hero-bg absolute top-0 left-0 w-[110%] h-[110%] bg-coffee-dark z-0" ref={bgRef}>
        <video
          className="hero-video w-full h-full object-cover absolute top-0 left-0"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        ></video>
        {/* Dark Espresso Base Overlay */}
        <div className="hero-overlay absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(30,15,5,0.55)_50%,rgba(7,4,3,0.97)_100%)] z-[1]"></div>
        {/* Warm Coffee Tint */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(14,9,7,0.35)] z-[2]"></div>
      </div>

      <div className="hero-content relative z-10 text-center px-[5vw] -mt-[8vh] pointer-events-none" ref={contentRef}>
        <h1 className="hero-title font-serif text-[clamp(4rem,15vw,12rem)] font-black text-coffee-cream leading-[0.85] mb-10 uppercase tracking-[-0.04em] drop-shadow-[0_4px_15px_rgba(7,4,3,0.8)]" ref={titleRef}>
          {titleLines.map((line, i) => (
            <div key={i} className="line-wrapper overflow-hidden flex justify-center gap-[0.3em]">
              {line.split(" ").map((word, j) => (
                <span key={j} className="word-wrapper overflow-hidden inline-block">
                  <span className="word inline-block">{word}</span>
                </span>
              ))}
            </div>
          ))}
        </h1>
        <div className="hero-subtitle-container flex items-center justify-center gap-5">
          <span className="line hidden lg:block w-[50px] h-[1px] bg-coffee-accent opacity-50"></span>
          <p className="hero-subtitle font-sans text-[clamp(0.8rem,1.5vw,1.2rem)] text-coffee-cream opacity-75 tracking-[0.2em] uppercase font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" ref={subtitleRef}>
            Premium artisan coffee, ethically sourced
          </p>
          <span className="line hidden lg:block w-[50px] h-[1px] bg-coffee-accent opacity-50"></span>
        </div>
      </div>

      <div className="scroll-indicator-wrapper flex [@media(max-height:650px)]:hidden absolute bottom-0 left-0 w-full h-[150px] justify-center items-end pb-10 z-10 pointer-events-none">
        <div className="scroll-indicator flex flex-col items-center gap-[12px]" ref={scrollRef}>
          <span className="scroll-text font-sans text-[0.7rem] uppercase tracking-[0.3em] text-coffee-cream opacity-60">Explore</span>
          {/* Glowing Golden Line */}
          <div className="scroll-line w-[1px] h-[60px] bg-coffee-accent/20 relative overflow-hidden">
            <div className="scroll-fill absolute top-0 left-0 w-full h-full bg-coffee-gold shadow-[0_0_8px_#D4AF37] -translate-y-full animate-scroll-fill"></div>
          </div>
          {/* Bouncing Chevron Arrow */}
          <svg
            className="w-[16px] h-[16px] text-coffee-accent animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
