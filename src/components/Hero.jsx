import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';
import foto5 from '/FOTO5.jpeg';
import PrimaryButton from './PrimaryButton';

const Hero = ({ onOpenInvitation }) => {
  const [searchParams] = useSearchParams();
  const [guestName, setGuestName] = useState('');
  const [isHovered, setIsHovered] = useState(false);

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
    if (onOpenInvitation) {
      onOpenInvitation();
    }
    // Tambahkan sedikit delay agar state overflow-hidden dihilangkan sebelum scrolling
    setTimeout(() => {
      document.getElementById('invitation-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="hero-section" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-cream-100">
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
      <div className="absolute inset-6 md:inset-10 z-10 border-[1.5px] border-[#C3A365]/70 rounded-[100px_100px_20px_20px] md:rounded-t-[200px] pointer-events-none animate-border-glow">
         <div className="absolute inset-2 border-[1px] border-[#C3A365]/40 rounded-[92px_92px_12px_12px] md:rounded-t-[192px] pointer-events-none animate-border-glow animate-border-glow-delayed"></div>
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
        <div className="mb-6 flex flex-col items-center drop-shadow-xl relative" style={{ lineHeight: 1 }}>
          <p
            data-aos="name-reveal" data-aos-duration="1500" data-aos-delay="200"
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.1 }}
            className="text-8xl md:text-[10rem] text-white block animate-neon-text delay-700"
            data-text="Tenry"
          >
            Tenry
          </p>
          <p
            data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="1000"
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}
            className="text-6xl md:text-8xl text-[#FFD97D] block py-1"
          >
            &
          </p>
          <p
            data-aos="name-reveal" data-aos-duration="1500" data-aos-delay="1300"
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.1 }}
            className="text-8xl md:text-[10rem] text-white block animate-neon-text delay-1000"
            data-text="Palli"
          >
            Palli
          </p>
        </div>

        <div className="drop-shadow-sm" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2200">
          <p className="font-sans text-white mb-1 text-base md:text-lg drop-shadow-md">
            Kepada Yang Terhormat
          </p>
          <div className="font-sans text-white mb-8 text-base md:text-lg font-bold drop-shadow-md min-h-[1.75rem]">
            {guestName !== undefined && (
              <TypeAnimation
                key={guestName || 'Tamu Undangan'}
                sequence={[
                  500, // wait before typing
                  guestName || 'Tamu Undangan',
                ]}
                wrapper="span"
                speed={40}
                cursor={true}
                repeat={0}
              />
            )}
          </div>
          <div 
            className="flex flex-col items-center justify-center mt-8 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <PrimaryButton className="animate-button-glow" onClick={() => { setIsHovered(true); openInvitation(); }}>
              <div className="flex items-center justify-center gap-2">
                <div className="relative w-5 h-5 flex items-center justify-center overflow-visible">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isHovered ? (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0, scale: 0.5, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MailOpen size={20} strokeWidth={2} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="closed"
                        initial={{ opacity: 0, scale: 0.5, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail size={20} strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
