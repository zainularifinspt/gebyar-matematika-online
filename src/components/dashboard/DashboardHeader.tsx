import React, { useState } from 'react';
import { 
  Bell, 
  Download, 
  RefreshCw,
  Crown,
  CheckCircle2,
  X
} from 'lucide-react';
import type { DashboardTab } from './DashboardSidebar';

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  onExportData: () => void;
  onSyncCbtScores: () => void;
  isSyncing: boolean;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onExportData,
  onSyncCbtScores,
  isSyncing,
  currentUser,
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const isSuperAdmin = currentUser?.role === 'Super Admin' || 
                       currentUser?.role?.includes('Admin');

  const getTabTitle = (tab: DashboardTab) => {
    switch (tab) {
      case 'overview': return 'Ringkasan & Metrik Pendaftaran';
      case 'peserta': return 'Kelola Peserta & Delegasi Sekolah';
      case 'nilai': return 'Sinkronisasi Nilai Ujian (Internal API)';
      case 'pembayaran': return 'Tindak Lanjut Pembayaran Khusus';
      case 'template': return 'Desain Template Sertifikat & Kartu Peserta';
      case 'konten': return 'Manajemen Konten Publik & Arsip Soal';
      case 'panitia_mgmt': return 'Manajemen Akun Tim Panitia & Hak Akses';
    }
  };

  const sampleNotifications = [
    {
      id: 1,
      title: 'Pembayaran QRIS Terverifikasi Otomatis',
      desc: 'Peserta Rayhan Al-Ghifari (SMA 1 Banjarbaru) telah lunas via Midtrans.',
      time: '2 menit lalu',
      type: 'success',
    },
    {
      id: 2,
      title: 'Pendaftar Delegasi Baru',
      desc: 'Guru Siti Rahmawati mendaftarkan delegasi SMP IT Al-Madani.',
      time: '15 menit lalu',
      type: 'info',
    },
    {
      id: 3,
      title: 'Koneksi Internal API Web Ujian Aktif',
      desc: 'Sistem siap menarik data penjurian daring dan skor proctoring.',
      time: '1 jam lalu',
      type: 'sync',
    },
  ];

  return (
    <header className="rounded-3xl glass-3d-dashboard-shell p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative shadow-xl shadow-indigo-950/5">

      {/* Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs">
          {isSuperAdmin ? (
            <span className="inline-flex items-center gap-1.5 font-black text-amber-950 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Portal Super Admin (Root)</span>
            </span>
          ) : (
            <span className="text-slate-600 font-bold bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
              Portal Panitia
            </span>
          )}
          <span className="text-slate-400">•</span>
          <span className="text-indigo-600 font-black uppercase tracking-wider text-[11px] bg-indigo-50/80 px-2.5 py-0.5 rounded-md border border-indigo-200/80">
            {activeTab}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1.5 tracking-tight">
          {getTabTitle(activeTab)}
        </h2>
      </div>

      {/* Action Buttons & Utilities */}
      <div className="flex flex-wrap items-center gap-3 relative">
        
        {/* Super Admin Badge indicator */}
        {isSuperAdmin && (
          <span className="hidden xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold text-amber-950 bg-amber-100/70 border border-amber-300/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>Super Administrator</span>
          </span>
        )}

        {/* Sync CBT Score trigger */}
        <button
          onClick={onSyncCbtScores}
          disabled={isSyncing}
          className="btn-3d-white inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-800 hover:text-cyan-700 cursor-pointer disabled:opacity-50"
          title="Tarik nilai terbaru dari Web Ujian via Internal API"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Sinkronisasi...' : 'Tarik Nilai CBT'}</span>
        </button>

        {/* Export Data CSV */}
        <button
          onClick={onExportData}
          className="btn-3d-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Rekap (Excel/CSV)</span>
        </button>

        {/* Notification Bell with 3D Popover */}
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="btn-3d-white p-2.5 rounded-2xl text-slate-700 hover:text-indigo-600 cursor-pointer relative"
            title="Aktivitas & Notifikasi Sistem"
          >
            <Bell className="w-4 h-4" />
            {hasUnread && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white animate-pulse" />
            )}
          </button>

          {/* Interactive 3D Glass Notification Panel */}
          {isNotifOpen && (
            <div className="absolute right-0 top-12 sm:top-14 w-80 sm:w-96 rounded-3xl glass-3d-elevated border border-white/95 p-4 sm:p-5 shadow-2xl z-50 space-y-3.5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 font-['Outfit'] uppercase tracking-wider">
                    Aktivitas Sistem Real-Time
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <button
                  onClick={() => setIsNotifOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {sampleNotifications.map((n) => (
                  <div 
                    key={n.id}
                    className="p-3 rounded-2xl bg-white/70 hover:bg-white border border-white/80 transition-colors shadow-2xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-900 font-['Outfit'] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug font-normal pl-5">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => setHasUnread(false)}
                  className="font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                >
                  Tandai semua dibaca
                </button>
                <span className="text-slate-400 font-medium">Auto-sync Midtrans & CBT</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
