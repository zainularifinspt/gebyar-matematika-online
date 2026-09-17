import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Trophy, 
  Zap, 
  Globe2, 
  ShieldCheck 
} from 'lucide-react';
import { FloatingMath3D } from '../common/FloatingMath3D';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onExploreCategoriesClick: () => void;
  onVerifyCertificateClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreCategoriesClick,
  onVerifyCertificateClick,
}) => {
  return (
    <section id="beranda" className="relative pt-4 pb-20 overflow-hidden">
      {/* 3D Floating Mathematical Crystal Geometry & Clouds Background */}
      <FloatingMath3D />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Master 3D Frosted Glass Container - Immediately Rendered (Zero Delay) */}
        <div 
          className="relative rounded-[32px] sm:rounded-[44px] glass-3d-master-frame p-6 sm:p-10 lg:p-14 border border-white/90 shadow-2xl shadow-indigo-500/10"
        >

          {/* Decorative 3D Cloud Breakout Element */}
          <div className="absolute -top-6 right-12 w-28 h-14 hidden lg:block pointer-events-none opacity-80 animate-float-slow z-0">
            <div className="absolute bottom-0 left-2 w-24 h-11 rounded-full cloud-3d-puff" />
            <div className="absolute top-1 left-7 w-12 h-12 rounded-full cloud-3d-puff" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            
            {/* Left Hero Content Column - Instant Render for FCP & LCP */}
            <div 
              className="lg:col-span-6 space-y-6 text-center lg:text-left"
            >
              
              {/* 3D Glass Status Pill */}
              <div className="inline-block">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-indigo-950 text-xs font-black shadow-xs border border-white/95 hover:shadow-md transition-shadow">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Olimpiade Daring Nasional</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-indigo-700 font-bold">Pendidikan Matematika ULM</span>
                </div>
              </div>

              {/* Bold Hero Headline: Gebyar Matematika 2027 */}
              <h1 
                className="text-4xl sm:text-6xl lg:text-[4.2rem] font-black text-slate-900 tracking-[-0.03em] leading-[1.08] font-heading"
              >
                Gebyar{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Matematika
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  2027
                </span>
              </h1>

              {/* Subheading - LCP Target Element rendered at 0ms */}
              <p 
                className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
              >
                Kompetisi bergengsi persembahan <strong className="text-slate-900 font-bold">Jurusan Pendidikan Matematika Universitas Lambung Mangkurat (ULM)</strong>: pendaftaran instan tanpa approval manual, pembayaran otomatis via <strong className="text-slate-900 font-bold">QRIS & Virtual Account</strong>, simulasi CBT modern, dan e-sertifikat ber-QR resmi.
              </p>

              {/* Dual Action Buttons: Vibrant Purple Pill + Frosted Glass Outline */}
              <div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
              >
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRegisterClick}
                  className="btn-3d-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-black rounded-2xl cursor-pointer shadow-lg shadow-indigo-500/30"
                >
                  <span>Daftar Peserta Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onExploreCategoriesClick}
                  className="btn-3d-ghost-glass w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-2xl cursor-pointer"
                >
                  <span>Pelajari Kategori & Jadwal</span>
                </motion.button>
              </div>

              {/* Key Value Badges (3D Glass Pills) */}
              <div 
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2 text-xs font-bold text-slate-800"
              >
                <div 
                  className="flex items-center gap-2 bg-white/75 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs border border-white/90 cursor-default hover:scale-105 transition-transform"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Konfirmasi Bayar Otomatis</span>
                </div>
                <div 
                  className="flex items-center gap-2 bg-white/75 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs border border-white/90 cursor-default hover:scale-105 transition-transform"
                >
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Kartu Ujian Auto-Generate</span>
                </div>
                <div 
                  className="flex items-center gap-2 bg-white/75 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs border border-white/90 cursor-default hover:scale-105 transition-transform"
                >
                  <Globe2 className="w-4 h-4 text-blue-600" />
                  <span>100% Online Se-Indonesia</span>
                </div>
              </div>

              {/* Verification Link */}
              <div 
                className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-2 font-medium"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Sudah punya sertifikat periode sebelumnya?</span>
                <button 
                  onClick={onVerifyCertificateClick}
                  className="text-indigo-600 hover:text-indigo-800 font-bold underline underline-offset-4 cursor-pointer"
                >
                  Cek Keaslian Sertifikat
                </button>
              </div>

            </div>

            {/* Right Hero Stage: 3D Visual Centerpiece with Clay Rocket & Acrylic Glass */}
            <div 
              className="lg:col-span-6"
            >
              <div className="relative">
                
                {/* Outer decorative ambient glow */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/20 via-indigo-500/20 to-purple-400/20 rounded-[32px] blur-2xl pointer-events-none" />

                {/* 3D Illustration Container with Claymorphism Rocket & Math Elements */}
                <div className="relative rounded-3xl overflow-hidden glass-3d-elevated border border-white/95 shadow-2xl p-4 sm:p-6 space-y-5">

                  {/* Top Trophy & Fund Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
                    <div className="flex items-center gap-3.5">
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                        className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/30 cursor-pointer"
                      >
                        <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-amber-500" />
                        </div>
                      </motion.div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                          Total Dana Pembinaan
                        </span>
                        <p className="text-xl sm:text-2xl font-black text-slate-900 font-heading tabular-nums">
                          Rp 45.000.000+
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 text-[11px] font-black rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs">
                      Tahun 2027
                    </span>
                  </div>

                  {/* 3D Visual Centerpiece: High-Performance WebP Picture Tag */}
                  <div className="relative rounded-2xl overflow-hidden shadow-inner group">
                    <picture>
                      <source type="image/webp" srcSet="/images/hero_3d_rocket_student.webp" />
                      <img 
                        src="/images/hero_3d_rocket_student.jpg" 
                        alt="3D Claymorphism Student on Rocket - Gebyar Matematika" 
                        width="600"
                        height="448"
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-56 sm:h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </picture>
                    {/* Soft gradient glass vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold bg-slate-950/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Platform Terintegrasi CBT 2027
                      </span>
                      <span className="text-indigo-200">SD • SMP • SMA</span>
                    </div>
                  </div>

                  {/* 3 Categories Mini-Cards (Emerald, Cyan, Violet Glass) */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <motion.div 
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onExploreCategoriesClick}
                      className="p-3 rounded-2xl glass-3d-emerald cursor-pointer"
                    >
                      <p className="text-xs font-black text-emerald-950">SD / MI</p>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5 tabular-nums">Rp 50k</p>
                      <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">Kelas 4-6</span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onExploreCategoriesClick}
                      className="p-3 rounded-2xl glass-3d-cyan cursor-pointer"
                    >
                      <p className="text-xs font-black text-sky-950">SMP / MTs</p>
                      <p className="text-xs font-bold text-sky-700 mt-0.5 tabular-nums">Rp 65k</p>
                      <span className="text-[10px] text-sky-800 font-semibold block mt-0.5">Kelas 7-9</span>
                    </motion.div>

                    <motion.div 
                      whileHover={{ y: -3, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onExploreCategoriesClick}
                      className="p-3 rounded-2xl glass-3d-violet cursor-pointer"
                    >
                      <p className="text-xs font-black text-purple-950">SMA / SMK</p>
                      <p className="text-xs font-bold text-purple-700 mt-0.5 tabular-nums">Rp 75k</p>
                      <span className="text-[10px] text-purple-800 font-semibold block mt-0.5">Kelas 10-12</span>
                    </motion.div>
                  </div>

                  {/* Timeline & Quick Glance */}
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-600 border-t border-slate-200/60">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      Babak Penyisihan:
                    </span>
                    <span className="font-black text-slate-900">24 - 25 Oktober 2027</span>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Highlight Stats Strip (3D Glass Interactive Cards) - Directly rendered without opacity fade */}
        <div 
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div 
            className="p-5 sm:p-6 rounded-2xl glass-3d-interactive text-center cursor-default hover:-translate-y-1 transition-transform"
          >
            <p className="text-3xl sm:text-4xl font-black text-[#1e1458] font-heading tabular-nums">5.000+</p>
            <p className="text-xs text-slate-600 mt-1 font-bold">Alumni & Peserta Nasional</p>
          </div>

          <div 
            className="p-5 sm:p-6 rounded-2xl glass-3d-interactive text-center cursor-default hover:-translate-y-1 transition-transform"
          >
            <p className="text-3xl sm:text-4xl font-black text-blue-600 font-heading tabular-nums">34</p>
            <p className="text-xs text-slate-600 mt-1 font-bold">Provinsi Se-Indonesia</p>
          </div>

          <div 
            className="p-5 sm:p-6 rounded-2xl glass-3d-interactive text-center cursor-default hover:-translate-y-1 transition-transform"
          >
            <p className="text-3xl sm:text-4xl font-black text-emerald-600 font-heading tabular-nums">100%</p>
            <p className="text-xs text-slate-600 mt-1 font-bold">Otomasi Konfirmasi Bayar</p>
          </div>

          <div 
            className="p-5 sm:p-6 rounded-2xl glass-3d-interactive text-center cursor-default hover:-translate-y-1 transition-transform"
          >
            <p className="text-3xl sm:text-4xl font-black text-purple-600 font-heading">Resmi</p>
            <p className="text-xs text-slate-600 mt-1 font-bold">Sertifikat Ber-QR Code</p>
          </div>
        </div>

      </div>
    </section>
  );
};
