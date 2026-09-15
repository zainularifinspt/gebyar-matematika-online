import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  CreditCard, 
  Award, 
  School, 
  History 
} from 'lucide-react';

export type GuruTabType = 'ringkasan' | 'siswa' | 'daftar' | 'riwayat' | 'tagihan' | 'sertifikat' | 'profil';

interface GuruNavigationProps {
  activeTab: GuruTabType;
  onTabChange: (tab: GuruTabType) => void;
  siswaCount: number;
  pendingInvoiceCount: number;
}

export const GuruNavigation: React.FC<GuruNavigationProps> = ({
  activeTab,
  onTabChange,
  siswaCount,
  pendingInvoiceCount,
}) => {
  const tabs = [
    {
      id: 'ringkasan' as GuruTabType,
      label: 'Ringkasan & Beranda',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'siswa' as GuruTabType,
      label: 'Siswa Bimbingan',
      icon: Users,
      badge: siswaCount > 0 ? siswaCount : null,
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    },
    {
      id: 'daftar' as GuruTabType,
      label: 'Pendaftaran Kolektif',
      icon: UserPlus,
      badge: 'Baru',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      id: 'riwayat' as GuruTabType,
      label: 'Riwayat Pendaftaran',
      icon: History,
      badge: null,
    },
    {
      id: 'tagihan' as GuruTabType,
      label: 'Tagihan & Bukti Bayar',
      icon: CreditCard,
      badge: pendingInvoiceCount > 0 ? `${pendingInvoiceCount} Belum Bayar` : null,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'sertifikat' as GuruTabType,
      label: 'Sertifikat Pembimbing',
      icon: Award,
      badge: null,
    },
    {
      id: 'profil' as GuruTabType,
      label: 'Profil Guru & Sekolah',
      icon: School,
      badge: 'Lengkap',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
  ];

  return (
    <div className="border-b border-white/80 bg-white/75 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'btn-3d-primary text-white shadow-md'
                    : 'glass-3d-base text-slate-700 hover:text-slate-900 hover:bg-white/90 border-white/90'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-black border shadow-xs ${
                      isActive
                        ? 'bg-white/25 text-white border-white/40'
                        : tab.badgeColor || 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
