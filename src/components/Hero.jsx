import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TypeAnimation } from 'react-type-animation';
import foto5 from '/FOTO5.jpeg';
import PrimaryButton from './PrimaryButton';

const Hero = () => {
  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const slug = searchParams.get('to');
    if (!slug) return;

    const fetchGuest = async () => {
      try {
        const q = query(collection(db, 'guests'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setGuestName(snap.docs[0].data().nama);
        }
      } catch (_) {
        // Jika gagal, tetap tampilkan default
      }
    };
    fetchGuest();
  }, [searchParams]);

  const openInvitation = () => {
    document.getElementById('invitation-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cream-100">
      {/* Photo Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={foto5}
          alt="background"
          className="w-full h-full object-cover object-[center_20%]"
          style={{ display: 'block' }}
        />
        {/* Dark overlay agar foto tidak terlalu terang & teks putih kontras */}
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.42)' }} />
      </div>

      {/* Gold Arch Frame Decor */}
      <div className="absolute inset-6 md:inset-10 z-10 border-[1.5px] border-[#C3A365]/70 rounded-[100px_100px_20px_20px] md:rounded-t-[200px] pointer-events-none">
         <div className="absolute inset-2 border-[1px] border-[#C3A365]/40 rounded-[92px_92px_12px_12px] md:rounded-t-[192px] pointer-events-none"></div>
      </div>

      <div className="z-40 text-center max-w-2xl mx-4 relative w-full pt-16">
        <div className="mb-6 flex justify-center drop-shadow-lg" data-aos="fade-up" data-aos-duration="1000">
            <TypeAnimation
              sequence={[
                'THE WEDDING OF',
                1000,
              ]}
              wrapper="p"
              speed={50}
              className="text-white font-sans tracking-widest uppercase text-sm md:text-base text-center"
              cursor={true}
              repeat={0}
            />
        </div>

        {/* Nama mempelai: 3 baris dengan font kaligrafi */}
        <div className="mb-6 flex flex-col items-center drop-shadow-xl relative" style={{ lineHeight: 1 }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
          <p
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            className="text-8xl md:text-[10rem] text-white block"
          >
            Tenry
          </p>
          <p
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
            className="text-6xl md:text-8xl text-[#FFD97D] block py-1"
          >
            &
          </p>
          <p
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.35)' }}
            className="text-8xl md:text-[10rem] text-white block"
          >
            Palli
          </p>
        </div>

        <div className="drop-shadow-sm" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          <p className="font-sans text-white mb-1 text-base md:text-lg drop-shadow-md">
            Kepada Yang Terhormat
          </p>
          <p className="font-sans text-white mb-8 text-base md:text-lg font-bold drop-shadow-md">
            {guestName || 'Tamu Undangan'}
          </p>
          <div className="flex flex-col items-center justify-center mt-8">
            <PrimaryButton onClick={openInvitation}>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
                </svg>
                Buka Undangan
              </div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
