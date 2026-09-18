import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  X, 
  Megaphone, 
  ShieldCheck, 
  Share2, 
  Clock, 
  Award, 
  Info 
} from 'lucide-react';
import type { Pengumuman } from '../../types';

interface AnnouncementDetailModalProps {
  announcement: Pengumuman | null;
  onClose: () => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!announcement) return null;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${announcement.judul}\n\n${announcement.isi}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getCategoryBadge = () => {
    if (announcement.isPenting || announcement.kategori === 'Penting') {
      return {
        label: 'Pengumuman Penting',
        badgeClass: 'bg-rose-100 text-rose-950 border-rose-300',
        icon: <Megaphone className="w-3.5 h-3.5 text-rose-600" />,
        ping: true,
      };
    }
    if (announcement.kategori === 'Jadwal') {
      return {
        label: 'Jadwal & Agenda',
        badgeClass: 'bg-amber-100 text-amber-950 border-amber-300',
        icon: <Clock className="w-3.5 h-3.5 text-amber-600" />,
        ping: false,
      };
    }
    if (announcement.kategori === 'Hasil') {
      return {
        label: 'Hasil & Juara',
        badgeClass: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        icon: <Award className="w-3.5 h-3.5 text-emerald-600" />,
        ping: false,
      };
    }
    return {
      label: announcement.kategori || 'Informasi Umum',
      badgeClass: 'bg-indigo-100 text-indigo-950 border-indigo-300',
      icon: <Info className="w-3.5 h-3.5 text-indigo-600" />,
      ping: false,
    };
  };

  const cat = getCategoryBadge();

  // Paragraph formatting
  const paragraphs = (announcement.isi || '')
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Soft Tactile Glass Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl transition-all"
        />

        {/* Modal Card with Editorial 3D Glass Surface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-9 shadow-2xl space-y-6 overflow-hidden z-10 my-auto"
        >
          {/* Top Decorative Specular Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600" />

          {/* Modal Header */}
          <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-2xs ${cat.badgeClass}`}>
                  {cat.ping && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
                  {cat.icon}
                  <span>{cat.label}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100/80 px-2.5 py-0.5 rounded-lg border border-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{announcement.tanggal}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] leading-snug tracking-tight">
                {announcement.judul}
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Rilis Resmi Panitia Pelaksana Gebyar Matematika 2027</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 border border-white/90 shadow-2xs cursor-pointer transition-colors shrink-0"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Summary Callout (If ringkasan provided and different from title) */}
          {announcement.ringkasan && announcement.ringkasan !== announcement.judul && (
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-900 block font-['Outfit']">
                Ringkasan Informasi:
              </span>
              <p className="text-xs sm:text-sm text-indigo-950 font-semibold leading-relaxed">
                {announcement.ringkasan}
              </p>
            </div>
          )}

          {/* Full Article Content */}
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed max-h-80 overflow-y-auto pr-2">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, idx) => (
                <p key={idx} className="font-normal text-slate-700">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-slate-500 italic">Tidak ada rincian teks tambahan.</p>
            )}
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 font-medium">
              Kanal Informasi Terpusat • GM 2027
            </span>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCopy}
                className="btn-3d-white inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>{copied ? '✓ Tautan Disalin' : 'Bagikan Info'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="btn-3d-primary px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
