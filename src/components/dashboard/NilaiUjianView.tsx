import React from 'react';
import { 
  RefreshCw, 
  ShieldCheck
} from 'lucide-react';
import type { NilaiUjianItem } from '../../types';

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
  return (
    <div className="rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm p-6 sm:p-8 space-y-6 animate-fade-in">
      
      {/* Header Info & Sync Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
              Internal API Terhubung
            </span>
            <span className="text-xs text-slate-500 font-mono">Endpoint: POST /internal/nilai</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Rekap Nilai Mentah CBT (Web Ujian Daring)
          </h3>
          <p className="text-xs text-slate-500">
            Nilai ujian dikirim langsung secara real-time dari server Web Ujian terpisah untuk proses penjurian panitia.
          </p>
        </div>

        <button
          onClick={onSyncScores}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-700 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Nilai Terbaru'}</span>
        </button>
      </div>

      {/* Scores Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-bold">
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
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {nilaiList.map((n, idx) => (
              <tr key={n.id} className="hover:bg-indigo-50/40 transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-xl text-xs font-black ${
                    idx === 0 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    idx === 1 ? 'bg-slate-200 text-slate-700 border border-slate-300' :
                    idx === 2 ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    #{n.peringkat || idx + 1}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-900 font-['Outfit']">{n.namaSiswa}</p>
                  <p className="text-[11px] text-slate-500">{n.asalSekolah}</p>
                </td>

                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {n.kategoriNama}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-mono">
                  <span className="text-base font-black text-emerald-600">{n.skor}</span>
                  <span className="text-[10px] text-slate-400 block">/ 100 poin</span>
                </td>

                <td className="py-3.5 px-4 font-mono text-xs">
                  <span className="text-emerald-700 font-bold">{n.jumlahBenar} B</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="text-rose-600 font-bold">{n.jumlahSalah} S</span>
                  <span className="text-slate-300 mx-1">•</span>
                  <span className="text-slate-500 font-semibold">{n.jumlahKosong} K</span>
                </td>

                <td className="py-3.5 px-4 text-slate-700 font-mono text-[11px]">
                  {n.waktuPengerjaan}
                  <span className="text-slate-400 block text-[10px]">{n.sesiUjian}</span>
                </td>

                <td className="py-3.5 px-4 text-right">
                  {n.statusLolos ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Lolos Finalis (Top 20)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                      Partisipan
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
        <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
        <span>
          Nilai ujian di atas divalidasi dengan token otentikasi antar-layanan (Internal API Key). Panitia dapat langsung mengekspor nilai untuk berita acara penjurian.
        </span>
      </div>

    </div>
  );
};
