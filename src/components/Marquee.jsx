import React from 'react';

const Marquee = ({ text, speed = 20 }) => {
  return (
    <div className="marquee-container overflow-hidden whitespace-nowrap w-full py-10 bg-transparent border-t border-b border-coffee-cream/5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] -skew-y-1 my-12">
      <div 
        className="marquee-content inline-block animate-marquee" 
        style={{ animationDuration: `${speed}s` }}
      >
        {Array(10).fill(0).map((_, i) => (
          <span 
            key={i} 
            className={`font-serif text-[8vw] font-bold uppercase mr-[2vw] ${
              i % 2 !== 0 
                ? 'text-transparent [-webkit-text-stroke:1px_#E5E1D8] opacity-40' 
                : 'text-coffee-cream opacity-90'
            }`}
          >
            {text} &nbsp; • &nbsp;{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
