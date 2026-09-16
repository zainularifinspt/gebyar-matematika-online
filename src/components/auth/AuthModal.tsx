import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (user: { name: string; email: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const extractDisplayName = (input: string): string => {
    if (!input) return 'Pengguna';
    const base = input.includes('@') ? input.split('@')[0] : input;
    return base
      .replace(/[._-]+/g, ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setErrorMessage(null);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess?.({
        name: 'Pengguna Akun Google',
        email: 'user.google@gmail.com',
        role: 'Peserta Mandiri',
      });
      onClose();
    }, 700);
  };

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username.trim() || !password.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const idLower = username.toLowerCase().trim();
      const displayName = extractDisplayName(username);

      // Super Administrator Detection
      if (
        idLower === 'mzainul.arifin@ulm.ac.id' ||
        idLower === 'admin' || 
        idLower === 'superadmin' || 
        idLower.includes('superadmin') || 
        idLower.includes('admin@')
      ) {
        if (password !== 'ARIfin8167') {
          setErrorMessage('Kata sandi untuk Super Administrator salah.');
          return;
        }

        onLoginSuccess?.({
          name: 'M. Zainul Arifin',
          email: 'mzainul.arifin@ulm.ac.id',
          role: 'Super Admin',
        });
        onClose();
        return;
      } else if (idLower === 'panitia' || idLower.includes('panitia') || idLower.includes('@panitia')) {
        // Panitia Staf Detection
        onLoginSuccess?.({
          name: displayName || 'Panitia Pelaksana',
          email: username.includes('@') ? username : 'panitia@gebyar.id',
          role: 'Panitia Pelaksana',
        });
      } else if (idLower === 'guru' || idLower.includes('guru') || idLower.includes('.sch.id')) {
        // Guru Sekolah Detection
        onLoginSuccess?.({
          name: displayName || 'Guru Pendamping',
          email: username.includes('@') ? username : `${username}@sekolah.sch.id`,
          role: 'Guru Pendamping',
        });
      } else {
        // Siswa Mandiri Detection
        onLoginSuccess?.({
          name: displayName || 'Peserta Mandiri',
          email: username.includes('@') ? username : `${username}@siswa.gebyar.id`,
          role: 'Peserta Mandiri',
        });
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-8 shadow-2xl space-y-5 text-slate-900 overflow-hidden">
        {/* Specular Rim */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full glass-3d-base text-indigo-800 text-[10px] font-black border border-white/90 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Autentikasi Terpadu</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 font-['Outfit']">
              Masuk ke Gebyar Matematika
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Satu akun terintegrasi. Sistem otomatis mengenali hak akses Anda.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-white/90 shadow-sm cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Google SSO Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn-3d-white w-full py-3 px-4 rounded-xl text-slate-800 font-bold text-xs flex items-center justify-center gap-3 cursor-pointer"
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
          <span>{loading ? 'Menghubungkan...' : 'Lanjutkan dengan Akun Google'}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="border-t border-slate-200/80 w-full"></div>
          <span className="bg-white/90 px-3 text-[10px] uppercase font-black text-slate-400 tracking-wider absolute rounded-full">
            atau gunakan username / email
          </span>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handlePasswordLogin} className="space-y-3.5 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Username atau Alamat Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username atau email"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-500 shadow-xs"
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

          <button
            type="submit"
            disabled={loading}
            className="btn-3d-primary w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
