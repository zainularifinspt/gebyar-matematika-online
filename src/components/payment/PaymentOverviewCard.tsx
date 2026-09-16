import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import type { Pembayaran } from '../../types';

interface PaymentOverviewCardProps {
  payment: Pembayaran;
  timeLeft: string;
}

export const PaymentOverviewCard: React.FC<PaymentOverviewCardProps> = ({
  payment,
  timeLeft,
}) => {
  const isPaid = payment.status === 'lunas';

  return (
    <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 border border-white/95 shadow-xl space-y-6 relative overflow-hidden">


      {/* Top Bar: Order ID & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/70">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Nomor Pesanan (Order ID)
          </span>
          <p className="text-lg font-mono font-black text-slate-900 tracking-wide mt-0.5">
            {payment.orderId}
          </p>
        </div>

        <div>
          {isPaid ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black glass-3d-emerald text-emerald-950 border border-emerald-300 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              LUNAS TERVERIFIKASI
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black glass-3d-amber text-amber-950 border border-amber-300 shadow-xs">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              MENUNGGU PEMBAYARAN
            </span>
          )}
        </div>
      </div>

      {/* Expiry Alert Countdown (if not paid) */}
      {!isPaid && (
        <div className="p-4 rounded-2xl glass-3d-amber border border-amber-300/90 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <p className="text-xs font-black text-amber-950">Batas Waktu Penyelesaian Pembayaran</p>
              <p className="text-[11px] text-amber-800 font-medium">Selesaikan sebelum batas waktu agar kuota tidak dibatalkan.</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-amber-800 font-bold block text-[10px] uppercase">Sisa Waktu:</span>
            <span className="text-lg font-mono font-black text-amber-950 tabular-nums">{timeLeft}</span>
          </div>
        </div>
      )}

      {/* Participant Information Box */}
      <div className="p-5 rounded-2xl glass-3d-base border border-white/90 space-y-3 text-xs">
        <span className="text-[11px] font-black text-indigo-700 uppercase tracking-wider block">
          Rincian Peserta Terdaftar
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div>
            <span className="text-slate-500 block text-[11px] font-semibold">Nama Lengkap Siswa:</span>
            <p className="text-sm font-black text-slate-900 font-['Outfit'] mt-0.5">{payment.peserta.namaSiswa}</p>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-semibold">Asal Sekolah:</span>
            <p className="text-sm font-bold text-slate-800 mt-0.5">{payment.peserta.asalSekolah}</p>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-semibold">Kategori Lomba:</span>
            <p className="text-xs font-bold text-indigo-700 mt-0.5">{payment.peserta.kategoriNama}</p>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px] font-semibold">Email & Kontak Pendaftar:</span>
            <p className="text-xs text-slate-700 font-mono mt-0.5">{payment.peserta.emailPendaftar}</p>
          </div>
        </div>
      </div>

      {/* Price Itemized Breakdown */}
      <div className="space-y-3 text-xs text-slate-600 pt-2 border-t border-slate-200/70">
        <div className="flex justify-between">
          <span className="text-slate-500 font-medium">Biaya Pendaftaran Lomba ({payment.peserta.tingkat})</span>
          <span className="font-bold text-slate-800 tabular-nums">Rp {payment.jumlah.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-medium">Biaya Layanan Gerbang Pembayaran (Midtrans)</span>
          <span className="font-bold text-slate-800 tabular-nums">Rp {payment.biayaLayanan.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-200 text-sm font-bold text-slate-900">
          <span className="font-black">Total Tagihan Lunas</span>
          <span className="text-2xl font-black text-indigo-700 font-['Outfit'] tabular-nums">
            Rp {payment.total.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5 text-[11px] text-slate-600 glass-3d-base p-3.5 rounded-xl border border-white/90">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Diproses aman dengan enkripsi <strong>Midtrans Payment Gateway</strong> bersertifikasi PCI-DSS.</span>
      </div>

    </div>
  );
};
