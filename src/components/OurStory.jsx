import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import farmImg from '../images/farm-img.png';
import roastImg from '../images/roast-img.png';
import cupImg from '../images/cup-img.png';

gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.story-row');

      rows.forEach((row, index) => {
        const image = row.querySelector('.story-image-container');
        const content = row.querySelector('.story-text-content');
        
        // Entrance animation
        gsap.fromTo(content, 
          { 
            x: index % 2 === 0 ? 100 : -100, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );

        gsap.fromTo(image, 
          { 
            x: index % 2 === 0 ? -100 : 100, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );

        // Parallax effect on images
        gsap.to(image.querySelector('img'), {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const storyData = [
    {
      title: "The Farm",
      description: "Our journey begins in the high-altitude misty mountains, where coffee cherries are hand-picked at their peak of ripeness. We work directly with small-scale farmers who treat every tree with the same passion we bring to every roast.",
      image: farmImg,
      link: "#"
    },
    {
      title: "The Roast",
      description: "Science meets art in our roasting lab. We use a precise, small-batch approach to unlock the unique flavor profile of every bean. Whether it's a bright, floral light roast or a rich, chocolatey dark roast, we aim for perfection.",
      image: roastImg,
      link: "#"
    },
    {
      title: "The Cup",
      description: "The final step of the journey is the one you experience. We believe that a great cup of coffee has the power to transform a moment. Every sip is a testament to the dedication of everyone involved in its creation.",
      image: cupImg,
      link: "#"
    }
  ];

  return (
    <section id="story" className="our-story py-[150px] px-[5vw] bg-coffee-dark overflow-hidden" ref={sectionRef}>
      <div className="story-header text-center mb-[100px]">
        {/* Luxury Gold Metallic Text Gradient */}
        <h2 className="story-main-title font-serif text-[clamp(3rem,8vw,6rem)] font-black uppercase mb-5 bg-gradient-to-r from-coffee-accent via-coffee-cream to-coffee-accent bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(196,164,132,0.15)]">Our Story</h2>
        {/* Glowing Gold Title Line */}
        <div className="title-line w-[100px] h-[2px] bg-gradient-to-r from-transparent via-coffee-accent to-transparent shadow-[0_0_8px_rgba(196,164,132,0.6)] mx-auto"></div>
      </div>

      <div className="story-rows-container flex flex-col gap-[150px] max-w-[1400px] mx-auto">
        {storyData.map((item, index) => (
          <div key={index} className={`story-row group flex flex-col items-center gap-[50px] lg:gap-[100px] text-center lg:text-left ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
            {/* Image container with thin gold border on hover */}
            <div className="story-image-container flex-1 relative w-full lg:w-auto h-[400px] lg:h-[600px] overflow-hidden rounded-[4px] border border-transparent transition-all duration-500 group-hover:border-coffee-accent/30 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
              <img src={item.image} alt={item.title} className="w-full h-[120%] object-cover absolute top-0 left-0" />
              <div className="image-overlay absolute top-0 left-0 w-full h-full bg-[#0E0907]/30 transition-colors duration-300 group-hover:bg-transparent"></div>
            </div>
            
            <div className="story-text-content flex-1 flex flex-col gap-5">
              {/* Premium Gold Metallic Serif Step Number */}
              <span className="step-number font-serif text-[2.2rem] font-bold bg-gradient-to-r from-coffee-gold via-coffee-accent to-coffee-gold bg-clip-text text-transparent tracking-widest">0{index + 1}</span>
              <h3 className="story-title font-serif text-[clamp(2.5rem,4vw,3.5rem)] text-coffee-cream leading-[1.1] font-bold tracking-tight">{item.title}</h3>
              <p className="story-description font-sans text-[1.1rem] leading-[1.8] text-coffee-cream opacity-75 max-w-[500px] lg:mx-0 mx-auto">{item.description}</p>
              <a href={item.link} className="read-more inline-flex items-center gap-[10px] lg:justify-start justify-center text-coffee-cream no-underline font-sans uppercase text-[0.8rem] tracking-[0.2em] mt-5 transition-[gap,color] duration-300 ease-out hover:gap-[20px] hover:text-coffee-accent">
                Read More
                <span className="link-arrow text-[1.2rem] text-coffee-accent">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
