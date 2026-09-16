import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  FileText, 
  HelpCircle, 
  LogIn, 
  Menu, 
  Video, 
  X,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  LayoutDashboard,
  School,
  ChevronDown
} from 'lucide-react';
import { MathLogo } from '../common/MathLogo';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onOpenAuthModal?: () => void;
  onOpenVerifyModal?: () => void;
  onOpenPayment?: () => void;
  onOpenDashboard?: () => void;
  onOpenGuru?: () => void;
  hasActiveSessionBar?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  onOpenAuthModal, 
  onOpenVerifyModal,
  onOpenPayment,
  onOpenDashboard,
  onOpenGuru,
  hasActiveSessionBar = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPortalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        hasActiveSessionBar ? 'top-8' : 'top-0'
      } ${
        isScrolled 
          ? 'py-2.5 bg-white/85 backdrop-blur-2xl border-b border-white/80 shadow-lg shadow-slate-900/5' 
          : 'py-4 bg-white/70 backdrop-blur-xl border-b border-white/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleLinkClick('beranda')}
            className="cursor-pointer hover:opacity-95 transition-opacity shrink-0"
          >
            <MathLogo size="md" showSubtitle={true} />
          </div>


          {/* Action Buttons (Right Group - Consolidated, 3D Tactile) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Consolidated Portal Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer border ${
                  portalDropdownOpen
                    ? 'bg-indigo-50/90 text-indigo-700 border-indigo-300 shadow-md shadow-indigo-500/10'
                    : 'bg-white/80 hover:bg-white text-slate-700 hover:text-indigo-600 border-white/90 shadow-sm'
                }`}
              >
                <span>Portal & Layanan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${portalDropdownOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
              </button>

              {/* 3D Glass Dropdown Menu */}
              <AnimatePresence>
                {portalDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-2xl shadow-slate-900/15 p-2 z-50 divide-y divide-slate-100/80"
                  >
                    <div className="py-1">
                      <button 
                        onClick={() => { setPortalDropdownOpen(false); onOpenGuru?.(); }} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-purple-50/80 hover:text-purple-900 transition-all text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <School className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="leading-tight">Portal Guru & Sekolah</p>
                          <span className="text-[10px] text-slate-500 font-medium">Pendaftaran Kolektif & Delegasi</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setPortalDropdownOpen(false); onOpenDashboard?.(); }} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-indigo-50/80 hover:text-indigo-900 transition-all text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="leading-tight">Dashboard Panitia</p>
                          <span className="text-[10px] text-slate-500 font-medium">Administrasi & Monitoring CBT</span>
                        </div>
                      </button>
                    </div>

                    <div className="py-1">
                      <button 
                        onClick={() => { setPortalDropdownOpen(false); onOpenPayment?.(); }} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-rose-50/80 hover:text-rose-900 transition-all text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="leading-tight">Status Pembayaran</p>
                          <span className="text-[10px] text-slate-500 font-medium">Simulasi Midtrans QRIS & VA</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => { setPortalDropdownOpen(false); onOpenVerifyModal?.(); }} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-emerald-50/80 hover:text-emerald-900 transition-all text-left group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="leading-tight">Verifikasi Sertifikat</p>
                          <span className="text-[10px] text-slate-500 font-medium">Cek Hash & Validitas QR</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3D Glass Login Button */}
            <motion.button 
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenAuthModal}
              className="btn-3d-white inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              <span>Masuk</span>
            </motion.button>

            {/* 3D Glass Primary Register Button */}
            <motion.button 
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLinkClick('kategori')}
              className="btn-3d-primary inline-flex items-center gap-2 px-4.5 py-2 text-xs font-black rounded-xl cursor-pointer"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/90 border border-white/90 text-slate-800 shadow-sm cursor-pointer"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (3D Sheet of Glass) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden overflow-hidden px-4 pt-4 pb-6 mt-2 bg-white/95 backdrop-blur-2xl border-b border-white/90 shadow-2xl space-y-4"
          >
            <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
              <button 
                onClick={() => handleLinkClick('profil')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                Profil Lomba
              </button>
              <button 
                onClick={() => handleLinkClick('kategori')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <Calendar className="w-4 h-4 text-purple-600" />
                Kategori & Jadwal
              </button>
              <button 
                onClick={() => handleLinkClick('pengumuman')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <Award className="w-4 h-4 text-pink-600" />
                Pengumuman
              </button>
              <button 
                onClick={() => handleLinkClick('arsip')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <FileText className="w-4 h-4 text-cyan-600" />
                Arsip Soal
              </button>
              <button 
                onClick={() => handleLinkClick('video')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <Video className="w-4 h-4 text-amber-600" />
                Galeri Video
              </button>
              <button 
                onClick={() => handleLinkClick('faq')}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 border border-slate-200/80 text-left text-slate-800 shadow-xs"
              >
                <HelpCircle className="w-4 h-4 text-emerald-600" />
                FAQ & Kontak
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-2.5">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenGuru?.(); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl glass-3d-violet text-purple-900"
              >
                <School className="w-4 h-4 text-purple-700" />
                Portal Guru & Sekolah
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenDashboard?.(); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl glass-3d-cyan text-sky-900"
              >
                <LayoutDashboard className="w-4 h-4 text-sky-700" />
                Dashboard Panitia
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenPayment?.(); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl glass-3d-rose text-rose-900"
              >
                <CreditCard className="w-4 h-4 text-rose-700" />
                Status Pembayaran Midtrans
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenVerifyModal?.(); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl glass-3d-emerald text-emerald-900"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Verifikasi Sertifikat
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenAuthModal?.(); }}
                className="btn-3d-white w-full flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl text-slate-900"
              >
                <LogIn className="w-4 h-4 text-indigo-600" />
                Masuk Akun Peserta
              </button>
              <button 
                onClick={() => handleLinkClick('kategori')}
                className="btn-3d-primary w-full flex items-center justify-center gap-2 py-3 text-xs font-black rounded-xl text-white"
              >
                Daftar Peserta Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
