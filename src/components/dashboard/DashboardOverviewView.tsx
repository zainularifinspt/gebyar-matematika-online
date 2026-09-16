import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  ArrowUpRight, 
  ChevronRight
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

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1 */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Total Peserta Terdaftar</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900 font-['Outfit']">{pesertaList.length}</p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{pesertaList.length > 0 ? 'Pendaftaran aktif' : 'Menunggu pendaftar pertama'}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Pembayaran Lunas (Midtrans)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-600 font-['Outfit']">
            {totalLunas}
          </p>
          <p className="text-[11px] text-slate-500">Kartu ujian otomatis terbit ({totalLunas} peserta)</p>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Menunggu Verifikasi</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-amber-600 font-['Outfit']">{totalPending}</p>
          <button
            onClick={() => onNavigateTab('peserta')}
            className="text-[11px] text-amber-700 underline font-bold block hover:text-amber-800"
          >
            Tindak lanjuti & verifikasi
          </button>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Nilai CBT Masuk</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-cyan-700 font-['Outfit']">{nilaiList.length}</p>
          <button
            onClick={() => onNavigateTab('nilai')}
            className="text-[11px] text-cyan-700 underline font-bold block hover:text-cyan-800"
          >
            Lihat rekap penjurian
          </button>
        </div>

      </div>

      {/* Grid: Jenjang Distribution & Live Event Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Distribution by Level (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 bg-white/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                Distribusi Pendaftar per Kategori
              </h3>
              <p className="text-xs text-slate-500">Pemberian kuota dan kepesertaan aktif</p>
            </div>
            <span className="text-xs font-bold text-slate-500">Total Kuota: 1.700</span>
          </div>

          <div className="space-y-4">
            
            {/* SD */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-amber-600">Matematika Dasar SD / MI</span>
                <span className="text-slate-700 font-semibold">{pesertaList.filter(p => p.kategoriId === 'kat-sd').length} / 500 Kuota ({Math.round((pesertaList.filter(p => p.kategoriId === 'kat-sd').length / 500) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 transition-all duration-500" style={{ width: `${Math.max(2, (pesertaList.filter(p => p.kategoriId === 'kat-sd').length / 500) * 100)}%` }} />
              </div>
            </div>

            {/* SMP */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-cyan-600">Matematika Terapan SMP / MTs</span>
                <span className="text-slate-700 font-semibold">{pesertaList.filter(p => p.kategoriId === 'kat-smp').length} / 600 Kuota ({Math.round((pesertaList.filter(p => p.kategoriId === 'kat-smp').length / 600) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-cyan-500 transition-all duration-500" style={{ width: `${Math.max(2, (pesertaList.filter(p => p.kategoriId === 'kat-smp').length / 600) * 100)}%` }} />
              </div>
            </div>

            {/* SMA */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-purple-600">Olimpiade SMA / MA / SMK</span>
                <span className="text-slate-700 font-semibold">{pesertaList.filter(p => p.kategoriId === 'kat-sma').length} / 600 Kuota ({Math.round((pesertaList.filter(p => p.kategoriId === 'kat-sma').length / 600) * 100)}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-purple-600 transition-all duration-500" style={{ width: `${Math.max(2, (pesertaList.filter(p => p.kategoriId === 'kat-sma').length / 600) * 100)}%` }} />
              </div>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>Sisa total kuota: {1700 - pesertaList.length} kursi.</span>
            <button
              onClick={() => onNavigateTab('peserta')}
              className="text-indigo-600 font-bold hover:underline"
            >
              Lihat Semua Peserta →
            </button>
          </div>
        </div>

        {/* Right: Live Automated System Activity (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 bg-white/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
              Aktivitas Sistem Real-Time
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-3 text-xs">
            {pesertaList.length === 0 ? (
              <>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-700">Webhook Midtrans Online</span>
                    <span className="text-[10px] text-slate-400">Siap / Aktif</span>
                  </div>
                  <p className="text-slate-600">Endpoint Webhook siap menerima verifikasi transaksi instan QRIS & Virtual Account.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-700">Sinkronisasi CBT Standby</span>
                    <span className="text-[10px] text-slate-400">Terhubung</span>
                  </div>
                  <p className="text-slate-600">Integrasi API Web Ujian daring siap menerima data penjurian dan skor peserta.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-700">Penerbitan Otomatis Aktif</span>
                    <span className="text-[10px] text-slate-400">Standar 2027</span>
                  </div>
                  <p className="text-slate-600">Generator QR code kartu peserta dan e-sertifikat terverifikasi aktif otomatis.</p>
                </div>
              </>
            ) : (
              pesertaList.slice(0, 3).map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-700">
                      {p.statusPembayaran === 'lunas' ? 'Pembayaran Terverifikasi' : 'Pendaftaran Baru'}
                    </span>
                    <span className="text-[10px] text-slate-400">{p.tanggalDaftar}</span>
                  </div>
                  <p className="text-slate-600">
                    {p.namaSiswa} ({p.asalSekolah}) mendaftar {p.kategoriNama}.
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Table: Pendaftar Terbaru */}
      <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 bg-white/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
              Daftar Pendaftar Terbaru
            </h3>
            <p className="text-xs text-slate-500">
              Data peserta dan sekolah asal yang baru mendaftar
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('peserta')}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
          >
            <span>Buka Tabel Lengkap</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 bg-slate-50/70">
              <tr>
                <th className="py-2.5 px-4">Nama Siswa</th>
                <th className="py-2.5 px-4">Asal Sekolah</th>
                <th className="py-2.5 px-4">Kategori</th>
                <th className="py-2.5 px-4">Pendaftar</th>
                <th className="py-2.5 px-4">Status Bayar</th>
                <th className="py-2.5 px-4 text-right">Kartu Peserta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pesertaList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    Belum ada data pendaftar baru. Data pendaftaran daring akan otomatis muncul di sini.
                  </td>
                </tr>
              ) : (
                pesertaList.slice(0, 4).map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900 font-['Outfit']">{p.namaSiswa}</td>
                    <td className="py-3 px-4">{p.asalSekolah} ({p.kota})</td>
                    <td className="py-3 px-4 font-bold text-indigo-700">{p.kategoriNama}</td>
                    <td className="py-3 px-4 text-slate-600">{p.namaPendaftar} ({p.rolePendaftar})</td>
                    <td className="py-3 px-4">
                      {p.statusPembayaran === 'lunas' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Lunas
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Menunggu
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {p.kartuTercetak ? (
                        <span className="text-[11px] text-emerald-700 font-bold">Tercetak Otomatis</span>
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
