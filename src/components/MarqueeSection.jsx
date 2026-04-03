import React from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'spin-slow 15s linear infinite' }}>
    <path d="M12 2C12 2 12 10.5 20.5 12C12 13.5 12 22 12 22C12 22 12 13.5 3.5 12C12 10.5 12 2 12 2Z" fill="currentColor"/>
  </svg>
);

const MarqueeSection = ({ 
  text = 'TENRY & PALLI', 
  textLength,
  bgColor = '#f1d0ca', 
  textColor = '#4a3020' 
}) => {
  const calculatedLength = textLength || (typeof text === 'string' ? text.length : 100);
  const duration = calculatedLength * 7;
  const items = Array(15).fill(text);

  // Setup framer-motion scroll velocity for wind skew effect
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 25, 
    stiffness: 250 
  });
  
  // Transform velocity into a skew degree - moderate amount
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], ["-35deg", "0deg", "35deg"], { clamp: true });

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* Container dinamis sesuai props */}
      <section 
        className="flex w-full py-3 md:py-5 overflow-hidden shadow-sm border-b-2 border-t border-black/5"
        style={{ backgroundColor: bgColor }}
      >
        <div 
          className="flex shrink-0 whitespace-nowrap"
          style={{ animation: `marquee ${duration}s linear infinite`, willChange: 'transform', color: textColor }}
        >
          <motion.div className="flex shrink-0 items-center" style={{ skewX, transformOrigin: 'bottom center' }}>
            {items.map((item, i) => (
              <div key={`m1-${i}`} className="flex items-center shrink-0">
                <SparkleIcon />
                <span className="px-5 md:px-8 text-xl md:text-2xl font-serif tracking-[0.15em]">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <div 
          className="flex shrink-0 whitespace-nowrap" 
          aria-hidden="true"
          style={{ animation: `marquee ${duration}s linear infinite`, willChange: 'transform', color: textColor }}
        >
          <motion.div className="flex shrink-0 items-center" style={{ skewX, transformOrigin: 'bottom center' }}>
            {items.map((item, i) => (
              <div key={`m2-${i}`} className="flex items-center shrink-0">
                <SparkleIcon />
                <span className="px-5 md:px-8 text-xl md:text-2xl font-serif tracking-[0.15em]">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MarqueeSection;
