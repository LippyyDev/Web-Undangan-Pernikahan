import React, { useState, useEffect } from 'react';
import {
  collection, deleteDoc, doc,
  onSnapshot, query, orderBy
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, MessageCircleHeart, Search } from 'lucide-react';

const formatDate = (ts) => {
  if (!ts) return '-';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const WishesManager = () => {
  const [wishes, setWishes] = useState([]);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setWishes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'wishes', id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Gagal hapus ucapan:', err);
    }
  };

  const filtered = wishes.filter(w =>
    w.name?.toLowerCase().includes(search.toLowerCase()) ||
    w.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Stat */}
      <div className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: 'rgba(195,163,101,0.08)', border: '1px solid rgba(195,163,101,0.2)' }}>
        <div className="w-12 h-12 rounded-xl bg-[#C3A365]/20 flex items-center justify-center">
          <MessageCircleHeart size={22} className="text-[#C3A365]" />
        </div>
        <div>
          <p className="text-3xl font-bold text-[#C3A365]">{wishes.length}</p>
          <p className="text-white/40 text-sm">Total Pesan Ucapan</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau pesan..."
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white bg-white/5 border border-white/10 placeholder-white/20 focus:outline-none focus:border-[#C3A365]/50 transition-colors"
        />
      </div>

      {/* Daftar Wishes */}
      <div className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="px-5 py-4 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Semua Pesan</p>
          {search && (
            <p className="text-white/30 text-xs">{filtered.length} hasil ditemukan</p>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <MessageCircleHeart size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">
              {search ? 'Tidak ada hasil yang cocok' : 'Belum ada pesan ucapan'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {filtered.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-4 flex gap-4 items-start"
                >
                  {/* Avatar inisial */}
                  <div className="w-9 h-9 rounded-full bg-[#C3A365]/15 border border-[#C3A365]/20 flex items-center justify-center shrink-0 text-[#C3A365] text-sm font-bold uppercase">
                    {wish.name?.charAt(0) || '?'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white/90 font-semibold text-sm">{wish.name}</p>
                        <p className="text-white/25 text-xs mt-0.5">{formatDate(wish.createdAt)}</p>
                      </div>
                      {/* Delete */}
                      {deleteConfirm === wish.id ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleDelete(wish.id)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteConfirm(wish.id)}
                          className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-900/30 transition-all duration-200 shrink-0"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      )}
                    </div>
                    <p className="text-white/55 text-sm mt-2 leading-relaxed font-serif italic">
                      "{wish.message}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishesManager;
