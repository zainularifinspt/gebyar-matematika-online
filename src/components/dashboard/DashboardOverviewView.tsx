import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  ArrowUpRight, 
  ChevronRight,
  Award
} from 'lucide-react';
import type { PesertaAdminItem, NilaiUjianItem } from '../../types';

interface DashboardOverviewViewProps {
  pesertaList: PesertaAdminItem[];
  nilaiList: NilaiUjianItem[];
  onNavigateTab: (tab: 'peserta' | 'nilai' | 'pembayaran') => void;
}

export const DashboardOverviewView: React.FC<DashboardOverviewViewProps> = ({
  pesertaList,
  nilaiList,
  onNavigateTab,
}) => {
  const totalLunas = pesertaList.filter(p => p.statusPembayaran === 'lunas').length;
  const totalPending = pesertaList.filter(p => p.statusPembayaran !== 'lunas').length;

  const countSd = pesertaList.filter(p => p.kategoriId === 'kat-sd').length;
  const countSmp = pesertaList.filter(p => p.kategoriId === 'kat-smp').length;
  const countSma = pesertaList.filter(p => p.kategoriId === 'kat-sma').length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4 Tactile 3D Glass Jewel Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Total Peserta (Indigo Jewel) */}
        <div className="glass-3d-card glass-3d-card-indigo p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer"
             onClick={() => onNavigateTab('peserta')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-950 uppercase tracking-wider">Total Peserta Terdaftar</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 flex items-center justify-center border border-white/60 transform group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-slate-900 font-['Outfit'] tabular-nums tracking-tight">
            {pesertaList.length}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold pt-1">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>{pesertaList.length > 0 ? 'Pendaftaran aktif berjalan' : 'Menunggu pendaftar pertama'}</span>
          </div>
        </div>

        {/* Metric 2: Pembayaran Lunas (Emerald Jewel) */}
        <div className="glass-3d-card glass-3d-card-emerald p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer"
             onClick={() => onNavigateTab('peserta')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">Pembayaran Lunas (Auto)</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30 flex items-center justify-center border border-white/60 transform group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-emerald-700 font-['Outfit'] tabular-nums tracking-tight">
            {totalLunas}
          </p>
          <p className="text-xs text-emerald-900 font-semibold pt-1">
            Kartu ujian otomatis terbit ({totalLunas} peserta)
          </p>
        </div>

        {/* Metric 3: Menunggu Verifikasi (Solar Amber Jewel) */}
        <div className="glass-3d-card glass-3d-card-amber p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer"
             onClick={() => onNavigateTab('pembayaran')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">Menunggu Verifikasi</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white shadow-md shadow-amber-600/30 flex items-center justify-center border border-white/60 transform group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-amber-700 font-['Outfit'] tabular-nums tracking-tight">
            {totalPending}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-amber-950 font-bold hover:underline">
              Tindak lanjuti & verifikasi →
            </span>
          </div>
        </div>

        {/* Metric 4: Nilai CBT Masuk (Azure Cyan Jewel) */}
        <div className="glass-3d-card glass-3d-card-cyan p-6 rounded-3xl space-y-3 relative overflow-hidden group cursor-pointer"
             onClick={() => onNavigateTab('nilai')}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-950 uppercase tracking-wider">Nilai CBT Masuk</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white shadow-md shadow-cyan-600/30 flex items-center justify-center border border-white/60 transform group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-black text-cyan-800 font-['Outfit'] tabular-nums tracking-tight">
            {nilaiList.length}
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-cyan-950 font-bold hover:underline">
              Lihat rekap penjurian →
            </span>
          </div>
        </div>

      </div>

      {/* Grid: Jenjang Distribution & Live Event Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Distribution by Level (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-6 shadow-xl shadow-indigo-950/5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h3 className="text-lg font-black text-slate-900 font-['Outfit'] tracking-tight">
                  Distribusi Pendaftar per Kategori
                </h3>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Alokasi kuota dan kepesertaan aktif nasional</p>
            </div>
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 shadow-2xs font-mono">
              Total Kuota: 1.700
            </span>
          </div>

          <div className="space-y-4">
            
            {/* SD */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/90 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-2xs" />
                  <span className="font-extrabold text-slate-900 font-['Outfit']">Matematika Dasar SD / MI</span>
                </div>
                <span className="text-slate-800 font-bold font-mono tabular-nums">
                  {countSd} / 500 Kuota <span className="text-emerald-700 font-black">({Math.round((countSd / 500) * 100)}%)</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100/90 overflow-hidden p-0.5 shadow-inner border border-slate-200/60">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 shadow-xs" 
                  style={{ width: `${Math.max(3, (countSd / 500) * 100)}%` }} 
                />
              </div>
            </div>

            {/* SMP */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/90 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-2xs" />
                  <span className="font-extrabold text-slate-900 font-['Outfit']">Matematika Terapan SMP / MTs</span>
                </div>
                <span className="text-slate-800 font-bold font-mono tabular-nums">
                  {countSmp} / 600 Kuota <span className="text-cyan-700 font-black">({Math.round((countSmp / 600) * 100)}%)</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100/90 overflow-hidden p-0.5 shadow-inner border border-slate-200/60">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-500 shadow-xs" 
                  style={{ width: `${Math.max(3, (countSmp / 600) * 100)}%` }} 
                />
              </div>
            </div>

            {/* SMA */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-white/90 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500 shadow-2xs" />
                  <span className="font-extrabold text-slate-900 font-['Outfit']">Olimpiade SMA / MA / SMK</span>
                </div>
                <span className="text-slate-800 font-bold font-mono tabular-nums">
                  {countSma} / 600 Kuota <span className="text-purple-700 font-black">({Math.round((countSma / 600) * 100)}%)</span>
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100/90 overflow-hidden p-0.5 shadow-inner border border-slate-200/60">
                <div 
                  className="h-full rounded-full bg-purple-600 transition-all duration-500 shadow-xs" 
                  style={{ width: `${Math.max(3, (countSma / 600) * 100)}%` }} 
                />
              </div>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-white/80 border border-white/95 text-xs text-slate-700 flex items-center justify-between shadow-2xs">
            <span className="font-semibold">Sisa total kuota: <strong className="text-slate-900 font-mono">{1700 - pesertaList.length}</strong> kursi tersedia.</span>
            <button
              onClick={() => onNavigateTab('peserta')}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Lihat Semua Peserta</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Live Automated System Activity (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-4 shadow-xl shadow-indigo-950/5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-lg font-black text-slate-900 font-['Outfit'] tracking-tight">
                Aktivitas Sistem Real-Time
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
              Live Monitor
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {pesertaList.length === 0 ? (
              <>
                <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-800 font-['Outfit'] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Sistem Pembayaran Online
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Aktif</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">Verifikasi instan transaksi Midtrans QRIS & Virtual Account standby 24/7.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-cyan-800 font-['Outfit'] flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
                      Sinkronisasi CBT Standby
                    </span>
                    <span className="text-[10px] text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded-md">Terhubung</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">Integrasi internal API Web Ujian daring siap menerima data penjurian dan skor peserta.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/70 border border-white/80 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-800 font-['Outfit'] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      Penerbitan Otomatis Aktif
                    </span>
                    <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-md">Standar 2027</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">Generator QR code kartu peserta dan e-sertifikat terverifikasi aktif otomatis.</p>
                </div>
              </>
            ) : (
              pesertaList.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-white/75 border border-white/90 space-y-1 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 font-['Outfit'] flex items-center gap-1.5">
                      {p.statusPembayaran === 'lunas' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      {p.statusPembayaran === 'lunas' ? 'Pembayaran Terverifikasi' : 'Pendaftaran Baru'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{p.tanggalDaftar}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-snug font-medium pl-5">
                    <strong>{p.namaSiswa}</strong> ({p.asalSekolah}) mendaftar <span className="text-indigo-600 font-bold">{p.kategoriNama}</span>.
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Table: Pendaftar Terbaru with 3D Glass Surface */}
      <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-4 shadow-xl shadow-indigo-950/5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div>
            <h3 className="text-lg font-black text-slate-900 font-['Outfit'] tracking-tight">
              Daftar Pendaftar Terbaru
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Data peserta dan sekolah asal yang baru mendaftar
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('peserta')}
            className="btn-3d-white text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-xl cursor-pointer"
          >
            <span>Buka Tabel Lengkap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/60 backdrop-blur-md">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200/80 bg-slate-100/70 font-black">
              <tr>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Asal Sekolah</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Pendaftar</th>
                <th className="py-3 px-4">Status Bayar</th>
                <th className="py-3 px-4 text-right">Kartu Peserta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {pesertaList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 font-medium">
                    Belum ada data pendaftar baru. Data pendaftaran daring akan otomatis muncul di sini.
                  </td>
                </tr>
              ) : (
                pesertaList.slice(0, 5).map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 font-['Outfit']">{p.namaSiswa}</td>
                    <td className="py-3.5 px-4 font-medium">{p.asalSekolah} ({p.kota})</td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md border border-indigo-200 text-[11px]">
                        {p.kategoriNama}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{p.namaPendaftar} ({p.rolePendaftar})</td>
                    <td className="py-3.5 px-4">
                      {p.statusPembayaran === 'lunas' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                          Lunas
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-medium">
                      {p.kartuTercetak ? (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Tercetak Otomatis
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Belum Terbit</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
