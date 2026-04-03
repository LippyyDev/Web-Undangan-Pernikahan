import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import { motion } from 'framer-motion';

const ALLOWED_EMAIL = 'alifqadry@gmail.com';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;

      if (email !== ALLOWED_EMAIL) {
        await auth.signOut();
        setError(`Akses ditolak. Account ${email} tidak memiliki izin masuk ke dashboard ini.`);
        setLoading(false);
        return;
      }

      navigate('/admin');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Terjadi kesalahan saat login. Coba lagi.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#120a0a]">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C3A365]/5 blur-[100px]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-900/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#C3A365]/8 blur-[80px]" />
      </div>

      {/* Garis dekor */}
      <div className="absolute inset-8 md:inset-16 border border-[#C3A365]/10 rounded-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col items-center gap-6"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(195,163,101,0.2)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
          }}
        >
          {/* Logo / Ornament */}
          <div className="flex flex-col items-center gap-2 mb-2">
            <div
              className="text-5xl md:text-6xl text-[#C3A365]"
              style={{ fontFamily: '"Great Vibes", cursive' }}
            >
              T &amp; P
            </div>
            <div className="h-px w-16 bg-[#C3A365]/40" />
          </div>

          <div className="text-center">
            <h1 className="text-white font-semibold text-xl mb-1">Admin Dashboard</h1>
            <p className="text-white/40 text-sm font-sans">Undangan Nikah Tenry &amp; Palli</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full rounded-xl px-4 py-3 text-sm text-red-300 bg-red-900/30 border border-red-800/50 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Google Sign In Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
                <path fill="#4285F4" d="M47.53 24.56c0-1.64-.15-3.22-.42-4.74H24v8.97h13.21c-.57 3.06-2.3 5.66-4.9 7.4v6.15h7.93c4.64-4.28 7.29-10.59 7.29-17.78z"/>
                <path fill="#34A853" d="M24 48c6.64 0 12.21-2.2 16.28-5.97l-7.93-6.15C30.18 37.55 27.27 38.5 24 38.5c-6.42 0-11.86-4.33-13.8-10.16H2.04v6.35C6.1 42.94 14.43 48 24 48z"/>
                <path fill="#FBBC05" d="M10.2 28.34A14.86 14.86 0 0 1 9.5 24c0-1.5.26-2.95.7-4.34v-6.35H2.04A23.99 23.99 0 0 0 0 24c0 3.87.93 7.53 2.04 10.69l8.16-6.35z"/>
                <path fill="#EA4335" d="M24 9.5c3.62 0 6.87 1.25 9.43 3.69l7.07-7.07C36.2 2.19 30.64 0 24 0 14.43 0 6.1 5.06 2.04 13.31l8.16 6.35C12.14 13.83 17.58 9.5 24 9.5z"/>
              </svg>
            )}
            {loading ? 'Memproses...' : 'Masuk dengan Google'}
          </motion.button>

          <p className="text-white/25 text-xs text-center font-sans">
            Hanya akun yang diotorisasi yang dapat mengakses dashboard ini.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
