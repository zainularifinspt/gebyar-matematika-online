import React from 'react';
import { 
  X, 
  Printer, 
  Award
} from 'lucide-react';
import type { SiswaBimbinganItem, GuruProfileData } from '../../types';

interface KartuPesertaModalProps {
  siswa: SiswaBimbinganItem | null;
  profile: GuruProfileData;
  onClose: () => void;
}

export const KartuPesertaModal: React.FC<KartuPesertaModalProps> = ({
  siswa,
  profile,
  onClose,
}) => {
  if (!siswa) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full rounded-3xl glass-3d-elevated p-6 sm:p-8 space-y-6 animate-scale-up relative overflow-hidden text-slate-800">
        {/* Specular ambient top glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 relative">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl glass-3d-violet text-indigo-700">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-black text-slate-900 font-['Outfit']">
              Kartu Peserta Ujian Daring Resmi
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-8 h-8 rounded-xl glass-3d-base flex items-center justify-center text-slate-500 hover:text-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Printable Card Area */}
        <div id="printable-card" className="p-6 rounded-2xl glass-3d-base border border-indigo-100/90 text-slate-800 shadow-md space-y-5 relative overflow-hidden">
          {/* Ambient card sheen */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-4 relative">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                GEBYAR MATEMATIKA ONLINE 2026
              </p>
              <h4 className="text-base font-black text-slate-900 font-['Outfit'] tracking-tight">
                KARTU TANDA PESERTA UJIAN
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">Tingkat Nasional • Babak Penyisihan Daring</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full glass-3d-emerald text-emerald-950 font-black">
                TERVERIFIKASI
              </span>
              <p className="text-xs font-mono font-black text-indigo-700 mt-1">
                {siswa.nomorPeserta}
              </p>
            </div>
          </div>

          {/* Card Body with Student Details and QR */}
          <div className="grid grid-cols-3 gap-4 items-center relative">
            <div className="col-span-2 space-y-2 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 font-bold">Nama Siswa Peserta:</p>
                <p className="font-black text-slate-900 text-sm font-['Outfit']">{siswa.namaSiswa}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">NISN:</p>
                  <p className="font-mono text-slate-800 font-bold">{siswa.nisn}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">Kelas:</p>
                  <p className="text-slate-800 font-bold">{siswa.kelas}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-bold">Asal Sekolah:</p>
                <p className="text-slate-800 font-medium">{profile.sekolah}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-bold">Kategori Lomba:</p>
                <p className="text-indigo-700 font-black">{siswa.kategoriNama}</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-bold">Sesi Ujian:</p>
                <p className="text-slate-700 font-medium">{siswa.sesiUjian || 'Sesi 2 (13:00 - 15:00 WIB)'}</p>
              </div>
            </div>

            {/* QR Verification Code */}
            <div className="col-span-1 flex flex-col items-center justify-center text-center p-3 rounded-2xl glass-3d-elevated border border-slate-200/70">
              <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center border border-slate-200/80 shadow-xs mb-1.5">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=GM26-PESERTA-${siswa.nomorPeserta}`}
                  alt="QR Code Peserta"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-mono text-slate-500 font-medium">Scan saat login ujian</span>
            </div>
          </div>

          {/* Exam Instructions */}
          <div className="p-3.5 rounded-xl glass-3d-violet border border-indigo-100/80 text-[10px] text-indigo-950 space-y-1 relative">
            <p className="font-black text-indigo-900">Tata Tertib Penting Ujian:</p>
            <ul className="list-disc pl-4 space-y-0.5 text-slate-700 font-medium">
              <li>Login ke portal ujian daring 15 menit sebelum waktu pengerjaan dimulai.</li>
              <li>Wajib menyalakan kamera peranti selama pengerjaan berlangsung (AI Proctoring).</li>
              <li>Simpan nomor peserta ini sebagai identitas resmi verifikasi jawaban.</li>
            </ul>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 relative">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl glass-3d-base text-slate-700 hover:text-slate-900 text-xs font-bold transition-all shadow-2xs active:scale-95"
          >
            Tutup
          </button>
          
          <button
            onClick={handlePrint}
            className="btn-3d-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-black shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
