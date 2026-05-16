import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurStory.css';
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
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
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
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse'
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
    <section id="story" className="our-story" ref={sectionRef}>
      <div className="story-header">
        <h2 className="story-main-title">Our Story</h2>
        <div className="title-line"></div>
      </div>

      <div className="story-rows-container">
        {storyData.map((item, index) => (
          <div key={index} className={`story-row ${index % 2 !== 0 ? 'row-reverse' : ''}`}>
            <div className="story-image-container">
              <img src={item.image} alt={item.title} />
              <div className="image-overlay"></div>
            </div>
            
            <div className="story-text-content">
              <span className="step-number">0{index + 1}</span>
              <h3 className="story-title">{item.title}</h3>
              <p className="story-description">{item.description}</p>
              <a href={item.link} className="read-more">
                Read More
                <span className="link-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurStory;
