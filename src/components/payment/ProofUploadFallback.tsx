import React, { useState } from 'react';
import { 
  UploadCloud, 
  CheckCircle2, 
  FileImage,
  Send
} from 'lucide-react';

interface ProofUploadFallbackProps {
  orderId: string;
  onUploadSuccess: (fileUrl: string) => void;
}

export const ProofUploadFallback: React.FC<ProofUploadFallbackProps> = ({
  orderId,
  onUploadSuccess,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [catatan, setCatatan] = useState('');
  const [uploading, setUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName) return;

    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setIsSubmitted(true);
      onUploadSuccess(previewUrl || 'https://via.placeholder.com/600x400.png?text=Bukti+Bayar');
    }, 1000);
  };

  const handleReset = () => {
    setSelectedFileName(null);
    setPreviewUrl(null);
    setIsSubmitted(false);
  };

  return (
    <div className="rounded-3xl glass-3d-elevated p-6 sm:p-7 space-y-5 relative overflow-hidden text-slate-800">
      {/* Specular ambient top glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

      <div className="flex items-center gap-3 relative">
        <div className="w-11 h-11 rounded-2xl glass-3d-amber flex items-center justify-center text-amber-700 shadow-xs shrink-0">
          <UploadCloud className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900 font-['Outfit'] tracking-tight">
            Unggah Bukti Transfer Cadangan
          </h4>
          <p className="text-xs text-slate-500">
            Hanya digunakan bila status pembayaran Anda belum berubah otomatis setelah 15 menit.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="p-6 rounded-2xl glass-3d-emerald text-center space-y-2 animate-fade-in shadow-sm relative">
          <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
          <p className="text-xs font-black text-slate-900">Bukti Bayar Berhasil Dikirim ke Panitia!</p>
          <p className="text-[11px] text-emerald-900 font-medium">
            Petugas panitia akan memeriksa lampiran transaksi untuk Order ID <strong className="font-mono">{orderId}</strong>.
          </p>
          <button
            onClick={handleReset}
            className="text-[11px] font-bold text-slate-600 hover:text-slate-900 underline pt-1 inline-block"
          >
            Unggah ulang bukti berbeda
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitProof} className="space-y-4 relative">
          
          {/* File Picker / Dropzone */}
          <div className="relative border-2 border-dashed border-slate-200/90 hover:border-indigo-400 rounded-2xl p-6 text-center transition-all glass-3d-base">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            {previewUrl ? (
              <div className="space-y-3">
                <img
                  src={previewUrl}
                  alt="Preview Bukti Bayar"
                  className="max-h-36 mx-auto rounded-xl object-contain border border-slate-200 shadow-md"
                />
                <p className="text-xs font-bold text-slate-900">{selectedFileName}</p>
                <span className="text-[11px] text-indigo-700 font-black block">
                  Klik untuk mengganti berkas gambar
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl glass-3d-violet flex items-center justify-center text-indigo-600">
                  <FileImage className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-700">
                  Tarik gambar atau <span className="text-indigo-600 underline">pilih berkas</span> dari perangkat
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Format yang didukung: JPG, PNG, atau PDF (maksimal 5 MB)
                </p>
              </div>
            )}
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Catatan Pengirim / Nama Pemilik Rekening (Opsional)
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Transfer atas nama Budi Santoso pukul 14.30 WIB"
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedFileName || uploading}
            className="w-full py-3 px-4 rounded-xl text-xs font-black text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md active:scale-98"
          >
            <Send className="w-3.5 h-3.5 text-indigo-300" />
            <span>{uploading ? 'Mengirim Bukti...' : 'Kirim Bukti Pembayaran ke Panitia'}</span>
          </button>

        </form>
      )}

    </div>
  );
};
