import { Routes, Route, Navigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from './lib/firebase'

import Hero from './components/Hero'
import MarqueeSection from './components/MarqueeSection'
import InvitationSection from './components/InvitationSection'
import QuranSection from './components/QuranSection'
import CoupleSection from './components/CoupleSection'
import StorySection from './components/StorySection'
import ScheduleSection from './components/ScheduleSection'
import WeddingGiftSection from './components/WeddingGiftSection'
import WishesSection from './components/WishesSection'
import RSVPSection from './components/RSVPSection'
import Footer from './components/Footer'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import InvalidInvitation from './components/InvalidInvitation'
import Preloader from './components/Preloader'
import FloatingMusic from './components/FloatingMusic'
import { Sun, CloudSun } from 'lucide-react'

import AOS from 'aos'
import 'aos/dist/aos.css'

// ── Konten halaman undangan (hanya ditampilkan jika slug valid) ──
const WeddingPage = () => (
  <main className="font-sans text-text-brown min-h-screen bg-cream-100 selection:bg-pink-200 selection:text-text-dark">
    <Hero />
    <MarqueeSection 
      text="WEDDING INVITATION • UNDANGAN PERNIKAHAN"
    />
    <InvitationSection />
    <MarqueeSection 
      text="QS. AR-RUM 21" 
      bgColor="#4a3020" 
      textColor="#f1d0ca" 
    />
    <QuranSection />
    <MarqueeSection 
      text="TENRY & PALLI" 
    />
    <CoupleSection />
    <MarqueeSection 
      text="OUR LOVE STORY • KISAH KAMI" 
      bgColor="#4a3020" 
      textColor="#f1d0ca" 
    />
    <StorySection />
    <MarqueeSection 
      textLength={118}
      text={
        <span>
          PRAKIRAAN CUACA PAREPARE, 18 APRIL 2026 • 10:00 <Sun className="w-6 h-6 inline-block text-[#d4a373] -mt-1" /> CERAH 28°C • 11:00 <CloudSun className="w-6 h-6 inline-block text-[#d4a373] -mt-1" /> CERAH BERAWAN 30°C • 12:00 <Sun className="w-6 h-6 inline-block text-[#d4a373] -mt-1" /> CERAH 32°C
        </span>
      } 
    />
    <ScheduleSection />
    <MarqueeSection 
      text="BARAKALLAHU LAKUMA • SAKINAH MAWADDAH WARAHMAH" 
      bgColor="#4a3020" 
      textColor="#f1d0ca" 
    />
    <WeddingGiftSection />
    <MarqueeSection 
      text="SEND US YOUR BLESSINGS • KIRIMKAN DOA RESTU" 
    />
    <WishesSection />
    <MarqueeSection 
      text="PLEASE CONFIRM YOUR ATTENDANCE • KONFIRMASI KEHADIRAN" 
      bgColor="#4a3020" 
      textColor="#f1d0ca" 
    />
    <RSVPSection />
    <Footer />
  </main>
)

// ── Gate: cek validitas slug ?to= sebelum render halaman undangan ──
const InvitationGate = () => {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('to')

  // status: 'checking' | 'ready' | 'valid' | 'invalid'
  const [status, setStatus] = useState('checking')
  const [guestName, setGuestName] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Tidak ada parameter ?to= → langsung invalid
    if (!slug || !slug.trim()) {
      setStatus('invalid')
      return
    }

    const checkSlugAndLoad = async () => {
      try {
        const startTime = Date.now()
        
        const snap = await getDocs(query(collection(db, 'guests'), where('slug', '==', slug.trim())))
        
        if (snap.empty) {
          setStatus('invalid')
        } else {
          // Set the guest name right away so the Preloader can show it
          // Gunakan .nama karena di database tersimpan sebagai 'nama' bukan 'name'
          setGuestName(snap.docs[0].data().nama)
          
          // Ensure we still show the Preloader for a total of at least 2.5 seconds
          const elapsed = Date.now() - startTime
          const remainingDelay = Math.max(0, 2500 - elapsed)
          
          setTimeout(() => {
            setStatus('ready')
          }, remainingDelay)
        }
      } catch {
        // Jika Firestore error, anggap invalid demi keamanan
        setStatus('invalid')
      }
    }

    checkSlugAndLoad()
  }, [slug])

  const handleOpen = () => {
    setStatus('valid')
    setIsPlaying(true)
  }

  // Layar loading saat verifikasi
  if (status === 'checking' || status === 'ready') {
    return <Preloader guestName={guestName} isReady={status === 'ready'} onOpen={handleOpen} />
  }

  if (status === 'invalid') return <InvalidInvitation />

  return (
    <>
      <WeddingPage />
      <FloatingMusic isPlayingGlobally={isPlaying} />
    </>
  )
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    })
  }, [])

  return (
    <Routes>
      {/* Semua akses ke "/" wajib melalui gate validasi */}
      <Route path="/" element={<InvitationGate />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
