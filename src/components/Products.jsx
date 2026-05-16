import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Products.css';

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

  const titleText = "Our Blends";

  return (
    <section id="products" className="products-section" ref={sectionRef}>
      <div className="products-bg-glow"></div>
      
      <div className="products-header">
        <h2 className="products-title" ref={titleRef}>
          {titleText.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>
        <div className="title-line"></div>
      </div>

      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay"></div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <p className="product-price">{product.price}</p>
                <button className="read-more-btn">
                  Explore
                  <span className="btn-arrow">→</span>
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

