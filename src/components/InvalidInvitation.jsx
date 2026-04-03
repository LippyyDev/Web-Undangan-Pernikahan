import React from 'react';
import { motion } from 'framer-motion';
import { ShieldX, Mail } from 'lucide-react';

const InvalidInvitation = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1a1208 0%, #2a1e10 50%, #1a1208 100%)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Subtle grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* Gold glow center */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(195,163,101,0.07) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-8 max-w-md mx-auto"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'backOut' }}
          className="mx-auto mb-8 w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(185,64,64,0.12)',
            border: '1.5px solid rgba(185,64,64,0.25)',
            boxShadow: '0 0 40px rgba(185,64,64,0.1)',
          }}
        >
          <ShieldX size={40} style={{ color: '#d45c5c' }} />
        </motion.div>

        {/* Ornament line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(195,163,101,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C3A365' }} />
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(195,163,101,0.4))' }} />
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs uppercase tracking-[0.25em] mb-4"
          style={{ color: '#C3A365' }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-3xl font-bold mb-3"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Undangan Tidak Valid
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm leading-relaxed mb-8"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          Tautan undangan ini tidak terdaftar atau sudah tidak berlaku.
          Pastikan kamu menggunakan link yang dikirimkan langsung oleh mempelai.
        </motion.p>

        {/* Ornament bottom */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(195,163,101,0.25))' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(195,163,101,0.5)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(195,163,101,0.8)' }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(195,163,101,0.5)' }} />
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(195,163,101,0.25))' }} />
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="rounded-2xl p-4 flex items-start gap-3 text-left"
          style={{
            background: 'rgba(195,163,101,0.06)',
            border: '1px solid rgba(195,163,101,0.15)',
          }}
        >
          <Mail size={16} className="shrink-0 mt-0.5" style={{ color: '#C3A365' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Jika kamu merasa ini adalah kesalahan, silakan hubungi pengantin
            untuk mendapatkan tautan undangan yang valid.
          </p>
        </motion.div>

        {/* Names - decorative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 text-2xl"
          style={{
            fontFamily: "'Great Vibes', cursive",
            color: 'rgba(195,163,101,0.35)',
          }}
        >
          Tenry & Palli
        </motion.p>
      </motion.div>
    </div>
  );
};

export default InvalidInvitation;
