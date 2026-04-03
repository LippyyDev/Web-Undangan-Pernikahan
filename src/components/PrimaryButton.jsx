import React from 'react';


const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#4a3728] hover:bg-[#3d2d21] text-white px-8 py-3 rounded-full font-sans tracking-widest text-sm md:text-base font-semibold shadow-lg transition-colors border border-[#C3A365]/30 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
