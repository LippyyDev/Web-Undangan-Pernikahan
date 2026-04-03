import React from 'react';
import { motion } from 'framer-motion';

const ButterflySVG = ({ size = 28, color = '#e991a8' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 22 C20 8, 2 2, 2 14 C2 24, 16 28, 30 22Z" fill={color} fillOpacity="0.9" />
    <path d="M30 22 C40 8, 58 2, 58 14 C58 24, 44 28, 30 22Z" fill={color} fillOpacity="0.9" />
    <path d="M30 24 C18 28, 6 36, 10 42 C14 48, 26 38, 30 24Z" fill={color} fillOpacity="0.75" />
    <path d="M30 24 C42 28, 54 36, 50 42 C46 48, 34 38, 30 24Z" fill={color} fillOpacity="0.75" />
    <ellipse cx="30" cy="23" rx="1.5" ry="8" fill="#7a3f4f" fillOpacity="0.6" />
    <line x1="30" y1="15" x2="24" y2="6" stroke="#7a3f4f" strokeWidth="1" strokeOpacity="0.6" />
    <line x1="30" y1="15" x2="36" y2="6" stroke="#7a3f4f" strokeWidth="1" strokeOpacity="0.6" />
    <circle cx="23.5" cy="5.5" r="1.2" fill="#7a3f4f" fillOpacity="0.6" />
    <circle cx="36.5" cy="5.5" r="1.2" fill="#7a3f4f" fillOpacity="0.6" />
  </svg>
);

// 4 kupu saja: 2 kiri, 2 kanan — sederhana dan tidak ramai
const butterflies = [
  // Sisi kiri
  { id: 1, x: -160, y: -60,  size: 26, color: '#e991a8', dur: 3.8, delay: 0,   rx: [-16, 14, -18, 8],  ry: [-10, 6, -16, 10] },
  { id: 2, x: -140, y:  120, size: 21, color: '#d4688a', dur: 4.5, delay: 0.7, rx: [12, -18, 14, -10],  ry: [-8, 14, -18, 6] },
  // Sisi kanan
  { id: 3, x:  160, y: -70,  size: 24, color: '#d4688a', dur: 4.0, delay: 0.4, rx: [16, -14, 10, -18],  ry: [-10, 14, -12, 8] },
  { id: 4, x:  145, y:  110, size: 20, color: '#f0a9c0', dur: 4.2, delay: 1.1, rx: [-14, 12, -18, 14],  ry: [10, -16, 6, -12] },
];

const Butterfly = ({ x, y, size, color, dur, delay, rx, ry }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: 1,
      x: [...rx, 0],
      y: [...ry, 0],
      rotate: [rx[0] * 0.3, rx[1] * 0.3, rx[2] * 0.3, 0],
    }}
    transition={{
      opacity: { duration: 1.2, delay },
      scale: { duration: 1.2, delay },
      x: { duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut', delay },
      y: { duration: dur, repeat: Infinity, ease: 'easeInOut', delay },
      rotate: { duration: dur * 1.8, repeat: Infinity, ease: 'easeInOut', delay },
    }}
  >
    <motion.div
      animate={{ scaleX: [1, 0.2, 1] }}
      transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{ originX: 0.5 }}
    >
      <ButterflySVG size={size} color={color} />
    </motion.div>
  </motion.div>
);

const Butterflies = () => (
  <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 25 }}>
    {butterflies.map((b) => (
      <Butterfly key={b.id} {...b} />
    ))}
  </div>
);

export default Butterflies;

