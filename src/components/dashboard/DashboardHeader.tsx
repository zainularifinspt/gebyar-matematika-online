import React from 'react';
import { 
  Bell, 
  Download, 
  RefreshCw,
  Crown
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

  return (
    <header className="rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
      {/* Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

      {/* Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-xs">
          {isSuperAdmin ? (
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Portal Super Admin (Root)</span>
            </span>
          ) : (
            <span className="text-slate-500 font-bold">Portal Panitia</span>
          )}
          <span className="text-slate-300">•</span>
          <span className="text-indigo-600 font-black uppercase tracking-wider">{activeTab}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-1">
          {getTabTitle(activeTab)}
        </h2>
      </div>

      {/* Action Buttons & Utilities */}
      <div className="flex flex-wrap items-center gap-2.5">
        
        {/* Super Admin Badge indicator */}
        {isSuperAdmin && (
          <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>Super Administrator</span>
          </span>
        )}

        {/* Sync CBT Score trigger */}
        <button
          onClick={onSyncCbtScores}
          disabled={isSyncing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors cursor-pointer"
          title="Tarik nilai terbaru dari Web Ujian via Internal API"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Sinkronisasi...' : 'Tarik Nilai CBT'}</span>
        </button>

        {/* Export Data CSV */}
        <button
          onClick={onExportData}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Unduh Rekap (Excel/CSV)</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2.5 rounded-xl text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white"></span>
        </div>

      </div>

    </header>
  );
};
