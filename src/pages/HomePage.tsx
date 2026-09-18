import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AnnouncementBanner } from '../components/home/AnnouncementBanner';
import { HeroSection } from '../components/home/HeroSection';
import { ProfileSection } from '../components/home/ProfileSection';
import { CategoryScheduleSection } from '../components/home/CategoryScheduleSection';
import { AnnouncementListSection } from '../components/home/AnnouncementListSection';
import { VideoGallerySection } from '../components/home/VideoGallerySection';
import { ArchiveSection } from '../components/home/ArchiveSection';
import { FaqContactSection } from '../components/home/FaqContactSection';

const CertificateVerifyModal = lazy(() => import('../components/certificate/CertificateVerifyModal').then(m => ({ default: m.CertificateVerifyModal })));
const AuthModal = lazy(() => import('../components/auth/AuthModal').then(m => ({ default: m.AuthModal })));
const FormPendaftaranModal = lazy(() => import('../components/registration/FormPendaftaranModal').then(m => ({ default: m.FormPendaftaranModal })));

import { 
  MOCK_KATEGORI, 
  MOCK_JADWAL, 
  MOCK_FAQ 
} from '../data/mockData';
import { 
  useStoredPengumuman, 
  useStoredVideos, 
  useStoredArsipSoal 
} from '../utils/storage';
import type { KategoriLomba, Pengumuman } from '../types';
import { CheckCircle2, UserCheck } from 'lucide-react';

interface HomePageProps {
  onNavigateToPayment?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToLogin?: () => void;
  onNavigateToGuru?: () => void;
  onNavigateToRegistrationDetail?: () => void;
  activeUser?: { name: string; email: string; role: string; sekolah?: string } | null;
  onLogout?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigateToPayment,
  onNavigateToDashboard,
  onNavigateToLogin,
  onNavigateToGuru,
  onNavigateToRegistrationDetail,
  activeUser: externalActiveUser,
  onLogout,
}) => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFormPendaftaranOpen, setIsFormPendaftaranOpen] = useState(false);
  const [selectedKategoriForRegister, setSelectedKategoriForRegister] = useState<KategoriLomba | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Pengumuman | null>(null);
  const [internalUser, setInternalUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Reactive persistent content from admin
  const [storedPengumuman] = useStoredPengumuman();
  const [storedVideos] = useStoredVideos();
  const [storedArsipSoal] = useStoredArsipSoal();

  const breakingAnnouncement = storedPengumuman.find(p => p.isPenting) || storedPengumuman[0];

  const activeUser = externalActiveUser || internalUser;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category: KategoriLomba) => {
    setSelectedKategoriForRegister(category);
    setIsFormPendaftaranOpen(true);
  };

  const handleLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setInternalUser(user);
    showToast(`Selamat datang, ${user.name}! Akun ${user.role} siap digunakan.`);
    const roleLower = (user.role || '').toLowerCase();
    const isPanitiaOrAdmin = 
      roleLower.includes('admin') || 
      roleLower.includes('panitia') || 
      roleLower.includes('koordinator') || 
      roleLower.includes('staf') ||
      user.role === 'Super Admin' ||
      user.role === 'Panitia Pelaksana' ||
      user.role === 'Koordinator Divisi' ||
      user.role === 'Staf Panitia';

    if (roleLower.includes('guru')) {
      if (onNavigateToGuru) onNavigateToGuru();
    } else if (isPanitiaOrAdmin) {
      if (onNavigateToDashboard) onNavigateToDashboard();
    } else {
      if (onNavigateToRegistrationDetail) onNavigateToRegistrationDetail();
    }
  };

  const handleLogout = () => {
    setInternalUser(null);
    if (onLogout) onLogout();
    showToast('Anda telah keluar dari sesi.');
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-800 relative overflow-x-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 text-slate-900 text-xs font-semibold shadow-2xl backdrop-blur-xl"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Session Bar (if logged in) */}
      <AnimatePresence>
        {activeUser && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-[60] bg-indigo-600 px-4 py-1 text-center text-xs font-medium text-white flex items-center justify-center gap-2"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>
              Sesi Aktif:{' '}
              <button 
                onClick={onNavigateToRegistrationDetail}
                className="underline font-bold hover:text-indigo-100 cursor-pointer"
                title="Buka Halaman Detail Pendaftaran & Sertifikat"
              >
                {activeUser.name}
              </button>{' '}
              ({activeUser.role})
            </span>
            <button 
              onClick={handleLogout}
              className="underline ml-2 text-indigo-200 hover:text-white cursor-pointer"
            >
              Keluar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <Navbar
        onNavigate={scrollToSection}
        onOpenAuthModal={onNavigateToLogin || (() => setIsAuthModalOpen(true))}
        onOpenVerifyModal={() => setIsVerifyModalOpen(true)}
        onOpenPayment={onNavigateToPayment}
        onOpenDashboard={onNavigateToDashboard}
        onOpenGuru={onNavigateToGuru}
        hasActiveSessionBar={Boolean(activeUser)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Top Breaking Announcement Banner */}
        <AnnouncementBanner
          announcement={breakingAnnouncement}
          onViewAll={() => scrollToSection('pengumuman')}
          onSelectAnnouncement={(ann) => setSelectedAnnouncement(ann)}
        />

        {/* Hero Section */}
        <HeroSection
          onRegisterClick={() => {
            setSelectedKategoriForRegister(null);
            setIsFormPendaftaranOpen(true);
          }}
          onExploreCategoriesClick={() => scrollToSection('kategori')}
          onVerifyCertificateClick={() => setIsVerifyModalOpen(true)}
        />

        {/* Profil Lomba Section */}
        <ProfileSection />

        {/* Kategori Lomba & Jadwal Timeline Section */}
        <CategoryScheduleSection
          categories={MOCK_KATEGORI}
          schedules={MOCK_JADWAL}
          onSelectCategory={handleSelectCategory}
        />

        {/* Pengumuman List Section */}
        <div className="section-deferred">
          <AnnouncementListSection
            announcements={storedPengumuman}
            selectedAnnouncement={selectedAnnouncement}
            onCloseModal={() => setSelectedAnnouncement(null)}
            onOpenModal={(ann) => setSelectedAnnouncement(ann)}
          />
        </div>

        {/* Arsip Soal Lomba Section */}
        <div className="section-deferred">
          <ArchiveSection archives={storedArsipSoal} />
        </div>

        {/* Galeri Video Kegiatan Section */}
        <div className="section-deferred">
          <VideoGallerySection videos={storedVideos} />
        </div>

        {/* Tanya Jawab & Kontak Panitia Section */}
        <div className="section-deferred">
          <FaqContactSection faqs={MOCK_FAQ} />
        </div>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals - Rendered strictly on demand */}
      <Suspense fallback={null}>
        {isVerifyModalOpen && (
          <CertificateVerifyModal
            isOpen={isVerifyModalOpen}
            onClose={() => setIsVerifyModalOpen(false)}
          />
        )}

        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {isFormPendaftaranOpen && (
          <FormPendaftaranModal
            isOpen={isFormPendaftaranOpen}
            onClose={() => setIsFormPendaftaranOpen(false)}
            defaultKategori={selectedKategoriForRegister}
            currentUser={activeUser}
            onSuccessRegister={(orderData) => {
              showToast(`Pendaftaran ${orderData.namaSiswa} dari ${orderData.sekolah} berhasil dibuat!`);
              if (onNavigateToRegistrationDetail) {
                onNavigateToRegistrationDetail();
              } else if (onNavigateToPayment) {
                onNavigateToPayment();
              }
            }}
          />
        )}
      </Suspense>

    </div>
  );
};
