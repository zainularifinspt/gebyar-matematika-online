import { useState, lazy, Suspense } from 'react';
import { HomePage } from './pages/HomePage';

const PaymentPage = lazy(() => import('./pages/PaymentPage').then(m => ({ default: m.PaymentPage })));
const DashboardPanitiaPage = lazy(() => import('./pages/DashboardPanitiaPage').then(m => ({ default: m.DashboardPanitiaPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const GuruAccountPage = lazy(() => import('./pages/GuruAccountPage').then(m => ({ default: m.GuruAccountPage })));
const RegistrationDetailPage = lazy(() => import('./pages/RegistrationDetailPage').then(m => ({ default: m.RegistrationDetailPage })));

const PageLoadingFallback = () => (
  <div className="min-h-screen light-mesh-bg flex items-center justify-center p-4">
    <div className="p-5 sm:p-6 rounded-2xl glass-3d-base border border-white/80 shadow-xl flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-bold text-slate-700">Memuat halaman...</span>
    </div>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'payment' | 'dashboard' | 'login' | 'guru' | 'registration'>('home');
  const [activeUser, setActiveUser] = useState<{ name: string; email: string; role: string; sekolah?: string } | null>(null);

  if (currentView === 'login') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <LoginPage
          onBackToHome={() => setCurrentView('home')}
          onLoginSuccess={(user) => {
            setActiveUser(user);
            if (user.role === 'Guru Pendamping') {
              setCurrentView('guru');
            } else if (user.role === 'Panitia Pelaksana' || user.role === 'Super Admin' || user.role.includes('Admin') || user.role.includes('Panitia')) {
              setCurrentView('dashboard');
            } else {
              setCurrentView('registration');
            }
          }}
        />
      </Suspense>
    );
  }

  if (currentView === 'registration') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <RegistrationDetailPage
          onBackToHome={() => setCurrentView('home')}
          currentUser={activeUser}
        />
      </Suspense>
    );
  }

  if (currentView === 'guru') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <GuruAccountPage
          onBackToHome={() => setCurrentView('home')}
          currentUser={activeUser}
        />
      </Suspense>
    );
  }

  if (currentView === 'payment') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <PaymentPage onBackToHome={() => setCurrentView('home')} />
      </Suspense>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <DashboardPanitiaPage 
          onExitDashboard={() => setCurrentView('home')} 
          currentUser={activeUser}
        />
      </Suspense>
    );
  }

  return (
    <HomePage 
      onNavigateToPayment={() => setCurrentView('payment')}
      onNavigateToDashboard={() => setCurrentView('dashboard')}
      onNavigateToLogin={() => setCurrentView('login')}
      onNavigateToGuru={() => setCurrentView('guru')}
      onNavigateToRegistrationDetail={() => setCurrentView('registration')}
      activeUser={activeUser}
      onLogout={() => setActiveUser(null)}
    />
  );
}

export default App;
