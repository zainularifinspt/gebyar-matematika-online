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
  UserCheck,
  Trophy
} from 'lucide-react';

export type DashboardTab = 'overview' | 'kategori' | 'peserta' | 'nilai' | 'pembayaran' | 'template' | 'konten' | 'panitia_mgmt';

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

  // Navigation Items
  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string; superAdminOnly?: boolean }[] = [
    { id: 'overview', label: 'Ringkasan & Metrik', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'kategori', label: 'Jenis & Kategori Lomba', icon: <Trophy className="w-4 h-4 text-amber-600" />, badge: 'Live' },
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
    <aside className="w-full lg:w-72 shrink-0 glass-3d-dashboard-shell p-5 flex flex-col justify-between lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] rounded-3xl z-20 overflow-hidden relative shadow-xl shadow-indigo-950/5">

      {/* Subtle background glow element */}
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-purple-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Brand & Navigation */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5 relative z-10">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200/60">
          <div className={`w-11 h-11 rounded-2xl text-white flex items-center justify-center font-serif font-black text-xl shadow-md border border-white/60 shrink-0 transform transition-transform hover:scale-105 active:scale-95 ${
            isSuperAdmin ? 'bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-700 shadow-amber-500/20' : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-indigo-500/20'
          }`}>
            <span className="leading-none mt-[-2px] drop-shadow-sm">∑</span>
          </div>
          <div className="min-w-0">
            <span className="font-black text-base tracking-tight text-slate-900 font-['Outfit'] block truncate">
              {isSuperAdmin ? 'Super Admin GM' : 'Panitia GM 2027'}
            </span>
            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 shadow-2xs ${
              isSuperAdmin 
                ? 'text-amber-950 bg-amber-100/80 border-amber-300' 
                : 'text-indigo-950 bg-indigo-100/80 border-indigo-200'
            }`}>
              {isSuperAdmin ? (
                <>
                  <Crown className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>SUPER ADMIN</span>
                </>
              ) : (
                <span>PANITIA PORTAL</span>
              )}
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 block mb-2">
            Menu Administrasi
          </span>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? item.superAdminOnly 
                      ? 'bg-amber-500 text-amber-950 font-black shadow-md shadow-amber-500/25 border border-amber-300 translate-x-1' 
                      : 'bg-indigo-600 text-white font-black shadow-md shadow-indigo-600/25 border border-indigo-500 translate-x-1'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/80 hover:shadow-xs border border-transparent hover:border-white/90'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`shrink-0 ${isActive ? (item.superAdminOnly ? 'text-amber-950' : 'text-white') : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span className="truncate whitespace-nowrap">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg shrink-0 ml-2 shadow-2xs ${
                    isActive 
                      ? item.superAdminOnly ? 'bg-amber-900 text-amber-100' : 'bg-indigo-900 text-indigo-100' 
                      : 'bg-white/90 text-slate-600 border border-slate-200/80'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Operational Telemetry Widget with 3D Glass Depth */}
        <div className={`p-4 rounded-2xl border space-y-2.5 backdrop-blur-md ${
          isSuperAdmin 
            ? 'glass-3d-card-amber' 
            : 'glass-3d-card-indigo'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-black uppercase tracking-wider ${
              isSuperAdmin ? 'text-amber-950' : 'text-indigo-950'
            }`}>
              {isSuperAdmin ? 'Hak Akses: Penuh (Root)' : 'Status Sinkronisasi'}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </span>
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-800 font-medium">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-600">Pendaftar Masuk</span>
              <span className="font-black text-slate-900 font-mono tabular-nums">{pesertaCount} / 2.000</span>
            </div>
            <div className="w-full h-2.5 bg-white/80 rounded-full overflow-hidden p-0.5 border border-white/90 shadow-inner">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isSuperAdmin ? 'bg-amber-500' : 'bg-indigo-600'
                }`} 
                style={{ width: `${Math.max(4, Math.min(100, (pesertaCount / 2000) * 100))}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Profile & Exit */}
      <div className="shrink-0 pt-4 border-t border-slate-200/60 space-y-2.5 mt-3 relative z-10">
        
        {/* User Card */}
        <div className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
          isSuperAdmin 
            ? 'bg-amber-100/80 border-amber-200/90 shadow-xs' 
            : 'bg-white/85 border-white/90 shadow-xs'
        }`}>
          <div className={`w-9 h-9 rounded-xl text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm ${
            isSuperAdmin 
              ? 'bg-amber-600 ring-2 ring-amber-300/80' 
              : 'bg-indigo-600 ring-2 ring-indigo-300/80'
          }`}>
            {isSuperAdmin ? 'SA' : (currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'PT')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-slate-900 truncate font-['Outfit']">
              {currentUser?.name || (isSuperAdmin ? 'Super Administrator' : 'Panitia Pelaksana')}
            </p>
            <p className={`text-[10px] font-bold truncate ${
              isSuperAdmin ? 'text-amber-900 font-mono' : 'text-slate-500'
            }`}>
              {isSuperAdmin ? 'Super Admin • Hak Akses Penuh' : 'Divisi Kepanitiaan Lomba'}
            </p>
          </div>
        </div>

        {/* Return to Public Web */}
        <button
          onClick={onExitDashboard}
          className="btn-3d-white w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-800 hover:text-indigo-600 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          <span className="truncate">Kembali ke Website Utama</span>
        </button>

      </div>

    </aside>
  );
};
