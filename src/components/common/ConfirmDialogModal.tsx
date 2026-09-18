import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, ShieldAlert } from 'lucide-react';

export interface ConfirmDialogModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialogModal: React.FC<ConfirmDialogModalProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batalkan',
  variant = 'danger',
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with 3D Glass Depth Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xl transition-all"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl glass-3d-elevated border border-white/95 p-6 sm:p-7 shadow-2xl space-y-5 overflow-hidden z-10"
          >
            {/* Top Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-white/90 shadow-2xs cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon Jewel & Header */}
            <div className="flex items-start gap-3.5 pr-8">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                  variant === 'danger'
                    ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-rose-600/10'
                    : variant === 'warning'
                    ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-amber-600/10'
                    : 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-indigo-600/10'
                }`}
              >
                {variant === 'danger' ? (
                  <Trash2 className="w-5 h-5" />
                ) : variant === 'warning' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <ShieldAlert className="w-5 h-5" />
                )}
              </div>

              <div className="space-y-1">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    variant === 'danger'
                      ? 'bg-rose-100/90 text-rose-950 border-rose-300'
                      : variant === 'warning'
                      ? 'bg-amber-100/90 text-amber-950 border-amber-300'
                      : 'bg-indigo-100/90 text-indigo-950 border-indigo-300'
                  }`}
                >
                  <span>Konfirmasi Tindakan</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 font-['Outfit'] leading-snug">
                  {title}
                </h3>
              </div>
            </div>

            {/* Message Body */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/60 p-4 rounded-2xl border border-slate-200/70">
              {message}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="btn-3d-white px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className={`px-5 py-2.5 rounded-xl text-xs font-black text-white shadow-md cursor-pointer transition-all active:translate-y-0.5 ${
                  variant === 'danger'
                    ? 'bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 shadow-rose-600/25 border border-rose-400'
                    : variant === 'warning'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 shadow-amber-600/25 border border-amber-400'
                    : 'btn-3d-primary'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
