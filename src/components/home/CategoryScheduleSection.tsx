import React, { useState } from 'react';
import { 
  Calendar, 
  Check, 
  Clock, 
  Award, 
  Trophy, 
  ArrowRight, 
  BookOpen
} from 'lucide-react';
import type { KategoriLomba, JadwalEvent } from '../../types';

interface CategoryScheduleSectionProps {
  categories: KategoriLomba[];
  schedules: JadwalEvent[];
  onSelectCategory?: (category: KategoriLomba) => void;
}

export const CategoryScheduleSection: React.FC<CategoryScheduleSectionProps> = ({
  categories,
  schedules,
  onSelectCategory,
}) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(categories[0]?.id || 'kat-sd');

  const selectedCategory = categories.find(c => c.id === activeCategoryTab) || categories[0];

  const getAccentStyles = (accent: 'amber' | 'cyan' | 'purple') => {
    switch (accent) {
      case 'amber':
        return {
          cardClass: 'glass-3d-emerald',
          pill: 'bg-emerald-100/90 text-emerald-950 border-emerald-300',
          btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-500/25',
          accentText: 'text-emerald-800',
          progressColor: 'bg-emerald-500 shadow-xs shadow-emerald-500/50',
        };
      case 'cyan':
        return {
          cardClass: 'glass-3d-cyan',
          pill: 'bg-sky-100/90 text-sky-950 border-sky-300',
          btnBg: 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/25',
          accentText: 'text-blue-800',
          progressColor: 'bg-sky-500 shadow-xs shadow-sky-500/50',
        };
      case 'purple':
        return {
          cardClass: 'glass-3d-violet',
          pill: 'bg-purple-100/90 text-purple-950 border-purple-300',
          btnBg: 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/25',
          accentText: 'text-indigo-800',
          progressColor: 'bg-purple-500 shadow-xs shadow-purple-500/50',
        };
    }
  };

  return (
    <section id="kategori" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-blue-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            Pilihan Jenjang & Kuota
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Kategori Lomba & Jadwal Resmi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Pilih jenjang pendidikan yang sesuai. Setiap kategori dirancang dengan silabus berstandar nasional dan jadwal pelaksanaan teratur.
          </p>
        </div>

        {/* Categories 3D Collectible Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((kat) => {
            const styles = getAccentStyles(kat.warnaAksen);
            const isSelected = activeCategoryTab === kat.id;
            const quotaPercentage = Math.round((kat.terdaftar / kat.kuota) * 100);

            return (
              <div 
                key={kat.id}
                onClick={() => setActiveCategoryTab(kat.id)}
                className={`relative rounded-3xl p-7 transition-all duration-300 cursor-pointer border ${styles.cardClass} ${
                  isSelected 
                    ? 'ring-3 ring-indigo-500/80 shadow-2xl scale-[1.02]' 
                    : 'hover:scale-[1.01] hover:shadow-xl'
                }`}
              >
                {/* Specular Rim */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none rounded-t-3xl" />

                {/* Badge Tingkat */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-black border shadow-xs ${styles.pill}`}>
                    {kat.tingkat}
                  </span>
                  <span className="text-xs font-bold text-slate-700 tabular-nums">
                    Kuota: {kat.terdaftar}/{kat.kuota}
                  </span>
                </div>

                {/* Nama Kategori */}
                <h3 className="text-2xl font-black text-slate-900 mb-2 font-['Outfit']">
                  {kat.nama}
                </h3>

                {/* Biaya */}
                <div className="mb-4">
                  <span className="text-xs text-slate-500 font-bold block">Biaya Pendaftaran</span>
                  <p className="text-3xl font-black text-slate-900 font-['Outfit'] tabular-nums">
                    Rp {kat.biaya.toLocaleString('id-ID')}
                    <span className="text-xs text-slate-500 font-semibold ml-1.5">/ peserta</span>
                  </p>
                </div>

                {/* Kuota Progress Bar */}
                <div className="space-y-1.5 mb-5">
                  <div className="w-full h-2.5 rounded-full bg-white/70 overflow-hidden p-0.5 border border-white/60">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${styles.progressColor}`}
                      style={{ width: `${quotaPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-700 tabular-nums">
                    <span>Terisi {quotaPercentage}%</span>
                    <span>Sisa {kat.kuota - kat.terdaftar} kursi</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed mb-6 font-medium">
                  {kat.deskripsi}
                </p>

                {/* 3D Tactile Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory?.(kat);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black text-white transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer ${styles.btnBg}`}
                >
                  <span>Pilih Kategori Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Category Details 3D Glass Drawer */}
        {selectedCategory && (
          <div className="rounded-3xl glass-3d-elevated p-6 sm:p-9 border border-white/95 shadow-2xl mb-20 relative overflow-hidden">
            {/* Top Specular Rim */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

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
                <button
                  onClick={() => onSelectCategory?.(selectedCategory)}
                  className="btn-3d-primary px-7 py-3.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer"
                >
                  <span>Daftar Kategori Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid 3 Columns: Jadwal, Materi, Hadiah */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
              
              {/* Col 1: Jadwal */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Jadwal Kompetisi</span>
                </div>
                <div className="p-5 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Babak Penyisihan (CBT Online):</span>
                    <strong className="text-slate-900 text-xs font-black block mt-0.5">{selectedCategory.jadwalPenyisihan}</strong>
                  </div>
                  <div className="pt-2.5 border-t border-slate-200/60">
                    <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">Babak Final (Top 20 Nasional):</span>
                    <strong className="text-slate-900 text-xs font-black block mt-0.5">{selectedCategory.jadwalFinal}</strong>
                  </div>
                </div>
              </div>

              {/* Col 2: Materi Pokok */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Cakupan Materi Pokok</span>
                </div>
                <ul className="p-5 rounded-2xl glass-3d-base border border-white/90 space-y-2.5 text-xs text-slate-800 font-semibold">
                  {selectedCategory.materi.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Hadiah Juara */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Hadiah & Apresiasi</span>
                </div>
                <ul className="p-5 rounded-2xl glass-3d-base border border-white/90 space-y-2.5 text-xs text-slate-800 font-semibold">
                  {selectedCategory.hadiah.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* Timeline Jadwal Lengkap */}
        <div id="jadwal" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              Timeline & Jadwal Kegiatan Penting
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Catat tanggal penting berikut agar tidak melewatkan babak kualifikasi daring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schedules.map((item, idx) => (
              <div 
                key={item.id} 
                className={`p-6 rounded-2xl transition-all duration-200 border ${
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
