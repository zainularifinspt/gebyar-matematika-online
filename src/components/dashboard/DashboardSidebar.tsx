import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  CreditCard, 
  FileText, 
  ArrowLeft, 
  Award,
  Crown,
  UserCheck
} from 'lucide-react';

export type DashboardTab = 'overview' | 'peserta' | 'nilai' | 'pembayaran' | 'template' | 'konten' | 'panitia_mgmt';

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onExitDashboard: () => void;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
  pesertaCount?: number;
  panitiaCount?: number;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeTab,
  onSelectTab,
  onExitDashboard,
  currentUser,
  pesertaCount = 0,
  panitiaCount = 0,
}) => {
  const isSuperAdmin = currentUser?.role === 'Super Admin' || 
                       currentUser?.role?.includes('Admin');

  // Navigation Items: Super Admin gets exclusive access to 'panitia_mgmt'
  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string; superAdminOnly?: boolean }[] = [
    { id: 'overview', label: 'Ringkasan & Metrik', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'peserta', label: 'Data Peserta', icon: <Users className="w-4 h-4" />, badge: pesertaCount > 0 ? String(pesertaCount) : undefined },
    { id: 'nilai', label: 'Nilai Ujian CBT', icon: <GraduationCap className="w-4 h-4" />, badge: 'Sync' },
    { id: 'pembayaran', label: 'Status Pembayaran', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'template', label: 'Template Sertifikat & Kartu', icon: <Award className="w-4 h-4" /> },
    { id: 'konten', label: 'Video & Arsip Soal', icon: <FileText className="w-4 h-4" /> },
    ...(isSuperAdmin ? [
      { id: 'panitia_mgmt' as DashboardTab, label: 'Kelola Tim Panitia', icon: <UserCheck className="w-4 h-4 text-amber-600" />, badge: panitiaCount > 0 ? `${panitiaCount} Staf` : undefined, superAdminOnly: true }
    ] : []),
  ];

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] rounded-3xl z-20 overflow-hidden relative">
      {/* Subtle Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

      {/* Brand & Navigation */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200/70">
          <div className={`w-11 h-11 rounded-2xl text-white flex items-center justify-center font-serif font-black text-xl shadow-xs border border-white/40 shrink-0 ${
            isSuperAdmin ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-700' : 'bg-gradient-to-tr from-blue-600 to-indigo-600'
          }`}>
            <span className="leading-none mt-[-2px]">∑</span>
          </div>
          <div className="min-w-0">
            <span className="font-black text-base tracking-tight text-slate-900 font-['Outfit'] block truncate">
              {isSuperAdmin ? 'Super Admin GM' : 'Panitia GM 2027'}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${
              isSuperAdmin 
                ? 'text-amber-900 bg-amber-50 border-amber-300' 
                : 'text-indigo-900 bg-indigo-50 border-indigo-200'
            }`}>
              {isSuperAdmin ? (
                <>
                  <Crown className="w-3 h-3 text-amber-600 fill-amber-600" />
                  <span>SUPER ADMIN</span>
                </>
              ) : (
                <span>PANITIA PORTAL</span>
              )}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Menu Administrasi
          </span>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? item.superAdminOnly 
                      ? 'bg-amber-500 text-amber-950 font-black shadow-xs border border-amber-400' 
                      : 'bg-indigo-600 text-white font-black shadow-xs border border-indigo-500'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 ${isActive ? (item.superAdminOnly ? 'text-amber-950' : 'text-white') : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate whitespace-nowrap">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md shrink-0 ml-2 ${
                    isActive 
                      ? item.superAdminOnly ? 'bg-amber-700 text-white' : 'bg-indigo-700 text-white' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Operational Telemetry Widget */}
        <div className={`p-4 rounded-2xl border space-y-2.5 ${
          isSuperAdmin ? 'bg-amber-50/70 border-amber-200/80' : 'bg-sky-50/70 border-sky-200/80'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase tracking-wider ${
              isSuperAdmin ? 'text-amber-950' : 'text-sky-950'
            }`}>
              {isSuperAdmin ? 'Hak Akses: Penuh (Root)' : 'Status Sinkronisasi'}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
          <div className="space-y-1 text-[11px] text-slate-700 font-medium">
            <div className="flex justify-between">
              <span>Pendaftar Masuk</span>
              <span className="font-black text-slate-900 font-mono tabular-nums">{pesertaCount} / 2.000</span>
            </div>
            <div className="w-full h-2 bg-white/70 rounded-full overflow-hidden p-0.5 border border-white/80">
              <div className={`h-full rounded-full ${isSuperAdmin ? 'bg-amber-600' : 'bg-indigo-600'}`} style={{ width: `${Math.max(2, Math.min(100, (pesertaCount / 2000) * 100))}%` }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Profile & Exit */}
      <div className="shrink-0 pt-4 border-t border-slate-200/70 space-y-2.5 mt-3">
        
        {/* User Card */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
          isSuperAdmin 
            ? 'bg-amber-50/70 border-amber-200/80 shadow-xs' 
            : 'bg-white/80 border-slate-200/70 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs ${
            isSuperAdmin ? 'bg-gradient-to-br from-amber-500 to-amber-700 ring-2 ring-amber-400/40' : 'bg-purple-600'
          }`}>
            {isSuperAdmin ? 'SA' : (currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'PT')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-slate-900 truncate">
              {currentUser?.name || (isSuperAdmin ? 'Super Administrator' : 'Panitia Pelaksana')}
            </p>
            <p className={`text-[10px] font-bold truncate ${
              isSuperAdmin ? 'text-amber-800 font-mono' : 'text-slate-500'
            }`}>
              {isSuperAdmin ? 'Super Admin • Hak Akses Penuh' : 'Divisi Kepanitiaan Lomba'}
            </p>
          </div>
        </div>

        {/* Return to Public Web */}
        <button
          onClick={onExitDashboard}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">Kembali ke Website Utama</span>
        </button>

      </div>

    </aside>
  );
};
