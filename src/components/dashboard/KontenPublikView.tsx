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
  Clock,
  Sparkles
} from 'lucide-react';
import type { VideoKegiatan, ArsipSoal, Pengumuman } from '../../types';
import { 
  useStoredPengumuman, 
  useStoredVideos, 
  useStoredArsipSoal 
} from '../../utils/storage';

interface KontenPublikViewProps {
  onShowToast?: (message: string) => void;
}

type SubTab = 'video' | 'arsip' | 'pengumuman';

export const KontenPublikView: React.FC<KontenPublikViewProps> = ({ onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('pengumuman');
  const [searchQuery, setSearchQuery] = useState('');

  // Datasets state connected to reactive storage
  const [videos, setVideos] = useStoredVideos();
  const [arsipSoal, setArsipSoal] = useStoredArsipSoal();
  const [pengumuman, setPengumuman] = useStoredPengumuman();

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
    let updated: VideoKegiatan[];
    if (exists) {
      updated = videos.map(v => v.id === editingVideo.id ? editingVideo : v);
      notify(`✓ Video "${editingVideo.judul}" berhasil diperbarui!`);
    } else {
      updated = [editingVideo, ...videos];
      notify(`✓ Video baru "${editingVideo.judul}" berhasil ditambahkan & tayang!`);
    }
    setVideos(updated);
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
    let updated: ArsipSoal[];
    if (exists) {
      updated = arsipSoal.map(a => a.id === editingArsip.id ? editingArsip : a);
      notify(`✓ Paket Arsip Soal "${editingArsip.judul}" berhasil diperbarui!`);
    } else {
      updated = [editingArsip, ...arsipSoal];
      notify(`✓ Paket Arsip Soal baru "${editingArsip.judul}" berhasil ditambahkan & tayang!`);
    }
    setArsipSoal(updated);
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
    let updated: Pengumuman[];
    if (exists) {
      updated = pengumuman.map(p => p.id === editingPengumuman.id ? editingPengumuman : p);
      notify(`✓ Pengumuman "${editingPengumuman.judul}" berhasil diperbarui!`);
    } else {
      updated = [editingPengumuman, ...pengumuman];
      notify(`✓ Pengumuman "${editingPengumuman.judul}" langsung tayang di Beranda & Banner!`);
    }
    setPengumuman(updated);
    setIsPengumumanModalOpen(false);
    setEditingPengumuman(null);
  };

  // ----------------------------------------------------
  // DELETE HANDLER
  // ----------------------------------------------------
  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    if (itemToDelete.type === 'video') {
      setVideos(videos.filter(v => v.id !== itemToDelete.id));
      notify(`✓ Video "${itemToDelete.title}" telah dihapus.`);
    } else if (itemToDelete.type === 'arsip') {
      setArsipSoal(arsipSoal.filter(a => a.id !== itemToDelete.id));
      notify(`✓ Paket Soal "${itemToDelete.title}" telah dihapus.`);
    } else if (itemToDelete.type === 'pengumuman') {
      setPengumuman(pengumuman.filter(p => p.id !== itemToDelete.id));
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
    <div className="space-y-6 animate-fade-in text-slate-800">
      
      {/* Top Header Card */}
      <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-4 shadow-xl shadow-indigo-950/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/90 text-indigo-950 text-xs font-black border border-indigo-300 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
              <span>Sinkronisasi Konten Publik & Landing Page</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-2 tracking-tight">
              Manajemen Konten Publik & Media Lomba
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mt-1 font-medium">
              Semua perubahan pengumuman resmi, materi naskah soal PDF, dan video dokumentasi di sini <strong>langsung tersinkronisasi dan tampil otomatis</strong> di halaman utama (Beranda) peserta.
            </p>
          </div>

          {/* Action Button for Active SubTab */}
          <div className="shrink-0">
            {activeSubTab === 'video' && (
              <button
                onClick={handleOpenAddVideo}
                className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Video Baru</span>
              </button>
            )}
            {activeSubTab === 'arsip' && (
              <button
                onClick={handleOpenAddArsip}
                className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Unggah Paket Soal</span>
              </button>
            )}
            {activeSubTab === 'pengumuman' && (
              <button
                onClick={handleOpenAddPengumuman}
                className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Terbitkan Pengumuman</span>
              </button>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200/60">
          {/* Sub-tabs pills */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/60 backdrop-blur-md border border-white/80 text-xs font-bold shadow-inner">
            <button
              onClick={() => { setActiveSubTab('pengumuman'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer font-['Outfit'] ${
                activeSubTab === 'pengumuman'
                  ? 'bg-white text-indigo-900 shadow-md shadow-slate-900/10 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Pengumuman Beranda</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-lg font-mono font-bold ${
                activeSubTab === 'pengumuman' ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-300/80 text-slate-700'
              }`}>
                {pengumuman.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSubTab('video'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer font-['Outfit'] ${
                activeSubTab === 'video'
                  ? 'bg-white text-indigo-900 shadow-md shadow-slate-900/10 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <Video className="w-4 h-4 text-indigo-600" />
              <span>Video Kegiatan</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-lg font-mono font-bold ${
                activeSubTab === 'video' ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-300/80 text-slate-700'
              }`}>
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveSubTab('arsip'); setSearchQuery(''); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer font-['Outfit'] ${
                activeSubTab === 'arsip'
                  ? 'bg-white text-indigo-900 shadow-md shadow-slate-900/10 font-black'
                  : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Arsip Soal & Kunci</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-lg font-mono font-bold ${
                activeSubTab === 'arsip' ? 'bg-indigo-100 text-indigo-900' : 'bg-slate-300/80 text-slate-700'
              }`}>
                {arsipSoal.length}
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Cari dalam ${activeSubTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-3d-input w-full pl-10 pr-3 py-2 rounded-xl text-xs text-slate-900 font-medium placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SUBTAB 1: PENGUMUMAN RESMI BERANDA */}
      {/* ============================================================ */}
      {activeSubTab === 'pengumuman' && (
        <div className="space-y-4">
          {filteredPengumuman.length === 0 ? (
            <div className="glass-3d-card text-center py-14 rounded-3xl text-slate-500 text-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-slate-800 font-['Outfit']">Tidak Ada Pengumuman</p>
              <p className="text-slate-500 max-w-sm mx-auto">
                {searchQuery ? `Tidak ada pengumuman yang sesuai dengan "${searchQuery}".` : 'Belum ada pengumuman yang diterbitkan ke halaman utama.'}
              </p>
              <button
                onClick={handleOpenAddPengumuman}
                className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Terbitkan Pengumuman Sekarang</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredPengumuman.map((ann) => {
                const categoryBadge = 
                  ann.kategori === 'Penting' ? 'bg-rose-100/90 text-rose-900 border-rose-300' :
                  ann.kategori === 'Jadwal' ? 'bg-purple-100/90 text-purple-900 border-purple-300' :
                  ann.kategori === 'Hasil' ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300' :
                  'bg-sky-100/90 text-sky-900 border-sky-300';

                return (
                  <div 
                    key={ann.id}
                    className="glass-3d-card p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-start justify-between gap-4 group hover:shadow-xl transition-all"
                  >
                    <div className="space-y-2.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-2xs ${categoryBadge}`}>
                          {ann.kategori}
                        </span>
                        {ann.isPenting && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-amber-100/90 text-amber-950 border border-amber-300 text-[10px] font-black shadow-2xs">
                            <Sparkles className="w-3 h-3 text-amber-700" />
                            <span>Tampil di Banner Beranda</span>
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-bold ml-1">
                          {ann.tanggal}
                        </span>
                      </div>

                      <h4 className="font-black text-slate-900 text-base leading-snug font-['Outfit']">
                        {ann.judul}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {ann.ringkasan}
                      </p>

                      <div className="pt-2 text-[11px] text-slate-700 bg-white/80 p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs leading-relaxed">
                        <strong className="text-slate-900 font-black">Isi Detail Pengumuman:</strong> {ann.isi}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-start pt-1">
                      <button
                        onClick={() => handleOpenEditPengumuman(ann)}
                        className="btn-3d-white inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Ubah</span>
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: 'pengumuman', id: ann.id, title: ann.judul })}
                        className="p-2 rounded-xl bg-white/80 hover:bg-rose-50 text-rose-600 border border-rose-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
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
      {/* SUBTAB 2: VIDEO KEGIATAN & LIPUTAN */}
      {/* ============================================================ */}
      {activeSubTab === 'video' && (
        <div className="space-y-4">
          {filteredVideos.length === 0 ? (
            <div className="glass-3d-card text-center py-14 rounded-3xl text-slate-500 text-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center mx-auto border border-indigo-200">
                <Video className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-slate-800 font-['Outfit']">Tidak Ada Video</p>
              <p className="text-slate-500 max-w-sm mx-auto">
                {searchQuery ? `Tidak ada video yang cocok dengan "${searchQuery}".` : 'Belum ada video kegiatan yang ditambahkan.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((vid) => (
                <div 
                  key={vid.id}
                  className="glass-3d-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all"
                >
                  <div>
                    {/* Thumbnail Stage */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      <img 
                        src={vid.thumbnailUrl} 
                        alt={vid.judul} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/45 transition-colors flex items-center justify-center">
                        <button
                          onClick={() => setVideoPreviewUrl(vid.embedUrl)}
                          className="w-11 h-11 rounded-2xl bg-white/95 text-indigo-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer border border-white"
                          title="Putar Video"
                        >
                          <Play className="w-5 h-5 ml-0.5 fill-indigo-700" />
                        </button>
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono font-bold flex items-center gap-1 border border-white/20">
                        <Clock className="w-3 h-3" />
                        {vid.durasi}
                      </span>
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] font-black border border-indigo-400/40">
                        Tahun {vid.tahun}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 space-y-2">
                      <h4 className="font-black text-slate-900 text-sm line-clamp-2 leading-snug font-['Outfit']">
                        {vid.judul}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                        {vid.deskripsi}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-4 py-3 bg-white/60 border-t border-slate-200/70 flex items-center justify-between">
                    <button
                      onClick={() => setVideoPreviewUrl(vid.embedUrl)}
                      className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditVideo(vid)}
                        className="p-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                        title="Ubah Video"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setItemToDelete({ type: 'video', id: vid.id, title: vid.judul })}
                        className="p-1.5 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs transition-colors cursor-pointer"
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
      {/* SUBTAB 3: ARSIP SOAL & PEMBAHASAN PDF */}
      {/* ============================================================ */}
      {activeSubTab === 'arsip' && (
        <div className="space-y-4">
          {filteredArsip.length === 0 ? (
            <div className="glass-3d-card text-center py-14 rounded-3xl text-slate-500 text-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-slate-800 font-['Outfit']">Tidak Ada Paket Soal</p>
              <p className="text-slate-500 max-w-sm mx-auto">
                {searchQuery ? `Tidak ada paket soal yang cocok dengan "${searchQuery}".` : 'Belum ada arsip naskah soal yang diunggah.'}
              </p>
            </div>
          ) : (
            <div className="glass-3d-card rounded-3xl overflow-hidden p-0 shadow-xl shadow-slate-900/5">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200/80 text-slate-600 font-black tracking-wider uppercase text-[10px]">
                    <th className="py-3.5 px-4 font-['Outfit']">Tahun</th>
                    <th className="py-3.5 px-4 font-['Outfit']">Judul Naskah Soal</th>
                    <th className="py-3.5 px-4 font-['Outfit']">Jenjang & Kategori</th>
                    <th className="py-3.5 px-4 font-['Outfit']">Ukuran & Halaman</th>
                    <th className="py-3.5 px-4 text-right font-['Outfit']">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80 bg-white/60">
                  {filteredArsip.map((soal) => {
                    const badgeColor = 
                      soal.tingkat.includes('SD') ? 'bg-emerald-100/90 text-emerald-900 border-emerald-300' :
                      soal.tingkat.includes('SMP') ? 'bg-sky-100/90 text-sky-900 border-sky-300' :
                      soal.tingkat.includes('SMA') ? 'bg-purple-100/90 text-purple-900 border-purple-300' :
                      'bg-slate-200/80 text-slate-800 border-slate-300';

                    return (
                      <tr key={soal.id} className="hover:bg-indigo-50/50 transition-colors">
                        <td className="py-3.5 px-4 font-black font-mono text-slate-900">
                          {soal.tahun}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 border border-rose-200 flex items-center justify-center shrink-0 shadow-2xs">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{soal.judul}</p>
                              <span className="text-[10px] text-slate-500 font-mono">ID: {soal.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black border shadow-2xs ${badgeColor}`}>
                            {soal.tingkat}
                          </span>
                          <p className="text-[11px] text-slate-600 font-semibold mt-0.5">{soal.kategoriNama}</p>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          <span className="font-bold">{soal.jumlahHalaman} Halaman</span>
                          <span className="text-slate-300 mx-1.5">•</span>
                          <span className="text-slate-500 font-mono font-bold">{soal.ukuranFile}</span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditArsip(soal)}
                              className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                              title="Ubah Data Paket Soal"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setItemToDelete({ type: 'arsip', id: soal.id, title: soal.judul })}
                              className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs transition-colors cursor-pointer"
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
      {/* MODAL 1: FORM TAMBAH / UBAH VIDEO */}
      {/* ============================================================ */}
      {isVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-3d-elevated p-6 sm:p-7 shadow-2xl border border-white/90 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-900 flex items-center justify-center border border-indigo-300 shadow-2xs">
                  <Film className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {videos.some(v => v.id === editingVideo.id) ? 'Ubah Video Dokumentasi' : 'Tambah Video Dokumentasi Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsVideoModalOpen(false); setEditingVideo(null); }}
                className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 border border-slate-200 shadow-2xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Judul Video *</label>
                <input
                  type="text"
                  required
                  value={editingVideo.judul}
                  onChange={(e) => setEditingVideo({ ...editingVideo, judul: e.target.value })}
                  placeholder="Contoh: Aftermovie Gebyar Matematika 2024"
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Tahun Kegiatan *</label>
                  <input
                    type="number"
                    required
                    value={editingVideo.tahun}
                    onChange={(e) => setEditingVideo({ ...editingVideo, tahun: Number(e.target.value) })}
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Durasi (MM:SS) *</label>
                  <input
                    type="text"
                    required
                    value={editingVideo.durasi}
                    onChange={(e) => setEditingVideo({ ...editingVideo, durasi: e.target.value })}
                    placeholder="04:18"
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">URL Embed YouTube / Video Player *</label>
                <input
                  type="url"
                  required
                  value={editingVideo.embedUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, embedUrl: e.target.value })}
                  placeholder="https://www.youtube-nocookie.com/embed/..."
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">URL Gambar Thumbnail Cover *</label>
                <input
                  type="url"
                  required
                  value={editingVideo.thumbnailUrl}
                  onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Deskripsi Ringkas Video</label>
                <textarea
                  rows={3}
                  value={editingVideo.deskripsi}
                  onChange={(e) => setEditingVideo({ ...editingVideo, deskripsi: e.target.value })}
                  placeholder="Ceritakan kilasan cuplikan video dokumentasi ini..."
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => { setIsVideoModalOpen(false); setEditingVideo(null); }}
                  className="btn-3d-white px-4 py-2.5 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-3d-primary px-5 py-2.5 rounded-xl font-bold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-3d-elevated p-6 sm:p-7 shadow-2xl border border-white/90 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-900 flex items-center justify-center border border-emerald-300 shadow-2xs">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {arsipSoal.some(a => a.id === editingArsip.id) ? 'Ubah Paket Arsip Soal' : 'Unggah Paket Arsip Soal Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsArsipModalOpen(false); setEditingArsip(null); }}
                className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 border border-slate-200 shadow-2xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveArsip} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Judul Paket Naskah Soal & Kunci *</label>
                <input
                  type="text"
                  required
                  value={editingArsip.judul}
                  onChange={(e) => setEditingArsip({ ...editingArsip, judul: e.target.value })}
                  placeholder="Contoh: Naskah Soal & Pembahasan Babak Penyisihan GM 2025"
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Jenjang Tingkat *</label>
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
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-bold"
                  >
                    <option value="SD">SD / MI</option>
                    <option value="SMP">SMP / MTs</option>
                    <option value="SMA">SMA / MA / SMK</option>
                    <option value="Semua Tingkat">Semua Tingkat</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Tahun Soal *</label>
                  <input
                    type="number"
                    required
                    value={editingArsip.tahun}
                    onChange={(e) => setEditingArsip({ ...editingArsip, tahun: Number(e.target.value) })}
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Jumlah Halaman PDF *</label>
                  <input
                    type="number"
                    required
                    value={editingArsip.jumlahHalaman}
                    onChange={(e) => setEditingArsip({ ...editingArsip, jumlahHalaman: Number(e.target.value) })}
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Estimasi Ukuran File *</label>
                  <input
                    type="text"
                    required
                    value={editingArsip.ukuranFile}
                    onChange={(e) => setEditingArsip({ ...editingArsip, ukuranFile: e.target.value })}
                    placeholder="2.4 MB"
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Nama Kategori Resmi</label>
                <input
                  type="text"
                  value={editingArsip.kategoriNama}
                  onChange={(e) => setEditingArsip({ ...editingArsip, kategoriNama: e.target.value })}
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => { setIsArsipModalOpen(false); setEditingArsip(null); }}
                  className="btn-3d-white px-4 py-2.5 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-3d-primary px-5 py-2.5 rounded-xl font-bold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl glass-3d-elevated p-6 sm:p-7 shadow-2xl border border-white/90 space-y-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center border border-amber-300 shadow-2xs">
                  <Bell className="w-4 h-4" />
                </div>
                <h4 className="text-base font-black text-slate-900 font-['Outfit']">
                  {pengumuman.some(p => p.id === editingPengumuman.id) ? 'Ubah Pengumuman Resmi' : 'Terbitkan Pengumuman Baru'}
                </h4>
              </div>
              <button 
                onClick={() => { setIsPengumumanModalOpen(false); setEditingPengumuman(null); }}
                className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-600 border border-slate-200 shadow-2xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePengumuman} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={editingPengumuman.judul}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, judul: e.target.value })}
                  placeholder="Contoh: Jadwal Sesi Tryout CBT Telah Dibuka"
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Kategori *</label>
                  <select
                    value={editingPengumuman.kategori}
                    onChange={(e) => setEditingPengumuman({ ...editingPengumuman, kategori: e.target.value as any })}
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-bold"
                  >
                    <option value="Penting">Penting (Badge Merah)</option>
                    <option value="Jadwal">Jadwal & Agenda</option>
                    <option value="Hasil">Hasil & Juara</option>
                    <option value="Informasi">Informasi Umum</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-black text-slate-800 font-['Outfit']">Tanggal Rilis *</label>
                  <input
                    type="text"
                    required
                    value={editingPengumuman.tanggal}
                    onChange={(e) => setEditingPengumuman({ ...editingPengumuman, tanggal: e.target.value })}
                    placeholder="18 September 2026"
                    className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Ringkasan Singkat (Muncul di Banner Beranda) *</label>
                <input
                  type="text"
                  required
                  value={editingPengumuman.ringkasan}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, ringkasan: e.target.value })}
                  placeholder="Teks ringkas yang muncul pada pita banner atas Beranda..."
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-black text-slate-800 font-['Outfit']">Isi Lengkap Pengumuman *</label>
                <textarea
                  rows={4}
                  required
                  value={editingPengumuman.isi}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, isi: e.target.value })}
                  placeholder="Tuliskan isi detail pengumuman yang akan dibaca oleh pengunjung..."
                  className="glass-3d-input w-full px-3.5 py-2.5 rounded-xl text-slate-900 font-medium"
                />
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
                <input
                  type="checkbox"
                  id="isPenting"
                  checked={editingPengumuman.isPenting}
                  onChange={(e) => setEditingPengumuman({ ...editingPengumuman, isPenting: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-amber-300 cursor-pointer"
                />
                <label htmlFor="isPenting" className="text-xs text-amber-950 font-bold cursor-pointer select-none">
                  Tampilkan sebagai pengumuman utama di banner Beranda (*Breaking Announcement*)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => { setIsPengumumanModalOpen(false); setEditingPengumuman(null); }}
                  className="btn-3d-white px-4 py-2.5 rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-3d-primary px-5 py-2.5 rounded-xl font-bold cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl glass-3d-elevated p-6 shadow-2xl border border-white/90 space-y-4 text-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-800 border border-rose-300 flex items-center justify-center shrink-0 shadow-2xs">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm font-['Outfit']">Konfirmasi Hapus Konten</h4>
                <p className="text-xs text-slate-600 font-medium">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-white/70 p-3.5 rounded-2xl border border-slate-200 shadow-inner leading-relaxed font-medium">
              Apakah Anda yakin ingin menghapus <strong>"{itemToDelete.title}"</strong> dari daftar {itemToDelete.type}?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="btn-3d-white px-4 py-2 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md cursor-pointer transition-all active:translate-y-0.5"
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
