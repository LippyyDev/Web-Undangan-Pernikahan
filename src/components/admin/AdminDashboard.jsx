import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Users, MessageCircleHeart, LayoutDashboard } from 'lucide-react';
import GuestManager from './GuestManager';
import WishesManager from './WishesManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('guests');
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'guests', label: 'Tamu Undangan', icon: Users },
    { id: 'wishes', label: 'Pesan & Ucapan', icon: MessageCircleHeart },
  ];

  return (
    <div className="min-h-screen bg-[#0f0808] text-white">
      
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 hidden md:flex flex-col z-50"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderRight: '1px solid rgba(195,163,101,0.15)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#C3A365]/10">
          <div className="text-3xl text-[#C3A365]" style={{ fontFamily: '"Great Vibes", cursive' }}>
            T &amp; P Admin
          </div>
          <p className="text-white/30 text-xs mt-1 font-sans">Undangan Nikah</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 flex flex-col gap-1.5">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                activeTab === id
                  ? 'bg-[#C3A365]/20 text-[#C3A365] shadow-sm'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#C3A365]/10">
          <div className="flex items-center gap-3 mb-3">
            {user?.photoURL && (
              <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full ring-1 ring-[#C3A365]/40" />
            )}
            <div className="min-w-0">
              <p className="text-white/80 text-xs font-medium truncate">{user?.displayName}</p>
              <p className="text-white/30 text-[10px] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm text-red-400 hover:bg-red-900/20 transition-all duration-200 border border-red-900/30"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-4 py-3"
        style={{
          background: 'rgba(15,8,8,0.95)',
          borderBottom: '1px solid rgba(195,163,101,0.15)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="text-2xl text-[#C3A365]" style={{ fontFamily: '"Great Vibes", cursive' }}>
          T &amp; P Admin
        </div>
        <button onClick={handleLogout} className="text-red-400 p-2 rounded-xl hover:bg-red-900/20 transition-colors">
          <LogOut size={18} />
        </button>
      </header>

      {/* Mobile Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex"
        style={{
          background: 'rgba(15,8,8,0.97)',
          borderTop: '1px solid rgba(195,163,101,0.15)',
          backdropFilter: 'blur(20px)'
        }}
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200 ${
              activeTab === id ? 'text-[#C3A365]' : 'text-white/40'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="md:pl-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen">
        <div className="p-4 md:p-8">
          {/* Page Header */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <LayoutDashboard size={20} className="text-[#C3A365]" />
              <h1 className="text-xl font-semibold text-white/90">
                {tabs.find(t => t.id === activeTab)?.label}
              </h1>
            </div>

            {activeTab === 'guests' && <GuestManager />}
            {activeTab === 'wishes' && <WishesManager />}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
