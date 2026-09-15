import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Download
} from 'lucide-react';

interface CertificateVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateVerifyModal: React.FC<CertificateVerifyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [code, setCode] = useState('');
  const [searchState, setSearchState] = useState<'idle' | 'searching' | 'found' | 'not_found'>('idle');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setSearchState('searching');
    setTimeout(() => {
      // Demo test code
      if (code.toUpperCase().includes('GM') || code.length >= 6) {
        setSearchState('found');
      } else {
        setSearchState('not_found');
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900 overflow-hidden">
        {/* Specular Rim */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl glass-3d-emerald flex items-center justify-center text-emerald-700 shadow-sm border border-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                Verifikasi Sertifikat Resmi
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Pengecekan keaslian kode verifikasi sertifikat Gebyar Matematika
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-white/90 shadow-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Masukkan Nomor / Kode Verifikasi Sertifikat
            </label>
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Contoh: GM24-SMA-0842"
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/90 border border-slate-200 text-slate-900 font-mono text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 uppercase tracking-wider shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">
              Kode tertera di pojok bawah sertifikat fisik maupun e-sertifikat PDF ber-QR.
            </p>
          </div>

          <button
            type="submit"
            disabled={searchState === 'searching'}
            className="btn-3d-primary w-full py-3.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-100" />
            <span>{searchState === 'searching' ? 'Memverifikasi...' : 'Cek Keabsahan Sertifikat'}</span>
          </button>
        </form>

        {/* Verification Result Area (3D Emerald Glass) */}
        {searchState === 'found' && (
          <div className="p-6 rounded-2xl glass-3d-emerald border border-emerald-300 shadow-md space-y-3.5 animate-fade-in relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-950 font-black text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Sertifikat Terverifikasi Valid & Terdaftar!</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <span className="text-emerald-800 font-bold block text-[11px]">Nama Penerima:</span>
                <p className="font-black text-slate-900 text-sm mt-0.5">Ananda Pratama S.</p>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block text-[11px]">Asal Sekolah:</span>
                <p className="font-bold text-slate-900 mt-0.5">SMA Negeri 1 Teladan</p>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block text-[11px]">Kategori & Predikat:</span>
                <p className="font-black text-emerald-800 mt-0.5">Juara 1 Olimpiade SMA (2024)</p>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block text-[11px]">Diterbitkan Oleh:</span>
                <p className="font-semibold text-slate-800 mt-0.5">Dewan Juri & Rektor</p>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-300/80 flex items-center justify-between text-xs">
              <span className="text-emerald-800 font-mono text-[11px] font-bold">Status: Dokumen Asli Terenkripsi</span>
              <button 
                onClick={() => alert('Simulasi: Mengunduh salinan sertifikat resmi terverifikasi.')}
                className="text-emerald-900 hover:text-emerald-950 font-black flex items-center gap-1 cursor-pointer underline"
              >
                <Download className="w-3.5 h-3.5" />
                Unduh Salinan
              </button>
            </div>
          </div>
        )}

        {searchState === 'not_found' && (
          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-rose-800 font-black text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>Kode Sertifikat Tidak Ditemukan</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Pastikan kode verifikasi yang dimasukkan sudah sesuai dengan yang tercetak. Jika masih mengalami kendala, hubungi panitia melalui helpdesk WhatsApp.
            </p>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="btn-3d-white px-5 py-2.5 text-xs font-bold rounded-xl cursor-pointer"
          >
            Tutup Jendela
          </button>
        </div>

      </div>
    </div>
  );
};
