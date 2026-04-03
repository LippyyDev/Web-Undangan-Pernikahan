import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock } from 'lucide-react';
import LiquidChrome from './LiquidChrome';
import flower6 from '../assets/img/flower6.webp';
import flower7 from '../assets/img/flower7.webp';
import flower3 from '../assets/img/flower3.webp';
const TARGET_DATE = new Date('2026-04-18T10:30:00+08:00');

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const CountBox = ({ value, label, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasScrambled, setHasScrambled] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasScrambled) {
        setIsScrambling(true);
        setHasScrambled(true);
        // Scramble durasi dibuat unik per kotak (1000 - 1800ms)
        setTimeout(() => setIsScrambling(false), 1000 + Math.random() * 800);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasScrambled]);

  useEffect(() => {
    if (isScrambling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 99));
      }, 50);
      return () => clearInterval(interval);
    } else {
      setDisplayValue(value);
    }
  }, [isScrambling, value]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span
        className="text-5xl md:text-7xl font-bold text-[#4a3020] leading-none"
        style={{ fontFamily: 'serif', fontVariantNumeric: 'tabular-nums' }}
      >
        {String(displayValue).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#6b3a3a] font-sans mt-2">{label}</span>
    </div>
  );
};

const Divider = () => (
  <div className="flex items-center gap-4 w-full max-w-xs mx-auto my-6">
    <span className="flex-1 h-px bg-[#C3A365]/50" />
    <span className="text-[#C3A365] text-lg">✦</span>
    <span className="flex-1 h-px bg-[#C3A365]/50" />
  </div>
);

