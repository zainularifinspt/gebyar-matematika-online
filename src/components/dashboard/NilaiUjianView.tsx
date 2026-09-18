import React from 'react';
import { 
  RefreshCw, 
  ShieldCheck, 
  Download, 
  Trophy, 
  CheckCircle2 
} from 'lucide-react';
import type { NilaiUjianItem } from '../../types';
import { downloadAsCsv } from '../../utils/storage';

interface NilaiUjianViewProps {
  nilaiList: NilaiUjianItem[];
  onSyncScores?: () => void;
  isSyncing?: boolean;
}

export const NilaiUjianView: React.FC<NilaiUjianViewProps> = ({
  nilaiList,
  onSyncScores,
  isSyncing,
}) => {
  const handleExportNilai = () => {
    const headers = ['Peringkat', 'Nama Siswa', 'Asal Sekolah', 'Kategori', 'Skor Akhir', 'Benar', 'Salah', 'Kosong', 'Waktu Pengerjaan', 'Sesi', 'Status Kualifikasi'];
    const rows = nilaiList.map((n, idx) => [
      n.peringkat || idx + 1,
      n.namaSiswa,
      n.asalSekolah,
      n.kategoriNama,
      n.skor,
      n.jumlahBenar,
      n.jumlahSalah,
      n.jumlahKosong,
      n.waktuPengerjaan,
      n.sesiUjian,
      n.statusLolos ? 'Lolos Finalis (Top 20)' : 'Partisipan'
    ]);
    downloadAsCsv('rekap_nilai_cbt_gebyar_matematika_2027.csv', headers, rows);
  };

  return (
    <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-8 space-y-6 animate-fade-in shadow-xl shadow-indigo-950/5">
      
      {/* Header Info & Sync Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 text-cyan-950 border border-cyan-300 uppercase shadow-2xs">
              Internal API Terhubung
            </span>
            <span className="text-xs text-slate-500 font-mono">Endpoint: POST /internal/cbt/scores</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1.5 tracking-tight">
            Rekap Nilai Penjurian CBT (Web Ujian Daring)
          </h3>
          <p className="text-xs text-slate-600 font-medium">
            Nilai ujian otomatis ditarik langsung secara real-time dari server Web Ujian terpisah untuk berita acara panitia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportNilai}
            disabled={nilaiList.length === 0}
            className="btn-3d-white inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:text-indigo-700 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Berita Acara (CSV)</span>
          </button>

          <button
            onClick={onSyncScores}
            disabled={isSyncing}
            className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Nilai Terbaru'}</span>
          </button>
        </div>
      </div>

      {/* Scores Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-md shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200/80 font-black">
            <tr>
              <th className="py-3.5 px-4">Peringkat</th>
              <th className="py-3.5 px-4">Nama Siswa & Sekolah</th>
              <th className="py-3.5 px-4">Kategori Lomba</th>
              <th className="py-3.5 px-4">Skor Akhir</th>
              <th className="py-3.5 px-4">Benar / Salah / Kosong</th>
              <th className="py-3.5 px-4">Waktu Selesai</th>
              <th className="py-3.5 px-4 text-right">Status Kualifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {nilaiList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center mx-auto">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-slate-800 text-sm font-['Outfit']">
                      Belum ada data nilai ujian yang tersinkronisasi
                    </p>
                    <p className="text-xs text-slate-500">
                      Klik tombol "Sinkron Nilai Terbaru" untuk menghubungkan ke Web Ujian dan menarik skor peserta secara otomatis.
                    </p>
                    {onSyncScores && (
                      <button
                        onClick={onSyncScores}
                        className="btn-3d-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-2 mt-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Tarik Nilai Sekarang</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              nilaiList.map((n, idx) => (
                <tr key={n.id} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black shadow-2xs ${
                      idx === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 border border-amber-300 ring-2 ring-amber-300/40' :
                      idx === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 border border-slate-300 ring-2 ring-slate-300/40' :
                      idx === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white border border-orange-400 ring-2 ring-orange-300/40' :
                      'bg-white/80 text-slate-700 border border-slate-200'
                    }`}>
                      #{n.peringkat || idx + 1}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 font-['Outfit'] text-sm">{n.namaSiswa}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{n.asalSekolah}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                      {n.kategoriNama}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span className="text-lg font-black text-emerald-600 font-['Outfit']">{n.skor}</span>
                    <span className="text-[10px] text-slate-400 block font-sans">/ 100 poin</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-xs">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{n.jumlahBenar} B</span>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">{n.jumlahSalah} S</span>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="text-slate-600 font-semibold bg-slate-100 px-1.5 py-0.5 rounded">{n.jumlahKosong} K</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-mono text-[11px]">
                    <span className="font-semibold">{n.waktuPengerjaan}</span>
                    <span className="text-slate-400 block text-[10px]">{n.sesiUjian}</span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {n.statusLolos ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Lolos Finalis (Top 20)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        Partisipan
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-2xl bg-white/70 border border-white/90 flex items-center gap-3 text-xs text-slate-700 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
        <span className="font-medium">
          Nilai ujian di atas divalidasi dengan token otentikasi antar-layanan (Internal API Key). Panitia dapat langsung mengekspor nilai ke file CSV untuk kelengkapan berita acara penjurian resmi ULM.
        </span>
      </div>

    </div>
  );
};
