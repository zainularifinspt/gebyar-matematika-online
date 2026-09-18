import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GlassDropdown } from '../common/GlassDropdown';
import type { SiswaBimbinganItem } from '../../types';

interface GuruPendaftaranKolektifTabProps {
  onSuccessRegister: (newStudents: SiswaBimbinganItem[]) => void;
  onNavigateTab: (tab: 'tagihan') => void;
}

const KATEGORI_OPTIONS = [
  { value: 'kat-smp', label: 'Matematika Terapan SMP/MTs (Rp 65.000)' },
  { value: 'kat-sd', label: 'Matematika Dasar SD/MI (Rp 50.000)' },
  { value: 'kat-sma', label: 'Olimpiade SMA/MA/SMK (Rp 75.000)' },
];

interface StudentFormRow {
  id: string;
  nama: string;
  nisn: string;
  kelas: string;
  kategoriId: string;
}

export const GuruPendaftaranKolektifTab: React.FC<GuruPendaftaranKolektifTabProps> = ({
  onSuccessRegister,
  onNavigateTab,
}) => {
  const [rows, setRows] = useState<StudentFormRow[]>([
    { id: '1', nama: '', nisn: '', kelas: '8-Tahfidz', kategoriId: 'kat-smp' },
  ]);

  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddRow = () => {
    setRows(prev => [
      ...prev,
      { id: String(Date.now()), nama: '', nisn: '', kelas: '8-Tahfidz', kategoriId: 'kat-smp' }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (rows.length === 1) return;
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const handleFieldChange = (id: string, field: keyof StudentFormRow, value: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // Pricing calculation
  const pricePerStudent = 65000;
  const subtotal = rows.length * pricePerStudent;
  const collectiveDiscount = rows.length >= 3 ? rows.length * 5000 : 0;
  const total = subtotal - collectiveDiscount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all names are filled
    const hasEmpty = rows.some(r => !r.nama.trim() || !r.nisn.trim());
    if (hasEmpty) {
      setFormError('Mohon lengkapi nama siswa dan NISN untuk seluruh baris pendaftaran.');
      return;
    }
    setFormError(null);

    const orderId = `GM27-KOL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newStudents: SiswaBimbinganItem[] = rows.map((r, idx) => ({
      id: `sb-${Date.now()}-${idx}`,
      namaSiswa: r.nama,
      nisn: r.nisn,
      kelas: r.kelas,
      kategoriId: r.kategoriId,
      kategoriNama: 'Matematika Terapan SMP/MTs',
      statusPembayaran: 'menunggu_pembayaran',
      orderId: orderId,
      kartuTersedia: false,
      sertifikatTersedia: false,
    }));

    onSuccessRegister(newStudents);
    setSubmittedMessage(`Pendaftaran kolektif ${rows.length} siswa berhasil disimpan dengan Kode Tagihan ${orderId}.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Info */}
      <div className="rounded-3xl p-6 glass-panel border border-slate-200/80 shadow-sm bg-white/80 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Pendaftaran Kolektif Sekolah Resmi
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
          Formulir Pendaftaran Kolektif Siswa
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          Sebagai guru pendamping, Anda dapat mendaftarkan beberapa siswa sekaligus dalam satu transaksi tagihan. 
          Dapatkan potongan biaya pembinaan sekolah sebesar <strong className="text-indigo-600">Rp 5.000 / siswa</strong> untuk pendaftaran minimal 3 siswa.
        </p>
      </div>

      {submittedMessage ? (
        <div className="rounded-3xl glass-panel p-8 border border-emerald-200 text-center space-y-4 bg-emerald-50/50 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
            Pendaftaran Kolektif Berhasil Disimpan!
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {submittedMessage}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigateTab('tagihan')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Buka Tagihan & Bayar QRIS / VA</span>
            </button>
            <button
              onClick={() => {
                setSubmittedMessage(null);
                setRows([{ id: '1', nama: '', nisn: '', kelas: '8-Tahfidz', kategoriId: 'kat-smp' }]);
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-sm transition-all"
            >
              Tambah Pendaftaran Lagi
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Dynamic Rows */}
          <div className="space-y-3">
            {rows.map((row, index) => (
              <div 
                key={row.id} 
                className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700 font-['Outfit']">
                    Data Siswa #{index + 1}
                  </span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Hapus baris ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Nama Lengkap Siswa *
                    </label>
                    <input
                      type="text"
                      required
                      value={row.nama}
                      onChange={(e) => handleFieldChange(row.id, 'nama', e.target.value)}
                      placeholder="Nama lengkap sesuai akta/rapor"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      NISN (10 Digit) *
                    </label>
                    <input
                      type="text"
                      required
                      value={row.nisn}
                      onChange={(e) => handleFieldChange(row.id, 'nisn', e.target.value)}
                      placeholder="Contoh: 0098123456"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Kelas / Rombel *
                    </label>
                    <input
                      type="text"
                      required
                      value={row.kelas}
                      onChange={(e) => handleFieldChange(row.id, 'kelas', e.target.value)}
                      placeholder="Contoh: 8-Tahfidz A"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Kategori Lomba *
                    </label>
                    <GlassDropdown
                      options={KATEGORI_OPTIONS}
                      value={row.kategoriId}
                      onChange={(val) => handleFieldChange(row.id, 'kategoriId', val)}
                      placeholder="Pilih Kategori Lomba"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddRow}
              className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-white/70 hover:bg-white text-slate-600 hover:text-indigo-600 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>Tambah Siswa Bimbingan Lainnya</span>
            </button>
          </div>

          {formError && (
            <div className="p-4 rounded-2xl glass-3d-rose border border-rose-200/80 text-rose-950 text-xs font-bold flex items-center gap-3 shadow-md animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Pricing & Checkout Summary Box */}
          <div className="rounded-3xl glass-panel p-6 border border-slate-200/80 shadow-sm bg-white/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-medium">Ringkasan Biaya Kolektif:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                  Rp {total.toLocaleString('id-ID')}
                </span>
                <span className="text-xs text-slate-500 font-medium">untuk {rows.length} siswa</span>
              </div>
              {collectiveDiscount > 0 && (
                <p className="text-[11px] text-emerald-600 font-semibold">
                  ✓ Potongan kolektif hemat Rp {collectiveDiscount.toLocaleString('id-ID')}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02]"
            >
              <span>Simpan & Buat Tagihan Kolektif</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
