import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Zap
} from 'lucide-react';
import type { Pembayaran } from '../../types';

interface QrisPaymentCardProps {
  payment: Pembayaran;
  onSimulatePay: () => void;
  isProcessing: boolean;
}

export const QrisPaymentCard: React.FC<QrisPaymentCardProps> = ({
  payment,
  onSimulatePay,
  isProcessing,
}) => {
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownloadQr = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 border border-white/95 shadow-xl space-y-6 relative overflow-hidden">
      {/* Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

      {/* Title & E-Wallet Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-rose-100/90 text-rose-950 border border-rose-300 uppercase tracking-wider shadow-xs">
              QRIS Nasional
            </span>
            <span className="text-xs text-slate-500 font-bold">Konfirmasi Otomatis Real-Time</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
            Pindai Kode QRIS Midtrans
          </h3>
        </div>

        {/* Supported badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['GoPay', 'OVO', 'DANA', 'ShopeePay', 'BCA Mobile', 'Livin'].map((wallet) => (
            <span 
              key={wallet} 
              className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200/90 text-[10px] font-bold text-slate-700 shadow-xs"
            >
              {wallet}
            </span>
          ))}
        </div>
      </div>

      {/* Center: 3D QR Code Display Card */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl glass-3d-base border border-white/90 space-y-4 shadow-inner">
        
        <div className="relative p-5 rounded-3xl bg-white shadow-xl border border-slate-200/80 max-w-[260px] w-full text-center">
          {/* Mock QRIS Header Banner */}
          <div className="bg-rose-600 text-white font-black text-[10px] py-1 px-3 rounded-lg mb-3 tracking-widest font-sans flex items-center justify-between shadow-xs">
            <span>QRIS</span>
            <span className="text-[8px] font-normal tracking-normal">NMID: ID102003910</span>
          </div>

          {/* Dynamic Generated QR Visual */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=MIDTRANS-QRIS-${payment.orderId}-TOTAL-${payment.total}`}
            alt="QRIS Midtrans"
            className="w-full aspect-square object-contain mx-auto rounded-xl shadow-xs"
          />

          {/* Merchant Name */}
          <div className="mt-3 text-[10px] font-black text-slate-900 border-t border-slate-200 pt-2 tracking-wide">
            PANITIA GEBYAR MATEMATIKA ONLINE
          </div>
        </div>

        <div className="text-center space-y-1">
          <p className="text-xs font-bold text-slate-700">
            Total Tagihan:{' '}
            <span className="font-black text-emerald-600 font-['Outfit'] text-base tabular-nums">
              Rp {payment.total.toLocaleString('id-ID')}
            </span>
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Pindai dengan kamera atau aplikasi perbankan apa saja yang mendukung standar QRIS
          </p>
        </div>

        {/* Action Buttons for QR */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-sm pt-2">
          <button
            onClick={handleDownloadQr}
            className="btn-3d-white flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>{downloadNotice ? 'Tersimpan!' : 'Unduh Gambar QR'}</span>
          </button>

          {/* Instant Sandbox Payment Simulator Button */}
          <button
            onClick={onSimulatePay}
            disabled={isProcessing}
            className="btn-3d-primary flex-1 py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{isProcessing ? 'Memverifikasi...' : 'Simulasi Bayar Lunas'}</span>
          </button>
        </div>
      </div>

      {/* Step by step instructions (3D Glass Box) */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-indigo-600" />
          Petunjuk Pembayaran QRIS:
        </h4>
        <ol className="p-5 rounded-2xl glass-3d-base border border-white/90 space-y-2.5 text-xs text-slate-700 list-decimal pl-7 font-medium">
          <li>Buka aplikasi mobile banking (BCA, Mandiri, BRI, BNI) atau e-wallet (GoPay, OVO, DANA, ShopeePay) Anda.</li>
          <li>Pilih menu <strong>Pindai / Scan QRIS</strong>.</li>
          <li>Arahkan kamera ke barcode QR di atas atau unggah tangkapan layar yang sudah diunduh.</li>
          <li>Pastikan nama merchant adalah <strong>PANITIA GEBYAR MATEMATIKA ONLINE</strong>.</li>
          <li>Konfirmasi dan masukkan PIN transaksi Anda. Halaman ini akan berganti otomatis ke status lunas.</li>
        </ol>
      </div>

    </div>
  );
};
