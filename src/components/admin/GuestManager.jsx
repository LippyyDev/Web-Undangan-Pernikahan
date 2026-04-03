import React, { useState, useEffect, useRef } from 'react';
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Copy, Check, Link, Users, FileUp, X, AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';

// Fungsi generate slug dari nama
const toSlug = (nama) =>
  nama.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

// Base URL
const BASE_URL = window.location.origin;

/* ── Badge status RSVP ── */
const StatusBadge = ({ status }) => {
  if (status === 'hadir') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: 'rgba(61,140,64,0.15)', color: '#5ab05d', border: '1px solid rgba(61,140,64,0.3)' }}>
      <CheckCircle2 size={11} /> Hadir
    </span>
  );
  if (status === 'berhalangan') return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: 'rgba(185,64,64,0.15)', color: '#d45c5c', border: '1px solid rgba(185,64,64,0.3)' }}>
      <XCircle size={11} /> Tidak Hadir
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ background: 'rgba(195,163,101,0.10)', color: '#C3A365', border: '1px solid rgba(195,163,101,0.25)' }}>
      <Clock size={11} /> Pending
    </span>
  );
};

const GuestManager = () => {
  const [guests, setGuests]               = useState([]);
  const [form, setForm]                   = useState({ nama: '' });
  const [loading, setLoading]             = useState(false);
  const [copiedId, setCopiedId]           = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [importing, setImporting]         = useState(false);
  const [importResult, setImportResult]   = useState(null);
  const fileInputRef = useRef(null);

  // Real-time listener
  useEffect(() => {
    const q = query(collection(db, 'guests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setGuests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.nama.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'guests'), {
        nama: form.nama.trim(),
        slug: toSlug(form.nama.trim()),
        createdAt: serverTimestamp(),
      });
      setForm({ nama: '' });
    } catch (err) {
      console.error('Gagal tambah tamu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'guests', id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Gagal hapus tamu:', err);
    }
  };

  const handleCopy = (slug) => {
    navigator.clipboard.writeText(`${BASE_URL}/?to=${slug}`);
    setCopiedId(slug);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const names = ev.target.result
        .split('\n')
        .map(line => line.replace(/\r/g, '').trim())
        .filter(line => line.length > 0);
      setImportPreview(names);
      setImportResult(null);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleImportConfirm = async () => {
    if (!importPreview?.length) return;
    setImporting(true);
    let success = 0, failed = 0;
    for (const nama of importPreview) {
      try {
        await addDoc(collection(db, 'guests'), { nama, slug: toSlug(nama), createdAt: serverTimestamp() });
        success++;
      } catch { failed++; }
    }
    setImporting(false);
    setImportResult({ success, failed });
    setImportPreview(null);
  };

  const handleCancelImport = () => {
    setImportPreview(null);
    setImportResult(null);
  };

  // ── Statistik RSVP ──
  const totalHadir       = guests.filter(g => g.rsvp_status === 'hadir').length;
  const totalBerhalangan = guests.filter(g => g.rsvp_status === 'berhalangan').length;
  const totalPending     = guests.filter(g => !g.rsvp_status).length;

  return (
    <div className="flex flex-col gap-6">

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Total Tamu */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(195,163,101,0.08)', border: '1px solid rgba(195,163,101,0.2)' }}>
          <div className="w-10 h-10 rounded-xl bg-[#C3A365]/20 flex items-center justify-center shrink-0">
            <Users size={18} className="text-[#C3A365]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#C3A365]">{guests.length}</p>
            <p className="text-white/40 text-xs">Total Tamu</p>
          </div>
        </div>

        {/* Hadir */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(61,140,64,0.08)', border: '1px solid rgba(61,140,64,0.2)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(61,140,64,0.15)' }}>
            <CheckCircle2 size={18} className="text-[#5ab05d]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#5ab05d]">{totalHadir}</p>
            <p className="text-white/40 text-xs">Hadir</p>
          </div>
        </div>

        {/* Berhalangan */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(185,64,64,0.08)', border: '1px solid rgba(185,64,64,0.2)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(185,64,64,0.15)' }}>
            <XCircle size={18} className="text-[#d45c5c]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#d45c5c]">{totalBerhalangan}</p>
            <p className="text-white/40 text-xs">Tidak Hadir</p>
          </div>
        </div>

        {/* Pending */}
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            <Clock size={18} className="text-white/40" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white/55">{totalPending}</p>
            <p className="text-white/40 text-xs">Belum Jawab</p>
          </div>
        </div>
      </div>

      {/* ── Form Tambah + Import ── */}
      <div className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/70 text-sm font-medium flex items-center gap-2">
            <Plus size={16} className="text-[#C3A365]" />
            Tambah Tamu Baru
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/5 text-white/50 border border-white/10 hover:text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <FileUp size={13} /> Import dari .txt
          </motion.button>
          <input ref={fileInputRef} type="file" accept=".txt,text/plain" className="hidden" onChange={handleFileChange} />
        </div>

        <form onSubmit={handleAdd} className="flex gap-3">
          <div className="flex-1">
            <input
              type="text" value={form.nama} onChange={(e) => setForm({ nama: e.target.value })}
              placeholder="Nama lengkap tamu... (misal: Bapak Ahmad Yani)" required
              className="w-full px-4 py-3 rounded-xl text-sm text-white bg-white/5 border border-white/10 placeholder-white/20 focus:outline-none focus:border-[#C3A365]/50 transition-colors"
            />
            {form.nama && (
              <p className="text-white/20 text-xs mt-1.5 ml-1 font-mono">
                Link: <span className="text-[#C3A365]/60">{BASE_URL}/?to={toSlug(form.nama)}</span>
              </p>
            )}
          </div>
          <motion.button type="submit" disabled={loading || !form.nama.trim()}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="px-5 py-3 rounded-xl bg-[#C3A365] text-white font-semibold text-sm hover:bg-[#b8934f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-2">
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={16} />}
            Tambah
          </motion.button>
        </form>
      </div>

      {/* ── Preview + Hasil Import ── */}
      <AnimatePresence>
        {importPreview && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl p-5"
            style={{ background: 'rgba(195,163,101,0.06)', border: '1px solid rgba(195,163,101,0.25)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[#C3A365] text-sm font-semibold">Preview Import — {importPreview.length} nama ditemukan</p>
                <p className="text-white/30 text-xs mt-0.5">Pastikan daftar benar sebelum mengimpor</p>
              </div>
              <button onClick={handleCancelImport} className="text-white/25 hover:text-white/60 transition-colors p-1"><X size={16} /></button>
            </div>
            <div className="rounded-xl overflow-hidden mb-4" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
                {importPreview.slice(0, 50).map((nama, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex items-center gap-3">
                    <span className="text-white/20 text-xs font-mono w-5 text-right shrink-0">{idx + 1}</span>
                    <span className="text-white/80 text-sm">{nama}</span>
                  </div>
                ))}
                {importPreview.length > 50 && <div className="px-4 py-2.5 text-white/30 text-xs text-center">... dan {importPreview.length - 50} nama lainnya</div>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={handleImportConfirm} disabled={importing}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C3A365] text-white text-sm font-semibold hover:bg-[#b8934f] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {importing ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Mengimpor...</> : <><FileUp size={14} /> Import {importPreview.length} Tamu</>}
              </motion.button>
              <button onClick={handleCancelImport} className="px-4 py-2.5 rounded-xl text-sm text-white/40 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">Batal</button>
            </div>
          </motion.div>
        )}
        {importResult && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="rounded-2xl p-4 flex items-center justify-between"
            style={{ background: importResult.failed === 0 ? 'rgba(34,197,94,0.08)' : 'rgba(234,179,8,0.08)', border: `1px solid ${importResult.failed === 0 ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)'}` }}>
            <div className="flex items-center gap-3">
              {importResult.failed === 0 ? <CheckCircle2 size={18} className="text-green-400 shrink-0" /> : <AlertCircle size={18} className="text-yellow-400 shrink-0" />}
              <p className="text-sm text-white/70">
                Import selesai: <span className="text-green-400 font-semibold">{importResult.success} berhasil</span>
                {importResult.failed > 0 && <>, <span className="text-red-400 font-semibold">{importResult.failed} gagal</span></>}
              </p>
            </div>
            <button onClick={() => setImportResult(null)} className="text-white/25 hover:text-white/60 transition-colors p-1"><X size={14} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Daftar Tamu ── */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="px-5 py-4 bg-white/[0.02] border-b border-white/5">
          <p className="text-white/50 text-xs font-medium uppercase tracking-widest">Daftar Tamu</p>
        </div>

        {guests.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Users size={32} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/25 text-sm">Belum ada tamu terdaftar</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            <AnimatePresence>
              {guests.map((guest) => {
                const link = `${BASE_URL}/?to=${guest.slug}`;
                return (
                  <motion.div key={guest.id}
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Info tamu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-white/90 font-medium text-sm">{guest.nama}</p>
                        <StatusBadge status={guest.rsvp_status} />
                      </div>
                      <p className="text-white/25 text-xs font-mono truncate">
                        <Link size={10} className="inline mr-1" />{link}
                      </p>
                    </div>

                    {/* Aksi */}
                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(guest.slug)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                          copiedId === guest.slug
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-[#C3A365]/10 text-[#C3A365] border border-[#C3A365]/20 hover:bg-[#C3A365]/20'
                        }`}>
                        {copiedId === guest.slug ? <Check size={12} /> : <Copy size={12} />}
                        {copiedId === guest.slug ? 'Tersalin!' : 'Copy Link'}
                      </motion.button>

                      {deleteConfirm === guest.id ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => handleDelete(guest.id)}
                            className="px-3 py-2 rounded-xl text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors">
                            Hapus
                          </button>
                          <button onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-2 rounded-xl text-xs font-medium bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 transition-colors">
                            Batal
                          </button>
                        </div>
                      ) : (
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteConfirm(guest.id)}
                          className="p-2 rounded-xl text-white/25 hover:text-red-400 hover:bg-red-900/20 border border-transparent hover:border-red-900/30 transition-all duration-200">
                          <Trash2 size={14} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestManager;
