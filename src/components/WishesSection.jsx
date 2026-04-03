import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import Grainient from './Grainient';
import CornerWave from './CornerWave';
import flower4 from '../assets/img/flower4.webp';
import { Send, MessageCircleHeart } from 'lucide-react';

/* ─── helpers ─────────────────────────────────────────────── */
const formatDate = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const formatTime = (ts) => {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
};

/* ─── satu slide ucapan ───────────────────────────────────── */
const WishCard = ({ wish }) => (
  <div className="flex flex-col items-center text-center max-w-lg mx-auto px-2">
    <span className="text-[#C3A365] text-3xl mb-4 block">✦</span>
    <p
      className="font-serif italic text-[#4a3020] text-lg md:text-xl leading-relaxed mb-6"
      style={{ textShadow: '0 1px 6px rgba(255,255,255,0.6)' }}
    >
      "{wish.message}"
    </p>
    <div className="flex flex-col items-center gap-1">
      <p className="font-bold text-[#4a3020] text-base md:text-lg uppercase tracking-wider">
        {wish.name}
      </p>
      <p className="text-[#6b3a3a] text-xs font-sans tracking-widest">
        {formatDate(wish.createdAt)} · {formatTime(wish.createdAt)}
      </p>
    </div>
  </div>
);

/* ─── form kirim ucapan ───────────────────────────────────── */
const WishForm = ({ onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'wishes'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp(),
      });
      setName('');
      setMessage('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (err) {
      console.error('Gagal kirim ucapan:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-4"
    >
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          maxLength={100}
          required
          className="w-full px-4 py-3 rounded-xl border border-[#C3A365]/50 bg-white/60 backdrop-blur-sm
                     text-[#4a3020] placeholder-[#9b7b6b] font-serif text-base
                     focus:outline-none focus:border-[#C3A365] focus:bg-white/80 transition-all duration-300
                     shadow-sm"
        />
      </div>

      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan & doa terbaik Anda…"
          maxLength={150}
          required
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[#C3A365]/50 bg-white/60 backdrop-blur-sm
                     text-[#4a3020] placeholder-[#9b7b6b] font-serif text-base resize-none
                     focus:outline-none focus:border-[#C3A365] focus:bg-white/80 transition-all duration-300
                     shadow-sm"
        />
        <span className="absolute bottom-2 right-3 text-[10px] text-[#9b7b6b] font-sans">
          {message.length}/150
        </span>
      </div>

      <button
        type="submit"
        disabled={loading || !name.trim() || !message.trim()}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                   bg-[#C3A365] hover:bg-[#b8934f] disabled:opacity-50 disabled:cursor-not-allowed
                   text-white font-sans font-semibold uppercase tracking-widest text-sm
                   shadow-md transition-colors duration-300 cursor-pointer"
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : sent ? (
          <>
            <MessageCircleHeart size={16} /> Terkirim!
          </>
        ) : (
          <>
            <Send size={16} /> Kirim Ucapan
          </>
        )}
      </button>
    </form>
  );
};

/* ─── WishesSection utama ─────────────────────────────────── */
const WishesSection = () => {
  const [wishes, setWishes] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setWishes(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (wishes.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % wishes.length);
    }, 5000);
    return () => clearInterval(id);
  }, [wishes.length]);

  return (
    <section
      id="wishes-section"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-center"
    >
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

      {/* ── Aesthetic Geometric Overlay ── */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23C3A365' stroke-width='1.5' stroke-opacity='0.25'/%3E%3Ccircle cx='40' cy='40' r='3' fill='%23C3A365' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />

      {/* ── Wave top left ── */}
      <CornerWave 
        className="absolute top-0 left-0 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 z-[1] select-none pointer-events-none" 
        style={{ transform: 'scaleX(-1)' }} 
      />
      
      {/* ── Wave bottom right ── */}
      <CornerWave 
        className="absolute bottom-0 right-0 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 z-[1] select-none pointer-events-none" 
        style={{ transform: 'scaleY(-1)' }} 
      />

      {/* ── Bunga kanan atas statis (lebih diujung) ── */}
      <img
        src={flower4}
        alt=""
        className="absolute -top-16 -right-20 md:-top-24 md:-right-28 w-48 md:w-80 lg:w-96 pointer-events-none select-none z-[2]"
        style={{ transform: 'scaleX(-1)' }}
      />
      {/* ── Bunga kiri bawah statis (mirror, lebih diujung) ── */}
      <img
        src={flower4}
        alt=""
        className="absolute -bottom-16 -left-20 md:-bottom-24 md:-left-28 w-48 md:w-80 lg:w-96 pointer-events-none select-none z-[2]"
        style={{ transform: 'scaleY(-1)' }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center gap-14">
        <div className="text-center" data-aos="fade-down" data-aos-duration="1000">
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="block w-px h-16 bg-[#C3A365]/50 mx-auto" />
            <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }}>✦</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#4a3020] mb-2"
            style={{ fontFamily: 'serif' }}
          >
            Doa & Ucapan
          </h2>
          <p className="font-serif italic text-[#6b3a3a] text-base md:text-lg">
            Sampaikan doa & ucapan terbaik Anda untuk kedua mempelai
          </p>
        </div>

        <div
          className="w-full rounded-2xl border border-[#C3A365]/30 px-6 py-8"
          style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)' }}
          data-aos="fade-up" data-aos-delay="200"
        >
          <WishForm />
        </div>

        <div className="flex items-center gap-4 w-full max-w-xs mx-auto" data-aos="zoom-in" data-aos-delay="300">
          <span className="flex-1 h-px bg-[#C3A365]/50" />
          <span className="text-[#C3A365] text-lg">✦</span>
          <span className="flex-1 h-px bg-[#C3A365]/50" />
        </div>

        <div className="w-full" data-aos="zoom-in" data-aos-delay="400">
          {wishes.length === 0 ? (
            <div className="text-center py-10">
              <p className="font-serif italic text-[#9b7b6b] text-base">
                Belum ada ucapan. Jadilah yang pertama! 💌
              </p>
            </div>
          ) : (
            <div
              className="relative rounded-2xl border border-[#C3A365]/30 px-8 py-10 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)', minHeight: '220px' }}
            >
              <div
                key={wishes[current]?.id ?? current}
                className="transition-opacity duration-500"
              >
                <WishCard wish={wishes[current]} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }}>✦</span>
          <span className="block w-px h-16 bg-[#C3A365]/50 mx-auto" />
        </div>

      </div>
    </section>
  );
};

export default WishesSection;
