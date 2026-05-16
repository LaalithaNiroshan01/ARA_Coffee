import React from 'react';
import './Marquee.css';

const Marquee = ({ text, speed = 20 }) => {
  return (
    <div className="marquee-container">
      <div className="marquee-content" style={{ animationDuration: `${speed}s` }}>
        {Array(10).fill(0).map((_, i) => (
          <span key={i}>{text} &nbsp; • &nbsp; </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
