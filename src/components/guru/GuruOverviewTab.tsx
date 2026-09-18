import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Award, 
  FileText, 
  UserPlus, 
  ExternalLink, 
  School, 
  ArrowRight,
  MessageCircle,
  Video,
  Calendar
} from 'lucide-react';
import type { GuruProfileData, SiswaBimbinganItem, TagihanKolektifItem } from '../../types';

interface GuruOverviewTabProps {
  profile: GuruProfileData;
  siswaList: SiswaBimbinganItem[];
  tagihanList: TagihanKolektifItem[];
  onNavigateTab: (tab: 'siswa' | 'daftar' | 'tagihan' | 'sertifikat') => void;
  onOpenCardModal: (siswa: SiswaBimbinganItem) => void;
  onShowToast?: (msg: string) => void;
}

export const GuruOverviewTab: React.FC<GuruOverviewTabProps> = ({
  profile,
  siswaList,
  tagihanList,
  onNavigateTab,
  onOpenCardModal,
  onShowToast,
}) => {
  const lunasCount = siswaList.filter(s => s.statusPembayaran === 'lunas').length;
  const pendingCount = siswaList.filter(s => s.statusPembayaran === 'menunggu_pembayaran').length;
  const kartuReadyCount = siswaList.filter(s => s.kartuTersedia).length;
  const pendingTagihan = tagihanList.filter(t => t.status === 'menunggu_pembayaran');

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome & School Info Card */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-pink-50/90 border border-indigo-100 shadow-sm overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/90 text-indigo-700 text-xs font-bold border border-indigo-200">
              <School className="w-3.5 h-3.5 text-indigo-600" />
              Portal Pengelolaan Siswa & Pembimbing
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
              Selamat Datang, {profile.nama}!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Anda terdaftar sebagai koordinator pembimbing dari <strong className="text-indigo-700 font-bold">{profile.sekolah}</strong>. 
              Melalui portal ini, Anda dapat mendaftarkan siswa secara kolektif, menyelesaikan tagihan via QRIS/VA, 
              serta mencetak kartu peserta dan sertifikat resmi.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('daftar')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all hover:scale-[1.02]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftarkan Siswa Baru</span>
            </button>
            <button
              onClick={() => onNavigateTab('siswa')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-bold border border-slate-200 shadow-sm transition-all"
            >
              <Users className="w-4 h-4 text-slate-600" />
              <span>Kelola Siswa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm relative overflow-hidden bg-white/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Siswa Bimbingan</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">{siswaList.length}</p>
            <span className="text-xs text-slate-500 font-medium">Siswa</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <span>Terdaftar di {profile.sekolah}</span>
          </p>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm relative overflow-hidden bg-white/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Status Lunas / Terverifikasi</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-['Outfit']">{lunasCount}</p>
            <span className="text-xs text-slate-500 font-medium">Siswa</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-medium">
            <span>Siap mengikuti babak penyisihan</span>
          </p>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm relative overflow-hidden bg-white/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Menunggu Pembayaran</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-black text-amber-600 font-['Outfit']">{pendingCount}</p>
            <span className="text-xs text-slate-500 font-medium">Siswa</span>
          </div>
          <button 
            onClick={() => onNavigateTab('tagihan')}
            className="text-[11px] text-amber-600 hover:text-amber-700 mt-2 font-semibold underline flex items-center gap-1"
          >
            <span>Bayar tagihan sekarang</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="rounded-2xl glass-panel p-5 border border-slate-200/80 shadow-sm relative overflow-hidden bg-white/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Kartu Ujian Diterbitkan</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-3xl font-black text-purple-600 font-['Outfit']">{kartuReadyCount}</p>
            <span className="text-xs text-slate-500 font-medium">Kartu Siap</span>
          </div>
          <button
            onClick={() => onNavigateTab('siswa')}
            className="text-[11px] text-purple-600 hover:text-purple-700 mt-2 font-semibold underline flex items-center gap-1"
          >
            <span>Cetak massal kartu</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* Special Announcement / WhatsApp Group Box for Teacher Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-slate-200/80 shadow-sm bg-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit']">
                Agenda Khusus Guru Pembimbing Lomba
              </h3>
            </div>
            <span className="text-[11px] text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 font-semibold">
              Update Panitia
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-rose-500" />
                  Technical Meeting & Simulasi Ujian Siswa via Zoom
                </p>
                <p className="text-[11px] text-slate-500">
                  Sabtu, 17 Oktober 2027 • 09:00 - 11:00 WIB • Tautan Zoom akan dikirim ke email pembimbing.
                </p>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-xl bg-white text-[11px] font-semibold text-slate-600 border border-slate-200 shadow-sm text-center">
                Wajib Dihadiri
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Grup Komunikasi WhatsApp Pembimbing Sekolah Se-Indonesia
                </p>
                <p className="text-[11px] text-emerald-700/80">
                  Bergabung untuk mendapatkan update nomor meja daring, token soal, dan koordinasi cepat dengan panitia inti.
                </p>
              </div>
              <a
                href="#whatsapp-group"
                onClick={(e) => {
                  e.preventDefault();
                  if (onShowToast) {
                    onShowToast('✓ Menghubungkan ke Ruang Koordinasi WhatsApp Pembimbing GM 2027...');
                  }
                }}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <span>Gabung Grup WA</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="rounded-3xl glass-panel p-6 border border-slate-200/80 shadow-sm bg-white/80 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit'] mb-3">
              Aksi Cepat
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('daftar')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200/80 text-left text-xs font-semibold text-slate-700 hover:text-indigo-700 transition-all"
              >
                <span className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-indigo-600" />
                  Pendaftaran Kolektif Baru
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('tagihan')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 text-left text-xs font-semibold text-slate-700 hover:text-amber-700 transition-all"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  Lihat Tagihan ({pendingTagihan.length})
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('sertifikat')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 text-left text-xs font-semibold text-slate-700 hover:text-purple-700 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  Sertifikat Pembimbing
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
            <p className="text-[11px] text-slate-500">Butuh bantuan teknis pendaftaran?</p>
            <p className="text-xs font-bold text-indigo-600 mt-0.5">Helpdesk Panitia: 0812-3456-7890</p>
          </div>
        </div>

      </div>

      {/* Recent Students Table Preview */}
      <div className="rounded-3xl glass-panel p-6 border border-slate-200/80 shadow-sm bg-white/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit']">
              Pratinjau Siswa Bimbingan
            </h3>
            <p className="text-xs text-slate-500">
              Menampilkan {Math.min(siswaList.length, 4)} dari total {siswaList.length} siswa yang Anda bimbing.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('siswa')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 transition-colors"
          >
            <span>Buka Semua Siswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-3 px-3">Nama Siswa</th>
                <th className="py-3 px-3">Kelas / NISN</th>
                <th className="py-3 px-3">Kategori Lomba</th>
                <th className="py-3 px-3">Status Bayar</th>
                <th className="py-3 px-3">Kartu Ujian</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {siswaList.slice(0, 4).map((siswa) => (
                <tr key={siswa.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {siswa.namaSiswa}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <div>{siswa.kelas}</div>
                    <div className="text-[10px] text-slate-400 font-mono">NISN: {siswa.nisn}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {siswa.kategoriNama}
                  </td>
                  <td className="py-3 px-3">
                    {siswa.statusPembayaran === 'lunas' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Lunas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Menunggu
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {siswa.kartuTersedia ? (
                      <button
                        onClick={() => onOpenCardModal(siswa)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 underline"
                      >
                        <FileText className="w-3 h-3" />
                        {siswa.nomorPeserta}
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Belum terbit</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {siswa.kartuTersedia ? (
                      <button
                        onClick={() => onOpenCardModal(siswa)}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm transition-colors"
                      >
                        Cetak Kartu
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('tagihan')}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-[11px] font-semibold text-amber-700 border border-amber-200 transition-colors"
                      >
                        Bayar
                      </button>
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
