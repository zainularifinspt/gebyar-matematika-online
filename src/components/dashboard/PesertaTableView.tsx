import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import type { PesertaAdminItem } from '../../types';

interface PesertaTableViewProps {
  pesertaList: PesertaAdminItem[];
  onManualVerify?: (id: string) => void;
  onExportCsv?: () => void;
}

export const PesertaTableView: React.FC<PesertaTableViewProps> = ({
  pesertaList,
  onManualVerify,
  onExportCsv,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPeserta = pesertaList.filter((p) => {
    const matchQuery = 
      p.namaSiswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.asalSekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.namaPendaftar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.orderId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = categoryFilter === 'all' || p.kategoriId === categoryFilter;
    const matchStatus = statusFilter === 'all' || p.statusPembayaran === statusFilter;

    return matchQuery && matchCategory && matchStatus;
  });

  return (
    <div className="rounded-3xl glass-3d-dashboard-shell overflow-hidden space-y-6 animate-fade-in p-6 sm:p-8 shadow-xl shadow-indigo-950/5">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, sekolah, pendaftar, atau Order ID..."
            className="glass-3d-input w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl text-slate-900 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Filter Dropdowns & Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="glass-3d-input px-3.5 py-2.5 text-xs rounded-2xl text-slate-800 font-bold cursor-pointer"
          >
            <option value="all">Semua Jenjang</option>
            <option value="kat-sd">SD / MI</option>
            <option value="kat-smp">SMP / MTs</option>
            <option value="kat-sma">SMA / MA / SMK</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-3d-input px-3.5 py-2.5 text-xs rounded-2xl text-slate-800 font-bold cursor-pointer"
          >
            <option value="all">Semua Status Bayar</option>
            <option value="lunas">Lunas</option>
            <option value="menunggu_pembayaran">Menunggu Bayar</option>
          </select>

          <button
            onClick={onExportCsv}
            className="btn-3d-primary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Data</span>
          </button>
        </div>

      </div>

      {/* Table of Students & Registrants */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white/60 backdrop-blur-md shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/70 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200/80 font-black">
            <tr>
              <th className="py-3.5 px-4">Nama Siswa & Kelas</th>
              <th className="py-3.5 px-4">Asal Sekolah & Kota</th>
              <th className="py-3.5 px-4">Kategori Lomba</th>
              <th className="py-3.5 px-4">Data Pendaftar (Akun)</th>
              <th className="py-3.5 px-4">Order ID & Tanggal</th>
              <th className="py-3.5 px-4">Status Bayar</th>
              <th className="py-3.5 px-4 text-right">Kartu Peserta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {filteredPeserta.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500 font-medium">
                  Tidak ditemukan data peserta yang cocok dengan kriteria pencarian.
                </td>
              </tr>
            ) : (
              filteredPeserta.map((p) => {
                const isPaid = p.statusPembayaran === 'lunas';
                return (
                  <tr key={p.id} className="hover:bg-indigo-50/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900 font-['Outfit'] text-sm">{p.namaSiswa}</p>
                      <span className="text-[11px] text-slate-500 font-medium">{p.kelas}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{p.asalSekolah}</p>
                      <span className="text-[11px] text-slate-500 font-medium">{p.kota}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
                        {p.kategoriNama}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{p.namaPendaftar}</p>
                      <span className="text-[11px] text-slate-500 block font-mono">{p.emailPendaftar}</span>
                      <span className="text-[10px] text-indigo-600 font-bold">{p.rolePendaftar}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-slate-900 font-bold">{p.orderId}</span>
                      <span className="text-[10px] text-slate-400 block">{p.tanggalDaftar}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {isPaid ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          Lunas
                        </span>
                      ) : (
                        <div className="space-y-1.5">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            Menunggu
                          </span>
                          {onManualVerify && (
                            <button
                              onClick={() => onManualVerify(p.id)}
                              className="btn-3d-white text-[10px] text-indigo-700 hover:text-indigo-900 font-bold px-2 py-0.5 rounded-md border border-indigo-200 shadow-2xs block cursor-pointer transition-all"
                            >
                              ✓ Verifikasi Manual
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {p.kartuTercetak ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-300 shadow-2xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Siap Cetak
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">
                          Belum Aktif
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200/60 font-medium">
        <span>Menampilkan <strong className="text-slate-900 font-mono">{filteredPeserta.length}</strong> dari total <strong className="text-slate-900 font-mono">{pesertaList.length}</strong> peserta terdaftar</span>
        <span className="text-[11px] text-slate-500">Privasi data siswa dilindungi standar keamanan GM 2027</span>
      </div>

    </div>
  );
};
