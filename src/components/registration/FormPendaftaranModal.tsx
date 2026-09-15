import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  School, 
  CheckCircle2, 
  FileText, 
  ArrowRight
} from 'lucide-react';
import { MOCK_DATABASE_SEKOLAH, type ReferensiSekolah } from '../../data/mockSekolah';
import { MOCK_KATEGORI } from '../../data/mockData';
import type { KategoriLomba } from '../../types';

interface FormPendaftaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultKategori?: KategoriLomba | null;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
  onSuccessRegister: (orderData: any) => void;
}

export const FormPendaftaranModal: React.FC<FormPendaftaranModalProps> = ({
  isOpen,
  onClose,
  defaultKategori,
  currentUser,
  onSuccessRegister,
}) => {
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [nisn, setNisn] = useState('0078129841');
  const [kelas, setKelas] = useState('11 IPA 1');
  const [email, setEmail] = useState(currentUser?.email || 'peserta@gmail.com');
  const [noHp, setNoHp] = useState('0812-3456-7890');

  // School fields
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState({
    nama: currentUser?.sekolah || 'SMA Negeri 3 Yogyakarta',
    npsn: '20403176',
    jenjang: 'SMA/MA/SMK',
    status: 'Negeri',
    kabupatenKota: 'Kota Yogyakarta',
    provinsi: 'DI Yogyakarta',
    alamat: 'Jl. Yos Sudarso No. 7, Kotabaru, Gondokusuman',
  });

  // Selected Category
  const [selectedKategoriId, setSelectedKategoriId] = useState<string>(
    defaultKategori?.id || 'kat-sma'
  );

  const [metodePembayaran, setMetodePembayaran] = useState<'QRIS' | 'VA'>('QRIS');

  useEffect(() => {
    if (defaultKategori) {
      setSelectedKategoriId(defaultKategori.id);
    }
  }, [defaultKategori]);

  if (!isOpen) return null;

  // Filter school database for auto-complete
  const filteredSchools = MOCK_DATABASE_SEKOLAH.filter((s) => {
    if (!schoolSearchQuery.trim()) return false;
    const q = schoolSearchQuery.toLowerCase();
    return s.nama.toLowerCase().includes(q) || s.npsn.includes(q) || s.kabupatenKota.toLowerCase().includes(q);
  });

  const handleSelectSchool = (school: ReferensiSekolah) => {
    setSelectedSchool({
      nama: school.nama,
      npsn: school.npsn,
      jenjang: school.jenjang,
      status: school.status,
      kabupatenKota: school.kabupatenKota,
      provinsi: school.provinsi,
      alamat: school.alamat,
    });
    setSchoolSearchQuery(school.nama);
    setShowSchoolDropdown(false);
    setIsAutoFilled(true);

    // Auto-adjust category based on school level
    if (school.kategoriRekomendasi) {
      setSelectedKategoriId(school.kategoriRekomendasi);
    }
  };

  const currentKategori = MOCK_KATEGORI.find(k => k.id === selectedKategoriId) || MOCK_KATEGORI[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !selectedSchool.nama) {
      alert('Mohon lengkapi nama siswa dan data sekolah.');
      return;
    }

    const orderData = {
      orderId: `GM26-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      namaSiswa: studentName,
      nisn: nisn,
      kelas: kelas,
      sekolah: selectedSchool.nama,
      npsn: selectedSchool.npsn,
      kabupatenKota: selectedSchool.kabupatenKota,
      kategori: currentKategori.nama,
      biaya: currentKategori.biaya,
      metode: metodePembayaran,
    };

    onSuccessRegister(orderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full rounded-3xl glass-3d-elevated p-6 sm:p-8 space-y-6 my-8 text-slate-800 animate-scale-up relative overflow-hidden">
        {/* Specular ambient top glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between border-b border-slate-200/60 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-3d-cyan text-cyan-900 text-[11px] font-bold">
              <FileText className="w-3.5 h-3.5 text-cyan-600" />
              Pendaftaran Online GM 2026
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-['Outfit'] tracking-tight">
              Formulir Pendaftaran Peserta
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup formulir"
            className="w-9 h-9 rounded-xl glass-3d-base flex items-center justify-center text-slate-500 hover:text-slate-800 hover:scale-105 active:scale-95 transition-all shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-6">
          
          {/* Section 1: Data Diri Siswa */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-black">1</span>
              <span>Identitas Calon Peserta</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa *
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Nama lengkap sesuai akta / rapor"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  NISN (10 Digit) *
                </label>
                <input
                  type="text"
                  required
                  value={nisn}
                  onChange={(e) => setNisn(e.target.value)}
                  placeholder="0078129841"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kelas / Tingkat *
                </label>
                <input
                  type="text"
                  required
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  placeholder="Contoh: 11 IPA 1 atau 8A"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="text"
                  required
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Akun Pengguna *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email.peserta@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Data Sekolah DENGAN AUTO-FILL */}
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black">2</span>
                <School className="w-3.5 h-3.5" />
                <span>Data Asal Sekolah (Otomatisasi Database)</span>
              </h3>
              {isAutoFilled && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-xs">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Terisi Otomatis
                </span>
              )}
            </div>

            {/* Smart School Lookup Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pencarian Cepat Data Sekolah (Ketik Nama Sekolah atau NPSN):
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={schoolSearchQuery}
                  onChange={(e) => {
                    setSchoolSearchQuery(e.target.value);
                    setShowSchoolDropdown(true);
                  }}
                  onFocus={() => setShowSchoolDropdown(true)}
                  placeholder="Ketik misalnya: Al-Madani, SMA 3 Yogya, atau 20403176..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-indigo-50/50 border border-indigo-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 shadow-inner-light transition-all"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showSchoolDropdown && filteredSchools.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-56 overflow-y-auto rounded-2xl glass-3d-elevated border border-slate-200/80 shadow-2xl divide-y divide-slate-100">
                  {filteredSchools.map((s) => (
                    <button
                      key={s.npsn}
                      type="button"
                      onClick={() => handleSelectSchool(s)}
                      className="w-full p-3 text-left hover:bg-indigo-50/70 transition-colors flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{s.nama}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {s.kabupatenKota}, {s.provinsi} • <span className="font-mono text-indigo-600">NPSN: {s.npsn}</span>
                        </p>
                      </div>
                      <span className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-2xs">
                        Pilih Otomatis
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auto-filled fields grid */}
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-xs">
              <div>
                <span className="text-[11px] text-slate-500 font-bold">Nama Sekolah:</span>
                <input
                  type="text"
                  required
                  value={selectedSchool.nama}
                  onChange={(e) => setSelectedSchool({ ...selectedSchool, nama: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-bold">NPSN (8 Digit):</span>
                <input
                  type="text"
                  required
                  value={selectedSchool.npsn}
                  onChange={(e) => setSelectedSchool({ ...selectedSchool, npsn: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-bold">Kabupaten / Kota:</span>
                <input
                  type="text"
                  required
                  value={selectedSchool.kabupatenKota}
                  onChange={(e) => setSelectedSchool({ ...selectedSchool, kabupatenKota: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <span className="text-[11px] text-slate-500 font-bold">Provinsi:</span>
                <input
                  type="text"
                  required
                  value={selectedSchool.provinsi}
                  onChange={(e) => setSelectedSchool({ ...selectedSchool, provinsi: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] text-slate-500 font-bold">Alamat Satuan Pendidikan:</span>
                <input
                  type="text"
                  required
                  value={selectedSchool.alamat}
                  onChange={(e) => setSelectedSchool({ ...selectedSchool, alamat: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-white/90 border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Section 3: Kategori Lomba & Biaya */}
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <h3 className="text-xs font-black text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-black">3</span>
              <span>Kategori Lomba & Biaya Registrasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOCK_KATEGORI.map((kat) => {
                const isSelected = selectedKategoriId === kat.id;
                const isSd = kat.id === 'kat-sd';
                const isSmp = kat.id === 'kat-smp';
                
                return (
                  <button
                    key={kat.id}
                    type="button"
                    onClick={() => setSelectedKategoriId(kat.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden ${
                      isSelected 
                        ? isSd 
                          ? 'glass-3d-emerald ring-2 ring-emerald-500 shadow-md translate-y-[-2px]' 
                          : isSmp 
                            ? 'glass-3d-cyan ring-2 ring-cyan-500 shadow-md translate-y-[-2px]' 
                            : 'glass-3d-violet ring-2 ring-indigo-500 shadow-md translate-y-[-2px]'
                        : 'glass-3d-base hover:bg-white/80 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isSd ? 'bg-emerald-100 text-emerald-800' : isSmp ? 'bg-cyan-100 text-cyan-800' : 'bg-indigo-100 text-indigo-800'
                      }`}>
                        {kat.id.replace('kat-', '').toUpperCase()}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                      )}
                    </div>
                    <p className="text-xs font-black text-slate-900 font-['Outfit']">{kat.nama}</p>
                    <p className="text-sm font-black font-mono mt-1 text-slate-900">
                      Rp {kat.biaya.toLocaleString('id-ID')}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Checkout Summary Box */}
          <div className="rounded-2xl p-5 glass-3d-elevated flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-indigo-100/80 shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] text-slate-600 font-bold">Metode Pembayaran:</span>
                <button
                  type="button"
                  onClick={() => setMetodePembayaran('QRIS')}
                  className={`px-3 py-1 rounded-xl text-[10px] font-black transition-all ${
                    metodePembayaran === 'QRIS'
                      ? 'glass-3d-emerald text-emerald-950 ring-1 ring-emerald-500/30 shadow-xs'
                      : 'glass-3d-base text-slate-600 hover:text-slate-900'
                  }`}
                >
                  QRIS Instant
                </button>
                <button
                  type="button"
                  onClick={() => setMetodePembayaran('VA')}
                  className={`px-3 py-1 rounded-xl text-[10px] font-black transition-all ${
                    metodePembayaran === 'VA'
                      ? 'glass-3d-violet text-indigo-950 ring-1 ring-indigo-500/30 shadow-xs'
                      : 'glass-3d-base text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Virtual Account
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Total Biaya Pendaftaran:</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] tabular-nums tracking-tight">
                Rp {currentKategori.biaya.toLocaleString('id-ID')}
              </p>
              <p className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Konfirmasi otomatis via Midtrans Webhook
              </p>
            </div>

            <button
              type="submit"
              className="btn-3d-primary px-7 py-3.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 text-white shrink-0 group"
            >
              <span>Lanjutkan ke Pembayaran</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
