import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  X
} from 'lucide-react';
import type { GuruProfileData, SiswaBimbinganItem } from '../../types';

interface GuruSertifikatTabProps {
  profile: GuruProfileData;
  siswaList: SiswaBimbinganItem[];
}

export const GuruSertifikatTab: React.FC<GuruSertifikatTabProps> = ({
  profile,
  siswaList,
}) => {
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  const handleDownloadTeacherCert = () => {
    setDownloadSuccessMsg(`Sertifikat Pembimbing Resmi atas nama ${profile.nama} berhasil diunduh dalam format PDF High-Resolution dengan QR validasi.`);
    setTimeout(() => setDownloadSuccessMsg(null), 5000);
  };

  const handleDownloadStudentCert = (nama: string) => {
    setDownloadSuccessMsg(`E-Sertifikat Peserta untuk ${nama} berhasil diunduh.`);
    setTimeout(() => setDownloadSuccessMsg(null), 4000);
  };

  const studentsWithCert = siswaList.filter(s => s.sertifikatTersedia);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Toast alert */}
      {downloadSuccessMsg && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{downloadSuccessMsg}</span>
          </div>
          <button onClick={() => setDownloadSuccessMsg(null)} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-200/80 shadow-sm bg-white/80 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
          <Award className="w-3.5 h-3.5 text-purple-600" />
          Dokumen E-Sertifikat Resmi
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
          Sertifikat Pembimbing & E-Sertifikat Siswa
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Seluruh sertifikat diterbitkan resmi oleh Panitia Gebyar Matematika dengan tanda tangan digital 
          dan QR Code verifikasi keaslian terhubung ke database panitia.
        </p>
      </div>

      {/* Teacher Official Certificate Spotlight Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-tr from-amber-50/80 via-white to-indigo-50/80 border border-amber-200/80 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Piagam Penghargaan Pembimbing
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-mono border border-slate-200">
                No: GM26/CERT-GURU/0842
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Diberikan Kepada:</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                {profile.nama}
              </h3>
              <p className="text-xs text-indigo-700 font-semibold">
                {profile.sekolah} • NIP: {profile.nip || '-'}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Atas dedikasi dan kontribusi aktif sebagai <strong>Guru Pembimbing Peserta</strong> pada ajang 
              Gebyar Matematika Nasional 2026. Sertifikat ini berlaku untuk keperluan portofolio angka kredit guru dan akreditasi sekolah.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1 text-emerald-600 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Terverifikasi Panitia Pusat</span>
              </div>
              <span>•</span>
              <span>Diterbitkan: 15 Sep 2026</span>
            </div>
          </div>

          {/* Certificate QR & Download Action */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-4 shrink-0 text-center">
            <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center border border-slate-200 shadow-sm">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://gebyar-matematika.id/verify/GM26-CERT-GURU-0842" 
                alt="QR Code Sertifikat"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-900">QR Verifikasi Keaslian</p>
              <p className="text-[10px] text-slate-500">Scan untuk cek validasi online</p>
            </div>

            <button
              onClick={handleDownloadTeacherCert}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Sertifikat Pembimbing (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Certificates List */}
      <div className="rounded-3xl glass-panel p-6 border border-slate-200/80 shadow-sm bg-white/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 font-['Outfit']">
              E-Sertifikat Siswa Bimbingan
            </h3>
            <p className="text-xs text-slate-500">
              Sertifikat partisipasi dan prestasi bagi siswa {profile.sekolah} yang telah terdaftar resmi.
            </p>
          </div>

          <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 font-medium">
            {studentsWithCert.length} dari {siswaList.length} sertifikat siap diunduh
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold">
                <th className="py-3 px-3">Nama Siswa</th>
                <th className="py-3 px-3">Kelas</th>
                <th className="py-3 px-3">Kategori</th>
                <th className="py-3 px-3">Status Dokumen</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {siswaList.map((siswa) => (
                <tr key={siswa.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {siswa.namaSiswa}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {siswa.kelas}
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {siswa.kategoriNama}
                  </td>
                  <td className="py-3 px-3">
                    {siswa.sertifikatTersedia ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Siap Diunduh
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">
                        Menunggu ujian selesai
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {siswa.sertifikatTersedia ? (
                      <button
                        onClick={() => handleDownloadStudentCert(siswa.namaSiswa)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh Sertifikat</span>
                      </button>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
