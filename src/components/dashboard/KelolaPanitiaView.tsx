import React, { useState, useRef } from 'react';
import { 
  UserPlus, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  Trash2, 
  X, 
  Search, 
  KeyRound,
  FileSpreadsheet,
  Download,
  UploadCloud,
  AlertCircle
} from 'lucide-react';
import * as XLSX from 'xlsx';
import type { PanitiaMember } from '../../data/mockData';
import { useStoredPanitia } from '../../utils/storage';

interface ParsedPanitiaItem {
  nama: string;
  email: string;
  username: string;
  password?: string;
  divisi: PanitiaMember['divisi'];
  role: PanitiaMember['role'];
  isValid: boolean;
  errorNote?: string;
}

export const KelolaPanitiaView: React.FC = () => {
  const [members, setMembers] = useStoredPanitia();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<PanitiaMember | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Excel Import State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [parsedImportList, setParsedImportList] = useState<ParsedPanitiaItem[]>([]);
  const [importFileName, setImportFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const normalizeDivisi = (val: string): PanitiaMember['divisi'] => {
    const s = (val || '').toLowerCase();
    if (s.includes('cbt') || s.includes('juri')) return 'Penjurian & CBT';
    if (s.includes('sekret') || s.includes('verif')) return 'Kesekretariatan & Verifikasi';
    if (s.includes('it') || s.includes('infra') || s.includes('web')) return 'IT & Infrastruktur';
    if (s.includes('keu') || s.includes('bendahara') || s.includes('uang')) return 'Bendahara & Keuangan';
    if (s.includes('logistik') || s.includes('sertifikat')) return 'Logistik & Sertifikat';
    return 'Penjurian & CBT';
  };

  const normalizeRole = (val: string): PanitiaMember['role'] => {
    const s = (val || '').toLowerCase();
    if (s.includes('super') || s.includes('admin')) return 'Super Admin';
    if (s.includes('koor')) return 'Koordinator Divisi';
    return 'Staf Panitia';
  };

  // Download Excel Template for bulk import
  const handleDownloadTemplate = () => {
    const headers = ['Nama Lengkap', 'Email', 'Username', 'Password', 'Divisi', 'Peran'];
    const sampleRows = [
      [
        'Rina Kusumawati, S.Si', 
        'rina.cbt@gebyar.id', 
        'rina.cbt', 
        'Panitia2027!', 
        'Penjurian & CBT', 
        'Staf Panitia'
      ],
      [
        'Ahmad Fauzi, M.Kom', 
        'fauzi.it@gebyar.id', 
        'fauzi.it', 
        'Panitia2027!', 
        'IT & Infrastruktur', 
        'Koordinator Divisi'
      ],
      [
        'Siti Rahma, S.Pd', 
        'siti.sekretariat@gebyar.id', 
        'siti.sekretariat', 
        'Panitia2027!', 
        'Kesekretariatan & Verifikasi', 
        'Staf Panitia'
      ],
      [
        'Budi Santoso, S.E', 
        'budi.keu@gebyar.id', 
        'budi.keu', 
        'Panitia2027!', 
        'Bendahara & Keuangan', 
        'Staf Panitia'
      ]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleRows]);

    // Set auto column width
    ws['!cols'] = [
      { wch: 28 }, // Nama Lengkap
      { wch: 30 }, // Email
      { wch: 18 }, // Username
      { wch: 16 }, // Password
      { wch: 30 }, // Divisi
      { wch: 20 }, // Peran
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Template Panitia');
    XLSX.writeFile(wb, 'GM2027_Template_Import_Panitia.xlsx');
    showToast('✓ Template Excel akun panitia berhasil diunduh.');
  };

  // Handle file selection from local device
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result as ArrayBuffer;
        const workbook = XLSX.read(buffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          showToast('Error: Sheet dalam file Excel tidak ditemukan.');
          return;
        }

        const worksheet = workbook.Sheets[sheetName];
        const rawJson: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (rawJson.length === 0) {
          showToast('File Excel kosong atau tidak memiliki baris data.');
          return;
        }

        const parsed: ParsedPanitiaItem[] = rawJson.map((row) => {
          const entries = Object.entries(row);
          const getVal = (possibleKeys: string[]): string => {
            for (const [key, val] of entries) {
              const cleanedKey = key.trim().toLowerCase();
              if (possibleKeys.some(pk => cleanedKey.includes(pk))) {
                return String(val ?? '').trim();
              }
            }
            return '';
          };

          const nama = getVal(['nama', 'name']);
          const email = getVal(['email', 'mail']);
          let username = getVal(['username', 'user', 'id']);
          const password = getVal(['password', 'sandi', 'pass']) || 'Panitia2027!';
          const divisiRaw = getVal(['divisi', 'division', 'bagian']);
          const roleRaw = getVal(['peran', 'role', 'tingkat', 'level']);

          if (!username && email) {
            username = email.split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g, '');
          } else if (!username && nama) {
            username = nama.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9._-]/g, '');
          }

          let isValid = true;
          let errorNote = '';

          if (!nama) {
            isValid = false;
            errorNote = 'Nama lengkap belum diisi';
          } else if (!email) {
            isValid = false;
            errorNote = 'Email belum diisi';
          }

          return {
            nama,
            email,
            username: username || 'panitia.user',
            password,
            divisi: normalizeDivisi(divisiRaw),
            role: normalizeRole(roleRaw),
            isValid,
            errorNote,
          };
        });

        setParsedImportList(parsed);
        setIsImportModalOpen(true);
      } catch (err) {
        console.error('Error parsing excel:', err);
        showToast('Gagal membaca file Excel. Pastikan format file adalah .xlsx atau .csv.');
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Confirm import and merge into state & storage
  const handleConfirmImport = () => {
    const validItems = parsedImportList.filter(item => item.isValid);
    if (validItems.length === 0) {
      showToast('Tidak ada baris data valid yang dapat diimpor.');
      return;
    }

    let updatedMembers = [...members];
    let addedCount = 0;
    let updatedCount = 0;

    for (const item of validItems) {
      const existingIdx = updatedMembers.findIndex(
        m => m.email.toLowerCase() === item.email.toLowerCase() || m.username.toLowerCase() === item.username.toLowerCase()
      );

      if (existingIdx >= 0) {
        updatedMembers[existingIdx] = {
          ...updatedMembers[existingIdx],
          nama: item.nama,
          email: item.email,
          username: item.username,
          divisi: item.divisi,
          role: item.role,
          password: item.password || updatedMembers[existingIdx].password,
          status: 'aktif',
        };
        updatedCount++;
      } else {
        const newPanitia: PanitiaMember = {
          id: `panitia-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          nama: item.nama,
          email: item.email,
          username: item.username,
          password: item.password,
          divisi: item.divisi,
          role: item.role,
          status: 'aktif',
          terakhirLogin: 'Baru diimpor Excel',
        };
        updatedMembers = [newPanitia, ...updatedMembers];
        addedCount++;
      }
    }

    setMembers(updatedMembers);
    setIsImportModalOpen(false);
    showToast(`✓ Berhasil: ${addedCount} akun baru ditambahkan, ${updatedCount} akun diperbarui.`);
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
      const updated = members.map(m => m.id === editingMember.id ? {
        ...m,
        nama: formData.nama,
        email: formData.email,
        username: formData.username,
        divisi: formData.divisi,
        role: formData.role,
        ...(formData.password ? { password: formData.password } : {}),
      } : m);
      setMembers(updated);
      showToast(`✓ Data akun panitia "${formData.nama}" berhasil diperbarui.`);
    } else {
      // Add new
      const newMember: PanitiaMember = {
        id: `panitia-${Date.now()}`,
        nama: formData.nama,
        email: formData.email || `${formData.username}@gebyar.id`,
        username: formData.username.toLowerCase().replace(/\s+/g, ''),
        password: formData.password || 'Panitia2027!',
        divisi: formData.divisi,
        role: formData.role,
        status: 'aktif',
        terakhirLogin: 'Baru ditambahkan',
      };
      setMembers([newMember, ...members]);
      showToast(`✓ Akun panitia baru "${formData.nama}" berhasil dibuat.`);
    }

    setIsAddModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    const updated = members.map(m => {
      if (m.id === id) {
        const nextStatus: 'aktif' | 'nonaktif' = m.status === 'aktif' ? 'nonaktif' : 'aktif';
        showToast(`Status akun ${m.nama} diubah menjadi ${nextStatus.toUpperCase()}.`);
        return { ...m, status: nextStatus };
      }
      return m;
    });
    setMembers(updated);
  };

  const handleDelete = (id: string, nama: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun panitia "${nama}"?`)) {
      setMembers(members.filter(m => m.id !== id));
      showToast(`Akun panitia "${nama}" telah dihapus dari sistem.`);
    }
  };

  const filteredMembers = members.filter(m => 
    m.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.divisi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-3d-elevated border border-slate-200 text-slate-900 text-xs font-bold shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for Excel Import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={handleFileSelected}
      />

      {/* Header Banner */}
      <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-4 shadow-xl shadow-indigo-950/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-950 text-xs font-black border border-amber-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Hak Akses Khusus: Super Administrator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1.5 tracking-tight">
              Manajemen Tim Panitia & Hak Akses Staf
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mt-1 font-medium">
              Sebagai <strong>Super Admin</strong>, Anda memiliki kendali penuh untuk menambahkan akun panitia, mengimpor banyak akun sekaligus via Excel, menentukan divisi kerja, dan mengatur hak akses portal.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleDownloadTemplate}
              className="btn-3d-white inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer text-slate-700 hover:text-indigo-700 border border-slate-200"
              title="Unduh template Excel untuk import akun panitia"
            >
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Unduh Template Excel</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-3d-white inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold cursor-pointer text-slate-800 hover:text-emerald-700 border border-emerald-300/80 bg-emerald-50/40"
              title="Upload file spreadsheet Excel atau CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Import File Excel</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Panitia</span>
            </button>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="glass-3d-card glass-3d-card-indigo p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-indigo-950 font-bold uppercase tracking-wider">Total Akun Panitia</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit'] tabular-nums">{members.length} Anggota</p>
            </div>
          </div>

          <div className="glass-3d-card glass-3d-card-emerald p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-emerald-950 font-bold uppercase tracking-wider">Status Akun Aktif</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit'] tabular-nums">
                {members.filter(m => m.status === 'aktif').length} Staf Bertugas
              </p>
            </div>
          </div>

          <div className="glass-3d-card glass-3d-card-amber p-4 rounded-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-600/30">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-amber-950 font-bold uppercase tracking-wider">Tingkat Hak Akses</p>
              <p className="text-lg font-black text-slate-900 font-['Outfit']">Root Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-3xl glass-3d-card p-6 sm:p-7 space-y-4 shadow-xl shadow-slate-900/5">
        
        {/* Table Filter / Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari panitia berdasarkan nama / divisi / email..."
              className="glass-3d-input w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs text-slate-900 font-medium placeholder:text-slate-400"
            />
          </div>

          <span className="text-xs text-slate-600 font-bold bg-white/70 px-3 py-1.5 rounded-xl border border-white/90 shadow-2xs">
            Menampilkan <strong className="text-slate-900 font-black">{filteredMembers.length}</strong> akun panitia
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/90 bg-white/60 backdrop-blur-md shadow-inner">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-600 font-black border-b border-slate-200/80 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-['Outfit']">Nama Panitia & Email</th>
                <th className="py-3.5 px-4 font-['Outfit']">Username Akun</th>
                <th className="py-3.5 px-4 font-['Outfit']">Divisi Kerja</th>
                <th className="py-3.5 px-4 font-['Outfit']">Tingkat Peran</th>
                <th className="py-3.5 px-4 font-['Outfit']">Status</th>
                <th className="py-3.5 px-4 font-['Outfit']">Terakhir Login</th>
                <th className="py-3.5 px-4 text-right font-['Outfit']">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-slate-500">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto mb-3 border border-amber-200 shadow-sm">
                      <Users className="w-7 h-7" />
                    </div>
                    <p className="text-base font-black text-slate-900 font-['Outfit']">Belum Ada Akun Staf Panitia</p>
                    <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto font-medium">
                      Sebagai Super Admin, Anda memiliki hak penuh untuk menambahkan akun atau mengimpor via file Excel.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-3d-white inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer border border-emerald-300"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                        <span>Import Excel</span>
                      </button>
                      <button
                        onClick={handleOpenAdd}
                        className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Tambah Panitia Pertama</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white font-black flex items-center justify-center shrink-0 shadow-xs shadow-indigo-600/30">
                        {m.nama.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{m.nama}</p>
                        <p className="text-[11px] text-slate-500 font-mono font-medium">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    @{m.username}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {m.divisi}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border shadow-2xs ${
                      m.role === 'Super Admin' ? 'bg-amber-100 text-amber-950 border-amber-300' :
                      m.role === 'Koordinator Divisi' ? 'bg-indigo-100 text-indigo-950 border-indigo-300' :
                      'bg-cyan-50 text-cyan-900 border-cyan-200'
                    }`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(m.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                        m.status === 'aktif' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'aktif' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                      <span>{m.status === 'aktif' ? 'Aktif Bertugas' : 'Non-aktif'}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {m.terakhirLogin}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(m)}
                        title="Edit Profil Panitia"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(m.id, m.nama)}
                        title="Hapus Akun Panitia"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: PREVIEW IMPORT EXCEL */}
      {/* ============================================================ */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fade-in">
          <div className="rounded-3xl glass-3d-elevated p-6 sm:p-7 border border-white/95 shadow-2xl max-w-3xl w-full space-y-5 animate-scale-up max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-3.5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-black border border-emerald-300 uppercase tracking-wider">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Import Data Panitia dari Excel</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Konfirmasi Import: {importFileName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Sistem telah membaca dan memvalidasi baris data dari file spreadsheet Anda.
                </p>
              </div>

              <button
                onClick={() => setIsImportModalOpen(false)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-white/90 shadow-2xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Summary Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/80 border border-white/90 text-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Akun Terbaca</span>
                <span className="text-base font-black text-slate-900 font-['Outfit']">{parsedImportList.length} Baris</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Siap Diimpor</span>
                <span className="text-base font-black text-emerald-800 font-['Outfit']">
                  {parsedImportList.filter(p => p.isValid).length} Akun
                </span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-center">
                <span className="text-[10px] text-rose-700 font-bold uppercase block">Data Kurang Lengkap</span>
                <span className="text-base font-black text-rose-800 font-['Outfit']">
                  {parsedImportList.filter(p => !p.isValid).length} Baris
                </span>
              </div>
            </div>

            {/* Preview Table Container */}
            <div className="flex-1 overflow-y-auto max-h-72 rounded-2xl border border-slate-200/80 bg-white/80">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-black sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Nama Lengkap</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Username</th>
                    <th className="py-2.5 px-3">Divisi</th>
                    <th className="py-2.5 px-3">Peran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {parsedImportList.map((item, idx) => (
                    <tr key={idx} className={item.isValid ? 'hover:bg-slate-50' : 'bg-rose-50/40'}>
                      <td className="py-2 px-3">
                        {item.isValid ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md" title={item.errorNote}>
                            <AlertCircle className="w-3 h-3 text-rose-600" />
                            {item.errorNote || 'Error'}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-bold text-slate-900">{item.nama || '-'}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-slate-600">{item.email || '-'}</td>
                      <td className="py-2 px-3 font-mono text-[11px] text-indigo-700 font-bold">@{item.username}</td>
                      <td className="py-2 px-3 text-slate-700">{item.divisi}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{item.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Note & Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200/80">
              <p className="text-[11px] text-slate-500 font-medium">
                *Akun dengan email/username yang sudah ada akan otomatis diperbarui profil dan perannya.
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="btn-3d-white px-4 py-2 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmImport}
                  disabled={parsedImportList.filter(p => p.isValid).length === 0}
                  className="btn-3d-primary inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Konfirmasi & Import ke Sistem</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: TAMBAH / EDIT PANITIA MANUAL */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md animate-fade-in">
          <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 border border-white/95 shadow-2xl max-w-lg w-full space-y-5 animate-scale-up">
            
            <div className="flex items-start justify-between gap-4 border-b border-slate-200/60 pb-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-950 text-[10px] font-black border border-indigo-200 uppercase tracking-wider">
                  <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Akun Panitia Pelaksana</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 font-['Outfit'] mt-1">
                  {editingMember ? 'Edit Data Akun Panitia' : 'Tambah Panitia Baru'}
                </h3>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-white/90 shadow-2xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                  Nama Lengkap Panitia
                </label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Rina Kusumawati, S.Si"
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                    Username Akun
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="contoh: rina.cbt"
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rina@gebyar.id"
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                  {editingMember ? 'Ganti Password (Kosongkan jika tidak ingin mengubah)' : 'Password Awal Akun'}
                </label>
                <input
                  type="text"
                  required={!editingMember}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingMember ? 'Masukkan password baru' : 'Buat password awal panitia'}
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-xs text-slate-900 font-medium"
                />
                <span className="text-[10px] text-slate-500 font-medium mt-1 block">Panitia dapat login menggunakan email/username dan password ini.</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                    Divisi Penugasan
                  </label>
                  <select
                    value={formData.divisi}
                    onChange={(e) => setFormData({ ...formData, divisi: e.target.value as PanitiaMember['divisi'] })}
                    className="glass-3d-input w-full px-3 py-2.5 rounded-xl text-xs text-slate-900 font-bold"
                  >
                    <option value="Penjurian & CBT">Penjurian & CBT</option>
                    <option value="Kesekretariatan & Verifikasi">Kesekretariatan & Verifikasi</option>
                    <option value="IT & Infrastruktur">IT & Infrastruktur</option>
                    <option value="Bendahara & Keuangan">Bendahara & Keuangan</option>
                    <option value="Logistik & Sertifikat">Logistik & Sertifikat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1 font-['Outfit']">
                    Tingkat Peran
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as PanitiaMember['role'] })}
                    className="glass-3d-input w-full px-3 py-2.5 rounded-xl text-xs text-slate-900 font-bold"
                  >
                    <option value="Staf Panitia">Staf Panitia</option>
                    <option value="Koordinator Divisi">Koordinator Divisi</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-3d-white px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-3d-primary px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
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
