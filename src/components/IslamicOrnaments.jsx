import React from 'react';

export const Lantern = ({ className, style }) => (
  <svg 
    className={`animate-sway-lantern ${className || ''}`} 
    style={style}
    viewBox="0 0 100 250" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rantai */}
    <path d="M50 0 V60" stroke="#C3A365" strokeWidth="2" strokeDasharray="6 4" />
    
    {/* Ring atas */}
    <circle cx="50" cy="65" r="5" stroke="#C3A365" strokeWidth="2" />
    
    {/* Atap atas */}
    <path d="M50 70 L30 90 H70 Z" fill="#C3A365" />
    <path d="M35 90 L20 110 H80 L65 90" fill="#C3A365" fillOpacity="0.4" />
    <rect x="20" y="110" width="60" height="5" fill="#C3A365" />
    
    {/* Badan Kaca */}
    <path d="M25 115 L15 170 H85 L75 115 Z" stroke="#C3A365" strokeWidth="3" fill="rgba(255,255,255,0.2)" />
    <path d="M50 115 V170" stroke="#C3A365" strokeWidth="1.5" />
    <path d="M37.5 115 L30 170" stroke="#C3A365" strokeWidth="1" />
    <path d="M62.5 115 L70 170" stroke="#C3A365" strokeWidth="1" />
    
    {/* Cahaya Dalam */}
    <circle cx="50" cy="142" r="15" fill="#fff3cd" filter="blur(6px)" opacity="0.8" />
    <circle cx="50" cy="142" r="6" fill="#ffffff" filter="blur(2px)" />
    
    {/* Dasar */}
    <rect x="15" y="170" width="70" height="8" fill="#C3A365" />
    <path d="M25 178 L35 195 H65 L75 178 Z" fill="#C3A365" />
    
    {/* Tangkai Bandul */}
    <path d="M50 195 V205" stroke="#C3A365" strokeWidth="2" />
    <circle cx="50" cy="205" r="4" fill="#C3A365" />
    
    {/* Rumbai */}
    <path d="M50 209 L45 230 H55 Z" fill="#C3A365" opacity="0.8" />
  </svg>
);

export const CrescentStar = ({ className, style }) => (
  <svg 
    className={className} 
    style={style}
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Cahaya (Glow) di belakang */}
    <circle cx="65" cy="35" r="25" fill="#fff3cd" opacity="0.4" filter="blur(15px)" />
    
    {/* Bulan Sabit */}
    <path d="M85 50 C85 75 65 95 40 95 C25 95 12 86 5 73 C20 80 38 78 50 66 C62 54 64 36 57 21 C73 26 85 40 85 50 Z" fill="#C3A365" opacity="0.9"/>
    
    {/* Bintang Utama */}
    <path d="M68 18 L71 28 L81 30 L73 36 L76 46 L68 40 L60 46 L63 36 L55 30 L65 28 Z" fill="#C3A365"/>
    
    {/* Bintang Kecil 1 */}
    <path d="M35 15 L36.5 19 L40.5 19.5 L37.5 22 L38.5 26 L35 23.5 L31.5 26 L32.5 22 L29.5 19.5 L33.5 19 Z" fill="#C3A365" opacity="0.7"/>
    
    {/* Bintang Kecil 2 */}
    <path d="M85 65 L86 68 L89 68.5 L86.5 70.5 L87.5 73.5 L85 71.5 L82.5 73.5 L83.5 70.5 L81 68.5 L84 68 Z" fill="#C3A365" opacity="0.6"/>
  </svg>
);
