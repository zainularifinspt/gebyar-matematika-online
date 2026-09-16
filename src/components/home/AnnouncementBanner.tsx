import React from 'react';
import { motion } from 'framer-motion';
import { Bell, ArrowRight } from 'lucide-react';
import type { Pengumuman } from '../../types';

interface AnnouncementBannerProps {
  announcement?: Pengumuman;
  onViewAll?: () => void;
  onSelectAnnouncement?: (ann: Pengumuman) => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  announcement,
  onViewAll,
  onSelectAnnouncement,
}) => {
  if (!announcement) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 pt-24 sm:pt-28 pb-3 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          whileHover={{ y: -2, scale: 1.006 }}
          whileTap={{ scale: 0.995 }}
          onClick={() => onSelectAnnouncement ? onSelectAnnouncement(announcement) : onViewAll?.()}
          className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:px-5 sm:py-2.5 rounded-2xl glass-3d-base hover:glass-3d-elevated cursor-pointer transition-shadow duration-200 overflow-hidden shadow-md shadow-indigo-500/5 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/90"
        >
          {/* Specular top rim shine */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

          {/* Glowing colorful left accent pill */}
          <div className="absolute top-2 bottom-2 left-1.5 w-1 rounded-full bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-600 shadow-sm shadow-indigo-500/50" />

          <div className="flex items-center gap-3 pl-3 sm:pl-2">
            <motion.span 
              whileHover={{ rotate: 15 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-50/90 text-indigo-700 border border-indigo-200/90 shadow-xs"
            >
              <Bell className="w-4 h-4 text-indigo-600" />
            </motion.span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black uppercase rounded-md bg-rose-50 text-rose-700 border border-rose-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                Penting
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                {announcement.judul}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black text-indigo-600 group-hover:text-indigo-700 transition-colors self-end sm:self-center pl-3 sm:pl-0">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
