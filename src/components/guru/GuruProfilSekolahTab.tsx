import React, { useState } from 'react';
import { 
  User, 
  School, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Save, 
  Upload
} from 'lucide-react';
import type { GuruProfileData } from '../../types';

interface GuruProfilSekolahTabProps {
  profile: GuruProfileData;
  onSaveProfile: (updated: GuruProfileData) => void;
}

export const GuruProfilSekolahTab: React.FC<GuruProfilSekolahTabProps> = ({
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<GuruProfileData>({ ...profile });
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      onSaveProfile(formData);
      setSuccessToast('Profil guru dan data sekolah berhasil diperbarui!');
      setTimeout(() => setSuccessToast(null), 4000);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-xl animate-fade-in backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-200/80 shadow-sm bg-white/80 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          Data Resmi Pembimbing & Sekolah
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
          Profil Guru & Data Legalitas Sekolah
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Pastikan data guru dan informasi sekolah sudah sesuai dengan data resmi Dapodik / Emis Kemenag. 
          Nama sekolah dan nama pembimbing akan dicantumkan secara otomatis pada e-sertifikat, piagam penghargaan, 
          dan kartu tanda peserta seluruh siswa bimbingan Anda.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Profil Guru Pendamping */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 shadow-sm bg-white/80 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                Identitas Guru Pendamping
              </h3>
              <p className="text-xs text-slate-500">
                Informasi personal guru yang ditunjuk sebagai pembimbing lomba.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Lengkap & Gelar Akademik *
              </label>
              <input
                type="text"
                required
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Siti Rahmawati, S.Pd, M.Pd"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Nama ini yang akan dicetak di Piagam Penghargaan Pembimbing Resmi.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                NIP / NUPTK (Opsional)
              </label>
              <input
                type="text"
                value={formData.nip || ''}
                onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                placeholder="19870512 201101 2 008"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Akun Google (SSO) *
              </label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 border border-slate-200 text-slate-500 cursor-not-allowed"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Terhubung
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nomor WhatsApp Aktif *
              </label>
              <input
                type="text"
                required
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                placeholder="0812-xxxx-xxxx"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jabatan / Tugas di Sekolah *
              </label>
              <input
                type="text"
                required
                value={formData.jabatan}
                onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                placeholder="Guru Pembina Olimpiade Matematika"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Data Sekolah / Madrasah */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 shadow-sm bg-white/80 space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                Data Satuan Pendidikan / Sekolah
              </h3>
              <p className="text-xs text-slate-500">
                Informasi asal sekolah siswa bimbingan yang didaftarkan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="lg:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Resmi Sekolah / Madrasah *
              </label>
              <input
                type="text"
                required
                value={formData.sekolah}
                onChange={(e) => setFormData({ ...formData, sekolah: e.target.value })}
                placeholder="Contoh: SMP IT Al-Madani"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                NPSN (8 Digit) *
              </label>
              <input
                type="text"
                required
                value={formData.npsn}
                onChange={(e) => setFormData({ ...formData, npsn: e.target.value })}
                placeholder="20108842"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jenjang Pendidikan *
              </label>
              <select
                value={formData.jenjang || 'SMP/MTs'}
                onChange={(e) => setFormData({ ...formData, jenjang: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                <option value="SD/MI">SD / MI Sederajat</option>
                <option value="SMP/MTs">SMP / MTs Sederajat</option>
                <option value="SMA/MA/SMK">SMA / MA / SMK Sederajat</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Status Sekolah *
              </label>
              <select
                value={formData.statusSekolah || 'Swasta'}
                onChange={(e) => setFormData({ ...formData, statusSekolah: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500 shadow-sm"
              >
                <option value="Negeri">Negeri</option>
                <option value="Swasta">Swasta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kabupaten / Kota *
              </label>
              <input
                type="text"
                required
                value={formData.kabupatenKota}
                onChange={(e) => setFormData({ ...formData, kabupatenKota: e.target.value })}
                placeholder="Kota Bandung"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Provinsi *
              </label>
              <input
                type="text"
                required
                value={formData.provinsi}
                onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                placeholder="Jawa Barat"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                No. Telepon Sekolah
              </label>
              <input
                type="text"
                value={formData.teleponSekolah || ''}
                onChange={(e) => setFormData({ ...formData, teleponSekolah: e.target.value })}
                placeholder="(022) 7208192"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Resmi Sekolah
              </label>
              <input
                type="email"
                value={formData.emailSekolah || ''}
                onChange={(e) => setFormData({ ...formData, emailSekolah: e.target.value })}
                placeholder="kontak@sekolah.sch.id"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Alamat Lengkap Sekolah *
              </label>
              <textarea
                rows={2}
                required
                value={formData.alamatSekolah || ''}
                onChange={(e) => setFormData({ ...formData, alamatSekolah: e.target.value })}
                placeholder="Jl. Pasir Kaliki No. 128, Cicendo..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none shadow-sm"
              />
            </div>

          </div>
        </div>

        {/* Section 3: Surat Tugas / Rekomendasi Kepala Sekolah */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-slate-200/80 shadow-sm bg-white/80 space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">
                Surat Tugas Pendampingan (Opsional)
              </h3>
              <p className="text-xs text-slate-500">
                Surat penugasan dari Kepala Sekolah untuk verifikasi legalitas bimbingan lomba.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dokumen Surat Tugas Aktif: surat-tugas-pembimbing-2027.pdf</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Diunggah pada 10 Sep 2027 • Status: Terverifikasi oleh Panitia
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm transition-colors flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Ganti Berkas</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={() => {
                    alert('Berkas surat tugas baru berhasil dipilih!');
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Save Actions Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center gap-2 hover:scale-[1.02]"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Menyimpan Perubahan...' : 'Simpan Data Profil & Sekolah'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
