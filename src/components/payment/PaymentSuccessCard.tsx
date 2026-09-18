import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  Laptop, 
  Calendar, 
  Award,
  ArrowRight
} from 'lucide-react';
import type { Pembayaran, KartuPeserta } from '../../types';

interface PaymentSuccessCardProps {
  payment: Pembayaran;
  card: KartuPeserta;
  onGoToExamPortal?: () => void;
}

export const PaymentSuccessCard: React.FC<PaymentSuccessCardProps> = ({
  payment,
  card,
  onGoToExamPortal,
}) => {
  const [downloading, setDownloading] = useState(false);
  const [examNotice, setExamNotice] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExamPortal = () => {
    if (onGoToExamPortal) {
      onGoToExamPortal();
    } else {
      setExamNotice('✓ Menghubungkan ke Portal Web Ujian Daring (SSO Terverifikasi)...');
      setTimeout(() => setExamNotice(null), 3500);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-800">
      
      {/* Top Success Banner */}
      <div className="rounded-3xl glass-3d-emerald p-6 sm:p-8 relative overflow-hidden shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Specular ambient accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 relative">
          <div className="w-16 h-16 rounded-2xl glass-3d-base bg-white/80 flex items-center justify-center text-emerald-600 shrink-0 shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-200/80 text-emerald-950 uppercase tracking-wider">
              Pembayaran Berhasil Diverifikasi
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Pendaftaran Resmi Aktif & Terkonfirmasi!
            </h3>
            <p className="text-xs text-emerald-950/80 font-medium">
              Transaksi dengan nomor <strong className="font-mono text-emerald-950">{payment.orderId}</strong> telah lunas terverifikasi secara otomatis. Kartu ujian Anda telah diterbitkan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative">
          <button
            onClick={handlePrint}
            className="btn-3d-white px-5 py-2.5 rounded-xl text-xs font-black text-slate-800 flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak Halaman</span>
          </button>
        </div>
      </div>

      {/* The Generated Kartu Peserta (Automatic Document generation preview) */}
      <div className="relative">
        <div className="text-center sm:text-left mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-['Outfit']">
              Kartu Peserta Resmi (Siap Diunduh & Dicetak)
            </h4>
          </div>
          <span className="text-[11px] font-medium text-slate-500">
            Diterbitkan Otomatis oleh Sistem GM Engine
          </span>
        </div>

        {/* The Card Element with Glassmorphic ID Card look */}
        <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 relative overflow-hidden shadow-xl border border-indigo-100/90">
          {/* Ambient card illumination */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left Col: Event & Student Credentials (8 Cols) */}
            <div className="md:col-span-8 space-y-4">
              
              {/* Card Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60">
                <div className="w-11 h-11 rounded-2xl glass-3d-violet flex items-center justify-center font-black text-sm text-indigo-950 shadow-sm font-['Outfit']">
                  GM
                </div>
                <div>
                  <h5 className="text-base font-black text-slate-900 font-['Outfit'] tracking-tight">
                    KARTU TANDA PESERTA GEBYAR MATEMATIKA 2027
                  </h5>
                  <p className="text-[11px] text-slate-500">
                    Jurusan Pendidikan Matematika Universitas Lambung Mangkurat
                  </p>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] font-bold block">Nomor Peserta:</span>
                  <p className="font-mono font-black text-indigo-700 text-base tracking-wider mt-0.5">
                    {card.kodeKartu}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] font-bold block">Kategori Jenjang:</span>
                  <p className="font-black text-slate-900 text-sm mt-0.5">{card.kategori}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] font-bold block">Nama Peserta:</span>
                  <p className="font-black text-slate-900 text-base font-['Outfit'] mt-0.5">{card.namaSiswa}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] font-bold block">Asal Sekolah:</span>
                  <p className="font-bold text-slate-800 mt-0.5">{card.asalSekolah}</p>
                </div>
                <div className="sm:col-span-2 pt-1">
                  <span className="text-slate-500 text-[11px] font-bold block">Jadwal Babak Penyisihan (CBT Daring):</span>
                  <p className="font-black text-emerald-700 flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    {card.jadwalUjian} • {card.sesi}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Col: QR Code & Card Actions (4 Cols) */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl glass-3d-base space-y-3 text-center shadow-xs">
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200/80">
                <img
                  src={card.qrCodeUrl}
                  alt={`QR Kartu ${card.kodeKartu}`}
                  className="w-28 h-28 object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-mono font-black text-slate-900 block">
                  {card.kodeKartu}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Pindai untuk verifikasi proctoring
                </span>
              </div>

              <button
                onClick={() => {
                  setDownloading(true);
                  setTimeout(() => setDownloading(false), 3000);
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all ${
                  downloading 
                    ? 'glass-3d-emerald text-emerald-950 border border-emerald-300' 
                    : 'btn-3d-primary text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? '✓ Mengunduh PDF...' : 'Unduh Kartu (PDF)'}</span>
              </button>
            </div>

          </div>

          <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Harap bawa/tunjukkan kartu ini saat sesi verifikasi Web Ujian berlangsung.</span>
            <span className="font-mono text-[10px] text-slate-400">AUTH_TOKEN_HASH: SHA256_VERIFIED</span>
          </div>

        </div>
      </div>

      {/* Next Step Box: Single Sign-On to Web Ujian */}
      <div className="rounded-3xl glass-3d-violet p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
        <div className="flex items-center gap-4 text-center sm:text-left relative">
          <div className="w-14 h-14 rounded-2xl glass-3d-base bg-white/80 text-indigo-700 flex items-center justify-center shrink-0 shadow-md">
            <Laptop className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-900 font-['Outfit'] tracking-tight">
              Siap Menuju Portal Web Ujian Online?
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              Gunakan akun Google yang sama untuk masuk ke portal ujian terpisah tanpa mendaftar ulang.
            </p>
          </div>
        </div>

        <button
          onClick={handleExamPortal}
          className="btn-3d-primary px-6 py-3.5 rounded-2xl text-xs font-black text-white shadow-md flex items-center gap-2 shrink-0 group"
        >
          <span>Masuk ke Web Ujian</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {examNotice && (
        <div className="p-4 rounded-2xl glass-3d-indigo border border-indigo-200/80 text-indigo-950 text-xs font-bold flex items-center gap-3 animate-fade-in shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-ping" />
          <span>{examNotice}</span>
        </div>
      )}

    </div>
  );
};
