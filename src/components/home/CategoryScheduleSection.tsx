import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Calendar, 
  Check, 
  Clock, 
  Award, 
  Trophy, 
  ArrowRight, 
  BookOpen,
  User,
  Users,
  FileText
} from 'lucide-react';
import type { KategoriLomba, JadwalEvent } from '../../types';

interface CategoryScheduleSectionProps {
  categories: KategoriLomba[];
  schedules: JadwalEvent[];
  onSelectCategory?: (category: KategoriLomba) => void;
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
    transition: { staggerChildren: 0.12 },
  },
};

const categoryCardVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const schedulesContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const scheduleCardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const CategoryScheduleSection: React.FC<CategoryScheduleSectionProps> = ({
  categories,
  schedules,
  onSelectCategory,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(
    categories[0]?.id || 'kat-sd'
  );

  const selectedCategory = categories.find((c) => c.id === activeCategoryTab) || categories[0];

  const getAccentStyles = (accent: string) => {
    switch (accent) {
      case 'amber':
        return {
          pill: 'bg-amber-100 text-amber-950 border-amber-300',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 shadow-emerald-700/20',
          cardClass: 'glass-3d-card-emerald',
          badgeLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'cyan':
        return {
          pill: 'bg-cyan-100 text-cyan-950 border-cyan-300',
          btnBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-600/20',
          cardClass: 'glass-3d-card-cyan',
          badgeLight: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        };
      case 'emerald':
        return {
          pill: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20',
          cardClass: 'glass-3d-card-emerald',
          badgeLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'rose':
        return {
          pill: 'bg-rose-100 text-rose-950 border-rose-300',
          btnBg: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-600/20',
          cardClass: 'glass-3d-card-amber',
          badgeLight: 'bg-rose-50 text-rose-800 border-rose-200',
        };
      case 'blue':
        return {
          pill: 'bg-blue-100 text-blue-950 border-blue-300',
          btnBg: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-600/20',
          cardClass: 'glass-3d-card-indigo',
          badgeLight: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case 'purple':
      default:
        return {
          pill: 'bg-purple-100 text-purple-950 border-purple-300',
          btnBg: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 shadow-indigo-600/25',
          cardClass: 'glass-3d-card-purple',
          badgeLight: 'bg-purple-50 text-purple-800 border-purple-200',
        };
    }
  };

  return (
    <section id="kategori" className="py-24 relative overflow-hidden">
      
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-l from-purple-400/10 to-pink-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-blue-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Pilihan Jenjang & Kategori Lomba
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Kategori Lomba & Jadwal Resmi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Pilih jenis dan jenjang kompetisi yang ingin Anda ikuti. Pendaftaran dibuka untuk peserta mandiri dan delegasi sekolah dari seluruh Indonesia.
          </p>
        </motion.div>

        {/* Categories 3D Collectible Cards Grid */}
        <motion.div 
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((kat) => {
            const styles = getAccentStyles(kat.warnaAksen);
            const isSelected = activeCategoryTab === kat.id;
            const isGroup = kat.tipeKepesertaan === 'kelompok';
            const isClosed = kat.status === 'tutup';

            return (
              <motion.div 
                key={kat.id}
                variants={categoryCardVariants}
                whileHover={{ y: -5, scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActiveCategoryTab(kat.id)}
                className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${styles.cardClass} ${
                  isSelected 
                    ? 'ring-3 ring-indigo-500/80 shadow-2xl scale-[1.02]' 
                    : 'hover:shadow-xl'
                }`}
              >

                <div>
                  {/* Badge Tingkat & Tipe Kepesertaan */}
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-xs font-['Outfit'] ${styles.pill}`}>
                      {kat.tingkat}
                    </span>
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-white/90 border border-slate-200/90 text-slate-800 shadow-2xs inline-flex items-center gap-1">
                      {isGroup ? (
                        <>
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Kelompok ({kat.maksAnggota || 3} Siswa)</span>
                        </>
                      ) : (
                        <>
                          <User className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Individu</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Kategori Field / Bidang */}
                  {kat.kategori && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      {kat.kategori}
                    </span>
                  )}

                  {/* Nama Kategori */}
                  <h3 className="text-2xl font-black text-slate-900 mb-2 font-['Outfit']">
                    {kat.nama}
                  </h3>

                  {/* Biaya */}
                  <div className="mb-4">
                    <span className="text-xs text-slate-500 font-bold block">Biaya Pendaftaran</span>
                    <p className="text-3xl font-black text-slate-900 font-['Outfit'] tabular-nums">
                      Rp {kat.biaya.toLocaleString('id-ID')}
                      <span className="text-xs text-slate-500 font-semibold ml-1.5">
                        {isGroup ? '/ regu tim' : '/ peserta'}
                      </span>
                    </p>
                  </div>

                  {/* Status Box & Persyaratan Ringkas */}
                  <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 space-y-2 mb-5 shadow-2xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-slate-700 uppercase tracking-wide">Pendaftaran</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 text-[11px] border ${
                        isClosed 
                          ? 'bg-rose-100 text-rose-800 border-rose-200' 
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isClosed ? 'bg-rose-600' : 'bg-emerald-600 animate-pulse'}`} />
                        {isClosed ? 'Pendaftaran Ditutup' : 'Terbuka Nasional'}
                      </span>
                    </div>

                    {kat.persyaratan && kat.persyaratan.length > 0 && (
                      <div className="text-[11px] text-slate-600 pt-1.5 border-t border-slate-100">
                        <span className="font-bold text-slate-700 block text-[10px] uppercase">Persyaratan:</span>
                        <p className="line-clamp-2 text-slate-600 leading-snug mt-0.5 font-medium">
                          • {kat.persyaratan.slice(0, 2).join(' • ')}
                        </p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed mb-6 font-medium">
                    {kat.deskripsi}
                  </p>
                </div>

                {/* 3D Tactile Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isClosed}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isClosed) {
                      onSelectCategory?.(kat);
                    }
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black text-white shadow-md flex items-center justify-center gap-2 transition-all ${
                    isClosed ? 'bg-slate-400 cursor-not-allowed opacity-75' : `cursor-pointer ${styles.btnBg}`
                  }`}
                >
                  <span>{isClosed ? 'Pendaftaran Ditutup' : 'Pilih Kategori Ini'}</span>
                  {!isClosed && <ArrowRight className="w-4 h-4" />}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Selected Category Details 3D Glass Drawer */}
        <AnimatePresence mode="wait">
          {selectedCategory && (
            <motion.div 
              key={selectedCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl glass-3d-elevated p-6 sm:p-9 border border-white/95 shadow-2xl mb-20 relative overflow-hidden"
            >


              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/70">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                      Rincian Kategori Terpilih
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-700 font-bold">{selectedCategory.tingkat}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                    {selectedCategory.nama}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectCategory?.(selectedCategory)}
                    className="btn-3d-primary px-7 py-3.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
                  >
                    <span>Daftar Kategori Ini</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Grid Columns: Jadwal, Materi, Persyaratan, Hadiah */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
                
                {/* Col 1: Jadwal */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <Clock className="w-4 h-4 text-indigo-600" />
                    <span>Jadwal Kompetisi</span>
                  </div>
                  <div className="p-4 rounded-2xl glass-3d-base border border-white/90 space-y-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider">Babak Penyisihan (Online):</span>
                      <strong className="text-slate-900 text-xs font-black block mt-0.5">{selectedCategory.jadwalPenyisihan || 'Oktober 2027'}</strong>
                    </div>
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-slate-500 font-bold block text-[10px] uppercase tracking-wider">Babak Final (Top Nasional):</span>
                      <strong className="text-slate-900 text-xs font-black block mt-0.5">{selectedCategory.jadwalFinal || 'November 2027'}</strong>
                    </div>
                  </div>
                </div>

                {/* Col 2: Materi Pokok */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <span>Cakupan Materi</span>
                  </div>
                  <ul className="p-4 rounded-2xl glass-3d-base border border-white/90 space-y-2 text-xs text-slate-800 font-semibold">
                    {(selectedCategory.materi || ['Silabus Kompetisi Nasional', 'Logika & Aritmetika Analitik']).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: Persyaratan */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Persyaratan Lomba</span>
                  </div>
                  <ul className="p-4 rounded-2xl glass-3d-base border border-white/90 space-y-2 text-xs text-slate-800 font-semibold">
                    {(selectedCategory.persyaratan || [
                      'Siswa aktif jenjang terkait',
                      'Memiliki NISN aktif',
                      'Pas foto formal 3x4'
                    ]).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 4: Hadiah Juara */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Hadiah & Prestasi</span>
                  </div>
                  <ul className="p-4 rounded-2xl glass-3d-base border border-white/90 space-y-2 text-xs text-slate-800 font-semibold">
                    {(selectedCategory.hadiah || [
                      'Juara 1: Trofi + Piagam + Uang Pembinaan',
                      'Juara 2: Trofi + Piagam + Uang Pembinaan',
                      'Juara 3: Trofi + Piagam + Uang Pembinaan'
                    ]).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline Jadwal Lengkap */}
        <div id="jadwal" className="pt-8">
          <motion.div 
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              Timeline & Jadwal Kegiatan Penting
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Catat tanggal penting berikut agar tidak melewatkan babak kualifikasi daring.
            </p>
          </motion.div>

          <motion.div 
            variants={schedulesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {schedules.map((item, idx) => (
              <motion.div 
                key={item.id} 
                variants={scheduleCardVariants}
                whileHover={{ y: -4, scale: 1.015 }}
                className={`p-6 rounded-2xl transition-shadow duration-200 border cursor-default ${
                  item.status === 'berlangsung'
                    ? 'glass-3d-elevated ring-2 ring-indigo-500/70 shadow-lg'
                    : 'glass-3d-interactive shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                    Tahap 0{idx + 1}
                  </span>
                  {item.status === 'berlangsung' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Sedang Berjalan
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/80 text-slate-600 border border-slate-200">
                      Akan Datang
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black text-slate-900 mb-1 font-['Outfit']">
                  {item.fase}
                </h4>

                <p className="text-xs font-black text-indigo-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {item.tanggal}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.keterangan}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