// ── Lazy Map Embed: iframe hanya dimuat saat masuk viewport ─────────────────
const LazyMapEmbed = ({ src }) => {
  const wrapRef = useRef(null);
  const [mapSrc, setMapSrc] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      ref={wrapRef}
      className="w-full mt-3 rounded-lg overflow-hidden border border-[#C3A365]/30"
      style={{ height: '160px' }}
    >
      {mapSrc ? (
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Peta Lokasi"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: 'rgba(195,163,101,0.08)' }}
        >
          <span className="text-[#C3A365] text-xs tracking-widest uppercase animate-pulse">Memuat peta…</span>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ delay, title, time, venue, address, mapsUrl, mapsLink, aos, duration }) => (
  <div
    className="flex-1 flex flex-col items-center text-center px-6 py-8 rounded-2xl border border-[#C3A365]/40"
    style={{ 
      background: 'rgba(255,255,255,0.65)', 
      backdropFilter: 'blur(8px)',
      boxShadow: '0 0 40px rgba(195, 163, 101, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.5)'
    }}
    data-aos={aos || "fade-up"}
    data-aos-delay={delay}
    data-aos-duration={duration || 1000}
  >
    <h3 className="text-xl md:text-2xl font-bold text-[#4a3020] tracking-widest uppercase mb-3">
      {title}
    </h3>
    <div className="flex items-center gap-2 text-[#6b3a3a] mb-1">
      <Clock size={16} />
      <span className="font-serif text-base md:text-lg">Pukul {time} WITA</span>
    </div>
    <Divider />
    <p className="font-bold text-[#4a3020] text-base md:text-lg uppercase tracking-wide mb-1">
      {venue}
    </p>
    <div className="flex items-start gap-2 text-[#6b3a3a]">
      <MapPin size={14} className="mt-0.5 shrink-0" />
      {mapsLink ? (
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif italic text-sm md:text-base underline underline-offset-2 decoration-[#C3A365]/60 hover:text-[#C3A365] transition-colors duration-200"
        >
          {address}
        </a>
      ) : (
        <p className="font-serif italic text-sm md:text-base">{address}</p>
      )}
    </div>
    {mapsUrl && <LazyMapEmbed src={mapsUrl} />}
  </div>
);

// ── Lazy Video: hanya load & play saat masuk viewport ──────────────────────
const LazyVideo = ({ src, className }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);   // pasang src → browser mulai download
          observer.disconnect(); // cukup sekali
        }
      },
      { threshold: 0.25 }       // mulai load saat 25% card kelihatan
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Setelah src terpasang, pastikan video langsung play
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {/* autoplay policy – dibiarkan */});
    }
  }, [isVisible]);

  return (
    <video
      ref={videoRef}
      src={isVisible ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
};

const ScheduleSection = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <section
      id="schedule-section"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* ── LiquidChrome Background (same as QuranSection) ── */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          speed={0.2}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={3}
          interactive={true}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'rgba(255,245,240,0.30)' }}
      />

      {/* ── Minimalist Dot Grid Overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23C3A365' fill-opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── Bunga Kiri Atas ── */}
      <img
        src={flower6}
        alt=""
        className="absolute -top-16 -left-16 md:-top-20 md:-left-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
      />

      {/* ── Bunga Kanan Bawah ── */}
      <img
        src={flower6}
        alt=""
        className="absolute -bottom-16 -right-16 md:-bottom-20 md:-right-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: "rotate(180deg)" }}
      />

      {/* ── Bunga Kanan Atas ── */}
      <img 
        src={flower3} 
        alt="" 
        className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleX(-1)' }}
      />

      {/* ── Bunga Kiri Bawah ── */}
      <img 
        src={flower3} 
        alt="" 
        className="absolute -bottom-16 -left-16 md:-bottom-20 md:-left-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleY(-1)' }}
      />

      {/* ── Konten ── */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center w-full">

        {/* Intro */}
        {/* Intro */}
        <div className="mb-10">
          <p 
            className="font-serif italic text-[#6b3a3a] text-lg md:text-xl mb-8 drop-shadow-sm"
            data-aos="fade-down" data-aos-duration="1000"
          >
            yang Insya Allah akan diselenggarakan pada:
          </p>

          {/* Tanggal besar - table-cell vertical-align:middle paling reliable */}
          <div style={{ display: 'table', margin: '0 auto', marginBottom: '0.5rem' }}>
            {/* Kiri: SABTU */}
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'right',
                paddingRight: '1rem',
                fontFamily: 'serif',
                fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                fontWeight: 'bold',
                letterSpacing: '0.15em',
                color: '#4a3020',
              }}
              data-aos="fade-right" data-aos-delay="400" data-aos-duration="1000"
            >
              Sabtu&nbsp;<span style={{ color: '#C3A365' }}>✦</span>
            </span>

            {/* Tengah: 18 */}
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'center',
                fontFamily: 'serif',
                fontSize: 'clamp(5rem, 12vw, 9rem)',
                fontWeight: 'bold',
                lineHeight: 1,
                letterSpacing: '0.1em',
                color: '#C3A365',
              }}
              data-aos="zoom-in-up" data-aos-delay="200" data-aos-duration="1000"
            >
              18
            </span>

            {/* Kanan: 2026 */}
            <span
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'left',
                paddingLeft: '1rem',
                fontFamily: 'serif',
                fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                fontWeight: 'bold',
                letterSpacing: '0.15em',
                color: '#4a3020',
              }}
              data-aos="fade-left" data-aos-delay="400" data-aos-duration="1000"
            >
              <span style={{ color: '#C3A365' }}>✦</span>&nbsp;2026
            </span>
          </div>
          <p 
            className="text-[#6b3a3a] tracking-[0.4em] uppercase text-sm md:text-base font-sans mb-8"
            data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000"
          >
            April
          </p>

          {/* Garis */}
          <div 
            className="flex items-center gap-4 max-w-sm mx-auto mb-10"
            data-aos="zoom-in" data-aos-delay="800" data-aos-duration="1000"
          >
            <span className="flex-1 h-px bg-[#C3A365]/50" />
            <span className="text-[#C3A365]">✦</span>
            <span className="flex-1 h-px bg-[#C3A365]/50" />
          </div>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">

          {/* Akad Nikah — flower7 di luar sudut kanan atas */}
          <div className="relative flex-1">
            <img
              src={flower7}
              alt=""
              className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-14 sm:w-16 md:w-24 pointer-events-none select-none z-10"
              style={{ opacity: 0.95, transform: 'rotate(17deg) scaleX(-1)' }}
            />
            <EventCard
              title="Akad Nikah"
              time="10.30"
              venue="Kediaman Mempelai Wanita"
              address="Jalan H. Agussalim No. 48 Parepare"
              mapsUrl="https://maps.google.com/maps?q=-4.025061,119.626336&z=17&output=embed"
              mapsLink="https://maps.google.com/maps?q=-4.025061,119.626336"
              aos="fade-up"
              delay="1000"
              duration="1500"
            />
          </div>

          {/* Vertical divider */}
          <div className="hidden md:flex items-center">
            <span className="h-full w-px bg-[#C3A365]/30 mx-2" />
          </div>

          {/* Resepsi — flower6 di luar sudut kiri bawah */}
          <div className="relative flex-1">
            <img
              src={flower6}
              alt=""
              className="absolute -bottom-4 -left-6 md:-bottom-4 md:-left-10 w-14 sm:w-16 md:w-24 pointer-events-none select-none z-10"
              style={{ opacity: 0.95, transform: 'scale(1, -1)' }}
            />
            <EventCard
              title="Resepsi"
              time="11.30"
              venue="Gedung Islamic Center Parepare"
              address="Jalan H. Agussalim No. 157, Parepare"
              mapsUrl="https://maps.google.com/maps?q=Gedung+Islamic+Center+Parepare,Sulawesi+Selatan,Indonesia&z=17&output=embed"
              mapsLink="https://maps.google.com/maps?q=Gedung+Islamic+Center+Parepare,Sulawesi+Selatan,Indonesia"
              aos="fade-up"
              delay="1300"
              duration="1500"
            />
          </div>

        </div>

        {/* Video Map Lokasi */}
        <div 
          className="w-full max-w-lg mx-auto mb-12 p-3 rounded-2xl border border-[#C3A365]/40"
          style={{ 
            background: 'rgba(255,255,255,0.65)', 
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 40px rgba(195, 163, 101, 0.25), inset 0 0 20px rgba(255, 255, 255, 0.5)'
          }}
          data-aos="fade-up"
          data-aos-delay="1500"
          data-aos-duration="1500"
        >
          <div className="aspect-video w-full rounded-xl overflow-hidden relative">
            <LazyVideo
              src="/Map.mp4"
              className="w-full h-full object-cover bg-[#f8f5f0]"
            />
          </div>
        </div>

        {/* Countdown */}
        <div data-aos="fade-up" data-aos-delay="600">
          <p className="text-[#6b3a3a] font-sans uppercase tracking-widest text-xs mb-4">
            Menghitung hari
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <CountBox value={days}    label="Hari" />
            <span className="text-[#C3A365] text-4xl md:text-5xl font-bold leading-none pb-5">:</span>
            <CountBox value={hours}   label="Jam" />
            <span className="text-[#C3A365] text-4xl md:text-5xl font-bold leading-none pb-5">:</span>
            <CountBox value={minutes} label="Menit" />
            <span className="text-[#C3A365] text-4xl md:text-5xl font-bold leading-none pb-5">:</span>
            <CountBox value={seconds} label="Detik" />
          </div>
        </div>

        {/* Penutup */}
        <p 
          className="font-serif italic text-[#6b3a3a] text-base md:text-lg mt-10 max-w-2xl mx-auto drop-shadow-sm"
          data-aos="fade-up" data-aos-delay="800"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara(i)
          berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
        </p>
      </div>
    </section>
  );
};

export default ScheduleSection;
