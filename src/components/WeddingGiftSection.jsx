import React, { useState, useEffect } from 'react';
import flower6 from '../assets/img/flower6.webp';

const WeddingGiftSection = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Mencegah background scroll saat popup terbuka
    if (showAccount) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showAccount]);

  const handleCopy = () => {
    navigator.clipboard.writeText("1740006073035");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @keyframes fade-in-backdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pop-up-modal {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-backdrop {
          animation: fade-in-backdrop 0.3s ease-out forwards;
        }
        .animate-popup {
          animation: pop-up-modal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <section id="wedding-gift" className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center" style={{ background: '#fdf6f0' }}>
        
        {/* Geometric squares background */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.10 }}
        >
          <defs>
            <pattern id="squares-pattern-gift" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="38" height="38" fill="none" stroke="#C3A365" strokeWidth="0.8" />
              <rect x="10" y="10" width="20" height="20" fill="none" stroke="#C3A365" strokeWidth="0.5" />
              <circle cx="1" cy="1" r="1.2" fill="#C3A365" />
              <circle cx="39" cy="1" r="1.2" fill="#C3A365" />
              <circle cx="1" cy="39" r="1.2" fill="#C3A365" />
              <circle cx="39" cy="39" r="1.2" fill="#C3A365" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#squares-pattern-gift)" />
        </svg>

        {/* Ornamen Bunga Tepi (4 Sudut Ditekan ke Luar) */}
        {/* Kiri Atas */}
        <img 
          src={flower6} 
          alt="" 
          className="absolute -top-10 -left-10 md:-top-16 md:-left-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0"
        />
        {/* Kanan Atas */}
        <img 
          src={flower6} 
          alt="" 
          className="absolute -top-10 -right-10 md:-top-16 md:-right-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0"
          style={{ transform: 'scaleX(-1)' }}
        />
        {/* Kiri Bawah */}
        <img 
          src={flower6} 
          alt="" 
          className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0"
          style={{ transform: 'scaleY(-1)' }}
        />
        {/* Kanan Bawah */}
        <img 
          src={flower6} 
          alt="" 
          className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-16 w-32 sm:w-40 md:w-64 opacity-85 pointer-events-none z-0"
          style={{ transform: 'rotate(180deg)' }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 w-full flex flex-col items-center text-center gap-8">
          
          {/* Title */}
          <div className="flex flex-col items-center" data-aos="zoom-in" data-aos-duration="1000">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#C3A365]/50" />
              <h2 
                className="text-5xl md:text-6xl text-[#C3A365] drop-shadow-sm"
                style={{ fontFamily: '"Great Vibes", "Dancing Script", cursive, serif', fontStyle: 'italic' }}
              >
                Wedding Gift
              </h2>
              <span className="h-px w-12 bg-[#C3A365]/50" />
            </div>
            
            <p className="font-serif text-[#4a3728] text-base md:text-lg leading-relaxed mt-4 max-w-2xl px-4" data-aos="fade-up" data-aos-delay="200">
              Suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu pada hari bahagia kami.
            </p>
          </div>

          {/* Button */}
          <div data-aos="fade-up" data-aos-delay="400">
            <button 
              onClick={() => setShowAccount(true)}
              className="flex items-center justify-center gap-3 bg-[#1e4620] hover:bg-[#2a5d2c] text-white px-8 py-3 rounded-full border border-white transition-all duration-300 font-medium tracking-wide text-sm md:text-base cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="4" rx="1" />
                <path d="M12 8v13" />
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
              </svg>
              WEDDING GIFT
            </button>
          </div>
        </div>
      </section>

      {/* Account Details Popup Modal */}
      {showAccount && (
        <div
          onClick={() => setShowAccount(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 cursor-pointer backdrop-blur-sm animate-backdrop"
        >
          {/* Modal Content */}
          <div
            onClick={(e) => e.stopPropagation()} // Supaya kalau isi modal di-klik tidak close
            className="bg-[#fbf9f4] p-8 rounded-3xl shadow-2xl border-4 border-white max-w-sm w-full flex flex-col items-center gap-5 relative cursor-default animate-popup"
          >
            {/* Tombol Tutup X */}
            <button 
              onClick={() => setShowAccount(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#4a3728] transition-colors p-2"
              aria-label="Tutup popup"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Logo Bank yang direquest */}
            <img 
              src="/ag-branding-logo-2.png" 
              alt="Logo Bank" 
              className="h-10 object-contain mt-2 rounded-md"
            />
            
            <div className="text-center space-y-2 mt-2">
              <p className="text-[#4a3728] font-medium text-sm uppercase tracking-wider">Nomor Rekening</p>
              <p className="text-3xl font-bold text-[#1e4620] tracking-widest font-mono">1740006073035</p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Atas Nama</p>
              <p className="text-lg font-semibold text-[#4a3728]">Andi Tenry Aulia Armas</p>
            </div>
            
            <button 
              onClick={handleCopy}
              className={`mt-4 w-full py-3 rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
                copied 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-[#C3A365] hover:bg-[#b09054] text-white shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Berhasil Disalin!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Salin Rekening
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingGiftSection;
