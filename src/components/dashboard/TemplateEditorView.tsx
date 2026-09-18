import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Save, 
  CheckCircle2, 
  Eye, 
  Sliders, 
  QrCode, 
  RefreshCw, 
  Image as ImageIcon,
  Check,
  FileCheck,
  Type,
  Download,
  HelpCircle
} from 'lucide-react';
import type { TemplateDokumenItem } from '../../types';
import { GlassDropdown } from '../common/GlassDropdown';

interface TemplateEditorViewProps {
  templates: TemplateDokumenItem[];
  onSaveTemplateLayout?: (templateId: string, layout: TemplateDokumenItem['layoutJson']) => void;
}

interface SampleStudent {
  id: string;
  nama: string;
  sekolah: string;
  nomor: string;
  predikat: string;
  kategori: string;
}

const SAMPLE_STUDENTS: SampleStudent[] = [
  {
    id: 's1',
    nama: 'Contoh Nama Siswa (SMA)',
    sekolah: 'SMA Negeri 1 Prestasi Bangsa',
    nomor: 'GM27-SMA-0001',
    predikat: 'JUARA 1 TINGKAT NASIONAL',
    kategori: 'Olimpiade Matematika SMA/MA/SMK',
  },
  {
    id: 's2',
    nama: 'Contoh Nama Siswa (SMP)',
    sekolah: 'SMP Negeri 1 Unggulan Nasional',
    nomor: 'GM27-SMP-0001',
    predikat: 'JUARA 2 TINGKAT NASIONAL',
    kategori: 'Matematika Terapan SMP/MTs',
  },
  {
    id: 's3',
    nama: 'Contoh Nama Siswa (SD)',
    sekolah: 'SD Negeri 1 Teladan Prima',
    nomor: 'GM27-SD-0001',
    predikat: 'JUARA 3 TINGKAT NASIONAL',
    kategori: 'Matematika Dasar SD/MI',
  },
];

