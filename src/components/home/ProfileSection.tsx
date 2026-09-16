import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Building2, 
  CreditCard, 
  FileCheck2, 
  Laptop, 
  Target, 
  Trophy, 
  Users2,
  CheckCircle,
  Zap
} from 'lucide-react';

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stepsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const stepItemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ProfileSection: React.FC = () => {
  return (
    <section id="profil" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-indigo-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            Tentang Kompetisi
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Sorotan Profil Gebyar Matematika 2027
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Kompetisi bergengsi tahunan persembahan Jurusan Pendidikan Matematika Universitas Lambung Mangkurat (ULM) menuju ekosistem olimpiade daring yang objektif, andal, dan inklusif.
          </p>
        </motion.div>

        {/* 3 Pillars Grid (3D Glass Pedestals with Jewel Tones) */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          
          {/* Card 1: Visi & Akses Merata (Cyan Glass Accent) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5 cursor-default"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 border border-white/40 cursor-pointer"
            >
              <Target className="w-7 h-7" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
              Visi & Akses Merata
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Membuka ruang kompetisi terbuka bagi siswa di seluruh pelosok nusantara tanpa beban biaya akomodasi atau administrasi fisik yang rumit.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-800 pt-4 border-t border-slate-200/60 font-bold">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format 100% online ramah kuota internet</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dapat diakses via laptop, PC, dan tablet</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Penyelenggara & Kredibilitas (Violet Glass Accent) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5 cursor-default"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 border border-white/40 cursor-pointer"
            >
              <Building2 className="w-7 h-7" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
              Penyelenggara Terpercaya
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Diselenggarakan secara resmi oleh Jurusan Pendidikan Matematika Universitas Lambung Mangkurat (ULM) bersama Himpunan Mahasiswa dan Dewan Dosen Pakar Pendidikan Matematika.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-800 pt-4 border-t border-slate-200/60 font-bold">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Jurusan Pendidikan Matematika Universitas Lambung Mangkurat</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Bank soal berstandar olimpiade & dewan juri akademisi ULM</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 3: Total Hadiah & Apresiasi (Solar Amber Glass Accent) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5 cursor-default"
          >
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 border border-white/40 cursor-pointer"
            >
              <Trophy className="w-7 h-7" />
            </motion.div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
              Apresiasi & Hadiah Juara
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Total dana pembinaan senilai lebih dari Rp 45.000.000, piala bergilir bergengsi, sertifikat ber-QR verifikasi, dan rekomendasi jalur prestasi akademik.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-800 pt-4 border-t border-slate-200/60 font-bold">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Piala, medali fisik & piagam penghargaan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Seluruh peserta mendapatkan e-sertifikat resmi</span>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* 4 Langkah Alur Kompetisi Modern (3D Glass Stage) */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl glass-3d-elevated p-8 sm:p-12 border border-white/90 shadow-2xl relative overflow-hidden"
        >


          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              Alur Instan Tanpa Hambatan
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              Pengalaman Peserta: Mudah & Otomatis
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
              Tidak ada antrean approval manual. Seluruh tahap terkonfirmasi secara real-time.
            </p>
          </div>

          <motion.div 
            variants={stepsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            {/* Step 1 */}
            <motion.div 
              variants={stepItemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 cursor-default transition-shadow"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-indigo-100/90 text-indigo-800 text-[11px] font-black tracking-wider">
                01. PENDAFTARAN
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                <Users2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900 font-['Outfit']">Daftar Mandiri / Guru</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Pilih jenjang SD, SMP, atau SMA. Isi biodata peserta atau daftarkan delegasi siswa secara kolektif.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={stepItemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 cursor-default transition-shadow"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-100/90 text-purple-800 text-[11px] font-black tracking-wider">
                02. MIDTRANS AUTO
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900 font-['Outfit']">QRIS / Virtual Account</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Bayar via e-wallet atau bank favorit. Webhook Midtrans langsung menandai invoice lunas seketika.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={stepItemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 cursor-default transition-shadow"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-100/90 text-sky-800 text-[11px] font-black tracking-wider">
                03. KARTU UJIAN
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900 font-['Outfit']">Kartu Ujian Auto-Siap</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Kartu peserta resmi langsung dapat dicetak dengan QR code unik, jadwal sesi, dan link server CBT.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              variants={stepItemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 cursor-default transition-shadow"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 text-[11px] font-black tracking-wider">
                04. UJIAN & HASIL
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900 font-['Outfit']">CBT & E-Sertifikat</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ikuti ujian dengan pengawasan integritas. Pengumuman nilai dan sertifikat ber-QR siap diunduh.
              </p>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
