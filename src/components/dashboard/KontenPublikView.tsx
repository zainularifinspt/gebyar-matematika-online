import React, { useState } from 'react';
import { 
  Video, 
  FileText, 
  Bell, 
  Plus, 
  Edit3, 
  Trash2, 
  Play, 
  Search, 
  Eye, 
  X, 
  Film,
  Clock
} from 'lucide-react';
import { 
  MOCK_VIDEOS, 
  MOCK_ARSIP_SOAL, 
  MOCK_PENGUMUMAN 
} from '../../data/mockData';
import type { VideoKegiatan, ArsipSoal, Pengumuman } from '../../types';

interface KontenPublikViewProps {
  onShowToast?: (message: string) => void;
}

type SubTab = 'video' | 'arsip' | 'pengumuman';

export const KontenPublikView: React.FC<KontenPublikViewProps> = ({ onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('video');
  const [searchQuery, setSearchQuery] = useState('');

  // Datasets state
  const [videos, setVideos] = useState<VideoKegiatan[]>(MOCK_VIDEOS);
  const [arsipSoal, setArsipSoal] = useState<ArsipSoal[]>(MOCK_ARSIP_SOAL);
  const [pengumuman, setPengumuman] = useState<Pengumuman[]>(MOCK_PENGUMUMAN);

  // Modals state
  const [editingVideo, setEditingVideo] = useState<VideoKegiatan | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

  const [editingArsip, setEditingArsip] = useState<ArsipSoal | null>(null);
  const [isArsipModalOpen, setIsArsipModalOpen] = useState(false);

  const [editingPengumuman, setEditingPengumuman] = useState<Pengumuman | null>(null);
  const [isPengumumanModalOpen, setIsPengumumanModalOpen] = useState(false);

  const [itemToDelete, setItemToDelete] = useState<{ type: SubTab; id: string; title: string } | null>(null);

  const notify = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    }
  };

  // ----------------------------------------------------
  // VIDEO HANDLERS
  // ----------------------------------------------------
  const handleOpenAddVideo = () => {
    setEditingVideo({
      id: `vid-${Date.now()}`,
      judul: '',
      tahun: new Date().getFullYear(),
      deskripsi: '',
      embedUrl: '',
      thumbnailUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
      durasi: '03:45',
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (video: VideoKegiatan) => {
    setEditingVideo({ ...video });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo || !editingVideo.judul.trim()) return;

    const exists = videos.some(v => v.id === editingVideo.id);
    if (exists) {
      setVideos(prev => prev.map(v => v.id === editingVideo.id ? editingVideo : v));
      notify(`✓ Video "${editingVideo.judul}" berhasil diperbarui!`);
    } else {
      setVideos(prev => [editingVideo, ...prev]);
      notify(`✓ Video baru "${editingVideo.judul}" berhasil ditambahkan!`);
    }
    setIsVideoModalOpen(false);
    setEditingVideo(null);
  };

  // ----------------------------------------------------
  // ARSIP SOAL HANDLERS
  // ----------------------------------------------------
  const handleOpenAddArsip = () => {
    setEditingArsip({
      id: `soal-${Date.now()}`,
      tahun: new Date().getFullYear(),
      kategoriId: 'kat-sma',
      kategoriNama: 'Olimpiade SMA/MA/SMK',
      tingkat: 'SMA',
      judul: '',
      jumlahHalaman: 10,
      fileUrl: '#',
      ukuranFile: '2.0 MB',
    });
    setIsArsipModalOpen(true);
  };

  const handleOpenEditArsip = (arsip: ArsipSoal) => {
    setEditingArsip({ ...arsip });
    setIsArsipModalOpen(true);
  };

  const handleSaveArsip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArsip || !editingArsip.judul.trim()) return;

    const exists = arsipSoal.some(a => a.id === editingArsip.id);
    if (exists) {
      setArsipSoal(prev => prev.map(a => a.id === editingArsip.id ? editingArsip : a));
      notify(`✓ Paket Arsip Soal "${editingArsip.judul}" berhasil diperbarui!`);
    } else {
      setArsipSoal(prev => [editingArsip, ...prev]);
      notify(`✓ Paket Arsip Soal baru "${editingArsip.judul}" berhasil ditambahkan!`);
    }
    setIsArsipModalOpen(false);
    setEditingArsip(null);
  };

  // ----------------------------------------------------
  // PENGUMUMAN HANDLERS
  // ----------------------------------------------------
  const handleOpenAddPengumuman = () => {
    const todayStr = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
    setEditingPengumuman({
      id: `ann-${Date.now()}`,
      judul: '',
      ringkasan: '',
      isi: '',
      tanggal: todayStr,
      kategori: 'Penting',
      isPenting: true,
    });
    setIsPengumumanModalOpen(true);
  };

  const handleOpenEditPengumuman = (ann: Pengumuman) => {
    setEditingPengumuman({ ...ann });
    setIsPengumumanModalOpen(true);
  };

  const handleSavePengumuman = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPengumuman || !editingPengumuman.judul.trim()) return;

    const exists = pengumuman.some(p => p.id === editingPengumuman.id);
    if (exists) {
      setPengumuman(prev => prev.map(p => p.id === editingPengumuman.id ? editingPengumuman : p));
      notify(`✓ Pengumuman "${editingPengumuman.judul}" berhasil diperbarui!`);
    } else {
      setPengumuman(prev => [editingPengumuman, ...prev]);
      notify(`✓ Pengumuman baru "${editingPengumuman.judul}" berhasil diterbitkan!`);
    }
    setIsPengumumanModalOpen(false);
    setEditingPengumuman(null);
  };

  // ----------------------------------------------------
  // DELETE HANDLER
  // ----------------------------------------------------
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'video') {
      setVideos(prev => prev.filter(v => v.id !== itemToDelete.id));
      notify(`✓ Video "${itemToDelete.title}" telah dihapus.`);
    } else if (itemToDelete.type === 'arsip') {
      setArsipSoal(prev => prev.filter(a => a.id !== itemToDelete.id));
      notify(`✓ Paket Soal "${itemToDelete.title}" telah dihapus.`);
    } else if (itemToDelete.type === 'pengumuman') {
      setPengumuman(prev => prev.filter(p => p.id !== itemToDelete.id));
      notify(`✓ Pengumuman "${itemToDelete.title}" telah dihapus.`);
    }
    setItemToDelete(null);
  };

  // Filtered queries
  const filteredVideos = videos.filter(v => 
    v.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArsip = arsipSoal.filter(a => 
    a.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.kategoriNama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tingkat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPengumuman = pengumuman.filter(p => 
    p.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.ringkasan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.kategori.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6 animate-fade-in text-slate-800">
      
      {/* Top Header & Sub-Tabs Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
            Manajemen Konten Publik & Media Lomba
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Kelola arsip soal latihan PDF, galeri video dokumentasi kegiatan, dan pengumuman resmi yang tampil di Beranda publik.
          </p>
        </div>

        {/* Action Button sesuai SubTab Aktif */}
        <div className="shrink-0">
          {activeSubTab === 'video' && (
            <button
              onClick={handleOpenAddVideo}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Video Baru</span>
            </button>
          )}
          {activeSubTab === 'arsip' && (
            <button
              onClick={handleOpenAddArsip}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Unggah Paket Soal</span>
            </button>
          )}
          {activeSubTab === 'pengumuman' && (
            <button
              onClick={handleOpenAddPengumuman}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Terbitkan Pengumuman</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Navigation Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Pills */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs font-bold self-start">
          <button
            onClick={() => { setActiveSubTab('video'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'video'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Kegiatan</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeSubTab === 'video' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
            }`}>
              {videos.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveSubTab('arsip'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'arsip'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Arsip Soal & Kunci</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeSubTab === 'arsip' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
            }`}>
              {arsipSoal.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveSubTab('pengumuman'); setSearchQuery(''); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'pengumuman'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Pengumuman Beranda</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              activeSubTab === 'pengumuman' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
            }`}>
              {pengumuman.length}
            </span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Cari ${activeSubTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
          />
        </div>

      </div>

      {/* ============================================================ */}
      {/* SUBTAB 1: VIDEO KEGIATAN & LIPUTAN */}
      {/* ============================================================ */}
      {activeSubTab === 'video' && (
        <div className="space-y-4">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs">
              Tidak ada video yang sesuai dengan pencarian "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((vid) => (
                <div 
                  key={vid.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Stage */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900 group">
                      <img 
                        src={vid.thumbnailUrl} 
                        alt={vid.judul} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                        <button
                          onClick={() => setVideoPreviewUrl(vid.embedUrl)}
                          className="w-10 h-10 rounded-full bg-white/90 text-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                          title="Putar Video"
                        >
                          <Play className="w-5 h-5 ml-0.5 fill-indigo-600" />
                        </button>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {vid.durasi}
                      </span>
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-indigo-600/90 text-white text-[10px] font-bold">
                        Tahun {vid.tahun}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                        {vid.judul}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {vid.deskripsi}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setVideoPreviewUrl(vid.embedUrl)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditVideo(vid)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-200/70 transition-colors cursor-pointer"
                        title="Ubah Video"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: 'video', id: vid.id, title: vid.judul })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUBTAB 2: ARSIP SOAL & PEMBAHASAN PDF */}
      {/* ============================================================ */}
      {activeSubTab === 'arsip' && (
        <div className="space-y-4">
          {filteredArsip.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs">
              Tidak ada paket soal yang sesuai dengan pencarian "{searchQuery}".
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black tracking-wider uppercase text-[10px]">
                    <th className="py-3 px-4">Tahun</th>
                    <th className="py-3 px-4">Judul Naskah Soal</th>
                    <th className="py-3 px-4">Jenjang & Kategori</th>
                    <th className="py-3 px-4">Ukuran & Halaman</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredArsip.map((soal) => {
                    const badgeColor = 
                      soal.tingkat.includes('SD') ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                      soal.tingkat.includes('SMP') ? 'bg-sky-50 text-sky-800 border-sky-200' :
                      soal.tingkat.includes('SMA') ? 'bg-purple-50 text-purple-800 border-purple-200' :
                      'bg-slate-100 text-slate-800 border-slate-200';

                    return (
                      <tr key={soal.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-black font-mono text-slate-900">
                          {soal.tahun}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{soal.judul}</p>
                              <span className="text-[10px] text-slate-400 font-mono">ID: {soal.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeColor}`}>
                            {soal.tingkat}
                          </span>
                          <p className="text-[11px] text-slate-500 mt-0.5">{soal.kategoriNama}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="font-semibold">{soal.jumlahHalaman} Halaman</span>
                          <span className="text-slate-300 mx-1.5">•</span>
                          <span className="text-slate-500 font-mono">{soal.ukuranFile}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditArsip(soal)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Ubah Data Paket Soal"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setItemToDelete({ type: 'arsip', id: soal.id, title: soal.judul })}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Hapus Paket Soal"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* SUBTAB 3: PENGUMUMAN RESMI BERANDA */}
      {/* ============================================================ */}
      {activeSubTab === 'pengumuman' && (
        <div className="space-y-4">
          {filteredPengumuman.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs">
              Tidak ada pengumuman yang sesuai dengan pencarian "{searchQuery}".
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredPengumuman.map((ann) => {
                const categoryStyle = 
                  ann.kategori === 'Penting' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  ann.kategori === 'Jadwal' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                  ann.kategori === 'Hasil' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  'bg-sky-50 text-sky-700 border-sky-200';

                return (
                  <div 
                    key={ann.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 shadow-xs transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${categoryStyle}`}>
                          {ann.kategori}
                        </span>
                        {ann.isPenting && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold">
                            Tampil di Banner Beranda
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-medium">
                          {ann.tanggal}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm leading-snug">
                        {ann.judul}
                      </h4>

                      <p className="text-xs text-slate-600 font-normal leading-relaxed">
                        {ann.ringkasan}
                      </p>

                      <div className="pt-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 line-clamp-2">
                        <strong>Isi Lengkap:</strong> {ann.isi}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                      <button
                        onClick={() => handleOpenEditPengumuman(ann)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Ubah</span>
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: 'pengumuman', id: ann.id, title: ann.judul })}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus Pengumuman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: FORM TAMBAH / UBAH VIDEO */}
      {/* ============================================================ */}
      {isVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Film className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {videos.some(v => v.id === editingVideo.id) ? 'Ubah Video Dokumentasi' : 'Tambah Video Dokumentasi Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsVideoModalOpen(false); setEditingVideo(null); }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Video *</label>
                <input
                  type="text"
                  required
                  value={editingVideo.judul}
                  onChange={(e) => setEditingVideo({ ...editingVideo, judul: e.target.value })}
                  placeholder="Contoh: Aftermovie Gebyar Matematika 2024"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tahun Kegiatan *</label>
                  <input
                    type="number"
                    required
                    value={editingVideo.tahun}
                    onChange={(e) => setEditingVideo({ ...editingVideo, tahun: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Durasi (MM:SS) *</label>
                  <input
                    type="text"
                    required
                    value={editingVideo.durasi}
                    onChange={(e) => setEditingVideo({ ...editingVideo, durasi: e.target.value })}
                    placeholder="04:18"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">URL Embed YouTube / Video Player *</label>
                <input
                  type="url"
                  required
                  value={editingVideo.embedUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, embedUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[11px] focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">URL Gambar Thumbnail Cover *</label>
                <input
                  type="url"
                  required
                  value={editingVideo.thumbnailUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[11px] focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Deskripsi Ringkas Video</label>
                <textarea
                  rows={3}
                  value={editingVideo.deskripsi}
                  onChange={(e) => setEditingVideo({ ...editingVideo, deskripsi: e.target.value })}
                  placeholder="Ceritakan kilasan cuplikan video dokumentasi ini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsVideoModalOpen(false); setEditingVideo(null); }}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Simpan Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: FORM TAMBAH / UBAH ARSIP SOAL */}
      {/* ============================================================ */}
      {isArsipModalOpen && editingArsip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {arsipSoal.some(a => a.id === editingArsip.id) ? 'Ubah Paket Arsip Soal' : 'Unggah Paket Arsip Soal Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsArsipModalOpen(false); setEditingArsip(null); }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArsip} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Paket Naskah Soal & Kunci *</label>
                <input
                  type="text"
                  required
                  value={editingArsip.judul}
                  onChange={(e) => setEditingArsip({ ...editingArsip, judul: e.target.value })}
                  placeholder="Contoh: Naskah Soal & Pembahasan Babak Penyisihan GM 2025"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jenjang Tingkat *</label>
                  <select
                    value={editingArsip.tingkat}
                    onChange={(e) => {
                      const tingkat = e.target.value;
                      const kategoriNama = 
                        tingkat === 'SD' ? 'Matematika Dasar SD/MI' :
                        tingkat === 'SMP' ? 'Matematika Terapan SMP/MTs' :
                        tingkat === 'SMA' ? 'Olimpiade SMA/MA/SMK' : 'Kompilasi Lengkap Semua Jenjang';
                      setEditingArsip({ ...editingArsip, tingkat, kategoriNama });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white font-semibold"
                  >
                    <option value="SD">SD / MI</option>
                    <option value="SMP">SMP / MTs</option>
                    <option value="SMA">SMA / MA / SMK</option>
                    <option value="Semua Tingkat">Semua Tingkat</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tahun Soal *</label>
                  <input
                    type="number"
                    required
                    value={editingArsip.tahun}
                    onChange={(e) => setEditingArsip({ ...editingArsip, tahun: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jumlah Halaman PDF *</label>
                  <input
                    type="number"
                    required
                    value={editingArsip.jumlahHalaman}
                    onChange={(e) => setEditingArsip({ ...editingArsip, jumlahHalaman: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Estimasi Ukuran File *</label>
                  <input
                    type="text"
                    required
                    value={editingArsip.ukuranFile}
                    onChange={(e) => setEditingArsip({ ...editingArsip, ukuranFile: e.target.value })}
                    placeholder="2.4 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Kategori Resmi</label>
                <input
                  type="text"
                  value={editingArsip.kategoriNama}
                  onChange={(e) => setEditingArsip({ ...editingArsip, kategoriNama: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsArsipModalOpen(false); setEditingArsip(null); }}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Simpan Paket Soal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: FORM TAMBAH / UBAH PENGUMUMAN */}
      {/* ============================================================ */}
      {isPengumumanModalOpen && editingPengumuman && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {pengumuman.some(p => p.id === editingPengumuman.id) ? 'Ubah Pengumuman Resmi' : 'Terbitkan Pengumuman Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsPengumumanModalOpen(false); setEditingPengumuman(null); }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePengumuman} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={editingPengumuman.judul}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, judul: e.target.value })}
                  placeholder="Contoh: Jadwal Sesi Tryout CBT Telah Dibuka"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Kategori *</label>
                  <select
                    value={editingPengumuman.kategori}
                    onChange={(e) => setEditingPengumuman({ ...editingPengumuman, kategori: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white font-semibold"
                  >
                    <option value="Penting">Penting (Highlight Merah)</option>
                    <option value="Jadwal">Jadwal & Agenda</option>
                    <option value="Hasil">Hasil & Juara</option>
                    <option value="Informasi">Informasi Umum</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Tanggal Rilis *</label>
                  <input
                    type="text"
                    required
                    value={editingPengumuman.tanggal}
                    onChange={(e) => setEditingPengumuman({ ...editingPengumuman, tanggal: e.target.value })}
                    placeholder="15 September 2027"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Ringkasan Banner (1-2 Kalimat) *</label>
                <input
                  type="text"
                  required
                  value={editingPengumuman.ringkasan}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, ringkasan: e.target.value })}
                  placeholder="Teks ringkas yang muncul pada pita banner atas Beranda..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Isi Lengkap Pengumuman *</label>
                <textarea
                  rows={4}
                  required
                  value={editingPengumuman.isi}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, isi: e.target.value })}
                  placeholder="Tuliskan isi detail pengumuman yang akan dibaca oleh pengunjung..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="isPenting"
                  checked={editingPengumuman.isPenting}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, isPenting: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <label htmlFor="isPenting" className="text-xs text-slate-700 font-semibold cursor-pointer select-none">
                  Tampilkan sebagai pengumuman utama di banner Beranda (*Breaking Banner*)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setIsPengumumanModalOpen(false); setEditingPengumuman(null); }}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Terbitkan Pengumuman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 4: VIDEO PREVIEW PLAYER */}
      {/* ============================================================ */}
      {videoPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 overflow-hidden shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                Pemutar Preview Video Kegiatan
              </span>
              <button
                onClick={() => setVideoPreviewUrl(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full">
              <iframe
                src={videoPreviewUrl}
                title="Preview Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 5: KONFIRMASI HAPUS */}
      {/* ============================================================ */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Konfirmasi Hapus Konten</h4>
                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              Apakah Anda yakin ingin menghapus <strong>"{itemToDelete.title}"</strong> dari daftar {itemToDelete.type}?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs cursor-pointer"
              >
                Ya, Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
