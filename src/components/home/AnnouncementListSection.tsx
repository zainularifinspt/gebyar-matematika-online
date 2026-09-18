import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Calendar, 
  ChevronRight, 
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
  onOpenModal,
}) => {
  const handleOpen = (ann: Pengumuman) => {
    onOpenModal?.(ann);
  };

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

      </div>
    </section>
  );
};
