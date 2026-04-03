import React from 'react';

const CornerWave = ({ className, style }) => {
  return (
    <svg 
      className={className} 
      style={style} 
      viewBox="0 0 100 100" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff0f0" />
          <stop offset="100%" stopColor="#ffd1d1" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd1d1" />
          <stop offset="100%" stopColor="#ffb3b3" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb3b3" />
          <stop offset="100%" stopColor="#ff8c8c" />
        </linearGradient>
      </defs>
      
      {/* Background/largest wave layer */}
      <path fill="url(#grad1)" opacity="0.9">
        <animate attributeName="d" dur="8s" repeatCount="indefinite" values="
          M100 0 L100 100 C 80 100, 60 70, 50 50 C 40 30, 20 10, 0 0 Z;
          M100 0 L100 100 C 70 90, 55 80, 45 45 C 35 10, 15 5, 0 0 Z;
          M100 0 L100 100 C 80 100, 60 70, 50 50 C 40 30, 20 10, 0 0 Z
        "/>
      </path>
      
      {/* Middle wave layer */}
      <path fill="url(#grad2)" opacity="0.9">
        <animate attributeName="d" dur="6s" repeatCount="indefinite" values="
          M100 0 L100 80 C 75 75, 55 55, 45 40 C 35 25, 15 15, 0 0 Z;
          M100 0 L100 80 C 85 65, 65 45, 50 35 C 35 25, 20 5, 0 0 Z;
          M100 0 L100 80 C 75 75, 55 55, 45 40 C 35 25, 15 15, 0 0 Z
        "/>
      </path>
      
      {/* Foreground/top wave layer */}
      <path fill="url(#grad3)" opacity="0.9">
        <animate attributeName="d" dur="7s" repeatCount="indefinite" values="
          M100 0 L100 55 C 80 50, 65 35, 55 25 C 45 15, 25 10, 0 0 Z;
          M100 0 L100 55 C 85 40, 75 30, 60 20 C 45 10, 30 5, 0 0 Z;
          M100 0 L100 55 C 80 50, 65 35, 55 25 C 45 15, 25 10, 0 0 Z
        "/>
      </path>
    </svg>
  );
};

export default CornerWave;
