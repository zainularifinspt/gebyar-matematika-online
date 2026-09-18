import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Download, 
  Eye, 
  Filter, 
  BookOpen, 
  Calendar, 
  Check, 
  X, 
  FileText,
  FolderOpen,
  ExternalLink
} from 'lucide-react';
import type { ArsipSoal } from '../../types';

interface ArchiveSectionProps {
  archives: ArsipSoal[];
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ archives }) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<ArsipSoal | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredArchives = archives.filter((item) => {
    const matchYear = selectedYear === 'all' || item.tahun.toString() === selectedYear;
    const matchLevel = selectedLevel === 'all' || item.tingkat.toLowerCase().includes(selectedLevel.toLowerCase());
    return matchYear && matchLevel;
  });

  const handleDownload = (item: ArsipSoal) => {
    setDownloadSuccess(item.id);
    if (item.fileUrl && item.fileUrl !== '#') {
      window.open(item.fileUrl, '_blank', 'noopener,noreferrer');
    }
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <section id="arsip" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-sky-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <BookOpen className="w-3.5 h-3.5 text-sky-600" />
            Bank Soal & Pembahasan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Arsip Soal Lomba Tahun Sebelumnya
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Pelajari ragam soal dan tingkat kesulitan olimpiade tahun lalu secara terbuka untuk mematangkan persiapan menjelang kompetisi tahun 2027.
          </p>
        </motion.div>

        {/* Google Drive Official Repository Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-3xl glass-3d-elevated p-6 sm:p-7 border border-white/95 shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-900 flex items-center justify-center border border-amber-300 shadow-md shrink-0">
              <FolderOpen className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-950 text-[10px] font-black border border-amber-300">
                <span>Pusat Repositori Soal Resmi</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-['Outfit'] tracking-tight">
                Koleksi Seluruh Naskah Soal dalam Satu Google Drive
              </h3>
              <p className="text-xs text-slate-600 font-medium max-w-2xl">
                Seluruh naskah soal babak penyisihan, semifinal, dan final dari tahun-tahun sebelumnya telah dikumpulkan rapi dalam satu Folder Google Drive resmi panitia.
              </p>
            </div>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1GM-Arsip-Semua-Tahun?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d-primary px-5 py-3 rounded-2xl text-xs font-black text-white shadow-md flex items-center gap-2 shrink-0 group hover:scale-[1.02] transition-transform"
          >
            <FolderOpen className="w-4 h-4 text-amber-300" />
            <span>Buka Folder Google Drive Semua Soal</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* 3D Glass Filter Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-3d-base border border-white/90 shadow-sm mb-8"
        >
          
          {/* Year Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              Tahun:
            </span>
            {['all', '2024', '2023', '2022'].map((yr) => (
              <motion.button
                key={yr}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedYear(yr)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  selectedYear === yr
                    ? 'btn-3d-primary text-white'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {yr === 'all' ? 'Semua Tahun' : yr}
              </motion.button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-sky-600" />
              Jenjang:
            </span>
            {[
              { id: 'all', label: 'Semua Jenjang' },
              { id: 'sd', label: 'SD/MI' },
              { id: 'smp', label: 'SMP/MTs' },
              { id: 'sma', label: 'SMA/SMK' },
            ].map((lvl) => (
              <motion.button
                key={lvl.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  selectedLevel === lvl.id
                    ? 'btn-3d-primary text-white'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {lvl.label}
              </motion.button>
            ))}
          </div>

        </motion.div>

        {/* Archives 3D Glass Cards Grid with Fluid Layout Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredArchives.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.015 }}
                className="rounded-3xl glass-3d-interactive p-7 border border-white/90 shadow-lg flex flex-col justify-between relative overflow-hidden"
              >


                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black bg-sky-100/90 text-sky-950 border border-sky-300 shadow-xs">
                      {item.tingkat}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.fileUrl && item.fileUrl.includes('drive.google.com') && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-950 border border-amber-300 shadow-2xs">
                          <FolderOpen className="w-2.5 h-2.5 text-amber-600" />
                          <span>GDrive</span>
                        </span>
                      )}
                      <span className="text-xs text-slate-600 font-bold tabular-nums">
                        Tahun {item.tahun}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 font-['Outfit'] leading-snug">
                      {item.judul}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 font-semibold">
                    <span className="tabular-nums">{item.jumlahHalaman} Halaman</span>
                    <span>•</span>
                    <span>PDF ({item.ukuranFile})</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-5 mt-5 border-t border-slate-200/70 flex items-center gap-2.5">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setPreviewItem(item)}
                    className="btn-3d-white flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Lihat Sampel</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDownload(item)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-black rounded-xl transition-all cursor-pointer ${
                      downloadSuccess === item.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : item.fileUrl && item.fileUrl.includes('drive.google.com')
                          ? 'btn-3d-primary'
                          : 'btn-3d-primary'
                    }`}
                  >
                    {downloadSuccess === item.id ? (
                      <motion.span 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Membuka...</span>
                      </motion.span>
                    ) : item.fileUrl && item.fileUrl.includes('drive.google.com') ? (
                      <>
                        <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                        <span>Buka GDrive</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh PDF</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 3D Glass Document Preview Modal with AnimatePresence */}
        <AnimatePresence>
          {previewItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewItem(null)}
                className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl"
              />

              {/* Modal Window */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-9 shadow-2xl space-y-6 overflow-hidden z-10"
              >


                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-3 py-0.5 text-[11px] font-black rounded-full bg-sky-100 text-sky-950 border border-sky-300 shadow-xs">
                      Sampel Naskah ({previewItem.tingkat} - Tahun {previewItem.tahun})
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
                      {previewItem.judul}
                    </h3>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPreviewItem(null)}
                    className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-white/90 shadow-sm cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Mock PDF Document Preview Reader */}
                <div className="p-6 rounded-2xl bg-white/80 border border-slate-200/80 space-y-4 max-h-80 overflow-y-auto font-mono text-xs text-slate-800 shadow-inner">
                  <div className="text-center pb-3 border-b border-slate-200">
                    <p className="font-black text-slate-900 uppercase tracking-widest text-xs">
                      KEMENTERIAN PENDIDIKAN / PANITIA GEBYAR MATEMATIKA {previewItem.tahun}
                    </p>
                    <p className="text-[11px] text-slate-500 font-sans mt-0.5">NASKAH SOAL BABAK PENYISIHAN DARING</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-indigo-700">Nomor 1 (Penalaran Barisan & Bilangan):</p>
                    <p className="text-slate-700 leading-relaxed font-sans">
                      Diberikan barisan bilangan real non-negatif a₁, a₂, a₃, ... yang memenuhi a_(n+2) = |a_(n+1) - a_n| untuk setiap n ≥ 1. Jika a₁ = 2024 dan a₂ = 1945, tentukan nilai dari a₂₀₂₆!
                    </p>
                    <p className="text-slate-500 italic font-sans text-[11px]">
                      (A) 79 &nbsp;&nbsp; (B) 0 &nbsp;&nbsp; (C) 1945 &nbsp;&nbsp; (D) 2024
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    <p className="font-bold text-indigo-700">Nomor 2 (Geometri Terapan):</p>
                    <p className="text-slate-700 leading-relaxed font-sans">
                      Sebuah segitiga ABC memiliki panjang sisi a = 13, b = 14, dan c = 15. Tentukan jari-jari lingkaran dalam segitiga tersebut serta luas daerah yang dibatasi lingkaran dan segitiga.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500 font-semibold tabular-nums">
                    Total {previewItem.jumlahHalaman} halaman naskah + kunci jawaban
                  </span>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPreviewItem(null)}
                      className="btn-3d-white flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Tutup
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        handleDownload(previewItem);
                        setPreviewItem(null);
                      }}
                      className="btn-3d-primary flex-1 sm:flex-none px-6 py-2.5 text-xs font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {previewItem.fileUrl && previewItem.fileUrl.includes('drive.google.com') ? (
                        <>
                          <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                          <span>Buka Naskah di Google Drive</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Unduh Lengkap (PDF)</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
