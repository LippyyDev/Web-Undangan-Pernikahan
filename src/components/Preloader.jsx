import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ guestName }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 2500; // Sesuai dengan delay Promise di App.jsx
    let animationFrame;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const percentage = Math.min((progressTime / duration) * 100, 100);
      
      // Easing out function agar mulainya cepat namun melambat di akhir (smooth ease-out)
      const easeOutQuart = 1 - Math.pow(1 - percentage / 100, 4);
      setProgress(Math.floor(easeOutQuart * 100));
      
      if (progressTime < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#0a0806', // Deep elegant dark brown/black
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Noise background untuk tekstur premium */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundSize: '150px 150px',
        }}
      />
      
      {/* Glowing aura di tengah */}
      <motion.div 
        className="absolute w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(195,163,101,0.12) 0%, rgba(195,163,101,0) 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-8 pt-10">
        
        {/* Minimalist Infinity / Love Loop Animation */}
        <div className="mb-12 relative flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 80 80" className="overflow-visible">
              {/* Jalur track transparan */}
              <path
                d="M 20,40 C 20,20 40,20 40,40 C 40,60 60,60 60,40 C 60,20 40,20 40,40 C 40,60 20,60 20,40 Z"
                fill="none"
                stroke="rgba(195,163,101,0.1)"
                strokeWidth="1"
              />
              {/* Jalur emas menyala berjalan */}
              <motion.path
                d="M 20,40 C 20,20 40,20 40,40 C 40,60 60,60 60,40 C 60,20 40,20 40,40 C 40,60 20,60 20,40 Z"
                fill="none"
                stroke="#C3A365"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                style={{ filter: 'drop-shadow(0px 0px 8px rgba(195,163,101,0.5))' }}
              />
            </svg>
        </div>

        {/* Tipografi Eksklusif */}
        <motion.div
           initial={{ opacity: 0, y: 15 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="flex flex-col items-center gap-2 mb-8"
        >
          <h2 
            className="text-6xl md:text-7xl text-transparent bg-clip-text pt-4 pb-2 -mt-4 pl-2" 
            style={{ 
              fontFamily: "'Great Vibes', cursive", 
              backgroundImage: 'linear-gradient(to right, #d4a373, #faedcd, #d4a373)',
              WebkitBackgroundClip: 'text',
              backgroundSize: '200% auto',
              lineHeight: '1.2'
            }}
          >
            Tenry & Palli
          </h2>
          <motion.div 
            className="flex items-center gap-4 mt-1"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C3A365]/50" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#C3A365]/70 font-medium">
              Wedding Invitation
            </p>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C3A365]/50" />
          </motion.div>
        </motion.div>

        {/* Teks Selamat Datang (Guest Name) */}
        <AnimatePresence>
          {guestName && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center mb-10 text-center"
            >
              <span className="text-[#C3A365]/80 text-xs tracking-[0.25em] uppercase mb-1.5 font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </span>
              <span className="text-2xl md:text-3xl text-[#d4a373] font-bold uppercase tracking-widest">
                {guestName}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        {!guestName && (
          <div className="mb-10 h-[64px]" /> // Spacer if guestName hasn't loaded yet to prevent layout shift
        )}

        {/* Aksen persentase yang minimalis */}
        <div className="flex flex-col items-center">
            {/* Garis rambut vertikal menanjak */}
            <div className="w-[2px] h-16 relative mb-6 opacity-80 decoration-transparent">
              <div className="absolute inset-0 bg-white/5" />
              <motion.div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-[#C3A365] to-[#fcebb6]"
                initial={{ height: '0%' }}
                animate={{ height: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
                style={{ filter: 'drop-shadow(0 0 4px rgba(195,163,101,0.5))' }}
              />
            </div>
            
            <motion.div 
               className="text-base uppercase font-mono tracking-[0.4em] text-[#C3A365]/60"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <span className="opacity-0">-</span>
                <span className="min-w-[45px] text-center">{progress === 100 ? '100' : progress}%</span>
                <span className="opacity-0">-</span>
              </div>
            </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Preloader;
