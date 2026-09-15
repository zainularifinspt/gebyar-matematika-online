import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Mail, 
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  User,
  School,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { FloatingMath3D } from '../components/common/FloatingMath3D';

interface LoginPageProps {
  onBackToHome: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string; sekolah?: string }) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');

  // Register form state (khusus siswa mandiri atau guru/sekolah)
  const [registerRole, setRegisterRole] = useState<'siswa' | 'guru'>('siswa');
  const [registerData, setRegisterData] = useState({
    namaLengkap: '',
    email: '',
    noHp: '',
    sekolah: '',
    password: '',
    confirmPassword: '',
  });

  const extractDisplayName = (input: string): string => {
    if (!input) return 'Pengguna';
    const base = input.includes('@') ? input.split('@')[0] : input;
    return base
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Pengguna Akun Google',
        email: 'user.google@gmail.com',
        role: 'Peserta Mandiri',
        sekolah: 'Satuan Pendidikan',
      });
    }, 600);
  };

  // Handle Password Login with Automatic Role Detection
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailInput = loginEmail.trim();
    if (!emailInput || !loginPassword.trim()) {
      setErrorMessage('Harap masukkan email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const idLower = emailInput.toLowerCase();
      const displayName = extractDisplayName(emailInput);

      // 1. Super Admin
      if (
        idLower === 'admin' || 
        idLower === 'superadmin' || 
        idLower.includes('superadmin') || 
        idLower.includes('admin@')
      ) {
        onLoginSuccess({
          name: 'Super Administrator',
          email: emailInput.includes('@') ? emailInput : 'admin@gebyar.id',
          role: 'Super Admin',
        });
        return;
      }

      // 2. Panitia Pelaksana
      if (
        idLower === 'panitia' || 
        idLower.includes('panitia') || 
        idLower.includes('@panitia')
      ) {
        onLoginSuccess({
          name: displayName || 'Panitia Pelaksana',
          email: emailInput.includes('@') ? emailInput : 'panitia@gebyar.id',
          role: 'Panitia Pelaksana',
        });
        return;
      }

      // 3. Guru Pendamping
      if (
        idLower === 'guru' || 
        idLower.includes('guru') || 
        idLower.includes('.sch.id')
      ) {
        onLoginSuccess({
          name: displayName || 'Guru Pendamping',
          email: emailInput.includes('@') ? emailInput : `${emailInput}@sekolah.sch.id`,
          role: 'Guru Pendamping',
          sekolah: 'Sekolah Binaan',
        });
        return;
      }

      // 4. Siswa Mandiri (Default)
      onLoginSuccess({
        name: displayName || 'Peserta Siswa',
        email: emailInput.includes('@') ? emailInput : `${emailInput}@siswa.gebyar.id`,
        role: 'Peserta Mandiri',
        sekolah: 'Asal Sekolah',
      });
    }, 600);
  };

  // Handle Register New Account (HANYA SISWA ATAU GURU)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak cocok dengan kata sandi yang dimasukkan.');
      return;
    }

    if (registerData.password.length < 6) {
      setErrorMessage('Kata sandi minimal terdiri dari 6 karakter.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: registerData.namaLengkap,
        email: registerData.email,
        role: registerRole === 'guru' ? 'Guru Pendamping' : 'Peserta Mandiri',
        sekolah: registerData.sekolah || (registerRole === 'guru' ? 'Sekolah Binaan' : 'Sekolah Asal'),
      });
    }, 700);
  };

  // Handle Forgot Password
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setErrorMessage('Harap masukkan alamat email Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Tautan instruksi reset kata sandi telah dikirim ke ${forgotEmail}. Silakan periksa inbox email Anda.`);
    }, 700);
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-900 flex flex-col justify-between relative overflow-x-hidden p-4 sm:p-6 lg:p-8">
      {/* 3D Floating Math Background */}
      <FloatingMath3D />

      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between py-2 relative z-10">
        <button
          onClick={onBackToHome}
          className="btn-3d-white inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-serif font-black text-lg shadow-md shadow-indigo-600/30 border border-white/40">
            <span className="leading-none mt-[-2px]">∑</span>
          </div>
          <span className="text-sm font-black text-slate-900 font-['Outfit'] hidden sm:inline">
            Gebyar Matematika 2026
          </span>
        </div>
      </header>

      {/* Main Single 3D Glass Card (Desain Elegan Premium Asli) */}
      <main className="max-w-md w-full mx-auto my-6 relative z-10">
        <div className="rounded-3xl glass-3d-elevated p-7 sm:p-9 border border-white/95 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Specular Rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          {/* Header Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full glass-3d-base text-indigo-800 text-[11px] font-black border border-white/90 shadow-xs uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Autentikasi Terpadu & Portal Ujian</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
              {authMode === 'login' && 'Masuk ke Akun Anda'}
              {authMode === 'register' && 'Daftar Akun Baru'}
              {authMode === 'forgot' && 'Reset Kata Sandi'}
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-normal">
              {authMode === 'login' && 'Masukkan email dan kata sandi Anda untuk mengakses akun.'}
              {authMode === 'register' && 'Pendaftaran akun khusus untuk Siswa Mandiri dan Guru Pendamping.'}
              {authMode === 'forgot' && 'Masukkan email akun Anda untuk menerima tautan reset kata sandi.'}
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 1: FORM MASUK (LOGIN) */}
          {/* ============================================================ */}
          {authMode === 'login' && (
            <div className="space-y-4 animate-fade-in">
              
              {/* Form Email & Password */}
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setAuthMode('forgot');
                      }}
                      className="text-[11px] text-indigo-600 font-semibold cursor-pointer hover:underline"
                    >
                      Lupa password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Masukkan kata sandi"
                      className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-3d-primary w-full py-3.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-200/80 w-full"></div>
                <span className="bg-white/90 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider absolute rounded-full">
                  atau
                </span>
              </div>

              {/* Google Single Sign-On Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="btn-3d-white w-full py-3 px-4 rounded-2xl text-slate-800 font-bold text-xs flex items-center justify-center gap-3 border border-white/95 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Masuk dengan Google</span>
              </button>

              {/* Bottom Toggle: Belum punya akun? Daftar */}
              <div className="pt-2 text-center">
                <span className="text-xs text-slate-600">Belum punya akun? </span>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('register');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  Daftar
                </button>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: FORM DAFTAR AKUN BARU (KHUSUS SISWA ATAU GURU) */}
          {/* ============================================================ */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 animate-fade-in">
              
              {/* Notice tegas: Akun Panitia dibuatkan oleh Super Admin */}
              <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-[11px] leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Informasi Pendaftaran:</strong> Pendaftaran mandiri ini hanya untuk <strong>Siswa</strong> atau <strong>Guru</strong>. Akun Panitia Pelaksana dibuatkan langsung oleh <strong>Super Admin</strong>.
                </span>
              </div>

              {/* Type of Registrant Toggle (3D Glass Pills) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Daftar Sebagai:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('siswa')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      registerRole === 'siswa'
                        ? 'glass-3d-cyan ring-2 ring-sky-500/70 text-sky-950 shadow-md'
                        : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <User className="w-4 h-4 text-sky-600" />
                    <span>Siswa Mandiri</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('guru')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      registerRole === 'guru'
                        ? 'glass-3d-violet ring-2 ring-purple-500/70 text-purple-950 shadow-md'
                        : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                    }`}
                  >
                    <School className="w-4 h-4 text-purple-600" />
                    <span>Guru / Sekolah</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={registerData.namaLengkap}
                    onChange={(e) => setRegisterData({ ...registerData, namaLengkap: e.target.value })}
                    placeholder={registerRole === 'guru' ? 'Nama Lengkap Guru Pembina' : 'Nama Lengkap Siswa'}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    value={registerData.noHp}
                    onChange={(e) => setRegisterData({ ...registerData, noHp: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="email@gmail.com"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {registerRole === 'guru' ? 'Asal Sekolah Tempat Mengajar' : 'Asal Sekolah / Satuan Pendidikan'}
                </label>
                <input
                  type="text"
                  required
                  value={registerData.sekolah}
                  onChange={(e) => setRegisterData({ ...registerData, sekolah: e.target.value })}
                  placeholder="Contoh: SMA Negeri 3 Yogyakarta"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="Min. 6 karakter"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ulangi Sandi
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="Ulangi"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-3d-primary w-full py-3.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Kembali ke Login */}
              <div className="pt-1 text-center">
                <span className="text-xs text-slate-600">Sudah punya akun? </span>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('login');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  Masuk
                </button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/* TAB 3: FORM LUPA PASSWORD */}
          {/* ============================================================ */}
          {authMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email Akun
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-3d-primary w-full py-3.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isLoading ? 'Mengirim Instruksi...' : 'Kirim Tautan Reset'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('login');
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                >
                  Kembali ke Halaman Masuk
                </button>
              </div>
            </form>
          )}

          {/* Footer note */}
          <div className="pt-1 text-center text-[11px] text-slate-500 font-medium">
            <span>Satu akun SSO untuk pendaftaran, Midtrans, dan Web Ujian CBT.</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-slate-500 py-2 font-medium relative z-10">
        <p>© {new Date().getFullYear()} Panitia Gebyar Matematika Online. Dilindungi Keamanan Enkripsi Akun.</p>
      </footer>

    </div>
  );
};
