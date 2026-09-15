import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  CheckCircle2, 
  Clock, 
  Printer, 
  X
} from 'lucide-react';
import type { SiswaBimbinganItem } from '../../types';

interface GuruSiswaTabProps {
  siswaList: SiswaBimbinganItem[];
  onOpenCardModal: (siswa: SiswaBimbinganItem) => void;
  onNavigateTab: (tab: 'tagihan') => void;
}

export const GuruSiswaTab: React.FC<GuruSiswaTabProps> = ({
  siswaList,
  onOpenCardModal,
  onNavigateTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'semua' | 'lunas' | 'menunggu_pembayaran'>('semua');
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const filteredList = siswaList.filter((siswa) => {
    const matchesSearch = 
      siswa.namaSiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nisn.includes(searchTerm) ||
      (siswa.nomorPeserta && siswa.nomorPeserta.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'semua' || siswa.statusPembayaran === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleBulkDownloadCards = () => {
    const readyCount = siswaList.filter(s => s.kartuTersedia).length;
    setDownloadSuccessMsg(`Sedang memproses ${readyCount} kartu peserta dalam format berkas ZIP/PDF resmi...`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4000);
  };

  const handleExportCsv = () => {
    setDownloadSuccessMsg(`Data ${siswaList.length} siswa sekolah berhasil diekspor ke format Excel (.xlsx).`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Toast alert for downloads */}
      {downloadSuccessMsg && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessMsg}</span>
          </div>
          <button onClick={() => setDownloadSuccessMsg(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit']">
            Daftar Siswa Bimbingan Sekolah
          </h2>
          <p className="text-xs text-slate-500">
            Total {siswaList.length} siswa bimbingan terdaftar.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm text-xs font-semibold transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={handleBulkDownloadCards}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Semua Kartu (ZIP)</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl glass-panel border border-slate-200/80 shadow-sm bg-white/80">
        
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan nama siswa, NISN, atau no. peserta..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 shadow-sm"
          >
            <option value="semua">Semua Status Bayar</option>
            <option value="lunas">Hanya yang Lunas</option>
            <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
          </select>
        </div>

      </div>

      {/* Students Data Table */}
      <div className="rounded-3xl glass-panel border border-slate-200/80 overflow-hidden shadow-sm bg-white/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                <th className="py-3.5 px-4">No</th>
                <th className="py-3.5 px-4">Nama Siswa / NISN</th>
                <th className="py-3.5 px-4">Kelas</th>
                <th className="py-3.5 px-4">Kategori Lomba</th>
                <th className="py-3.5 px-4">Status Bayar</th>
                <th className="py-3.5 px-4">No. Peserta & Sesi</th>
                <th className="py-3.5 px-4 text-right">Aksi Dokumen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-semibold text-slate-700">Tidak ada siswa yang sesuai pencarian</p>
                    <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
                  </td>
                </tr>
              ) : (
                filteredList.map((siswa, idx) => (
                  <tr key={siswa.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 font-mono">
                      {idx + 1}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div>{siswa.namaSiswa}</div>
                      <div className="text-[10px] text-slate-400 font-mono font-normal">
                        NISN: {siswa.nisn}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {siswa.kelas}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700">
                        {siswa.kategoriNama}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {siswa.statusPembayaran === 'lunas' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Lunas
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Menunggu
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700">
                      {siswa.kartuTersedia ? (
                        <div>
                          <div className="font-mono text-purple-700 font-bold text-[11px]">
                            {siswa.nomorPeserta}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {siswa.sesiUjian}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">
                          Menunggu pelunasan
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {siswa.kartuTersedia ? (
                        <button
                          onClick={() => onOpenCardModal(siswa)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold shadow-sm transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Cetak Kartu</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateTab('tagihan')}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold shadow-sm transition-colors"
                        >
                          <span>Bayar</span>
                        </button>
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
