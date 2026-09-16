import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Receipt, 
  X,
  Copy
} from 'lucide-react';
import type { TagihanKolektifItem } from '../../types';

interface GuruTagihanTabProps {
  tagihanList: TagihanKolektifItem[];
  onMarkInvoicePaid: (orderId: string) => void;
}

export const GuruTagihanTab: React.FC<GuruTagihanTabProps> = ({
  tagihanList,
  onMarkInvoicePaid,
}) => {
  const [selectedInvoiceForPay, setSelectedInvoiceForPay] = useState<TagihanKolektifItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadReceipt = (orderId: string) => {
    setDownloadMsg(`Kuitansi lunas resmi untuk ${orderId} berhasil diunduh (Format PDF resmi GM 2027).`);
    setTimeout(() => setDownloadMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Toast Alert */}
      {downloadMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadMsg}</span>
          </div>
          <button onClick={() => setDownloadMsg(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-['Outfit']">
            Tagihan & Riwayat Pembayaran Kolektif
          </h2>
          <p className="text-xs text-slate-500">
            Daftar invoice pendaftaran siswa sekolah yang dikelola secara terpusat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
            Gerbang Pembayaran Otomatis
          </span>
        </div>
      </div>

      {/* Invoice Cards List */}
      <div className="space-y-4">
        {tagihanList.length === 0 ? (
          <div className="rounded-3xl glass-panel p-12 border border-slate-200/80 bg-white/80 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">Belum Ada Tagihan Kolektif</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Invoice pembayaran otomatis dibuat saat Anda mendaftarkan siswa bimbingan delegasi sekolah pada tab &quot;Daftar Siswa Baru&quot;.
            </p>
          </div>
        ) : (
          tagihanList.map((tagihan) => {
          const isLunas = tagihan.status === 'lunas';

          return (
            <div
              key={tagihan.id}
              className={`rounded-3xl glass-panel p-5 sm:p-6 border transition-all bg-white/80 shadow-sm ${
                isLunas ? 'border-slate-200/80' : 'border-amber-200 bg-amber-50/20'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {tagihan.orderId}
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
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {tagihan.metode.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Dibuat pada: {tagihan.tanggal}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-medium">Total Tagihan</p>
                    <p className="text-lg font-black text-slate-900 font-['Outfit']">
                      Rp {tagihan.totalBiaya.toLocaleString('id-ID')}
                    </p>
                  </div>

                  {isLunas ? (
                    <button
                      onClick={() => handleDownloadReceipt(tagihan.orderId)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-sm"
                    >
                      <Receipt className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Unduh Kuitansi</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedInvoiceForPay(tagihan)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold transition-all shadow-sm"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Bayar Sekarang</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Included Students List */}
              <div className="pt-4 space-y-2">
                <p className="text-[11px] font-semibold text-slate-500">
                  Daftar {tagihan.jumlahSiswa} Siswa Terdaftar dalam Tagihan Ini:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tagihan.rincianSiswa.map((siswaName, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-medium"
                    >
                      {siswaName}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })
      )}
      </div>

      {/* Payment Simulation Modal */}
      {selectedInvoiceForPay && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-white p-6 sm:p-7 border border-slate-200 shadow-2xl space-y-5 animate-scale-up">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">Pembayaran Tagihan Kolektif</h3>
                  <p className="text-[10px] font-mono text-slate-500">{selectedInvoiceForPay.orderId}</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedInvoiceForPay(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-center">
              <span className="text-xs text-slate-500">Total yang harus dibayar:</span>
              <p className="text-2xl font-black text-slate-900 font-['Outfit']">
                Rp {selectedInvoiceForPay.totalBiaya.toLocaleString('id-ID')}
              </p>

              {selectedInvoiceForPay.metode === 'QRIS' ? (
                <div className="space-y-3 pt-2">
                  <div className="w-44 h-44 bg-white p-2.5 rounded-2xl mx-auto flex items-center justify-center border border-slate-200 shadow-sm">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021226590014ID.LINKAJA.WWW01189360091100223344550215GM27KOL889100303UMI51440014ID.CO.QRIS.WWW0215ID10200234567895204541153033605802ID5920GEBYAR%20MATEMATIKA6013KOTA%20BANJARMASIN61054011562070703A016304C92A" 
                      alt="QRIS Code" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">Pindai kode QRIS menggunakan m-Banking atau e-Wallet apa saja</p>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <p className="text-[11px] text-slate-500">Nomor Rekening Virtual Account BNI:</p>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="font-mono text-sm font-bold text-indigo-600">8808 1234 9920 1001</span>
                    <button 
                      onClick={() => handleCopy('8808123499201001')}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 font-medium"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedCode ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Simulate instant payment button */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  onMarkInvoicePaid(selectedInvoiceForPay.orderId);
                  setSelectedInvoiceForPay(null);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulasikan Pembayaran Berhasil (Verifikasi Otomatis)</span>
              </button>

              <button
                onClick={() => setSelectedInvoiceForPay(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                Tutup Jendela
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
