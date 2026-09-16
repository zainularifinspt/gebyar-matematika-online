import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Printer, 
  CreditCard, 
  X,
  History
} from 'lucide-react';
import type { BatchPendaftaranItem, GuruProfileData } from '../../types';

interface GuruRiwayatPendaftaranTabProps {
  batches: BatchPendaftaranItem[];
  profile: GuruProfileData;
  onNavigateTab: (tab: 'daftar' | 'tagihan') => void;
}

export const GuruRiwayatPendaftaranTab: React.FC<GuruRiwayatPendaftaranTabProps> = ({
  batches,
  profile,
  onNavigateTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'semua' | 'lunas' | 'menunggu_pembayaran'>('semua');
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(batches[0]?.id || null);
  const [selectedBatchModal, setSelectedBatchModal] = useState<BatchPendaftaranItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredBatches = batches.filter((b) => {
    const matchesSearch = 
      b.batchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.peserta.some(p => p.nama.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = 
      statusFilter === 'semua' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalSiswa = batches.reduce((acc, b) => acc + b.jumlahPeserta, 0);
  const totalBiayaAkumulasi = batches.reduce((acc, b) => acc + b.totalBiaya, 0);
  const totalDiskon = batches.reduce((acc, b) => acc + b.diskonKolektif, 0);

  const toggleExpand = (id: string) => {
    setExpandedBatchId(prev => prev === id ? null : id);
  };

  const handleDownloadFaktur = (batchCode: string) => {
    setToastMessage(`Faktur Berkas Pendaftaran Resmi ${batchCode} berhasil diunduh (Format PDF).`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportExcel = () => {
    setToastMessage(`Seluruh rekapitulasi riwayat pendaftaran ${profile.sekolah} berhasil diekspor ke Excel.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 text-slate-900 text-xs font-semibold shadow-xl animate-fade-in backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-200/80 shadow-sm bg-white/80 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <History className="w-3.5 h-3.5 text-indigo-600" />
          Rekapitulasi Pengajuan Pendaftaran
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
          Riwayat Pendaftaran Kolektif Sekolah
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Arsip seluruh pengajuan pendaftaran siswa per gelombang. Setiap pengajuan dilengkapi 
          kode batch unik, rincian siswa terdaftar, faktur berkas pendaftaran resmi, serta status verifikasi keuangan.
        </p>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm bg-white/80">
          <span className="text-xs font-semibold text-slate-500">Total Pengajuan Batch</span>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">{batches.length}</p>
            <span className="text-xs text-slate-500">Batch</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Didaftarkan oleh {profile.nama}</p>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm bg-white/80">
          <span className="text-xs font-semibold text-slate-500">Total Siswa Terdaftar</span>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-2xl sm:text-3xl font-black text-indigo-600 font-['Outfit']">{totalSiswa}</p>
            <span className="text-xs text-slate-500">Siswa</span>
          </div>
          <p className="text-[11px] text-indigo-600/80 mt-1">{profile.sekolah}</p>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm bg-white/80">
          <span className="text-xs font-semibold text-slate-500">Total Transaksi Pendaftaran</span>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
              Rp {totalBiayaAkumulasi.toLocaleString('id-ID')}
            </p>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Akumulasi seluruh batch</p>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm bg-white/80">
          <span className="text-xs font-semibold text-slate-500">Diskon Kolektif Didapat</span>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-xl sm:text-2xl font-black text-emerald-600 font-['Outfit']">
              Rp {totalDiskon.toLocaleString('id-ID')}
            </p>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">Potongan resmi sekolah</p>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-slate-200/80 shadow-sm bg-white/80">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nomor batch, order ID, atau nama siswa..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-sm"
          >
            <option value="semua">Semua Status</option>
            <option value="lunas">Lunas Terverifikasi</option>
            <option value="menunggu_pembayaran">Menunggu Pembayaran</option>
          </select>

          <button
            onClick={handleExportExcel}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm text-xs font-semibold transition-all shrink-0"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Export Excel</span>
          </button>
        </div>
      </div>

      {/* Batches Accordion / Cards List */}
      <div className="space-y-4">
        {filteredBatches.length === 0 ? (
          <div className="rounded-3xl glass-panel p-12 text-center text-slate-500 border border-slate-200/80 bg-white/80 shadow-sm">
            <p className="text-sm font-semibold text-slate-700">Tidak ada data riwayat pendaftaran yang cocok.</p>
            <p className="text-xs text-slate-400 mt-1">Coba atur ulang kata kunci pencarian Anda.</p>
          </div>
        ) : (
          filteredBatches.map((batch) => {
            const isExpanded = expandedBatchId === batch.id;
            const isLunas = batch.status === 'lunas';

            return (
              <div 
                key={batch.id}
                className={`rounded-3xl glass-panel border transition-all overflow-hidden bg-white/80 shadow-sm ${
                  isLunas ? 'border-slate-200/80' : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                
                {/* Batch Header Bar */}
                <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-xs font-extrabold text-slate-900 font-mono bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {batch.batchCode}
                      </span>

                      <span className="text-xs font-mono text-slate-500">
                        {batch.orderId}
                      </span>

                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                        {batch.gelombang}
                      </span>

                      {isLunas ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Lunas Terverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-500" />
                          Menunggu Pembayaran
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Tanggal Pengajuan: {batch.tanggalDaftar}</span>
                      <span>•</span>
                      <span>Metode: <strong>{batch.metode.replace('_', ' ')}</strong></span>
                    </p>
                  </div>

                  {/* Financial Summary & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Total Tagihan ({batch.jumlahPeserta} Siswa)</p>
                      <p className="text-base sm:text-lg font-black text-slate-900 font-['Outfit']">
                        Rp {batch.totalBiaya.toLocaleString('id-ID')}
                      </p>
                      {batch.diskonKolektif > 0 && (
                        <p className="text-[10px] text-emerald-600 font-semibold">
                          Hemat Diskon: Rp {batch.diskonKolektif.toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isLunas ? (
                        <button
                          onClick={() => handleDownloadFaktur(batch.batchCode)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm transition-colors"
                          title="Unduh Berkas Faktur PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="hidden sm:inline">Faktur PDF</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigateTab('tagihan')}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Bayar</span>
                        </button>
                      )}

                      <button
                        onClick={() => toggleExpand(batch.id)}
                        className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition-colors"
                        title={isExpanded ? 'Tutup Rincian' : 'Buka Rincian'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                </div>

                {/* Expanded Students Details Table */}
                {isExpanded && (
                  <div className="border-t border-slate-200 p-5 bg-slate-50/60 animate-fade-in space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        Rincian Peserta dalam Pengajuan Ini ({batch.peserta.length} Siswa):
                      </span>
                      <button
                        onClick={() => setSelectedBatchModal(batch)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline"
                      >
                        Lihat Format Cetak Resmi
                      </button>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <th className="py-2.5 px-3">No</th>
                            <th className="py-2.5 px-3">Nama Siswa</th>
                            <th className="py-2.5 px-3">NISN</th>
                            <th className="py-2.5 px-3">Kelas</th>
                            <th className="py-2.5 px-3">Kategori Lomba</th>
                            <th className="py-2.5 px-3 text-right">Biaya Registrasi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {batch.peserta.map((siswa, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/70">
                              <td className="py-2.5 px-3 text-slate-400 font-mono">{idx + 1}</td>
                              <td className="py-2.5 px-3 font-semibold text-slate-900">{siswa.nama}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-500">{siswa.nisn}</td>
                              <td className="py-2.5 px-3">{siswa.kelas}</td>
                              <td className="py-2.5 px-3">{siswa.kategori}</td>
                              <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-medium">
                                Rp {siswa.biaya.toLocaleString('id-ID')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Official Batch Print Preview Modal */}
      {selectedBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 animate-scale-up">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                  Formulir Rekapitulasi Pendaftaran Batch Resmi
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBatchModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm font-['Outfit']">
                    GEBYAR MATEMATIKA NASIONAL 2027
                  </h4>
                  <p className="text-[10px] text-slate-500">Bukti Registrasi Peserta Kolektif Sekolah</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-indigo-600">{selectedBatchModal.batchCode}</span>
                  <p className="text-[10px] text-slate-500">{selectedBatchModal.tanggalDaftar}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-500">Sekolah Asal:</span>
                  <p className="font-semibold text-slate-900">{profile.sekolah}</p>
                  <p className="text-[10px] text-slate-500">NPSN: {profile.npsn}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500">Guru Pendamping / Pendaftar:</span>
                  <p className="font-semibold text-slate-900">{profile.nama}</p>
                  <p className="text-[10px] text-slate-500">{profile.telepon}</p>
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-semibold text-slate-900 text-[11px]">Daftar Siswa:</p>
                <div className="rounded-lg border border-slate-200 overflow-hidden bg-white">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Nama</th>
                        <th className="py-2 px-3">NISN</th>
                        <th className="py-2 px-3">Kelas</th>
                        <th className="py-2 px-3 text-right">Biaya</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedBatchModal.peserta.map((p, idx) => (
                        <tr key={idx}>
                          <td className="py-2 px-3 text-slate-900 font-medium">{p.nama}</td>
                          <td className="py-2 px-3 font-mono text-slate-500">{p.nisn}</td>
                          <td className="py-2 px-3 text-slate-600">{p.kelas}</td>
                          <td className="py-2 px-3 text-right font-mono text-slate-900">
                            Rp {p.biaya.toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Total Biaya Pendaftaran:</span>
                <span className="font-black text-sm text-slate-900 font-mono">
                  Rp {selectedBatchModal.totalBiaya.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedBatchModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Rekap Batch</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
