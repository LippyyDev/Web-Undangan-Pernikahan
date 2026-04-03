import React, { useState, useEffect } from 'react';
import flower1 from '../assets/img/flower1.webp';

const photos = [
  "/FOTO1.jpeg",
  "/FOTO2.jpeg",
  "/FOTO3.jpeg",
  "/FOTO4.jpeg",
  "/FOTO5.jpeg",
];

// Mobile Layout: 2-1-2 arrangement
const MOBILE_LAYOUT = {
  cardW: 130,
  cardH: 182,
  containerW: 290,
  containerH: 565,
  border: 6,
  slots: [
    { tx: 0,   ty: 0,   rotate: '-8deg',  z: 10 },
    { tx: 155, ty: 20,  rotate:  '6deg',  z: 10 },
    { tx: 75,  ty: 210, rotate: '-2deg',  z: 20 },
    { tx: 0,   ty: 395, rotate:  '7deg',  z: 10 },
    { tx: 155, ty: 375, rotate: '-5deg',  z: 10 },
  ]
};

// Desktop Layout: 5 in a row (fan spread)
const DESKTOP_LAYOUT = {
  cardW: 210,
  cardH: 294,
  containerW: 860,
  containerH: 360,
  border: 8,
  slots: [
    { tx: 0,   ty: 40, rotate: '-12deg', z: 10 },
    { tx: 160, ty: 10, rotate: '-4deg',  z: 20 },
    { tx: 320, ty: 0,  rotate: '2deg',   z: 30 },
    { tx: 480, ty: 10, rotate: '8deg',   z: 20 },
    { tx: 640, ty: 40, rotate: '14deg',  z: 10 },
  ]
};

const StorySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);
  const [isMd, setIsMd] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

  // Responsive check
  useEffect(() => {
    const update = () => setIsMd(window.innerWidth >= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Scroll-lock saat lightbox
  useEffect(() => {
    document.body.style.overflow = selectedPhoto ? 'hidden' : '';
  }, [selectedPhoto]);

  // Auto-shuffle: setiap foto pindah ke slot berikutnya
  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prev => prev.map(slot => (slot + 1) % 5));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const layout = isMd ? DESKTOP_LAYOUT : MOBILE_LAYOUT;

  return (
    <>
      <section id="story-section" className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center" style={{ background: '#fdf6f0' }}>

        {/* Geometric squares background */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.10 }}
        >
          <defs>
            <pattern id="squares-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Kotak besar */}
              <rect x="1" y="1" width="38" height="38" fill="none" stroke="#C3A365" strokeWidth="0.8" />
              {/* Kotak kecil di tengah */}
              <rect x="10" y="10" width="20" height="20" fill="none" stroke="#C3A365" strokeWidth="0.5" />
              {/* Titik sudut */}
              <circle cx="1" cy="1" r="1.2" fill="#C3A365" />
              <circle cx="39" cy="1" r="1.2" fill="#C3A365" />
              <circle cx="1" cy="39" r="1.2" fill="#C3A365" />
              <circle cx="39" cy="39" r="1.2" fill="#C3A365" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#squares-pattern)" />
        </svg>

        {/* Ornamen Bunga Tepi (4 Sudut Ditekan ke Luar) */}
        {/* Kiri Atas */}
        <img 
          src={flower1} 
          alt="" 
          className="absolute -top-10 -left-10 md:-top-16 md:-left-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0 transform rotate-180 -scale-x-100"
        />
        {/* Kanan Atas */}
        <img 
          src={flower1} 
          alt="" 
          className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0 transform -scale-y-100"
        />
        {/* Kiri Bawah */}
        <img 
          src={flower1} 
          alt="" 
          className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0 transform -scale-x-100"
        />
        {/* Kanan Bawah */}
        <img 
          src={flower1} 
          alt="" 
          className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full flex flex-col items-center gap-16 md:gap-24">

          {/* Title + Story Text */}
          <div className="text-center z-10 max-w-3xl">
            <div className="flex items-center justify-center gap-4 mb-8" data-aos="fade-down" data-aos-duration="1000">
              <span className="h-px w-12 bg-[#C3A365]/50" />
              <h2
                className="text-5xl md:text-6xl text-[#C3A365] drop-shadow-sm"
                style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif', fontStyle: 'italic' }}
              >
                Our Story
              </h2>
              <span className="h-px w-12 bg-[#C3A365]/50" />
            </div>
            <div
              className="font-serif text-[#4a3728] text-base md:text-lg leading-relaxed flex flex-col gap-6 px-4"
              data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"
            >
              <p>It all started with a <span data-aos="highlight-underline" className="inline-block font-black text-[#2d1c16]">simple hello</span>, without any plans or expectations. We were just two <span data-aos="highlight-box" className="inline-block font-black text-[#2d1c16]">best friends</span>, sharing stories, laughing at the smallest things, and dreaming about the future.</p>
              <p>Somewhere between the late-night talks and the little things we did for each other, <span data-aos="highlight-underline" className="inline-block font-black text-[#2d1c16]">something changed</span>. Our friendship quietly <span data-aos="highlight-box" className="inline-block font-black text-[#2d1c16]">grew into love</span>.</p>
              <p>Slowly, my best friend became <span data-aos="highlight-underline" className="inline-block font-black text-[#2d1c16]">my home</span>. And now, we're choosing to walk through life together, side by side, <span data-aos="highlight-box" className="inline-block font-black text-[#2d1c16]">forever</span>.</p>
            </div>
          </div>

          {/* Card Area */}
          <div
            className="relative mx-auto"
            style={{ width: layout.containerW, height: layout.containerH, transition: 'width 0.5s, height 0.5s' }}
            data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300"
          >
            {photos.map((src, photoIdx) => {
              const slotIdx = order[photoIdx];
              const slot = layout.slots[slotIdx];
              const isHovered = hoveredPhoto === photoIdx;

              // Semua transform digabung dalam 1 property → GPU komposit, tidak ada jitter
              const transform = isHovered
                ? `translate(${slot.tx}px, ${slot.ty - 22}px) rotate(0deg) scale(1.07)`
                : `translate(${slot.tx}px, ${slot.ty}px) rotate(${slot.rotate})`;

              return (
                // Outer Wrapper khusus untuk AOS supaya CSS transisinya tidak bentrok dengan React inline style
                <div
                  key={photoIdx}
                  data-aos="zoom-out-up"
                  data-aos-duration="1000"
                  data-aos-delay={photoIdx * 150}
                  className="absolute top-0 left-0"
                  style={{
                    width: layout.cardW,
                    height: layout.cardH,
                    zIndex: isHovered ? 60 : slot.z,
                  }}
                >
                  {/* Inner Card khusus untuk Transform Posisi/Shuffle/Hover */}
                  <div
                    onClick={() => setSelectedPhoto(src)}
                    onMouseEnter={() => setHoveredPhoto(photoIdx)}
                    onMouseLeave={() => setHoveredPhoto(null)}
                    style={{
                      width: '100%',
                      height: '100%',
                      transform,
                      transformOrigin: 'center bottom',
                      willChange: 'transform',
                      borderRadius: 12,
                      border: `${layout.border}px solid white`,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: isHovered
                        ? '0 0 60px 12px rgba(195, 163, 101, 0.8), 0 0 20px 4px rgba(255, 255, 255, 0.5)'
                        : '0 0 30px 5px rgba(195, 163, 101, 0.55)',
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease',
                    }}
                  >
                    <img
                      src={src}
                      alt={`Story ${photoIdx + 1}`}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', display: 'block' }}
                    />
                    <div
                      style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)',
                        opacity: isHovered ? 0 : 1,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2d1c16]/90 p-4 md:p-10 cursor-pointer backdrop-blur-sm"
        >
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white bg-white/10 hover:bg-white/30 backdrop-blur w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg border border-white/20 z-10"
            onClick={() => setSelectedPhoto(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={selectedPhoto}
            alt="Preview Besar"
            className="max-w-full max-h-full md:max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border-8 md:border-16 border-white cursor-default bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default StorySection;
