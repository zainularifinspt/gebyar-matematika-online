import React, { useState } from 'react';
import { 
  ArrowLeft, 
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState('');

  // Register form state (khusus siswa mandiri atau guru pendamping saja)
  const [registerRole, setRegisterRole] = useState<'siswa' | 'guru'>('siswa');
  const [registerData, setRegisterData] = useState({
    namaLengkap: '',
    email: '',
    noHp: '',
    sekolah: '',
    password: '',
    confirmPassword: '',
  });

  // Extract clean display name from email or input
  const extractDisplayName = (input: string): string => {
    if (!input) return 'Pengguna';
    const base = input.includes('@') ? input.split('@')[0] : input;
    // Format capitalize words
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

  // Handle Login Submission
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password.trim()) {
      setErrorMessage('Silakan isi email dan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const emailLower = cleanEmail.toLowerCase();
      const displayName = extractDisplayName(cleanEmail);

      // 1. Super Admin Detection (admin@ atau keyword admin)
      if (
        emailLower.includes('superadmin') || 
        emailLower.includes('admin@') || 
        emailLower === 'admin'
      ) {
        onLoginSuccess({
          name: 'Super Administrator',
          email: cleanEmail.includes('@') ? cleanEmail : 'admin@gebyar.id',
          role: 'Super Admin',
        });
        return;
      }

      // 2. Panitia Pelaksana (panitia@ atau keyword panitia)
      if (
        emailLower.includes('panitia@') || 
        emailLower.includes('@panitia') || 
        emailLower === 'panitia'
      ) {
        onLoginSuccess({
          name: displayName || 'Panitia Pelaksana',
          email: cleanEmail.includes('@') ? cleanEmail : 'panitia@gebyar.id',
          role: 'Panitia Pelaksana',
        });
        return;
      }

      // 3. Guru Pendamping (guru@ atau domain sch.id atau keyword guru)
      if (
        emailLower.includes('guru@') || 
        emailLower.includes('.sch.id') || 
        emailLower === 'guru'
      ) {
        onLoginSuccess({
          name: displayName || 'Guru Pendamping',
          email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@sekolah.sch.id`,
          role: 'Guru Pendamping',
          sekolah: 'Sekolah Binaan',
        });
        return;
      }

      // 4. Siswa Mandiri (Default)
      onLoginSuccess({
        name: displayName || 'Siswa Peserta',
        email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`,
        role: 'Peserta Mandiri',
        sekolah: 'Asal Sekolah',
      });
    }, 600);
  };

  // Handle Registration (HANYA UNTUK GURU ATAU SISWA)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Konfirmasi kata sandi tidak sesuai.');
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
        sekolah: registerData.sekolah,
      });
    }, 700);
  };

  // Handle Forgot Password
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setErrorMessage('Silakan masukkan alamat email akun Anda.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(`Tautan instruksi reset kata sandi telah dikirimkan ke email: ${forgotEmail}. Silakan periksa kotak masuk atau spam email Anda.`);
    }, 800);
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-900 flex flex-col justify-between relative overflow-x-hidden p-4 sm:p-6 lg:p-8">
      {/* 3D Floating Math Background */}
      <FloatingMath3D />

      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-2 relative z-10">
        <button
          onClick={onBackToHome}
          className="btn-3d-white inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-fuchsia-600 text-white flex items-center justify-center font-serif font-black text-base shadow-md shadow-indigo-600/30 border border-white/40">
            <span className="leading-none mt-[-2px]">∑</span>
          </div>
          <span className="text-sm font-extrabold text-slate-900 font-['Outfit'] hidden sm:inline">
            Gebyar Matematika 2026
          </span>
        </div>
      </header>

      {/* Main Container Card */}
      <main className="max-w-[420px] w-full mx-auto my-6 relative z-10">
        <div className="rounded-[36px] bg-white border-2 border-slate-900 shadow-2xl p-7 sm:p-9 space-y-6 relative">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW 1: LOGIN (SESUAI GAMBAR REFERENSI USER) */}
          {/* ============================================================ */}
          {authMode === 'login' && (
            <div className="space-y-5 animate-fade-in">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                
                {/* Field 1: EMAIL */}
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-slate-800 uppercase mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-5 py-3.5 text-sm rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                {/* Field 2: KATA SANDI & LUPA PASSWORD */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-extrabold tracking-wider text-slate-800 uppercase">
                      KATA SANDI
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setAuthMode('forgot');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    >
                      Lupa Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-5 pr-12 py-3.5 text-sm rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-all font-medium tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Tombol Masuk (Pill Gradient) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-full font-extrabold text-white text-base bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-500 hover:opacity-95 active:scale-[0.99] shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{isLoading ? 'Memproses...' : 'Masuk'}</span>
                  </button>
                </div>
              </form>

              {/* Divider Atau */}
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-slate-300 w-full"></div>
                <span className="bg-white px-3 text-xs font-semibold text-slate-500 absolute">
                  Atau
                </span>
              </div>

              {/* Tombol Masuk dengan Google */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full font-bold text-slate-900 text-sm border-2 border-slate-900 bg-white hover:bg-slate-50 active:scale-[0.99] flex items-center justify-center gap-3 transition-all cursor-pointer"
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

              {/* Link Bawah Daftar */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('register');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm hover:underline cursor-pointer"
                >
                  Belum punya akun? Daftar
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW 2: DAFTAR (HANYA GURU ATAU SISWA) */}
          {/* ============================================================ */}
          {authMode === 'register' && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                  Daftar Akun Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Pendaftaran akun khusus untuk Siswa dan Guru Pendamping
                </p>
              </div>

              {/* Notice tegas: Akun Panitia dibuatkan oleh Super Admin */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-900 text-[11px] leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Informasi Hak Akses:</strong> Pendaftaran publik hanya untuk <strong>Siswa</strong> atau <strong>Guru</strong>. Akun Panitia Pelaksana dibuatkan langsung oleh <strong>Super Admin</strong>.
                </span>
              </div>

              {/* Pilihan Peran: Hanya Siswa Mandiri & Guru Pendamping */}
              <div>
                <label className="block text-xs font-extrabold tracking-wider text-slate-800 uppercase mb-2">
                  DAFTAR SEBAGAI
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('siswa')}
                    className={`py-2.5 px-3 rounded-full text-xs font-black border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      registerRole === 'siswa'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm'
                        : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Siswa Mandiri</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('guru')}
                    className={`py-2.5 px-3 rounded-full text-xs font-black border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      registerRole === 'guru'
                        ? 'border-purple-600 bg-purple-50 text-purple-800 shadow-sm'
                        : 'border-slate-300 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    <School className="w-3.5 h-3.5" />
                    <span>Guru Pendamping</span>
                  </button>
                </div>
              </div>

              {/* Form Input Register */}
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    NAMA LENGKAP
                  </label>
                  <input
                    type="text"
                    required
                    value={registerData.namaLengkap}
                    onChange={(e) => setRegisterData({ ...registerData, namaLengkap: e.target.value })}
                    placeholder={registerRole === 'guru' ? 'Contoh: Siti Rahmawati, S.Pd' : 'Contoh: Ahmad Maulana'}
                    className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    ALAMAT EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      NO WHATSAPP
                    </label>
                    <input
                      type="tel"
                      required
                      value={registerData.noHp}
                      onChange={(e) => setRegisterData({ ...registerData, noHp: e.target.value })}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      ASAL SEKOLAH
                    </label>
                    <input
                      type="text"
                      required
                      value={registerData.sekolah}
                      onChange={(e) => setRegisterData({ ...registerData, sekolah: e.target.value })}
                      placeholder="Nama Sekolah"
                      className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      KATA SANDI
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      placeholder="Min. 6 karakter"
                      className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      ULANGI SANDI
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      placeholder="Ulangi sandi"
                      className="w-full px-4 py-2.5 text-xs rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-full font-extrabold text-white text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-500 hover:opacity-95 active:scale-[0.99] shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}</span>
                  </button>
                </div>
              </form>

              {/* Kembali ke Login */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('login');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm hover:underline cursor-pointer"
                >
                  Sudah punya akun? Masuk
                </button>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* VIEW 3: LUPA PASSWORD */}
          {/* ============================================================ */}
          {authMode === 'forgot' && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
                  Lupa Kata Sandi?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Masukkan email akun Anda. Kami akan mengirimkan instruksi untuk mengatur ulang kata sandi.
                </p>
              </div>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold tracking-wider text-slate-800 uppercase mb-2">
                    EMAIL AKUN
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-5 py-3.5 text-sm rounded-full border-2 border-slate-900 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-all font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-full font-extrabold text-white text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-fuchsia-500 hover:opacity-95 active:scale-[0.99] shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center"
                  >
                    <span>{isLoading ? 'Mengirimkan...' : 'Kirim Instruksi Reset'}</span>
                  </button>
                </div>
              </form>

              {/* Kembali ke Login */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setAuthMode('login');
                  }}
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs sm:text-sm hover:underline cursor-pointer"
                >
                  Kembali ke Halaman Masuk
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="max-w-4xl w-full mx-auto text-center text-xs text-slate-500 py-2 font-medium relative z-10">
        <p>© {new Date().getFullYear()} Panitia Gebyar Matematika Online. Dilindungi Hak Cipta.</p>
      </footer>
    </div>
  );
};

