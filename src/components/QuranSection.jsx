import React from "react";

import LiquidChrome from "./LiquidChrome";
import flower3 from "../assets/img/flower3.webp";
import flower2 from "../assets/img/flower2.webp";
import flower6 from "../assets/img/flower6.webp";

const QuranSection = () => {
  return (
    <section
      id="quran-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── LiquidChrome Background ── */}
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          speed={0.2}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={3}
          interactive={true}
        />
      </div>

      {/* ── Overlay tipis agar teks lebih terbaca ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(255,245,240,0.35)" }}
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
        src={flower3}
        alt=""
        className="absolute -top-16 -left-16 md:-top-20 md:-left-20 w-48 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
      />

      {/* ── Bunga Kanan Bawah ── */}
      <img
        src={flower3}
        alt=""
        className="absolute -bottom-16 -right-16 md:-bottom-20 md:-right-20 w-48 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: "rotate(180deg)" }}
      />

      {/* ── Bunga Kanan Atas ── */}
      <img 
        src={flower6} 
        alt="" 
        className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-48 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleX(-1)' }}
      />

      {/* ── Bunga Kiri Bawah ── */}
      <img 
        src={flower6} 
        alt="" 
        className="absolute -bottom-16 -left-16 md:-bottom-20 md:-left-20 w-48 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleY(-1)' }}
      />

      {/* ── Konten ── */}
      <div className="relative z-20 max-w-2xl mx-auto px-8 flex flex-col items-center text-center">
        {/* Ornamen Atas pengganti ikon Flower2 */}
        <div
          className="mb-8 flex justify-center"
          data-aos="fade-down"
          data-aos-duration="1200"
        >
          <p
            className="text-[#C3A365] text-[clamp(1.5rem,3vw,2rem)]"
            style={{
              fontFamily: '"Amiri", "Traditional Arabic", serif',
              textShadow: "0 1px 3px rgba(195,163,101,0.3)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </p>
        </div>

        {/* Teks Arab */}
        <p
          className="text-[#6b3a3a] leading-loose mb-6 font-bold"
          style={{
            fontFamily: '"Amiri", "Traditional Arabic", serif',
            fontSize: "clamp(1.6rem, 4.5vw, 2.5rem)",
            direction: "rtl",
            textShadow: "0 1px 4px rgba(255,255,255,0.8)",
          }}
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ
          إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
        </p>

        {/* Garis pemisah */}
        <div
          className="flex items-center gap-4 w-full max-w-xs mb-6"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <span className="flex-1 h-px bg-[#C3A365]/60" />
          <span className="text-[#C3A365] text-2xl">۞</span>
          <span className="flex-1 h-px bg-[#C3A365]/60" />
        </div>

        {/* Terjemahan */}
        <p
          className="font-serif italic text-[#4a3020]/90 leading-relaxed mb-8"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            textShadow: "0 1px 6px rgba(255,255,255,0.9)",
          }}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
          dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
          kasih dan sayang."
        </p>

        {/* Sumber ayat */}
        <div
          className="flex items-center gap-3"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <span className="h-px w-10 bg-[#C3A365]/70" />
          <p
            className="font-serif font-bold text-[#C3A365] tracking-widest uppercase"
            style={{ fontSize: "clamp(0.75rem, 1.8vw, 0.95rem)" }}
          >
            Qs. Ar-Rum&nbsp;21
          </p>
          <span className="h-px w-10 bg-[#C3A365]/70" />
        </div>
      </div>
    </section>
  );
};

export default QuranSection;
