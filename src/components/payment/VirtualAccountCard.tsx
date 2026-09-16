import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Building2, 
  Zap
} from 'lucide-react';
import type { Pembayaran, MetodePembayaran } from '../../types';

interface VirtualAccountCardProps {
  payment: Pembayaran;
  onSimulatePay: () => void;
  isProcessing: boolean;
}

interface BankInfo {
  id: MetodePembayaran;
  name: string;
  code: string;
  vaNumber: string;
  color: string;
}

export const VirtualAccountCard: React.FC<VirtualAccountCardProps> = ({
  payment,
  onSimulatePay,
  isProcessing,
}) => {
  const [selectedBank, setSelectedBank] = useState<MetodePembayaran>('BCA_VA');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'m-banking' | 'atm' | 'i-banking'>('m-banking');

  const banks: BankInfo[] = [
    { id: 'BCA_VA', name: 'Bank BCA', code: '014', vaNumber: '88390' + '81298765432', color: 'text-blue-600' },
    { id: 'MANDIRI_VA', name: 'Bank Mandiri', code: '008', vaNumber: '89508' + '81234567890', color: 'text-amber-600' },
    { id: 'BNI_VA', name: 'Bank BNI', code: '009', vaNumber: '82770' + '89876543210', color: 'text-orange-600' },
    { id: 'BRI_VA', name: 'Bank BRI', code: '002', vaNumber: '10290' + '81122334455', color: 'text-cyan-600' },
  ];

  const currentBank = banks.find(b => b.id === selectedBank) || banks[0];

  const handleCopyVa = () => {
    navigator.clipboard.writeText(currentBank.vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 space-y-6 relative overflow-hidden text-slate-800">
      {/* Specular ambient accent */}
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

      {/* Title & Bank Tabs */}
      <div className="space-y-4 pb-5 border-b border-slate-200/60 relative">
        <div>
          <span className="px-3 py-1 rounded-full text-[11px] font-black glass-3d-violet text-indigo-950 uppercase tracking-wider">
            Virtual Account Resmi
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight mt-2">
            Pilih Bank Virtual Account
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Nomor rekening virtual unik langsung aktif tanpa perlu konfirmasi manual panitia.
          </p>
        </div>

        {/* Bank Option Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden ${
                selectedBank === bank.id
                  ? 'glass-3d-violet ring-2 ring-indigo-500 shadow-md translate-y-[-2px]'
                  : 'glass-3d-base hover:bg-white/80 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <Building2 className={`w-4 h-4 ${bank.color}`} />
                {selectedBank === bank.id && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                )}
              </div>
              <p className="text-xs font-black text-slate-900 font-['Outfit']">{bank.name}</p>
              <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">Otomatis Lunas</span>
            </button>
          ))}
        </div>
      </div>

      {/* VA Number Card */}
      <div className="p-6 rounded-2xl glass-3d-base border border-slate-200/80 space-y-4 shadow-sm relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Nomor Rekening Virtual ({currentBank.name})
            </span>
            <p className="text-2xl sm:text-3xl font-mono font-black text-slate-900 tracking-widest mt-1 drop-shadow-xs">
              {currentBank.vaNumber}
            </p>
          </div>

          <button
            onClick={handleCopyVa}
            className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md shrink-0 active:scale-95 ${
              copied
                ? 'glass-3d-emerald text-emerald-950 ring-1 ring-emerald-500'
                : 'btn-3d-primary text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Salin Nomor VA</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-700">
            Total Transfer: <strong className="text-slate-900 font-['Outfit'] text-sm font-black tabular-nums">Rp {payment.total.toLocaleString('id-ID')}</strong> (tepat sesuai nominal)
          </div>

          {/* Instant Sandbox Payment Trigger */}
          <button
            onClick={onSimulatePay}
            disabled={isProcessing}
            className="btn-3d-emerald inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-emerald-950 shadow-sm transition-all self-start sm:self-auto hover:scale-105 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
            <span>{isProcessing ? 'Memverifikasi...' : 'Simulasi Bayar Lunas'}</span>
          </button>
        </div>
      </div>

      {/* Instructional Tabs */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-200/60 pb-2">
          <button
            onClick={() => setActiveTab('m-banking')}
            className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all ${
              activeTab === 'm-banking'
                ? 'glass-3d-violet text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mobile Banking
          </button>
          <button
            onClick={() => setActiveTab('atm')}
            className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all ${
              activeTab === 'atm'
                ? 'glass-3d-violet text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mesin ATM
          </button>
          <button
            onClick={() => setActiveTab('i-banking')}
            className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all ${
              activeTab === 'i-banking'
                ? 'glass-3d-violet text-indigo-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Internet Banking
          </button>
        </div>

        {/* Content based on tab */}
        <div className="p-4 rounded-2xl glass-3d-base border border-slate-200/70 text-xs text-slate-700 space-y-2">
          {activeTab === 'm-banking' && (
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed font-medium">
              <li>Buka aplikasi Mobile Banking {currentBank.name} Anda dan lakukan login.</li>
              <li>Pilih menu <strong>Transfer</strong> ➔ <strong>Virtual Account / Billing</strong>.</li>
              <li>Masukkan nomor VA: <span className="font-mono font-bold text-indigo-700">{currentBank.vaNumber}</span>.</li>
              <li>Pastikan nama penerima tertulis <strong>GEBYAR MATEMATIKA - {payment.peserta.namaSiswa}</strong>.</li>
              <li>Masukkan jumlah transfer tepat <strong>Rp {payment.total.toLocaleString('id-ID')}</strong>.</li>
              <li>Konfirmasi pembayaran dan simpan bukti transaksi digital Anda.</li>
            </ol>
          )}

          {activeTab === 'atm' && (
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed font-medium">
              <li>Masukkan kartu ATM dan PIN Anda di mesin ATM {currentBank.name}.</li>
              <li>Pilih menu <strong>Transaksi Lainnya</strong> ➔ <strong>Transfer</strong> ➔ <strong>Ke Rekening Virtual Account</strong>.</li>
              <li>Ketik nomor VA: <span className="font-mono font-bold text-indigo-700">{currentBank.vaNumber}</span>.</li>
              <li>Periksa detail tagihan di layar ATM, lalu tekan <strong>Ya / Benar</strong> untuk memproses.</li>
              <li>Ambil dan simpan struk ATM bukti pembayaran Anda.</li>
            </ol>
          )}

          {activeTab === 'i-banking' && (
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed font-medium">
              <li>Masuk ke akun Internet Banking resmi {currentBank.name} Anda.</li>
              <li>Buka menu <strong>Pembayaran Tagihan</strong> ➔ <strong>Virtual Account</strong>.</li>
              <li>Pilih atau masukkan nomor VA: <span className="font-mono font-bold text-indigo-700">{currentBank.vaNumber}</span>.</li>
              <li>Otorisasikan transaksi menggunakan Token / OTP Anda.</li>
            </ol>
          )}
        </div>
      </div>

    </div>
  );
};
