import React, { useState } from 'react';
import { 
  UserPlus, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  X,
  Search,
  KeyRound
} from 'lucide-react';

export interface PanitiaMember {
  id: string;
  nama: string;
  email: string;
  username: string;
  divisi: 'Penjurian & CBT' | 'Kesekretariatan & Verifikasi' | 'IT & Infrastruktur' | 'Bendahara & Keuangan' | 'Logistik & Sertifikat';
  role: 'Staf Panitia' | 'Koordinator Divisi';
  status: 'aktif' | 'nonaktif';
  terakhirLogin: string;
}

const INITIAL_PANITIA: PanitiaMember[] = [];

export const KelolaPanitiaView: React.FC = () => {
  const [members, setMembers] = useState<PanitiaMember[]>(INITIAL_PANITIA);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<PanitiaMember | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
    password: '',
    divisi: 'Penjurian & CBT' as PanitiaMember['divisi'],
    role: 'Staf Panitia' as PanitiaMember['role'],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setFormData({
      nama: '',
      email: '',
      username: '',
      password: '',
      divisi: 'Penjurian & CBT',
      role: 'Staf Panitia',
    });
    setEditingMember(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (member: PanitiaMember) => {
    setEditingMember(member);
    setFormData({
      nama: member.nama,
      email: member.email,
      username: member.username,
      password: '',
      divisi: member.divisi,
      role: member.role,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nama || !formData.username) return;

    if (editingMember) {
      // Update existing
      setMembers(prev => prev.map(m => m.id === editingMember.id ? {
        ...m,
        nama: formData.nama,
        email: formData.email,
        username: formData.username,
        divisi: formData.divisi,
        role: formData.role,
      } : m));
      showToast(`✓ Data akun panitia "${formData.nama}" berhasil diperbarui.`);
    } else {
      // Add new
      const newMember: PanitiaMember = {
        id: `panitia-${Date.now()}`,
        nama: formData.nama,
        email: formData.email || `${formData.username}@gebyar.id`,
        username: formData.username.toLowerCase().replace(/\s+/g, ''),
        divisi: formData.divisi,
        role: formData.role,
        status: 'aktif',
        terakhirLogin: 'Belum pernah login',
      };
      setMembers(prev => [newMember, ...prev]);
      showToast(`✓ Akun panitia baru "${formData.nama}" berhasil dibuat.`);
    }

    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'aktif' ? 'nonaktif' : 'aktif';
        showToast(`Status akun ${m.nama} diubah menjadi ${nextStatus.toUpperCase()}.`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun panitia "${nama}"?`)) {
      setMembers(prev => prev.filter(m => m.id !== id));
      showToast(`Akun panitia "${nama}" telah dihapus dari sistem.`);
    }
  };

  const filteredMembers = members.filter(m => 
    m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.divisi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 text-xs font-bold shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl glass-panel border border-slate-200/90 bg-white/90 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-extrabold border border-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Hak Akses Khusus: Super Administrator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1.5">
              Manajemen Tim Panitia & Hak Akses Staf
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mt-1">
              Sebagai <strong>Super Admin</strong>, Anda memiliki kendali penuh untuk menambahkan akun panitia pelaksana, menentukan divisi kerja, mengedit profil, dan mengatur status keaktifan akun panitia.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm hover:shadow transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Panitia Baru</span>
          </button>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Total Akun Panitia</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit']">{members.length} Anggota</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Status Akun Aktif</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit']">
                {members.filter(m => m.status === 'aktif').length} Staf Bertugas
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Tingkat Hak Akses</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit']">Root Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-3xl glass-panel border border-slate-200/90 bg-white/90 shadow-sm p-6 space-y-4">
        
        {/* Table Filter / Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari panitia berdasarkan nama / divisi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Menampilkan <strong>{filteredMembers.length}</strong> akun panitia
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Nama Panitia & Email</th>
                <th className="py-3 px-4">Username Akun</th>
                <th className="py-3 px-4">Divisi Kerja</th>
                <th className="py-3 px-4">Tingkat Peran</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Terakhir Login</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 font-['Outfit']">Belum Ada Akun Staf Panitia</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      Sebagai Super Admin, Anda memiliki hak penuh untuk menambahkan akun bagi anggota panitia pelaksana.
                    </p>
                    <button
                      onClick={handleOpenAdd}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Tambah Panitia Pertama</span>
                    </button>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-bold flex items-center justify-center shrink-0">
                        {m.nama.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{m.nama}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                    @{m.username}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    {m.divisi}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      m.role === 'Koordinator Divisi' 
                        ? 'bg-purple-50 text-purple-800 border border-purple-200' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStatus(m.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        m.status === 'aktif'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      }`}
                      title="Klik untuk mengubah status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'aktif' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span>{m.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    {m.terakhirLogin}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Edit Data Panitia"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.nama)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Hapus Akun Panitia"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL: Tambah / Edit Panitia */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-slate-800">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                    {editingMember ? 'Edit Data Panitia' : 'Tambah Akun Panitia Baru'}
                  </h4>
                  <p className="text-xs text-slate-500">Kredensial login untuk staf kepanitiaan Gebyar Matematika</p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Panitia
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Rina Kusumawati, S.Si"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username Akun
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="contoh: rina.cbt"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rina@gebyar.id"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              {!editingMember && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password Awal
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Buat password awal panitia"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Panitia dapat mengubah password ini setelah login.</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Divisi Penugasan
                  </label>
                  <select
                    value={formData.divisi}
                    onChange={(e) => setFormData({ ...formData, divisi: e.target.value as PanitiaMember['divisi'] })}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-indigo-500 shadow-xs"
                  >
                    <option value="Penjurian & CBT">Penjurian & CBT</option>
                    <option value="Kesekretariatan & Verifikasi">Kesekretariatan & Verifikasi</option>
                    <option value="IT & Infrastruktur">IT & Infrastruktur</option>
                    <option value="Bendahara & Keuangan">Bendahara & Keuangan</option>
                    <option value="Logistik & Sertifikat">Logistik & Sertifikat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tingkat Peran
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as PanitiaMember['role'] })}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 font-bold focus:outline-none focus:border-indigo-500 shadow-xs"
                  >
                    <option value="Staf Panitia">Staf Panitia</option>
                    <option value="Koordinator Divisi">Koordinator Divisi</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 shadow-sm"
                >
                  {editingMember ? 'Simpan Perubahan' : 'Buat Akun Panitia'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
