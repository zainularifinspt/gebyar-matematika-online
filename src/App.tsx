import { useState } from 'react';
import { HomePage } from './pages/HomePage';
import { PaymentPage } from './pages/PaymentPage';
import { DashboardPanitiaPage } from './pages/DashboardPanitiaPage';
import { LoginPage } from './pages/LoginPage';
import { GuruAccountPage } from './pages/GuruAccountPage';
import { RegistrationDetailPage } from './pages/RegistrationDetailPage';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'payment' | 'dashboard' | 'login' | 'guru' | 'registration'>('home');
  const [activeUser, setActiveUser] = useState<{ name: string; email: string; role: string; sekolah?: string } | null>(null);

  if (currentView === 'login') {
    return (
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
    );
  }

  if (currentView === 'registration') {
    return (
      <RegistrationDetailPage
        onBackToHome={() => setCurrentView('home')}
        currentUser={activeUser}
      />
    );
  }

  if (currentView === 'guru') {
    return (
      <GuruAccountPage
        onBackToHome={() => setCurrentView('home')}
        currentUser={activeUser}
      />
    );
  }

  if (currentView === 'payment') {
    return <PaymentPage onBackToHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return (
      <DashboardPanitiaPage 
        onExitDashboard={() => setCurrentView('home')} 
        currentUser={activeUser}
      />
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
