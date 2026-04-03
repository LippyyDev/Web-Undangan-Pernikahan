import React from 'react';
import Grainient from './Grainient';
import flower5 from '../assets/img/flower5.webp';
import flowerlong1 from '../assets/img/flowerlong1.webp';

const CoupleSection = () => {
  return (
    <section id="couple-section" className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-center">
      {/* ── Grainient Background (from InvitationSection) ── */}
      <div className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
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

      {/* ── Overlay tipis agar teks lebih terbaca jika diperlukan ── */}
      <div className="absolute inset-0 z-[1] bg-white/20" />

      {/* ── Bunga Panjang Atas & Bawah ── */}
      <img 
        src={flowerlong1} 
        alt="" 
        className="absolute -top-6 md:-top-16 lg:-top-20 left-1/2 -translate-x-1/2 -scale-y-100 w-[175%] md:w-full max-w-none h-auto opacity-90 z-0 pointer-events-none drop-shadow-sm" 
      />
      <img 
        src={flowerlong1} 
        alt="" 
        className="absolute -bottom-6 md:-bottom-16 lg:-bottom-20 left-1/2 -translate-x-1/2 w-[175%] md:w-full max-w-none h-auto opacity-90 z-0 pointer-events-none drop-shadow-sm" 
      />

      {/* ── Konten ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full">
        
        {/* Title & Introduction */}
        <div className="mb-16">
          <h2 
            className="text-5xl md:text-6xl text-[#C3A365] mb-4 drop-shadow-sm"
            style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif', fontStyle: 'italic', textShadow: '0 1px 3px rgba(255,255,255,0.7)' }}
            data-aos="fade-down"
          >
            Assalamu'alaikum <br className="md:hidden" /> Wr. Wb.
          </h2>
          <p className="font-serif text-[#4a3728] text-base md:text-lg leading-relaxed max-w-2xl mx-auto drop-shadow-sm font-medium" data-aos="fade-up" data-aos-delay="200">
            Maha suci Allah yang telah menciptakan mahluk-Nya berpasang-pasangan. 
            Ya Allah rahmatilah pernikahan kami :
          </p>
        </div>

        {/* Pasangan */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-8 lg:gap-16 w-full">
          
          {/* Calon 1 */}
          <div className="flex flex-col items-center flex-1 w-full max-w-[260px] mx-auto">
            {/* Image Placeholder Card 1: flower5 top-right & bottom-left */}
            <div className="w-full aspect-[3/4] relative">
              {/* Bunga kanan atas */}
              <img
                src={flower5}
                alt=""
                className="absolute -top-10 -right-10 w-20 pointer-events-none select-none z-10"
                style={{ transform: 'scaleX(-1)' }}
                data-aos="fade-down-left" data-aos-duration="800" data-aos-delay="300"
              />
              {/* Bunga kiri bawah */}
              <img
                src={flower5}
                alt=""
                className="absolute -bottom-10 -left-10 w-20 pointer-events-none select-none z-10"
                style={{ transform: 'scaleY(-1)' }}
                data-aos="fade-up-right" data-aos-duration="800" data-aos-delay="600"
              />
              <div 
                className="w-full h-full mb-6 shadow-lg running-border relative group"
                data-aos="zoom-swipe-left" 
                data-aos-duration="1200"
              >
                <div className="running-border-inner">
                  <img src="/Tenry.webp" alt="Andi Tenry" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <h3 
              className="text-4xl md:text-5xl text-[#C3A365] mt-6 mb-1"
              style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif' }}
              data-aos="name-reveal" data-aos-delay="300"
            >
              Andi Tenry Aulia Armas, S.M
            </h3>
            <p className="font-serif font-semibold text-[#4a3728] text-sm drop-shadow-sm" data-aos="fade-up" data-aos-delay="400">
              Putri Pertama dari Bapak/Ibu<br/>(Alm) Drs. Andi Taufan Armas / Dra. Salma Ismail
            </p>
          </div>

          {/* Divider/Ampersand */}
          <div className="hidden md:flex flex-col justify-center items-center mt-48" data-aos="zoom-in" data-aos-delay="500">
            <span 
              className="text-7xl text-[#ceb076] drop-shadow-sm"
              style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif' }}
            >
              &
            </span>
          </div>
          
          <div 
            className="md:hidden text-7xl text-[#ceb076] drop-shadow-sm my-2 self-center"
            style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif' }}
            data-aos="zoom-in" data-aos-delay="500"
          >
            &
          </div>

          {/* Calon 2 */}
          <div className="flex flex-col items-center flex-1 w-full max-w-[260px] mx-auto md:mt-16">
            {/* Image Placeholder Card 2: flower5 top-left & bottom-right (flip) */}
            <div className="w-full aspect-[3/4] relative">
              {/* Bunga kiri atas (flip horizontal) */}
              <img
                src={flower5}
                alt=""
                className="absolute -top-10 -left-10 w-20 pointer-events-none select-none z-10"
                data-aos="fade-down-right" data-aos-duration="800" data-aos-delay="500"
              />
              {/* Bunga kanan bawah (flip vertikal + horizontal) */}
              <img
                src={flower5}
                alt=""
                className="absolute -bottom-10 -right-10 w-20 pointer-events-none select-none z-10"
                style={{ transform: 'scale(-1, -1)' }}
                data-aos="fade-up-left" data-aos-duration="800" data-aos-delay="800"
              />
              <div 
                className="w-full h-full mb-6 shadow-lg running-border relative group"
                data-aos="zoom-swipe-right" 
                data-aos-duration="1200" 
                data-aos-delay="200"
              >
                <div className="running-border-inner">
                  <img src="/Palli.webp" alt="Pallira Yasser" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <h3 
              className="text-4xl md:text-5xl text-[#C3A365] mt-6 mb-1"
              style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif' }}
              data-aos="name-reveal" data-aos-delay="400"
            >
              Pallira Yasser, S.Tr.Pel
            </h3>
            <p className="font-serif font-semibold text-[#4a3728] text-sm drop-shadow-sm" data-aos="fade-up" data-aos-delay="500">
              Putra Pertama dari Bapak/Ibu<br/>H. Yasser Aslan Tjanring / Hj. Nurhayati
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
