import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  School, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  ArrowRight,
  Users,
  ShieldCheck
} from 'lucide-react';
import { MOCK_DATABASE_SEKOLAH, type ReferensiSekolah } from '../../data/mockSekolah';
import type { KategoriLomba, PesertaAdminItem, Pembayaran } from '../../types';
import { useStoredKategori, addStoredPeserta } from '../../utils/storage';

interface FormPendaftaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultKategori?: KategoriLomba | null;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
  onSuccessRegister: (orderData: Pembayaran) => void;
}

export const FormPendaftaranModal: React.FC<FormPendaftaranModalProps> = ({
  isOpen,
  onClose,
  defaultKategori,
  currentUser,
  onSuccessRegister,
}) => {
  const [categories] = useStoredKategori();
  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [nisn, setNisn] = useState('0078129841');
  const [kelas, setKelas] = useState('11 IPA 1');
  const [email, setEmail] = useState(currentUser?.email || 'peserta@gmail.com');
  const [noHp, setNoHp] = useState('0812-3456-7890');

  // Team fields (if kelompok)
  const [namaTim, setNamaTim] = useState('');
  const [anggota2, setAnggota2] = useState('');
  const [anggota3, setAnggota3] = useState('');

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
    defaultKategori?.id || categories[0]?.id || 'kat-sd'
  );

  const [metodePembayaran, setMetodePembayaran] = useState<'QRIS' | 'VA'>('QRIS');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultKategori) {
      setSelectedKategoriId(defaultKategori.id);
    } else if (categories.length > 0 && !categories.some(c => c.id === selectedKategoriId)) {
      setSelectedKategoriId(categories[0].id);
    }
  }, [defaultKategori, categories]);

  if (!isOpen) return null;

  const currentKategori = categories.find(k => k.id === selectedKategoriId) || categories[0];
  const isGroup = currentKategori?.tipeKepesertaan === 'kelompok';

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
      const match = categories.find(c => c.id === school.kategoriRekomendasi);
      if (match) {
        setSelectedKategoriId(match.id);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!studentName || !selectedSchool.nama) {
      setErrorMessage('Mohon lengkapi nama lengkap peserta dan data satuan pendidikan asal.');
      return;
    }

    if (isGroup && !namaTim.trim()) {
      setErrorMessage('Mohon cantumkan Nama Regu / Tim untuk lomba beregu.');
      return;
    }

    const orderId = `GM27-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const pendaftaranId = `GM27-REG-${Date.now().toString(36).toUpperCase()}`;

    // 1. Create Admin Peserta Item
    const newPeserta: PesertaAdminItem = {
      id: `p-${Date.now()}`,
      pendaftaranId: pendaftaranId,
      namaSiswa: isGroup ? `${namaTim} (Ketua: ${studentName})` : studentName,
      kelas: kelas,
      asalSekolah: selectedSchool.nama,
      kota: selectedSchool.kabupatenKota,
      kategoriId: currentKategori.id,
      kategoriNama: currentKategori.nama,
      namaPendaftar: currentUser?.name || studentName,
      emailPendaftar: email,
      rolePendaftar: currentUser?.role?.includes('Guru') ? 'Guru Pendamping' : 'Siswa Mandiri',
      statusPembayaran: 'menunggu_pembayaran',
      orderId: orderId,
      tanggalDaftar: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      kartuTercetak: false,
      tipeKepesertaan: currentKategori.tipeKepesertaan,
      namaTim: isGroup ? namaTim : undefined,
    };

    // Save into reactive storage for Admin / Panitia
    addStoredPeserta(newPeserta);

    // 2. Build full Payment Order Object
    const fullOrder: Pembayaran = {
      id: `pay-${Date.now()}`,
      orderId: orderId,
      pendaftaranId: pendaftaranId,
      metode: metodePembayaran === 'QRIS' ? 'QRIS' : 'BCA_VA',
      kodeBayar: metodePembayaran === 'QRIS' 
        ? '00020101021226590014ID.LINKAJA.WWW011893600002011122334402150000000000000005204599953033605802ID5914PANITIA GM20276011BANJARMASIN61057012362070703A016304E67C' 
        : `8808 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} 01`,
      jumlah: currentKategori.biaya,
      biayaLayanan: 0,
      total: currentKategori.biaya,
      status: 'menunggu_pembayaran',
      waktuBatas: '23:59:59',
      peserta: {
        namaSiswa: isGroup ? `${namaTim} (Ketua: ${studentName})` : studentName,
        asalSekolah: selectedSchool.nama,
        kategoriNama: currentKategori.nama,
        tingkat: currentKategori.tingkat,
        emailPendaftar: email,
        noHp: noHp,
        tipeKepesertaan: currentKategori.tipeKepesertaan,
        namaTim: isGroup ? namaTim : undefined,
        anggotaTim: isGroup ? [studentName, anggota2, anggota3].filter(Boolean) : undefined,
      },
    };

    onSuccessRegister(fullOrder);
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
              Pendaftaran Online GM 2027
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

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-shake shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

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

              {/* Kelompok / Team Data Fields */}
              {isGroup && (
                <div className="sm:col-span-2 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Informasi Tim / Regu ({currentKategori.nama})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-emerald-950 mb-1">
                        Nama Regu / Tim *
                      </label>
                      <input
                        type="text"
                        required={isGroup}
                        placeholder="Contoh: Tim Sigma Math 01"
                        value={namaTim}
                        onChange={(e) => setNamaTim(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nama Anggota 2
                      </label>
                      <input
                        type="text"
                        placeholder="Nama anggota kedua"
                        value={anggota2}
                        onChange={(e) => setAnggota2(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nama Anggota 3
                      </label>
                      <input
                        type="text"
                        placeholder="Nama anggota ketiga"
                        value={anggota3}
                        onChange={(e) => setAnggota3(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-medium focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Data Sekolah DENGAN AUTO-FILL */}
          <div className="space-y-3 pt-4 border-t border-slate-200/60">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-black">2</span>
                <span className="flex items-center gap-1">
                  <School className="w-3.5 h-3.5" />
                  Data Asal Sekolah (Otomatisasi Database)
                </span>
              </h3>
              {isAutoFilled && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100/90 text-emerald-800 text-[10px] font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Terisi Otomatis
                </span>
              )}
            </div>

            {/* Live Search Bar */}
            <div className="relative">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pencarian Cepat Data Sekolah (Ketik Nama Sekolah atau NPSN)..."
                  value={schoolSearchQuery}
                  onChange={(e) => {
                    setSchoolSearchQuery(e.target.value);
                    setShowSchoolDropdown(true);
                  }}
                  onFocus={() => setShowSchoolDropdown(true)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all shadow-xs"
                />
              </div>

              {/* Autocomplete Dropdown List */}
              {showSchoolDropdown && filteredSchools.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-30 mt-1.5 max-h-48 overflow-y-auto rounded-2xl glass-3d-elevated border border-slate-200/80 shadow-2xl p-1.5 space-y-1 bg-white">
                  {filteredSchools.map((s) => (
                    <button
                      key={s.npsn}
                      type="button"
                      onClick={() => handleSelectSchool(s)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50/80 transition-colors flex items-start gap-2.5"
                    >
                      <School className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 truncate">{s.nama}</p>
                        <p className="text-[10px] text-slate-500">
                          NPSN: <span className="font-mono text-slate-700 font-bold">{s.npsn}</span> • {s.kabupatenKota}, {s.provinsi}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Readonly / Auto-filled Details Form */}
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
              <span>Pilihan Kategori Lomba & Biaya Registrasi</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.filter(c => c.status !== 'tutup').map((kat) => {
                const isSelected = selectedKategoriId === kat.id;
                const isKatGroup = kat.tipeKepesertaan === 'kelompok';
                
                return (
                  <button
                    key={kat.id}
                    type="button"
                    onClick={() => setSelectedKategoriId(kat.id)}
                    className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden ${
                      isSelected 
                        ? 'glass-3d-violet ring-2 ring-indigo-500 shadow-md translate-y-[-2px]'
                        : 'glass-3d-base hover:bg-white/80 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 gap-1">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white">
                        {kat.tingkat}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800">
                        {isKatGroup ? 'Kelompok' : 'Individu'}
                      </span>
                    </div>
                    <p className="text-xs font-black text-slate-900 font-['Outfit'] mt-1 truncate">{kat.nama}</p>
                    <p className="text-sm font-black font-mono mt-0.5 text-slate-900">
                      Rp {kat.biaya.toLocaleString('id-ID')}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Category Requirements Box */}
            {currentKategori.persyaratan && currentKategori.persyaratan.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5 text-xs">
                <span className="font-bold text-indigo-950 flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
                  Persyaratan Kategori {currentKategori.nama}:
                </span>
                <ul className="pl-4 list-disc space-y-0.5 text-[11px] text-slate-700 font-medium">
                  {currentKategori.persyaratan.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
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
                Konfirmasi otomatis real-time (QRIS & VA)
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
