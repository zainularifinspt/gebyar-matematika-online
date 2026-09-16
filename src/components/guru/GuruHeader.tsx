import React from 'react';
import { 
  ArrowLeft, 
  LogOut, 
  School, 
  ShieldCheck, 
  UserCheck,
  Building2,
  MapPin
} from 'lucide-react';
import type { GuruProfileData } from '../../types';

interface GuruHeaderProps {
  profile: GuruProfileData;
  onBackToHome: () => void;
  onLogout: () => void;
}

export const GuruHeader: React.FC<GuruHeaderProps> = ({
  profile,
  onBackToHome,
  onLogout,
}) => {
  return (
    <header className="border-b border-white/80 bg-white/85 backdrop-blur-2xl sticky top-0 z-40 shadow-sm relative">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Teacher Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBackToHome}
              className="btn-3d-white p-2.5 rounded-xl cursor-pointer shrink-0"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/25 border border-white/40">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <School className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-black text-slate-900 font-['Outfit']">
                  {profile.nama}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-black glass-3d-violet text-purple-950 border border-purple-300 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                  Guru Pendamping Resmi
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600 mt-0.5 flex-wrap font-medium">
                <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {profile.sekolah} (NPSN: {profile.npsn})
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {profile.kabupatenKota}, {profile.provinsi}
                </span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-3d-emerald border border-emerald-300 text-emerald-950 text-xs font-bold shadow-xs">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>SSO Google Terhubung</span>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-800 bg-rose-50/90 hover:bg-rose-100 border border-rose-200 transition-all shadow-xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Keluar</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
