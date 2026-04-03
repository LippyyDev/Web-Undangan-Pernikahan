import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import LiquidChrome from './LiquidChrome';
import flower6 from '../assets/img/flower6.webp';
import flower3 from '../assets/img/flower3.webp';
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';

/* ─── Status badge ─────────────────────────────────────────── */
const statusConfig = {
  hadir: {
    label: 'Hadir',
    icon: CheckCircle2,
    color: '#3d8c40',
    bg: 'rgba(61,140,64,0.12)',
    border: 'rgba(61,140,64,0.4)',
  },
  berhalangan: {
    label: 'Tidak Hadir',
    icon: XCircle,
    color: '#b94040',
    bg: 'rgba(185,64,64,0.10)',
    border: 'rgba(185,64,64,0.35)',
  },
  belum: {
    label: 'Belum Menjawab',
    icon: Clock,
    color: '#8a6a2e',
    bg: 'rgba(195,163,101,0.12)',
    border: 'rgba(195,163,101,0.4)',
  },
};

/* ─── RSVPSection ──────────────────────────────────────────── */
const RSVPSection = () => {
  const [guestDocId, setGuestDocId] = useState(null); // doc ID di Firestore
  const [guestSlug, setGuestSlug]   = useState(null); // slug dari URL ?to=
  const [guestName, setGuestName]   = useState('');
  const [status, setStatus]         = useState(null); // 'hadir' | 'berhalangan' | null
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [saved, setSaved]           = useState(false);
  const [error, setError]           = useState('');

  /* ── Baca slug dari URL ?to= ─ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('to');
    if (slug) {
      setGuestSlug(slug);
      fetchGuestBySlug(slug);
    } else {
      setLoading(false);
    }
  }, []);

  /* ── Cari tamu berdasarkan field slug di collection guests ─ */
  const fetchGuestBySlug = async (slug) => {
    try {
      const q = query(collection(db, 'guests'), where('slug', '==', slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docSnap = snap.docs[0];
        const data = docSnap.data();
        setGuestDocId(docSnap.id);
        setGuestName(data.nama || data.name || 'Tamu Undangan');
        setStatus(data.rsvp_status || null);
      } else {
        setError('Link undangan tidak valid.');
      }
    } catch (err) {
      console.error('Gagal mengambil data tamu:', err);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Simpan kehadiran ke Firestore ─ */
  const handleRSVP = async (choice) => {
    if (!guestDocId || saving) return;
    setSaving(true);
    try {
      const ref = doc(db, 'guests', guestDocId);
      await updateDoc(ref, {
        rsvp_status: choice,
        rsvp_at: new Date(),
      });
      setStatus(choice);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Gagal menyimpan RSVP:', err);
      setError('Gagal menyimpan. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const cfg = status ? statusConfig[status] : null;

  return (
    <section
      id="rsvp-section"
      className="relative min-h-screen py-24 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* ── LiquidChrome Background (same as ScheduleSection) ── */}
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
        src={flower3}
        alt=""
        className="absolute -top-16 -left-16 md:-top-20 md:-left-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
      />

      {/* ── Bunga Kanan Bawah ── */}
      <img
        src={flower3}
        alt=""
        className="absolute -bottom-16 -right-16 md:-bottom-20 md:-right-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: "rotate(180deg)" }}
      />

      {/* ── Bunga Kanan Atas ── */}
      <img 
        src={flower6} 
        alt="" 
        className="absolute -top-16 -right-16 md:-top-20 md:-right-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleX(-1)' }}
      />

      {/* ── Bunga Kiri Bawah ── */}
      <img 
        src={flower6} 
        alt="" 
        className="absolute -bottom-16 -left-16 md:-bottom-20 md:-left-20 w-36 md:w-64 pointer-events-none z-10 opacity-90 drop-shadow-sm"
        style={{ transform: 'scaleY(-1)' }}
      />

      {/* ── Konten ── */}
      <div className="relative z-10 w-full max-w-xl mx-auto px-6 flex flex-col items-center gap-10">

        {/* Header */}
        <div className="text-center" data-aos="fade-down" data-aos-duration="1000">
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="block w-px h-16 bg-[#C3A365]/50 mx-auto" />
            <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }}>✦</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#4a3020] mb-2"
            style={{ fontFamily: 'serif' }}
          >
            Konfirmasi Kehadiran
          </h2>
          <p className="font-serif italic text-[#6b3a3a] text-base md:text-lg mt-3">
            Mohon konfirmasi kehadiranmu agar kami dapat mempersiapkan segalanya dengan sepenuh hati
          </p>
        </div>

        {/* Card utama */}
        <div
          className="w-full rounded-2xl border border-[#C3A365]/30 px-6 py-10 flex flex-col items-center gap-8"
          style={{ background: 'rgba(255,255,255,0.60)', backdropFilter: 'blur(10px)' }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {loading ? (
            /* Loading */
            <div className="flex flex-col items-center gap-4 py-6">
              <Loader2 size={36} className="text-[#C3A365] animate-spin" />
              <p className="font-serif italic text-[#6b3a3a] text-sm">Memuat data undangan…</p>
            </div>
          ) : error ? (
            /* Error */
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <XCircle size={40} className="text-[#b94040]" />
              <p className="font-serif text-[#b94040] text-sm">{error}</p>
            </div>
          ) : !guestSlug ? (
            /* Tidak ada link tamu — tampil info umum */
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <Clock size={40} className="text-[#C3A365]" />
              <p className="font-serif italic text-[#6b3a3a] text-sm leading-relaxed">
                Silakan buka link undangan pribadi yang telah dikirimkan kepadamu<br />
                untuk mengkonfirmasi kehadiran.
              </p>
            </div>
          ) : (
            <>
              {/* Sapaan */}
              <div className="text-center">
                <p className="font-serif italic text-[#6b3a3a] text-sm mb-1">Kepada Yth.</p>
                <p
                  className="text-2xl md:text-3xl font-bold text-[#4a3020]"
                  style={{ fontFamily: 'serif' }}
                >
                  {guestName}
                </p>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 w-full max-w-xs mx-auto">
                <span className="flex-1 h-px bg-[#C3A365]/40" />
                <span className="text-[#C3A365] text-sm">✦</span>
                <span className="flex-1 h-px bg-[#C3A365]/40" />
              </div>

              {/* Status badge jika sudah menjawab */}
              {cfg && (
                <div
                  className="flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-semibold font-sans transition-all duration-500"
                  style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
                >
                  <cfg.icon size={18} />
                  <span>{cfg.label}</span>
                </div>
              )}

              {/* Tombol aksi */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                {/* Tombol HADIR */}
                <button
                  id="rsvp-hadir-btn"
                  onClick={() => handleRSVP('hadir')}
                  disabled={saving || status === 'hadir'}
                  className={`flex items-center justify-center gap-2 flex-1 max-w-[220px] mx-auto sm:mx-0
                             px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-widest
                             transition-all duration-300 shadow-lg cursor-pointer disabled:cursor-not-allowed
                             ${status !== 'hadir' ? 'hover:bg-[#3d2d21]' : ''}`}
                  style={{
                    background: status === 'hadir'
                      ? 'rgba(195,163,101,0.15)'
                      : '#4a3728',
                    color: status === 'hadir' ? '#8a6a2e' : '#fff',
                    border: status === 'hadir' ? '2px solid rgba(195,163,101,0.5)' : '1px solid rgba(195,163,101,0.3)',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving && status !== 'hadir' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  <span>Hadir</span>
                </button>

                {/* Tombol BERHALANGAN */}
                <button
                  id="rsvp-berhalangan-btn"
                  onClick={() => handleRSVP('berhalangan')}
                  disabled={saving || status === 'berhalangan'}
                  className={`flex items-center justify-center gap-2 flex-1 max-w-[220px] mx-auto sm:mx-0
                             px-6 py-3 rounded-full font-sans font-semibold text-sm uppercase tracking-widest
                             transition-all duration-300 shadow-lg cursor-pointer disabled:cursor-not-allowed
                             ${status !== 'berhalangan' ? 'hover:bg-[#3d2d21]' : ''}`}
                  style={{
                    background: status === 'berhalangan'
                      ? 'rgba(195,163,101,0.15)'
                      : '#4a3728',
                    color: status === 'berhalangan' ? '#8a6a2e' : '#fff',
                    border: status === 'berhalangan' ? '2px solid rgba(195,163,101,0.5)' : '1px solid rgba(195,163,101,0.3)',
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving && status !== 'berhalangan' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <XCircle size={16} />
                  )}
                  <span>Tidak Hadir</span>
                </button>
              </div>

              {/* Pesan sukses */}
              {saved && (
                <p className="font-serif italic text-[#3d8c40] text-sm text-center animate-pulse">
                  ✓ Konfirmasi kehadiranmu telah tersimpan. Terima kasih! 🌸
                </p>
              )}

              {/* Pesan ganti */}
              {status && !saved && (
                <p className="font-serif italic text-[#9b7b6b] text-xs text-center">
                  Kamu masih bisa mengubah konfirmasi kehadiran sewaktu-waktu.
                </p>
              )}
            </>
          )}
        </div>

        {/* Bottom ornament */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[#C3A365] text-4xl" style={{ display: 'inline-block' }}>✦</span>
          <span className="block w-px h-16 bg-[#C3A365]/50 mx-auto" />
        </div>

      </div>
    </section>
  );
};

export default RSVPSection;
