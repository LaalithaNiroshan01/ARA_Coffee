import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.product-card');
      const titleChars = titleRef.current.querySelectorAll('.char');

      // Title Animation
      gsap.fromTo(titleChars, 
        { y: 50, opacity: 0, rotateX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1, 
          stagger: 0.05, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.products-header',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      // Cards Entrance
      gsap.fromTo(cards, 
        { 
          y: 150, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      // Parallax effect on middle card for asymmetrical premium feel
      if (window.innerWidth > 1024) {
        gsap.to(cards[1], {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const productsData = [
    {
      id: 1,
      name: "Ethiopian Sunrise",
      description: "Bright and floral with notes of jasmine and bergamot. A perfect morning companion.",
      price: "$18.00",
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      name: "Colombian Reserve",
      description: "Rich chocolate and caramel flavors with a smooth, nutty finish. Medium roast.",
      price: "$22.00",
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      name: "Sumatra Dark",
      description: "Earthy and bold with a heavy body and hints of dark spice. A true classic.",
      price: "$20.00",
      image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const titleText = "Our Blends";

  return (
    <section id="products" className="products-section py-[150px] px-[5vw] bg-coffee-dark relative overflow-hidden" ref={sectionRef}>
      {/* Rich Warm Gold Radial Spotlight */}
      <div className="products-bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(196,164,132,0.12)_0%,transparent_75%)] rounded-full pointer-events-none z-0"></div>
      
      <div className="products-header text-center mb-[120px] relative z-10">
        <h2 className="products-title font-serif text-[clamp(3.5rem,6vw,5rem)] font-black uppercase mb-6 tracking-tight text-coffee-cream drop-shadow-[0_2px_20px_rgba(196,164,132,0.2)]" ref={titleRef}>
          {titleText.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        {/* Gold Accent Divider */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-[60px] h-[1px] bg-coffee-accent/50"></div>
          <div className="w-[8px] h-[8px] rounded-full bg-coffee-accent shadow-[0_0_10px_rgba(196,164,132,0.8)]"></div>
          <div className="w-[60px] h-[1px] bg-coffee-accent/50"></div>
        </div>
      </div>

      <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto relative z-10">
        {productsData.map((product) => (
          <div 
            key={product.id} 
            onMouseMove={handleCardMouseMove}
            className="product-card group relative bg-coffee-warm/40 border border-coffee-accent/15 rounded-[6px] overflow-hidden flex flex-col backdrop-blur-[10px] transition-all duration-500 ease-premium hover:-translate-y-[15px] hover:scale-[1.02] hover:shadow-[0_30px_60px_rgba(7,4,3,0.75),0_0_25px_rgba(196,164,132,0.18)] hover:border-coffee-accent/40"
          >
            {/* Dynamic Spotlight Glassmorphic Light Reflection */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
              style={{
                background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(196, 164, 132, 0.15), transparent 80%)`
              }}
            />
            {/* Overlay gradient reflections */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-0 transition-opacity duration-500 pointer-events-none z-[2] group-hover:opacity-100"></div>
            
            <div className="product-image-container w-full aspect-square overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[800ms] ease-premium group-hover:scale-110 group-hover:rotate-1" />
              <div className="product-overlay absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_40%,rgba(14,10,6,0.95)_100%)] pointer-events-none"></div>
            </div>
            
            <div className="product-info p-[30px] pt-10 flex flex-col flex-1 -mt-10 md:-mt-[60px] relative z-30">
              <h3 className="product-name font-serif text-[2.2rem] text-coffee-cream mb-[15px] font-bold tracking-tight">{product.name}</h3>
              <p className="product-description font-sans text-[0.95rem] text-coffee-cream opacity-75 leading-[1.7] mb-[30px] flex-1">{product.description}</p>
              <div className="product-footer flex justify-between items-center border-t border-coffee-cream/10 pt-5">
                <p className="product-price font-sans text-[1.4rem] text-coffee-accent font-semibold">{product.price}</p>
                <button className="read-more-btn group/btn bg-transparent border-none text-coffee-cream font-sans text-[0.85rem] uppercase tracking-[0.2em] cursor-pointer flex items-center gap-[10px] transition-colors duration-300 p-0 hover:text-coffee-accent">
                  Explore
                  <span className="btn-arrow transition-transform duration-300 text-[1.2rem] text-coffee-accent group-hover/btn:translate-x-2">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
