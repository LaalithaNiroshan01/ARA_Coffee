import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const outline = outlineRef.current;
    
    const onMouseMove = (e) => {
      // Dot - fast and precise
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0, // Instant
      });

      // Outline - smooth trailing
      gsap.to(outline, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 1.5 });
      gsap.to(outline, { scale: 0.8 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1 });
      gsap.to(outline, { scale: 1 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Hover effect for interactive elements
    const links = document.querySelectorAll('a, button, .hamburger, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        gsap.to(outline, { 
          scale: 1.8, 
          backgroundColor: 'rgba(229, 225, 216, 0.1)',
          borderColor: 'transparent',
          duration: 0.3 
        });
        gsap.to(cursor, { scale: 0, duration: 0.2 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(outline, { 
          scale: 1, 
          backgroundColor: 'transparent',
          borderColor: 'rgba(229, 225, 216, 0.5)',
          duration: 0.3 
        });
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </>
  );
};

export default CustomCursor;

