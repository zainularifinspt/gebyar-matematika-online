import React, { useState } from 'react';
import { 
  Trophy, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Users, 
  User, 
  Calendar, 
  FileText, 
  X
} from 'lucide-react';
import type { KategoriLomba } from '../../types';
import { 
  useStoredKategori, 
  addStoredKategori, 
  updateStoredKategori, 
  deleteStoredKategori,
  getStoredPeserta
} from '../../utils/storage';
import { ConfirmDialogModal } from '../common/ConfirmDialogModal';

interface KelolaKategoriViewProps {
  onShowToast?: (message: string) => void;
}

export const KelolaKategoriView: React.FC<KelolaKategoriViewProps> = ({ onShowToast }) => {
  const [categories, setCategories] = useStoredKategori();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTingkat, setFilterTingkat] = useState<string>('all');
  const [filterTipe, setFilterTipe] = useState<string>('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<KategoriLomba | null>(null);

  // Form states
  const [formId, setFormId] = useState('');
  const [formNama, setFormNama] = useState('');
  const [formKategori, setFormKategori] = useState('');
  const [formTingkat, setFormTingkat] = useState('SMA/MA/SMK');
  const [formTipe, setFormTipe] = useState<'individu' | 'kelompok'>('individu');
  const [formMaksAnggota, setFormMaksAnggota] = useState<number>(3);
  const [formBiaya, setFormBiaya] = useState<number>(75000);
  const [formDeskripsi, setFormDeskripsi] = useState('');
  const [formPersyaratan, setFormPersyaratan] = useState<string[]>([
    'Siswa aktif dibuktikan dengan Kartu Pelajar atau Surat Keterangan',
    'Memiliki NISN aktif dan terverifikasi',
    'Pas foto formal berwarna 3x4'
  ]);
  const [newPersyaratanInput, setNewPersyaratanInput] = useState('');
  const [formJadwalPenyisihan, setFormJadwalPenyisihan] = useState('25 Oktober 2027, 09:00 - 11:30 WIB');
  const [formJadwalFinal, setFormJadwalFinal] = useState('08 November 2027, 09:00 - 12:00 WIB');
  const [formWarnaAksen, setFormWarnaAksen] = useState<'amber' | 'cyan' | 'purple' | 'emerald' | 'rose' | 'blue'>('purple');
  const [formStatus, setFormStatus] = useState<'aktif' | 'tutup'>('aktif');

  // Delete Confirm Dialog state
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<KategoriLomba | null>(null);

  const storedPeserta = getStoredPeserta();

  // Filtered categories
  const filteredCategories = categories.filter((kat) => {
    const matchSearch = 
      kat.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (kat.kategori || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      kat.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchTingkat = filterTingkat === 'all' || kat.tingkat === filterTingkat;
    const matchTipe = filterTipe === 'all' || kat.tipeKepesertaan === filterTipe;

    return matchSearch && matchTingkat && matchTipe;
  });

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setFormId(`kat-${Date.now().toString(36)}`);
    setFormNama('');
    setFormKategori('Olimpiade Perorangan');
    setFormTingkat('SMA/MA/SMK');
    setFormTipe('individu');
    setFormMaksAnggota(3);
    setFormBiaya(75000);
    setFormDeskripsi('');
    setFormPersyaratan([
      'Siswa aktif dibuktikan dengan Kartu Pelajar / Surat Keterangan',
      'Memiliki NISN aktif dan terdaftar',
      'Pas foto formal berwarna 3x4'
    ]);
    setNewPersyaratanInput('');
    setFormJadwalPenyisihan('25 Oktober 2027, 09:00 - 11:30 WIB');
    setFormJadwalFinal('08 November 2027, 09:00 - 12:00 WIB');
    setFormWarnaAksen('purple');
    setFormStatus('aktif');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (kat: KategoriLomba) => {
    setEditingCategory(kat);
    setFormId(kat.id);
    setFormNama(kat.nama);
    setFormKategori(kat.kategori || 'Olimpiade Perorangan');
    setFormTingkat(kat.tingkat);
    setFormTipe(kat.tipeKepesertaan || 'individu');
    setFormMaksAnggota(kat.maksAnggota || 3);
    setFormBiaya(kat.biaya);
    setFormDeskripsi(kat.deskripsi);
    setFormPersyaratan(
      Array.isArray(kat.persyaratan) && kat.persyaratan.length > 0 
        ? [...kat.persyaratan] 
        : ['Siswa aktif dibuktikan dengan Kartu Pelajar', 'NISN valid']
    );
    setNewPersyaratanInput('');
    setFormJadwalPenyisihan(kat.jadwalPenyisihan || '25 Oktober 2027, 09:00 - 11:30 WIB');
    setFormJadwalFinal(kat.jadwalFinal || '08 November 2027, 09:00 - 12:00 WIB');
    setFormWarnaAksen(kat.warnaAksen || 'purple');
    setFormStatus(kat.status || 'aktif');
    setIsFormModalOpen(true);
  };

  // Add / Remove item from persyaratan
  const handleAddPersyaratan = () => {
    if (!newPersyaratanInput.trim()) return;
    setFormPersyaratan([...formPersyaratan, newPersyaratanInput.trim()]);
    setNewPersyaratanInput('');
  };

  const handleRemovePersyaratan = (index: number) => {
    setFormPersyaratan(formPersyaratan.filter((_, idx) => idx !== index));
  };

  // Save (Create or Update)
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama.trim() || !formDeskripsi.trim()) {
      alert('Mohon isi nama lomba dan deskripsi lengkap.');
      return;
    }

    const payload: KategoriLomba = {
      id: formId,
      nama: formNama.trim(),
      kategori: formKategori.trim() || 'Olimpiade Matematika',
      tingkat: formTingkat,
      tipeKepesertaan: formTipe,
      maksAnggota: formTipe === 'kelompok' ? Number(formMaksAnggota) || 3 : undefined,
      biaya: Number(formBiaya) || 0,
      deskripsi: formDeskripsi.trim(),
      persyaratan: formPersyaratan,
      jadwalPenyisihan: formJadwalPenyisihan.trim(),
      jadwalFinal: formJadwalFinal.trim(),
      warnaAksen: formWarnaAksen,
      status: formStatus,
      terdaftar: editingCategory?.terdaftar || 0,
      hadiah: editingCategory?.hadiah || [
        'Juara 1: Trofi Emas + Piagam + Uang Pembinaan',
        'Juara 2: Trofi Perak + Piagam + Uang Pembinaan',
        'Juara 3: Trofi Perunggu + Piagam + Uang Pembinaan'
      ],
      materi: editingCategory?.materi || [
        'Silabus Kompetisi Terstandar Nasional',
        'Logika & Analisis Pemecahan Masalah'
      ],
    };

    if (editingCategory) {
      const updated = updateStoredKategori(payload);
      setCategories(updated);
      onShowToast?.(`✓ Kategori "${payload.nama}" berhasil diperbarui!`);
    } else {
      const updated = addStoredKategori(payload);
      setCategories(updated);
      onShowToast?.(`✓ Jenis lomba baru "${payload.nama}" berhasil ditambahkan!`);
    }

    setIsFormModalOpen(false);
  };

  // Toggle Status Aktif / Tutup
  const handleToggleStatus = (kat: KategoriLomba) => {
    const nextStatus = kat.status === 'aktif' ? 'tutup' : 'aktif';
    const updated = updateStoredKategori({ ...kat, status: nextStatus });
    setCategories(updated);
    onShowToast?.(`Status pendaftaran "${kat.nama}" diubah menjadi ${nextStatus.toUpperCase()}`);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteConfirmTarget) return;
    const updated = deleteStoredKategori(deleteConfirmTarget.id);
    setCategories(updated);
    onShowToast?.(`✓ Kategori "${deleteConfirmTarget.nama}" berhasil dihapus.`);
    setDeleteConfirmTarget(null);
  };

  // Metric stats
  const totalCount = categories.length;
  const countIndividu = categories.filter(c => c.tipeKepesertaan === 'individu').length;
  const countKelompok = categories.filter(c => c.tipeKepesertaan === 'kelompok').length;
  const countAktif = categories.filter(c => c.status !== 'tutup').length;

  return (
    <div className="space-y-7 animate-fade-in font-['Plus_Jakarta_Sans']">
      
      {/* Top Header Card (3D Glass) */}
      <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 relative overflow-hidden shadow-xl shadow-indigo-950/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center border border-amber-300">
                <Trophy className="w-4 h-4 text-amber-600" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                Manajemen Kompetisi
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit'] mt-2">
              Kelola Jenis & Kategori Lomba
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-medium">
              Tambah, perbarui, dan atur detail lomba termasuk nama, jenjang, tipe kepesertaan (individu/kelompok), biaya pendaftaran, dan persyaratan khusus. Semua perubahan langsung sinkron di Landing Page dan formulir peserta.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="btn-3d-primary px-5 py-3 rounded-2xl font-black text-xs text-white flex items-center gap-2 shrink-0 self-start lg:self-center shadow-lg shadow-indigo-600/30 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Jenis Lomba Baru</span>
          </button>
        </div>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-5 border-t border-slate-200/60">
          <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Jenis Lomba</span>
            <span className="text-xl font-black text-slate-900 font-['Outfit']">{totalCount} Kategori</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lomba Individu</span>
            <span className="text-xl font-black text-indigo-700 font-['Outfit']">{countIndividu} Lomba</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Lomba Kelompok/Tim</span>
            <span className="text-xl font-black text-emerald-700 font-['Outfit']">{countKelompok} Lomba</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 border border-white/90 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Status Dibuka</span>
            <span className="text-xl font-black text-amber-700 font-['Outfit']">{countAktif} Aktif</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl glass-3d-base border border-white/90 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama lomba, bidang, atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 border border-slate-200 text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {/* Filter Jenjang */}
          <select
            value={filterTingkat}
            onChange={(e) => setFilterTingkat(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/80 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
          >
            <option value="all">Semua Jenjang Tingkat</option>
            <option value="SD/MI">SD / MI</option>
            <option value="SMP/MTs">SMP / MTs</option>
            <option value="SMA/MA/SMK">SMA / MA / SMK</option>
            <option value="SMP/MTs & SMA">SMP/MTs & SMA</option>
            <option value="Umum">Umum</option>
          </select>

          {/* Filter Tipe */}
          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white/80 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer shadow-2xs"
          >
            <option value="all">Semua Tipe Kepesertaan</option>
            <option value="individu">Individu (Perorangan)</option>
            <option value="kelompok">Kelompok (Beregu)</option>
          </select>
        </div>
      </div>

      {/* Categories Cards Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl glass-3d-base border border-dashed border-slate-300 space-y-3">
          <Trophy className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
          <h3 className="text-base font-bold text-slate-800">Tidak ada jenis lomba yang cocok</h3>
          <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau bersihkan filter di atas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
          {filteredCategories.map((kat) => {
            const isGroup = kat.tipeKepesertaan === 'kelompok';
            const isClosed = kat.status === 'tutup';
            const regCount = storedPeserta.filter(
              p => p.kategoriId === kat.id || p.kategoriNama.toLowerCase() === kat.nama.toLowerCase()
            ).length;

            return (
              <div 
                key={kat.id}
                className={`rounded-3xl glass-3d-base p-6 border transition-all duration-300 relative flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md ${
                  kat.warnaAksen === 'amber' ? 'border-amber-200/90' :
                  kat.warnaAksen === 'cyan' ? 'border-cyan-200/90' :
                  kat.warnaAksen === 'purple' ? 'border-purple-200/90' :
                  kat.warnaAksen === 'emerald' ? 'border-emerald-200/90' :
                  kat.warnaAksen === 'rose' ? 'border-rose-200/90' : 'border-blue-200/90'
                }`}
              >
                {/* Card Top: Badges & Actions */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wide bg-slate-900 text-white shadow-2xs font-['Outfit']">
                        {kat.tingkat}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold flex items-center gap-1 border shadow-2xs ${
                        isGroup 
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300' 
                          : 'bg-indigo-100 text-indigo-950 border-indigo-300'
                      }`}>
                        {isGroup ? <Users className="w-3 h-3 text-emerald-700" /> : <User className="w-3 h-3 text-indigo-700" />}
                        <span>{isGroup ? `Kelompok (${kat.maksAnggota || 3} Anggota)` : 'Individu'}</span>
                      </span>

                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-2xs ${
                        isClosed 
                          ? 'bg-rose-100 text-rose-900 border-rose-300' 
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {isClosed ? 'Tutup' : 'Pendaftaran Dibuka'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditModal(kat)}
                        className="w-8 h-8 rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                        title="Edit Kategori Lomba"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmTarget(kat)}
                        className="w-8 h-8 rounded-xl bg-white/90 border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                        title="Hapus Kategori Lomba"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Field */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Bidang: {kat.kategori || 'Olimpiade Matematika'}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 font-['Outfit'] tracking-tight">
                      {kat.nama}
                    </h3>
                  </div>

                  {/* Pricing & Registrants metric */}
                  <div className="flex items-center justify-between mt-3 p-3.5 rounded-2xl bg-white/70 border border-white/95">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Biaya Pendaftaran</span>
                      <p className="text-lg font-black text-slate-900 font-mono">
                        Rp {kat.biaya.toLocaleString('id-ID')}
                        <span className="text-xs text-slate-500 font-normal font-sans ml-1">
                          {isGroup ? '/ tim' : '/ peserta'}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Pendaftar Masuk</span>
                      <span className="text-base font-black text-indigo-700 font-mono">
                        {regCount} Peserta
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed font-medium">
                    {kat.deskripsi}
                  </p>

                  {/* Persyaratan Preview */}
                  {kat.persyaratan && kat.persyaratan.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        Persyaratan Peserta:
                      </span>
                      <ul className="space-y-1 text-[11px] text-slate-600 pl-4 list-disc font-medium">
                        {kat.persyaratan.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="leading-snug">{req}</li>
                        ))}
                        {kat.persyaratan.length > 3 && (
                          <li className="text-indigo-600 font-bold list-none pt-0.5">
                            +{kat.persyaratan.length - 3} persyaratan lainnya...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Footer: Toggle Status */}
                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Penyisihan: {kat.jadwalPenyisihan || 'Oktober 2027'}</span>
                  </div>

                  <button
                    onClick={() => handleToggleStatus(kat)}
                    className={`text-[11px] font-black px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      isClosed
                        ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {isClosed ? 'Buka Pendaftaran' : 'Tutup Pendaftaran'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Tambah / Edit Jenis Lomba */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full rounded-3xl glass-3d-elevated p-6 sm:p-8 space-y-6 my-8 text-slate-800 animate-scale-up relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center border border-amber-300">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                    {editingCategory ? 'Edit Jenis Lomba' : 'Tambah Jenis Lomba Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Konfigurasi spesifikasi dan persyaratan kompetisi secara lengkap.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsFormModalOpen(false)}
                className="w-9 h-9 rounded-xl glass-3d-base flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="space-y-4">
              
              {/* Row 1: Nama Lomba */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                  Nama Lomba *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Matematika Terapan SMP / MTs"
                  value={formNama}
                  onChange={(e) => setFormNama(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                />
              </div>

              {/* Row 2: Bidang Kategori & Jenjang Tingkat */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Kategori / Bidang *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Olimpiade Sains / Cerdas Cermat"
                    value={formKategori}
                    onChange={(e) => setFormKategori(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Jenjang Peserta *
                  </label>
                  <select
                    value={formTingkat}
                    onChange={(e) => setFormTingkat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                  >
                    <option value="SD/MI">SD / MI</option>
                    <option value="SMP/MTs">SMP / MTs</option>
                    <option value="SMA/MA/SMK">SMA / MA / SMK</option>
                    <option value="SMP/MTs & SMA">SMP/MTs & SMA</option>
                    <option value="Umum">Umum / Mahasiswa</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Tipe Lomba & Maksimal Anggota & Biaya */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Tipe Kepesertaan *
                  </label>
                  <select
                    value={formTipe}
                    onChange={(e) => setFormTipe(e.target.value as 'individu' | 'kelompok')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                  >
                    <option value="individu">Individu (Tunggal)</option>
                    <option value="kelompok">Kelompok (Beregu)</option>
                  </select>
                </div>

                {formTipe === 'kelompok' ? (
                  <div>
                    <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                      Maks Anggota Tim
                    </label>
                    <input
                      type="number"
                      min={2}
                      max={10}
                      value={formMaksAnggota}
                      onChange={(e) => setFormMaksAnggota(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                      Maks Anggota Tim
                    </label>
                    <input
                      type="text"
                      disabled
                      value="1 Peserta (Individu)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-400 cursor-not-allowed shadow-2xs"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Biaya Registrasi (Rp) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={5000}
                    required
                    value={formBiaya}
                    onChange={(e) => setFormBiaya(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 4: Deskripsi Lomba */}
              <div>
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                  Deskripsi Lomba *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Jelaskan silabus, materi yang diujikan, dan ketentuan umum lomba..."
                  value={formDeskripsi}
                  onChange={(e) => setFormDeskripsi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                />
              </div>

              {/* Row 5: Persyaratan Lomba (Dynamic List) */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-white/60 border border-slate-200/80 shadow-2xs">
                <label className="text-[11px] font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Persyaratan Khusus Peserta</span>
                  <span className="text-[10px] text-indigo-700 font-bold lowercase">{formPersyaratan.length} butir</span>
                </label>
                
                <div className="space-y-1.5">
                  {formPersyaratan.map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/70 text-xs">
                      <span className="font-medium text-slate-800 leading-snug">• {req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePersyaratan(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                        title="Hapus butir persyaratan"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Tambah butir persyaratan baru..."
                    value={newPersyaratanInput}
                    onChange={(e) => setNewPersyaratanInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPersyaratan();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddPersyaratan}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-indigo-600 transition-colors shrink-0"
                  >
                    Tambah
                  </button>
                </div>
              </div>

              {/* Row 6: Jadwal & Tema Warna & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Jadwal Penyisihan
                  </label>
                  <input
                    type="text"
                    value={formJadwalPenyisihan}
                    onChange={(e) => setFormJadwalPenyisihan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Tema Warna Kartu
                  </label>
                  <select
                    value={formWarnaAksen}
                    onChange={(e) => setFormWarnaAksen(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                  >
                    <option value="purple">Ungu (Purple Royal)</option>
                    <option value="cyan">Cyan (Ocean Blue)</option>
                    <option value="emerald">Emerald (Green Jade)</option>
                    <option value="amber">Amber (Golden Honey)</option>
                    <option value="rose">Rose (Sunset Pink)</option>
                    <option value="blue">Blue (Electric Navy)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">
                    Status Pendaftaran
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as 'aktif' | 'tutup')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500 shadow-2xs cursor-pointer"
                  >
                    <option value="aktif">Aktif (Pendaftaran Buka)</option>
                    <option value="tutup">Tutup (Pendaftaran Tutup)</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl glass-3d-base text-xs font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-3d-primary px-6 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer shadow-md"
                >
                  {editingCategory ? 'Simpan Perubahan' : 'Terbitkan Jenis Lomba'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteConfirmTarget && (
        <ConfirmDialogModal
          isOpen={Boolean(deleteConfirmTarget)}
          title="Hapus Jenis Lomba?"
          message={
            <span>
              Apakah Anda yakin ingin menghapus kategori lomba <strong>"{deleteConfirmTarget.nama}"</strong>? Kategori ini tidak akan lagi muncul di formulir pendaftaran maupun Landing Page.
            </span>
          }
          confirmLabel="Ya, Hapus Kategori"
          cancelLabel="Batal"
          variant="danger"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirmTarget(null)}
        />
      )}

    </div>
  );
};
