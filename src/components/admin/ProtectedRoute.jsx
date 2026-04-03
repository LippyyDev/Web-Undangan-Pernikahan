import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';

const ALLOWED_EMAIL = 'alifqadry@gmail.com';

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState('loading'); // 'loading' | 'allowed' | 'denied'

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ALLOWED_EMAIL) {
        setStatus('allowed');
      } else if (user) {
        // Login tapi email tidak diizinkan
        setStatus('denied');
      } else {
        setStatus('denied');
      }
    });
    return () => unsub();
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0f0f]">
        <div className="w-10 h-10 rounded-full border-4 border-[#C3A365] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
