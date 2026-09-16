import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Play, 
  Video, 
  Clock, 
  X
} from 'lucide-react';
import type { VideoKegiatan } from '../../types';

interface VideoGallerySectionProps {
  videos: VideoKegiatan[];
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

const videoCardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export const VideoGallerySection: React.FC<VideoGallerySectionProps> = ({ videos }) => {
  const [activeVideo, setActiveVideo] = useState<VideoKegiatan | null>(null);

  return (
    <section id="video" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-amber-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <Video className="w-3.5 h-3.5 text-amber-600" />
            Dokumentasi & Sorotan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Galeri Video Kegiatan Tahun Sebelumnya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Saksikan semarak antusiasme ribuan peserta, tips peraih medali emas, dan arahan dewan juri matematika nasional.
          </p>
        </motion.div>

        {/* Video Cards Grid (3D Glass Tiles) */}
        <motion.div 
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {videos.map((vid) => (
            <motion.div
              key={vid.id}
              variants={videoCardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setActiveVideo(vid)}
              className="rounded-3xl glass-3d-interactive overflow-hidden border border-white/90 shadow-lg group cursor-pointer flex flex-col relative"
            >
              {/* Specular Rim */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-10" />

              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                {/* 3D Glass Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.18 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                    className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md text-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/30 border border-white"
                  >
                    <Play className="w-6 h-6 fill-indigo-600 ml-0.5" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 border border-white/20 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {vid.durasi}
                </div>

                {/* Year Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-indigo-600 text-[10px] font-black text-white uppercase tracking-wider shadow-md shadow-indigo-600/30">
                  Tahun {vid.tahun}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit'] line-clamp-2 leading-snug">
                    {vid.judul}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                    {vid.deskripsi}
                  </p>
                </div>

                <div className="pt-2 text-xs font-black text-indigo-600 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-indigo-600" />
                  <span>Tonton Video Kegiatan</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Glass Video Player Modal with AnimatePresence */}
        <AnimatePresence>
          {activeVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVideo(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-xl"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl rounded-3xl glass-3d-elevated border border-white/95 overflow-hidden shadow-2xl z-10"
              >
                {/* Specular Rim */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

                <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200/80 bg-white/70">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-0.5 text-[11px] font-black rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300">
                      Tahun {activeVideo.tahun}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 font-['Outfit'] line-clamp-1">
                      {activeVideo.judul}
                    </h4>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveVideo(null)}
                    className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/90 shadow-sm cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    src={activeVideo.embedUrl}
                    title={activeVideo.judul}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="p-5 px-6 bg-white/80 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-medium">
                  <p className="max-w-2xl leading-relaxed">{activeVideo.deskripsi}</p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveVideo(null)}
                    className="btn-3d-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0"
                  >
                    Tutup Pemutar
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
