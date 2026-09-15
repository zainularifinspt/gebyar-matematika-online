import React from 'react';
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

export const ProfileSection: React.FC = () => {
  return (
    <section id="profil" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-indigo-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            Tentang Kompetisi
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Sorotan Profil Gebyar Matematika Online
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Transformasi penuh kompetisi matematika nasional menuju ekosistem daring terpadu yang efisien, transparan, dan inklusif bagi seluruh pelajar di 34 provinsi.
          </p>
        </div>

        {/* 3 Pillars Grid (3D Glass Pedestals with Jewel Tones) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Visi & Akses Merata (Cyan Glass Accent) */}
          <div className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/25 border border-white/40">
              <Target className="w-7 h-7" />
            </div>
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
          </div>

          {/* Card 2: Penyelenggara & Kredibilitas (Violet Glass Accent) */}
          <div className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 border border-white/40">
              <Building2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">
              Penyelenggara Terpercaya
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Diselenggarakan oleh Panitia Gebyar Matematika Nasional berkolaborasi dengan Dewan Pakar Matematika, Akademisi FMIPA, dan Asosiasi Pendidik Matematika.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-800 pt-4 border-t border-slate-200/60 font-bold">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Bank soal berstandar olimpiade & HOTS</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Dewan juri independen & penilaian transparan</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Total Hadiah & Apresiasi (Solar Amber Glass Accent) */}
          <div className="rounded-3xl glass-3d-interactive p-8 border border-white/90 shadow-xl space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 border border-white/40">
              <Trophy className="w-7 h-7" />
            </div>
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
          </div>

        </div>

        {/* 4 Langkah Alur Kompetisi Modern (3D Glass Stage) */}
        <div className="rounded-3xl glass-3d-elevated p-8 sm:p-12 border border-white/90 shadow-2xl relative overflow-hidden">
          {/* Top Specular Rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 hover:scale-[1.02] transition-transform">
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
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 hover:scale-[1.02] transition-transform">
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
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 hover:scale-[1.02] transition-transform">
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
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl glass-3d-base border border-white/90 space-y-3.5 hover:scale-[1.02] transition-transform">
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
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
