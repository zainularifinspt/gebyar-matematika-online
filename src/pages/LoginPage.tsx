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
  LogIn,
  UserPlus,
  AlertCircle,
  School
} from 'lucide-react';
import { FloatingMath3D } from '../components/common/FloatingMath3D';

interface LoginPageProps {
  onBackToHome: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string; sekolah?: string }) => void;
}

type AuthTab = 'login' | 'register';

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onLoginSuccess,
}) => {
  const [authTab, setAuthTab] = useState<AuthTab>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerRole, setRegisterRole] = useState<'siswa' | 'guru'>('siswa');
  const [registerData, setRegisterData] = useState({
    namaLengkap: '',
    username: '',
    email: '',
    noHp: '',
    sekolah: '',
    password: '',
    confirmPassword: '',
  });

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Farhan Maulana Hakim',
        email: 'farhan.maulana@gmail.com',
        role: 'Peserta Mandiri',
        sekolah: 'SMA Negeri 3 Yogyakarta',
      });
    }, 700);
  };

  // Handle Universal Password Login with Automatic Role Detection
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const identifier = loginIdentifier.trim();
    if (!identifier || !loginPassword.trim()) {
      setErrorMessage('Harap masukkan username/email dan password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const idLower = identifier.toLowerCase();

      // 1. SUPER ADMIN
      if (
        idLower === 'admin' || 
        idLower === 'superadmin' || 
        idLower.includes('superadmin') || 
        idLower === 'admin@gebyar.id'
      ) {
        onLoginSuccess({
          name: 'Super Administrator',
          email: identifier.includes('@') ? identifier : 'superadmin@gebyar.id',
          role: 'Super Admin',
        });
        return;
      }

      // 2. PANITIA STAF
      if (
        idLower === 'panitia' || 
        idLower.includes('panitia') || 
        idLower === 'hendra' || 
        idLower === 'panitia@gebyar.id' ||
        idLower.includes('.cbt') ||
        idLower.includes('.sekretariat')
      ) {
        onLoginSuccess({
          name: 'Hendra Wijaya, M.Pd',
          email: identifier.includes('@') ? identifier : 'panitia.lomba@gebyar.id',
          role: 'Panitia Pelaksana',
        });
        return;
      }

      // 3. GURU SEKOLAH
      if (
        idLower === 'guru' || 
        idLower.includes('guru') || 
        idLower.includes('.sch.id')
      ) {
        onLoginSuccess({
          name: identifier.includes('@') ? identifier.split('@')[0] : 'Siti Rahmawati, S.Pd',
          email: identifier.includes('@') ? identifier : `${identifier}@sekolah.sch.id`,
          role: 'Guru Pendamping',
          sekolah: 'SMP IT Al-Madani Bandung',
        });
        return;
      }

      // 4. SISWA MANDIRI / PESERTA UMUM
      onLoginSuccess({
        name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@siswa.gebyar.id`,
        role: 'Peserta Mandiri',
        sekolah: 'SMA Negeri 3 Yogyakarta',
      });
    }, 600);
  };

  // Handle Register New Account
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok dengan password yang dimasukkan.');
      return;
    }

    if (registerData.password.length < 6) {
      setErrorMessage('Password minimal terdiri dari 6 karakter.');
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

      {/* Main Single 3D Glass Card */}
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
              {authTab === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-normal">
              {authTab === 'login'
                ? 'Gunakan akun Google atau username & password. Sistem otomatis mendeteksi role akun Anda.'
                : 'Lengkapi data untuk mendaftar akun peserta atau guru pendamping.'}
            </p>
          </div>

          {/* Tab Switcher: Masuk vs Buat Akun (3D Capsule) */}
          <div className="flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200 text-xs font-bold shadow-inner">
            <button
              type="button"
              onClick={() => { setAuthTab('login'); setErrorMessage(null); }}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authTab === 'login'
                  ? 'bg-white text-indigo-700 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk (Login)</span>
            </button>
            <button
              type="button"
              onClick={() => { setAuthTab('register'); setErrorMessage(null); }}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                authTab === 'register'
                  ? 'bg-white text-indigo-700 shadow-md font-black'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Buat Akun Baru</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: FORM MASUK (LOGIN) */}
          {authTab === 'login' ? (
            <div className="space-y-4">
              
              {/* Google Single Sign-On Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="btn-3d-white w-full py-3 px-4 rounded-2xl text-slate-800 font-bold text-xs flex items-center justify-center gap-3 border border-white/95 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                <span>{isLoading ? 'Menghubungkan...' : 'Lanjutkan dengan Akun Google'}</span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-slate-200/80 w-full"></div>
                <span className="bg-white/90 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider absolute rounded-full">
                  atau masuk dengan username
                </span>
              </div>

              {/* Username & Password Form */}
              <form onSubmit={handlePasswordLogin} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username atau Alamat Email
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Masukkan username atau email"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Kata Sandi (Password)
                    </label>
                    <span className="text-[11px] text-indigo-600 font-semibold cursor-pointer hover:underline">
                      Lupa kata sandi?
                    </span>
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
                    <span>{isLoading ? 'Memverifikasi Akun...' : 'Masuk ke Akun'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* 3D Glass Role Hint Box */}
              <div className="p-4 rounded-2xl glass-3d-base border border-white/90 space-y-1 text-[11px] text-slate-700 shadow-xs">
                <span className="font-black text-slate-900 block">💡 Deteksi Hak Akses Otomatis:</span>
                <p>
                  Sistem otomatis mendeteksi role akun Anda:
                </p>
                <ul className="pl-4 list-disc space-y-0.5 text-[10px] text-slate-600 font-medium">
                  <li>Ketik <strong className="text-amber-700 font-mono font-bold">admin</strong> &rarr; Masuk sebagai <strong>Super Admin</strong></li>
                  <li>Ketik <strong className="text-indigo-700 font-mono font-bold">panitia</strong> &rarr; Masuk sebagai <strong>Staf Panitia</strong></li>
                  <li>Ketik <strong className="text-purple-700 font-mono font-bold">guru</strong> &rarr; Masuk ke <strong>Portal Guru</strong></li>
                  <li>Ketik <strong className="text-slate-800 font-mono font-bold">siswa</strong> &rarr; Masuk ke <strong>Portal Siswa</strong></li>
                </ul>
              </div>

            </div>
          ) : (
            /* TAB 2: FORM DAFTAR AKUN BARU */
            <form onSubmit={handleRegister} className="space-y-4 animate-fade-in">
              
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
                    placeholder="Nama Lengkap Pendaftar"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                    placeholder="contoh: farhan26"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 font-mono focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Aktif
                  </label>
                  <input
                    type="text"
                    required
                    value={registerData.noHp}
                    onChange={(e) => setRegisterData({ ...registerData, noHp: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Email Aktif
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="email@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
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
                    Password
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
                    Ulangi Password
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
                  <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar & Buat Akun'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
