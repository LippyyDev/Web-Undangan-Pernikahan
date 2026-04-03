import React, { useRef, useEffect } from 'react';
import Grainient from './Grainient';
import CornerWave from './CornerWave';
import flower4 from '../assets/img/flower4.webp';

const InvitationSection = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // tunggu teks (delay 600ms + durasi 1000ms) baru garis muncul
          setTimeout(() => {
            path.classList.add('line-draw-animate');
          }, 1600);
        } else {
          path.classList.remove('line-draw-animate');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(path.closest('section'));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="invitation-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* ── Wave top right ── */}
      <CornerWave className="absolute top-0 right-0 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 z-[1] select-none pointer-events-none" />
      
      {/* ── Wave bottom left ── */}
      <CornerWave 
        className="absolute bottom-0 left-0 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 z-[1] select-none pointer-events-none" 
        style={{ transform: 'rotate(180deg)' }} 
      />

      {/* ── Bunga kiri atas statis (lebih diujung) ── */}
      <img
        src={flower4}
        alt=""
        className="absolute -top-16 -left-20 md:-top-24 md:-left-28 w-48 md:w-80 lg:w-96 pointer-events-none select-none z-[2]"
      />
      {/* ── Bunga kanan bawah statis (mirror, lebih diujung) ── */}
      <img
        src={flower4}
        alt=""
        className="absolute -bottom-16 -right-20 md:-bottom-24 md:-right-28 w-48 md:w-80 lg:w-96 pointer-events-none select-none z-[2]"
        style={{ transform: 'scale(-1, -1)' }}
      />
      {/* ── Grainient Background yang dikembalikan ── */}
      <div
        className="absolute inset-0 z-0"
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
      >
        <Grainient
          color1="#d9c5c4"
          color2="#dbcecd"
          color3="#ffd1d1"
          timeSpeed={1.7}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      {/* ── Aesthetic Geometric Overlay ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23C3A365' stroke-width='1.5' stroke-opacity='0.25'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23C3A365' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* ── Konten Statis ── */}
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Ornamen atas */}
        <div className="mb-12 flex flex-col items-center gap-2">
          <span className="block w-px h-24 bg-[#C3A365]/50 mx-auto" data-aos="fade-down" data-aos-duration="1000" />
          <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }} data-aos="zoom-in" data-aos-delay="600" data-aos-duration="800">✦</span>
        </div>

        {/* Teks statis bertingkat */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-serif italic text-[#4a3728] text-[clamp(1.6rem,3.5vw,2.5rem)] leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Tanpa mengurangi rasa hormat,
          </p>
          <p className="font-serif italic text-[#4a3728] text-[clamp(1.6rem,3.5vw,2.5rem)] leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            kami bermaksud mengundang
          </p>
          <div className="relative inline-block mt-2">
            <p 
              className="font-serif italic font-semibold text-[#C3A365] text-[clamp(1.8rem,4vw,2.8rem)] leading-relaxed relative z-10"
              style={{ textShadow: '0 0 10px #ffffff, 0 0 20px #ffffff, 0 0 30px #fff3cd, 0 0 40px #fff3cd' }}
              data-aos="zoom-in" data-aos-delay="600"
            >
              bapak / ibu / saudara/i
            </p>
            <svg 
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-4 sm:h-5 md:h-6 z-0 pointer-events-none" 
              viewBox="0 0 100 20" 
              preserveAspectRatio="none"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(195,163,101,0.3))' }}
            >
              <path 
                ref={pathRef}
                d="M 2 15 Q 25 25 50 15 T 98 15" 
                fill="none" 
                stroke="#C3A365" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                pathLength="100"
                className="underline-path"
              />
            </svg>
          </div>
          <p className="font-serif italic text-[#4a3728] text-[clamp(1.6rem,3.5vw,2.5rem)] leading-relaxed mt-2" data-aos="fade-up" data-aos-delay="800">
            untuk hadir pada acara kami.
          </p>
        </div>

        {/* Ornamen bawah */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }} data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="800">✦</span>
          <span className="block w-px h-24 bg-[#C3A365]/50 mx-auto" data-aos="fade-up" data-aos-delay="1200" data-aos-duration="1000" />
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
