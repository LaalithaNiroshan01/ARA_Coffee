import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
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
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
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
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

    }, contactRef);

    return () => ctx.revert();
  }, []);

  const titleText = "Get in Touch";

  return (
    <section className="contact bg-coffee-dark text-coffee-cream py-[120px] px-[5vw] relative" id="contact" ref={contactRef}>
      <div className="contact-container max-w-[1400px] mx-auto">
        <div className="contact-header mb-[80px]">
          <h2 className="contact-title font-serif text-[clamp(3.5rem,8vw,6rem)] font-black mb-6 tracking-tight text-coffee-cream drop-shadow-[0_2px_20px_rgba(196,164,132,0.2)]" ref={titleRef}>
            {titleText.split('').map((char, index) => (
              <span key={index} className="char-wrapper overflow-hidden inline-block">
                <span className="char inline-block origin-bottom">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            ))}
          </h2>
          {/* Gold Accent Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-[60px] h-[1px] bg-coffee-accent/50"></div>
            <div className="w-[8px] h-[8px] rounded-full bg-coffee-accent shadow-[0_0_10px_rgba(196,164,132,0.8)]"></div>
            <div className="w-[60px] h-[1px] bg-coffee-accent/50"></div>
          </div>
          <p className="contact-subtitle contact-animate font-sans text-[clamp(1rem,1.5vw,1.2rem)] opacity-75 tracking-[0.05em]">Let's craft your perfect coffee experience.</p>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-[80px] lg:gap-[100px]">
          <div className="contact-form-container">
            <form className="contact-form flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group relative flex flex-col-reverse group/field contact-animate">
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your Name" 
                  required 
                  className="contact-input peer text-coffee-cream" 
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 text-coffee-cream/40 font-sans text-[1.1rem] transition-all duration-300 ease-in-out pointer-events-none top-[10px] peer-focus:top-[-20px] peer-focus:text-[0.85rem] peer-focus:text-coffee-accent peer-focus:drop-shadow-[0_0_6px_rgba(196,164,132,0.4)] peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[0.85rem] peer-[:not(:placeholder-shown)]:text-coffee-accent"
                >
                  Name
                </label>
              </div>
              <div className="form-group relative flex flex-col-reverse group/field contact-animate">
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your Email" 
                  required 
                  className="contact-input peer text-coffee-cream" 
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 text-coffee-cream/40 font-sans text-[1.1rem] transition-all duration-300 ease-in-out pointer-events-none top-[10px] peer-focus:top-[-20px] peer-focus:text-[0.85rem] peer-focus:text-coffee-accent peer-focus:drop-shadow-[0_0_6px_rgba(196,164,132,0.4)] peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[0.85rem] peer-[:not(:placeholder-shown)]:text-coffee-accent"
                >
                  Email
                </label>
              </div>
              <div className="form-group relative flex flex-col-reverse group/field contact-animate">
                <textarea 
                  id="message" 
                  rows="4" 
                  placeholder="Your Message" 
                  required 
                  className="contact-input peer text-coffee-cream"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 text-coffee-cream/40 font-sans text-[1.1rem] transition-all duration-300 ease-in-out pointer-events-none top-[10px] peer-focus:top-[-20px] peer-focus:text-[0.85rem] peer-focus:text-coffee-accent peer-focus:drop-shadow-[0_0_6px_rgba(196,164,132,0.4)] peer-[:not(:placeholder-shown)]:top-[-20px] peer-[:not(:placeholder-shown)]:text-[0.85rem] peer-[:not(:placeholder-shown)]:text-coffee-accent"
                >
                  Message
                </label>
              </div>
              <button 
                type="submit" 
                className="submit-btn group relative self-start bg-transparent border border-coffee-accent text-coffee-cream px-10 py-[18px] font-sans text-[1rem] font-medium uppercase tracking-[0.15em] cursor-pointer overflow-hidden transition-all duration-400 ease-premium hover:text-[#120C08] hover:border-coffee-accent mt-5 z-10 contact-animate"
              >
                Send Message
                <div className="absolute top-0 left-0 w-full h-full bg-coffee-accent scale-x-0 origin-right transition-transform duration-400 ease-premium group-hover:scale-x-100 group-hover:origin-left z-[-1]"></div>
              </button>
            </form>
          </div>

          {/* Sidebar block with elegant gold borders */}
          <div className="contact-info flex flex-col md:flex-row lg:flex-col md:flex-wrap lg:flex-nowrap md:justify-between lg:justify-start gap-10 lg:gap-[50px] pl-0 lg:pl-[50px] border-t lg:border-t-0 lg:border-l border-coffee-accent/20 pt-[50px] lg:pt-0">
            <div className="info-block info-animate">
              <h4 className="font-serif text-[1.5rem] mb-[15px] text-coffee-accent tracking-[0.05em] font-bold">Visit Us</h4>
              <p className="font-sans text-[1.1rem] leading-[1.6] opacity-75">123 Coffee Estate Road<br />Nuwara Eliya, Sri Lanka</p>
            </div>
            <div className="info-block info-animate">
              <h4 className="font-serif text-[1.5rem] mb-[15px] text-coffee-accent tracking-[0.05em] font-bold">Contact</h4>
              <p className="font-sans text-[1.1rem] leading-[1.6] opacity-75">hello@aracoffee.lk<br />+94 77 123 4567</p>
            </div>
            <div className="info-block info-animate">
              <h4 className="font-serif text-[1.5rem] mb-[15px] text-coffee-accent tracking-[0.05em] font-bold">Opening Hours</h4>
              <p className="font-sans text-[1.1rem] leading-[1.6] opacity-75">Mon - Fri: 8am - 6pm<br />Sat - Sun: 9am - 8pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
