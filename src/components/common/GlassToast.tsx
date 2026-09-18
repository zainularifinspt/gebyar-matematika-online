import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface GlassToastProps {
  message: string | null;
  type?: ToastType;
  onClose?: () => void;
}

export const GlassToast: React.FC<GlassToastProps> = ({
  message,
  type = 'info',
  onClose,
}) => {
  if (!message) return null;

  const isSuccess = type === 'success' || message.startsWith('✓') || message.toLowerCase().includes('berhasil');
  const isError = type === 'error' || message.toLowerCase().includes('gagal') || message.toLowerCase().includes('error');
  const isWarning = type === 'warning';

  let glassClass = 'glass-3d-indigo border-indigo-200/80 text-indigo-950';
  let dotClass = 'bg-indigo-600';
  let IconComponent = Info;

  if (isSuccess) {
    glassClass = 'glass-3d-emerald border-emerald-200/80 text-emerald-950';
    dotClass = 'bg-emerald-600';
    IconComponent = CheckCircle2;
  } else if (isError) {
    glassClass = 'glass-3d-rose border-rose-200/80 text-rose-950';
    dotClass = 'bg-rose-600';
    IconComponent = AlertCircle;
  } else if (isWarning) {
    glassClass = 'glass-3d-amber border-amber-200/80 text-amber-950';
    dotClass = 'bg-amber-600';
    IconComponent = AlertTriangle;
  }

  return (
    <div 
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 ${glassClass} px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-fade-in border max-w-md backdrop-blur-xl`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <span className={`w-2.5 h-2.5 rounded-full ${dotClass} animate-ping absolute opacity-75`} />
        <IconComponent className="w-4 h-4 shrink-0 relative" />
      </div>
      <span className="flex-1 leading-relaxed">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-black/5 text-slate-400 hover:text-slate-700 transition-colors"
          aria-label="Tutup notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
