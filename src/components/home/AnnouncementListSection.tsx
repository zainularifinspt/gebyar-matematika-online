import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Calendar, 
  ChevronRight, 
  X,
  Megaphone
} from 'lucide-react';
import type { Pengumuman } from '../../types';

interface AnnouncementListSectionProps {
  announcements: Pengumuman[];
  selectedAnnouncement?: Pengumuman | null;
  onCloseModal?: () => void;
  onOpenModal?: (ann: Pengumuman) => void;
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const AnnouncementListSection: React.FC<AnnouncementListSectionProps> = ({
  announcements,
  selectedAnnouncement,
  onCloseModal,
  onOpenModal,
}) => {
  const [activeModalAnn, setActiveModalAnn] = useState<Pengumuman | null>(selectedAnnouncement || null);

  const handleOpen = (ann: Pengumuman) => {
    setActiveModalAnn(ann);
    onOpenModal?.(ann);
  };

  const handleClose = () => {
    setActiveModalAnn(null);
    onCloseModal?.();
  };

  const activeAnn = activeModalAnn || selectedAnnouncement;

  return (
    <section id="pengumuman" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-rose-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
              <Megaphone className="w-3.5 h-3.5 text-rose-600" />
              Pusat Informasi
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
              Pengumuman Terbaru Panitia
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl font-normal">
              Informasi resmi terkait pendaftaran, jadwal simulasi CBT, silabus kompetisi, dan pengumuman hasil kejuaraan.
            </p>
          </div>
        </motion.div>

        {/* Announcements 3D Glass Cards Grid */}
        <motion.div 
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {announcements.map((ann) => (
            <motion.div
              key={ann.id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleOpen(ann)}
              className="rounded-3xl glass-3d-interactive p-7 border border-white/90 shadow-lg flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              {/* Specular Rim */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-xs ${
                    ann.isPenting 
                      ? 'bg-rose-100/90 text-rose-950 border-rose-300' 
                      : 'bg-indigo-100/90 text-indigo-950 border-indigo-300'
                  }`}>
                    {ann.kategori}
                  </span>
                  <span className="text-xs text-slate-600 flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {ann.tanggal}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit'] line-clamp-2 leading-snug">
                  {ann.judul}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {ann.ringkasan}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-slate-200/70 flex items-center justify-between text-xs font-black text-indigo-600 group-hover:text-indigo-700">
                <span>Baca Rincian Pengumuman</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Glass Detail Modal with AnimatePresence */}
        <AnimatePresence>
          {activeAnn && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl"
              />

              {/* Modal Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-9 shadow-2xl space-y-6 overflow-hidden z-10"
              >
                {/* Specular Rim */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-300 shadow-xs">
                      {activeAnn.kategori}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] leading-tight">
                      {activeAnn.judul}
                    </h3>
                    <p className="text-xs text-slate-600 flex items-center gap-2 font-semibold">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      Diterbitkan pada {activeAnn.tanggal} oleh Panitia Gebyar Matematika
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/90 shadow-sm cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-white/80 text-sm text-slate-800 leading-relaxed whitespace-pre-line space-y-3 font-normal shadow-inner">
                  <p>{activeAnn.isi}</p>
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClose}
                    className="btn-3d-white px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Tutup Pengumuman
                  </motion.button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
