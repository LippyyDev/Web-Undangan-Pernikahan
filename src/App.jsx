import { Routes, Route, Navigate } from 'react-router-dom'
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
import { Sun, CloudSun } from 'lucide-react'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Halaman utama undangan
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
    <WeddingGiftSection />
    <WishesSection />
    <RSVPSection />
    <Footer />
  </main>
)

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<WeddingPage />} />
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