export const TemplateEditorView: React.FC<TemplateEditorViewProps> = ({
  templates,
  onSaveTemplateLayout,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0]?.id || 'tpl-001');
  const [isSavedNotice, setIsSavedNotice] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'real_data' | 'placeholder'>('real_data');
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom uploaded image state per template
  const [customImages, setCustomImages] = useState<Record<string, string>>({
    'tpl-001': templates.find(t => t.id === 'tpl-001')?.fileUrl || 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&auto=format&fit=crop&q=80',
    'tpl-002': templates.find(t => t.id === 'tpl-002')?.fileUrl || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
  });

  const [uploadedFileName, setUploadedFileName] = useState<Record<string, string>>({
    'tpl-001': 'Template-Sertifikat-Juara-Panitia-2027.png',
    'tpl-002': 'Template-Kartu-Ujian-A4-Resmi.jpg',
  });

  const currentTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  const isSertifikat = currentTemplate?.jenis === 'sertifikat';
  const currentStudent = SAMPLE_STUDENTS[selectedStudentIndex];

  // Dynamic field coordinates for the canvas
  const [coords, setCoords] = useState({
    namaY: currentTemplate?.layoutJson.namaPosition.y || (isSertifikat ? 46 : 38),
    sekolahY: currentTemplate?.layoutJson.sekolahPosition.y || (isSertifikat ? 55 : 48),
    nomorY: currentTemplate?.layoutJson.nomorPosition.y || (isSertifikat ? 64 : 58),
    qrX: currentTemplate?.layoutJson.qrPosition.x || (isSertifikat ? 82 : 78),
    qrY: currentTemplate?.layoutJson.qrPosition.y || (isSertifikat ? 78 : 50),
  });

  // Text Styling Options for printed text over the uploaded template
  const [textColor, setTextColor] = useState<'navy' | 'dark' | 'gold' | 'white'>('navy');
  const [nameFontSize, setNameFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Photo Template Upload from Panitia
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Read image as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCustomImages(prev => ({
        ...prev,
        [selectedTemplateId]: dataUrl,
      }));
      setUploadedFileName(prev => ({
        ...prev,
        [selectedTemplateId]: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    const defaultUrl = isSertifikat 
      ? 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80';
    
    setCustomImages(prev => ({
      ...prev,
      [selectedTemplateId]: defaultUrl,
    }));
    setUploadedFileName(prev => ({
      ...prev,
      [selectedTemplateId]: isSertifikat ? 'Template-Default-Sertifikat.png' : 'Template-Default-Kartu.png',
    }));
  };

  const handleSave = () => {
    setIsSavedNotice(true);
    if (onSaveTemplateLayout && currentTemplate) {
      onSaveTemplateLayout(currentTemplate.id, {
        namaPosition: { x: 50, y: coords.namaY, fontSize: nameFontSize === 'xlarge' ? 36 : nameFontSize === 'large' ? 30 : 24 },
        sekolahPosition: { x: 50, y: coords.sekolahY, fontSize: 16 },
        nomorPosition: { x: 50, y: coords.nomorY, fontSize: 14 },
        qrPosition: { x: coords.qrX, y: coords.qrY, size: 90 },
      });
    }
    setTimeout(() => setIsSavedNotice(false), 3500);
  };

  // Test Download Composite Image
  const handleDownloadSimulation = () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = customImages[selectedTemplateId] || currentTemplate.fileUrl;
      img.onload = () => {
        canvas.width = img.naturalWidth || 1920;
        canvas.height = img.naturalHeight || 1080;

        // 1. Draw uploaded background photo
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 2. Setup text alignment & color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const colorHex = textColor === 'white' ? '#ffffff' : textColor === 'gold' ? '#b45309' : textColor === 'navy' ? '#1e1b4b' : '#0f172a';
        ctx.fillStyle = colorHex;

        // 3. Draw Student Name
        const namePx = nameFontSize === 'xlarge' ? Math.round(canvas.height * 0.052) : nameFontSize === 'large' ? Math.round(canvas.height * 0.042) : Math.round(canvas.height * 0.034);
        ctx.font = `bold ${namePx}px 'Outfit', sans-serif`;
        const namaY = (coords.namaY / 100) * canvas.height;
        ctx.fillText(currentStudent.nama, canvas.width / 2, namaY);

        // 4. Draw School
        const schoolPx = Math.round(canvas.height * 0.024);
        ctx.font = `600 ${schoolPx}px 'DM Sans', sans-serif`;
        ctx.globalAlpha = 0.9;
        const sekolahY = (coords.sekolahY / 100) * canvas.height;
        ctx.fillText(currentStudent.sekolah, canvas.width / 2, sekolahY);

        // 5. Draw Number / Title
        const numPx = Math.round(canvas.height * 0.02);
        ctx.font = `bold ${numPx}px monospace`;
        ctx.globalAlpha = 0.85;
        const nomorY = (coords.nomorY / 100) * canvas.height;
        const infoText = isSertifikat ? `${currentStudent.predikat} • ${currentStudent.kategori}` : `NO. PESERTA: ${currentStudent.nomor} • RUANG CBT 01`;
        ctx.fillText(infoText, canvas.width / 2, nomorY);

        // 6. Draw QR Placeholder Box
        const qrSize = Math.round(canvas.height * 0.12);
        const qrCenterPxX = (coords.qrX / 100) * canvas.width;
        const qrCenterPxY = (coords.qrY / 100) * canvas.height;
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 1;
        ctx.fillRect(qrCenterPxX - qrSize / 2, qrCenterPxY - qrSize / 2, qrSize, qrSize);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.strokeRect(qrCenterPxX - qrSize / 2, qrCenterPxY - qrSize / 2, qrSize, qrSize);

        ctx.fillStyle = '#0f172a';
        ctx.font = `bold ${Math.round(qrSize * 0.14)}px monospace`;
        ctx.fillText('QR CODE', qrCenterPxX, qrCenterPxY);

        // Trigger file download
        const a = document.createElement('a');
        a.download = `Simulasi-${isSertifikat ? 'Sertifikat' : 'Kartu-Peserta'}-${currentStudent.nama.replace(/\s+/g, '-')}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
        setIsDownloading(false);
      };
      img.onerror = () => {
        setIsDownloading(false);
        showToast('Gagal memuat template gambar untuk render download. Pastikan gambar valid.');
      };
    } catch {
      setIsDownloading(false);
    }
  };

  // Color mappings for UI preview
  const textColorClasses = {
    dark: 'text-slate-900',
    navy: 'text-indigo-950',
    gold: 'text-amber-900',
    white: 'text-white',
  };

  const currentBgImage = customImages[selectedTemplateId] || currentTemplate.fileUrl;

  return (
    <div className="space-y-6 animate-fade-in text-slate-800">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl glass-3d-elevated border border-slate-200 text-slate-900 text-xs font-bold shadow-xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
      <div className="rounded-3xl glass-3d-dashboard-shell p-6 sm:p-7 space-y-4 shadow-xl shadow-indigo-950/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/90 text-indigo-950 text-xs font-black border border-indigo-300 shadow-2xs">
              <FileCheck className="w-3.5 h-3.5 text-indigo-700" />
              <span>Otomatisasi Cetak Sertifikat & Kartu Ujian</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit'] mt-2 tracking-tight">
              Upload Desain Template Foto Panitia & Atur Koordinat Cetak
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1 font-medium">
              Panitia cukup <strong>mendesain foto template kosongan (tanpa nama)</strong> di Canva, Photoshop, atau Figma, lalu <strong>unggah gambarnya di sini</strong>. Sistem Gebyar Matematika akan <strong>otomatis mencetak identitas peserta dan QR code</strong> tepat pada letak yang ditentukan.
            </p>
          </div>

          {/* Template Document Type Switcher */}
          <div className="flex items-center gap-2 shrink-0 bg-slate-200/60 p-1.5 rounded-2xl border border-white/80 backdrop-blur-md shadow-inner">
            {templates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-['Outfit'] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-indigo-900 font-black shadow-md shadow-slate-900/10'
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                  }`}
                >
                  {tpl.jenis === 'sertifikat' ? '🏆 E-Sertifikat Juara' : '🪪 Kartu Tanda Peserta'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Action Box */}
        <div className="p-4 rounded-2xl glass-3d-card glass-3d-card-indigo flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-600/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-slate-900 truncate font-['Outfit']">
                Foto Template Aktif: <span className="font-mono text-indigo-800 font-bold">{uploadedFileName[selectedTemplateId]}</span>
              </p>
              <p className="text-[11px] text-slate-600 font-medium">
                Mendukung PNG / JPG / WebP resolusi tinggi (Rekomendasi rasio A4: 3508 × 2480 px)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-3d-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Desain Foto Baru</span>
            </button>

            <button
              onClick={handleResetToDefault}
              className="p-2.5 rounded-xl btn-3d-white text-slate-700 hover:text-slate-900 cursor-pointer"
              title="Kembalikan ke Template Default"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Step Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-xs space-y-1 shadow-2xs">
            <span className="font-black text-indigo-900 block font-['Outfit']">1. Desain Bebas di Canva/Photoshop</span>
            <p className="text-slate-600 text-[11px] font-medium">Buat background sertifikat/kartu dengan logo & tanda tangan, kosongkan area nama siswa.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-xs space-y-1 shadow-2xs">
            <span className="font-black text-indigo-900 block font-['Outfit']">2. Upload Template Fotonya</span>
            <p className="text-slate-600 text-[11px] font-medium">Unggah gambar template di atas. Gambar tersebut langsung dijadikan latar cetak dokumen.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/80 text-xs space-y-1 shadow-2xs">
            <span className="font-black text-indigo-900 block font-['Outfit']">3. Sistem Otomatis Cetak Identitas</span>
            <p className="text-slate-600 text-[11px] font-medium">Sistem langsung menempatkan Nama Siswa, Sekolah, Nomor & QR Code secara otomatis.</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Interactive Canvas, Right Adjustment Sliders & Styling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Interactive Canvas Simulator (8 Cols) */}
        <div className="lg:col-span-8 rounded-3xl glass-3d-card p-6 sm:p-7 space-y-4 shadow-xl shadow-slate-900/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-['Outfit']">
                Pratinjau Otomatisasi Cetak di Atas Template Foto
              </h4>
            </div>

            {/* Sample Student Selector & Mode */}
            <div className="flex items-center gap-2">
              {previewMode === 'real_data' && (
                <GlassDropdown
                  value={String(selectedStudentIndex)}
                  onChange={(val) => setSelectedStudentIndex(Number(val))}
                  className="w-52"
                  options={SAMPLE_STUDENTS.map((st, idx) => ({
                    value: String(idx),
                    label: `${st.nama} (${st.nomor.split('-')[1]})`,
                  }))}
                />
              )}

              <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-[11px] font-bold border border-white/80 shadow-inner">
                <button
                  onClick={() => setPreviewMode('real_data')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    previewMode === 'real_data' 
                      ? 'bg-white text-indigo-900 font-black shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                  }`}
                >
                  Data Siswa
                </button>
                <button
                  onClick={() => setPreviewMode('placeholder')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    previewMode === 'placeholder' 
                      ? 'bg-white text-indigo-900 font-black shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 font-bold'
                  }`}
                >
                  Tag Variabel
                </button>
              </div>
            </div>
          </div>

          {/* Canvas Viewport (A4 Ratio) */}
          <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden border-2 border-white/90 bg-slate-900/10 shadow-2xl flex items-center justify-center select-none">
            
            {/* The Panitia's Uploaded Background Design Photo */}
            <img
              src={currentBgImage}
              alt="Desain Template Panitia"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Simulated Watermark frame hairline */}
            <div className="absolute inset-3 rounded-xl border border-black/15 pointer-events-none" />

            {/* System Overlay: Dynamic Student Identifiers Printed Automatically */}
            <div className="relative w-full h-full select-none pointer-events-none">
              
              {/* Field 1: Nama Lengkap Siswa */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 text-center transition-all px-3 py-1"
                style={{ top: `${coords.namaY}%`, transform: 'translate(-50%, -50%)' }}
              >
                <p className={`font-black tracking-tight font-['Outfit'] ${textColorClasses[textColor]} ${
                  nameFontSize === 'xlarge' ? 'text-xl sm:text-3xl drop-shadow-sm' : nameFontSize === 'large' ? 'text-lg sm:text-2xl drop-shadow-sm' : 'text-base sm:text-xl drop-shadow-sm'
                }`}>
                  {previewMode === 'real_data' ? currentStudent.nama : '[ NAMA LENGKAP SISWA PESERTA ]'}
                </p>
                {previewMode === 'placeholder' && (
                  <span className="text-[9px] font-mono text-indigo-900 bg-indigo-100/90 px-2 py-0.5 rounded border border-indigo-300 font-bold shadow-2xs">
                    variable: peserta.nama_lengkap
                  </span>
                )}
              </div>

              {/* Field 2: Asal Satuan Pendidikan / Sekolah */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 text-center transition-all px-3 py-0.5"
                style={{ top: `${coords.sekolahY}%`, transform: 'translate(-50%, -50%)' }}
              >
                <p className={`text-xs sm:text-base font-black ${textColorClasses[textColor]} opacity-95`}>
                  {previewMode === 'real_data' ? currentStudent.sekolah : '[ ASAL SATUAN PENDIDIKAN / SEKOLAH ]'}
                </p>
                {previewMode === 'placeholder' && (
                  <span className="text-[9px] font-mono text-purple-900 bg-purple-100/90 px-2 py-0.5 rounded border border-purple-300 font-bold shadow-2xs">
                    variable: peserta.asal_sekolah
                  </span>
                )}
              </div>

              {/* Field 3: Nomor Peserta / Predikat Juara */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 text-center transition-all px-3 py-0.5"
                style={{ top: `${coords.nomorY}%`, transform: 'translate(-50%, -50%)' }}
              >
                <p className={`text-[11px] sm:text-xs font-mono font-bold ${textColorClasses[textColor]} opacity-90`}>
                  {previewMode === 'real_data' 
                    ? (isSertifikat ? `${currentStudent.predikat} • ${currentStudent.kategori}` : `NO. PESERTA: ${currentStudent.nomor} • RUANG CBT 01`) 
                    : '[ NOMOR REGISTRASI / PREDIKAT JUARA ]'}
                </p>
              </div>

              {/* Field 4: Official QR Code Verification */}
              <div 
                className="absolute p-2 rounded-2xl bg-white/95 shadow-xl border border-white/90 backdrop-blur-sm transition-all flex flex-col items-center justify-center pointer-events-none"
                style={{ 
                  right: `${100 - coords.qrX}%`, 
                  bottom: `${100 - coords.qrY}%`, 
                  transform: 'translate(50%, 50%)' 
                }}
              >
                <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-slate-900" />
                <span className="text-[8px] font-mono font-black text-slate-600 mt-0.5 tracking-wider">VERIFIKASI RESMI</span>
              </div>

            </div>

          </div>

          {/* Canvas Footer Controls & Simulation Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 pt-1 font-medium">
            <span>Standar Lembar: A4 Landscape (High-DPI PDF Generator)</span>
            
            <button
              onClick={handleDownloadSimulation}
              disabled={isDownloading}
              className="btn-3d-white inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-slate-800 cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>{isDownloading ? 'Memproses...' : 'Unduh Contoh Cetak Hasil (PNG)'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Coordinate & Styling Adjustment Controls (4 Cols) */}
        <div className="lg:col-span-4 rounded-3xl glass-3d-card p-6 sm:p-7 space-y-6 shadow-xl shadow-slate-900/5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-black text-slate-900 font-['Outfit']">
                Kalibrasi Posisi Cetak
              </h4>
            </div>
            <span className="text-[10px] font-black text-indigo-900 bg-indigo-100/90 px-2 py-0.5 rounded-md border border-indigo-200">
              Koordinat %
            </span>
          </div>

          {/* Color & Style Settings for the Text */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/70 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-black text-slate-900 font-['Outfit']">
              <Type className="w-3.5 h-3.5 text-indigo-600" />
              <span>Gaya & Warna Teks Cetak:</span>
            </div>

            {/* Text Color Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-600 font-bold">Warna Teks Identitas:</span>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTextColor('navy')}
                  className={`py-1.5 text-[10px] font-black rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    textColor === 'navy' 
                      ? 'bg-indigo-950 text-white border-indigo-950 shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {textColor === 'navy' && <Check className="w-3 h-3" />}
                  <span>Navy</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextColor('dark')}
                  className={`py-1.5 text-[10px] font-black rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    textColor === 'dark' 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {textColor === 'dark' && <Check className="w-3 h-3" />}
                  <span>Hitam</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextColor('gold')}
                  className={`py-1.5 text-[10px] font-black rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    textColor === 'gold' 
                      ? 'bg-amber-800 text-white border-amber-800 shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {textColor === 'gold' && <Check className="w-3 h-3" />}
                  <span>Emas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTextColor('white')}
                  className={`py-1.5 text-[10px] font-black rounded-xl border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    textColor === 'white' 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {textColor === 'white' && <Check className="w-3 h-3" />}
                  <span>Putih</span>
                </button>
              </div>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-slate-600 font-bold">Ukuran Font Nama Siswa:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['normal', 'large', 'xlarge'] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setNameFontSize(sz)}
                    className={`py-1.5 text-[10px] font-black rounded-xl border uppercase transition-all cursor-pointer ${
                      nameFontSize === sz 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sz === 'normal' ? 'Kecil' : sz === 'large' ? 'Sedang' : 'Besar'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Position Sliders */}
          <div className="space-y-4">
            
            {/* Slider 1: Nama Siswa */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-bold text-indigo-900">Posisi Vertikal Nama Siswa:</span>
                <span className="font-mono font-bold text-indigo-900">{coords.namaY}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="70"
                value={coords.namaY}
                onChange={(e) => setCoords({ ...coords, namaY: Number(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 font-medium block">Geser agar pas di atas garis nama pada template foto panitia</span>
            </div>

            {/* Slider 2: Asal Sekolah */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-bold text-purple-900">Posisi Vertikal Asal Sekolah:</span>
                <span className="font-mono font-bold text-purple-900">{coords.sekolahY}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                value={coords.sekolahY}
                onChange={(e) => setCoords({ ...coords, sekolahY: Number(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
              />
            </div>

            {/* Slider 3: Nomor Peserta / Predikat */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-bold text-cyan-900">Posisi Vertikal No. Peserta / Keterangan:</span>
                <span className="font-mono font-bold text-cyan-900">{coords.nomorY}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={coords.nomorY}
                onChange={(e) => setCoords({ ...coords, nomorY: Number(e.target.value) })}
                className="w-full accent-cyan-600 cursor-pointer"
              />
            </div>

            {/* Slider 4: QR Code Coordinates */}
            <div className="space-y-3 pt-3 border-t border-slate-200/60">
              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-bold text-emerald-900">Posisi Horizontal QR Code (X):</span>
                <span className="font-mono font-bold text-emerald-900">{coords.qrX}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={coords.qrX}
                onChange={(e) => setCoords({ ...coords, qrX: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />

              <div className="flex justify-between text-xs text-slate-700">
                <span className="font-bold text-emerald-900">Posisi Vertikal QR Code (Y):</span>
                <span className="font-mono font-bold text-emerald-900">{coords.qrY}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                value={coords.qrY}
                onChange={(e) => setCoords({ ...coords, qrY: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Action Save Button */}
          <div className="pt-4 border-t border-slate-200/60 space-y-2">
            <button
              onClick={handleSave}
              className="btn-3d-primary w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSavedNotice ? 'Template & Koordinat Berhasil Disimpan!' : 'Simpan & Terapkan Desain Template'}</span>
            </button>

            {isSavedNotice && (
              <p className="text-[11px] text-emerald-800 font-black text-center flex items-center justify-center gap-1 animate-fade-in bg-emerald-100/90 py-1.5 px-2 rounded-xl border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Desain foto panitia & koordinat aktif untuk cetak otomatis peserta!</span>
              </p>
            )}

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 justify-center pt-1 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>PDF digenerate otomatis per peserta saat unduh</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
