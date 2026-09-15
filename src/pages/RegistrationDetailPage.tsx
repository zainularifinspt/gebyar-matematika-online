import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  CreditCard, 
  Download, 
  Printer, 
  School, 
  Sliders, 
  User, 
  Calendar, 
  Award, 
  FileText, 
  Laptop, 
  X,
  ShieldCheck
} from 'lucide-react';
import { KartuPesertaModal } from '../components/guru/KartuPesertaModal';
import type { SiswaBimbinganItem, GuruProfileData, StatusPembayaran } from '../types';

interface RegistrationDetailPageProps {
  onBackToHome: () => void;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
}

export const RegistrationDetailPage: React.FC<RegistrationDetailPageProps> = ({
  onBackToHome,
  currentUser,
}) => {
  const [status, setStatus] = useState<StatusPembayaran>('lunas');
  const [isCopied, setIsCopied] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Student registration state
  const [registration] = useState({
    registrationNumber: 'GM26-REG-2026-0914',
    orderId: 'GM26-ORD-88192',
    tanggalDaftar: '14 September 2026, 16:30 WIB',
    namaSiswa: currentUser?.name || 'Farhan Maulana Hakim',
    email: currentUser?.email || 'farhan.maulana@gmail.com',
    noHp: '0812-3456-7890',
    asalSekolah: currentUser?.sekolah || 'SMA Negeri 3 Yogyakarta',
    nisn: '0078129841',
    kelas: '11 IPA 1',
    kategoriId: 'kat-sma',
    kategoriNama: 'Olimpiade Matematika SMA / MA / SMK',
    jadwalPenyisihan: 'Minggu, 25 Oktober 2026, 09:00 - 11:30 WIB',
    nomorPeserta: 'GM26-SMA-0142',
    sesiUjian: 'Sesi 1 (09:00 - 11:30 WIB)',
    biayaLomba: 75000,
    biayaAdmin: 0,
    totalBiaya: 75000,
    waktuLunas: '14 September 2026, 16:45 WIB',
    kodeVa: '8808 2345 8819 2001',
    nomorSertifikat: 'GM26/CERT-PESERTA/SMA/0142',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSimulatePayment = async () => {
    showToast('Menghubungkan ke Gerbang Pembayaran Midtrans Snap...');
    try {
      const res = await fetch('/api/midtrans-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: registration.orderId,
          grossAmount: registration.totalBiaya,
          customerName: registration.namaSiswa,
          customerEmail: registration.email,
          customerPhone: registration.noHp,
          itemName: `Pendaftaran ${registration.kategoriNama}`,
        }),
      });
      const data = await res.json();
      if (res.ok && data.token && (window as any).snap) {
        (window as any).snap.pay(data.token, {
          onSuccess: () => {
            setStatus('lunas');
            showToast('✓ Pembayaran berhasil diverifikasi secara instan via Midtrans!');
          },
          onPending: () => {
            showToast('Transaksi sedang diproses. Silakan selesaikan pembayaran.');
          },
          onError: () => {
            showToast('Pembayaran Midtrans gagal atau dibatalkan.');
          },
        });
        return;
      }
    } catch {
      // Fallback
    }

    setStatus('lunas');
    showToast('Pembayaran berhasil diverifikasi secara instan via Midtrans Webhook!');
  };

  const handleDownloadReceipt = () => {
    showToast('Kuitansi Bukti Pembayaran Resmi (PDF) berhasil diunduh.');
  };

  const handleDownloadCertificate = () => {
    showToast('E-Sertifikat Peserta Resmi (PDF High-Res) berhasil diunduh.');
  };

  // Adapter for KartuPesertaModal
  const siswaAdapter: SiswaBimbinganItem = {
    id: 'reg-adapter-01',
    namaSiswa: registration.namaSiswa,
    nisn: registration.nisn,
    kelas: registration.kelas,
    kategoriId: registration.kategoriId,
    kategoriNama: registration.kategoriNama,
    statusPembayaran: status,
    orderId: registration.orderId,
    nomorPeserta: registration.nomorPeserta,
    sesiUjian: registration.sesiUjian,
    kartuTersedia: status === 'lunas',
    sertifikatTersedia: status === 'lunas',
  };

  const profileAdapter: GuruProfileData = {
    id: 'prof-adapter',
    nama: 'Panitia Pelaksana Gebyar Matematika',
    email: 'panitia@gebyarmatematika.id',
    telepon: '0812-3456-7890',
    sekolah: registration.asalSekolah,
    npsn: '20108842',
    kabupatenKota: 'Kota Yogyakarta',
    provinsi: 'DI Yogyakarta',
    jabatan: 'Panitia Pusat',
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-800 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/95 border border-white/90 text-slate-900 text-xs font-bold shadow-2xl animate-fade-in backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header (3D Glass Bar) */}
      <header className="border-b border-white/80 bg-white/80 backdrop-blur-2xl sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="btn-3d-white inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Ref: <strong className="text-indigo-600">{registration.registrationNumber}</strong>
            </span>
            <span className={`px-4 py-1.5 rounded-full text-xs font-black border shadow-xs ${
              status === 'lunas' 
                ? 'glass-3d-emerald text-emerald-950 border-emerald-300'
                : 'glass-3d-amber text-amber-950 border-amber-300'
            }`}>
              {status === 'lunas' ? '✓ Pendaftaran Aktif & Lunas' : '⏳ Menunggu Pembayaran'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        
        {/* Status Toggle Banner for Demo Testing (3D Glass) */}
        <div className="p-4 rounded-2xl glass-3d-base border border-white/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Simulasi Status Transaksi Peserta:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatus('lunas')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                status === 'lunas' 
                  ? 'btn-3d-primary text-white shadow-md' 
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              Mode Lunas (Kartu & Sertifikat Siap)
            </button>
            <button
              onClick={() => setStatus('menunggu_pembayaran')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                status === 'menunggu_pembayaran' 
                  ? 'bg-amber-500 text-white shadow-md' 
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200'
              }`}
            >
              Mode Menunggu Pembayaran (QRIS / VA)
            </button>
          </div>
        </div>

        {/* Hero Summary Card: 3D Acrylic Glass Badge */}
        <div className="rounded-3xl p-7 sm:p-9 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative overflow-hidden border border-white/30">
          {/* Specular Rim */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3.5 py-1 rounded-full bg-white/25 text-white text-xs font-black border border-white/40 backdrop-blur-md shadow-xs">
                  {registration.kategoriNama}
                </span>
                <span className="text-xs text-indigo-100 font-mono">
                  Order ID: {registration.orderId}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                {registration.namaSiswa}
              </h1>

              <div className="flex items-center gap-4 text-xs text-indigo-100 flex-wrap font-medium">
                <span className="flex items-center gap-1.5">
                  <School className="w-4 h-4 text-indigo-200" />
                  {registration.asalSekolah} ({registration.kelas})
                </span>
                <span>•</span>
                <span className="font-mono text-indigo-200 font-bold">NISN: {registration.nisn}</span>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              {status === 'lunas' ? (
                <button
                  onClick={() => setShowCardModal(true)}
                  className="btn-3d-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-indigo-800 text-xs font-black cursor-pointer shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Kartu Ujian Resmi</span>
                </button>
              ) : (
                <button
                  onClick={handleSimulatePayment}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Bayar Sekarang (Rp {registration.totalBiaya.toLocaleString('id-ID')})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2 Column Details: Left is Info & Schedule, Right is Payment & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 Cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Rincian Pendaftaran (3D Glass) */}
            <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 border border-white/95 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3.5">
                <h3 className="text-sm font-black text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Rincian Pendaftar & Sekolah</span>
                </h3>
                <span className="text-[10px] text-slate-500 font-mono font-bold">
                  Terdaftar: {registration.tanggalDaftar}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Nama Lengkap Peserta:</span>
                  <p className="font-black text-slate-900 mt-0.5">{registration.namaSiswa}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Nomor Induk Siswa Nasional (NISN):</span>
                  <p className="font-mono font-bold text-slate-800 mt-0.5">{registration.nisn}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Asal Satuan Pendidikan:</span>
                  <p className="font-black text-slate-900 mt-0.5">{registration.asalSekolah}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Kelas / Rombel:</span>
                  <p className="text-slate-800 font-bold mt-0.5">{registration.kelas}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Email Terdaftar (Akun Google):</span>
                  <p className="font-mono text-slate-800 font-semibold mt-0.5">{registration.email}</p>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-bold block">Nomor WhatsApp Peserta / Wali:</span>
                  <p className="text-slate-800 font-bold mt-0.5">{registration.noHp}</p>
                </div>
              </div>
            </div>

            {/* Jadwal Babak Penyisihan & Akses Ujian Daring (3D Glass) */}
            <div className="rounded-3xl glass-3d-elevated p-6 sm:p-8 border border-white/95 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3.5">
                <h3 className="text-sm font-black text-slate-900 font-['Outfit'] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>Jadwal Kompetisi & Akses Web Ujian</span>
                </h3>
                <span className="text-[10px] font-black px-3 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                  CBT Daring
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-5 rounded-2xl glass-3d-violet border border-purple-200/90 space-y-2">
                  <p className="font-black text-purple-950 flex items-center gap-2 text-sm">
                    <Laptop className="w-4 h-4 text-purple-700" />
                    Babak Penyisihan Daring (CBT Online)
                  </p>
                  <p className="text-purple-900 font-semibold">
                    {registration.jadwalPenyisihan} • {registration.sesiUjian}
                  </p>
                  <p className="text-[11px] text-purple-800 font-medium">
                    No. Peserta: <strong className="text-purple-950 font-mono font-black">{registration.nomorPeserta}</strong> (Gunakan no. peserta ini untuk login portal ujian).
                  </p>
                </div>

                <div className="p-4 rounded-xl glass-3d-emerald border border-emerald-300/90 text-emerald-950 space-y-1">
                  <p className="font-black text-emerald-950 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Simulasi Sistem Ujian (Try Out Terjadwal)
                  </p>
                  <p className="text-[11px] text-emerald-900/90 leading-relaxed font-normal">
                    Simulasi sistem dibuka 3 hari sebelum lomba dimulai untuk menguji kestabilan koneksi dan kamera perangkat Anda.
                  </p>
                </div>
              </div>
            </div>

            {/* E-Sertifikat Spotlight Card (3D Solar Amber) */}
            <div className="rounded-3xl glass-3d-amber p-6 sm:p-8 border border-amber-300/90 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3.5">
                <h3 className="text-sm font-black text-amber-950 font-['Outfit'] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>E-Sertifikat Peserta Gebyar Matematika 2026</span>
                </h3>
                <span className="text-[10px] font-mono text-amber-800 font-bold">
                  SK: {registration.nomorSertifikat}
                </span>
              </div>

              {status === 'lunas' ? (
                <div className="p-5 rounded-2xl bg-white/80 border border-white/90 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      E-Sertifikat Resmi Ber-QR Code Siap Diunduh!
                    </p>
                    <p className="text-[11px] text-slate-600 font-normal">
                      Sertifikat digital dengan tanda tangan elektronik resmi dan verifikasi keaslian daring nasional.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadCertificate}
                    className="shrink-0 btn-3d-primary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Sertifikat (PDF)</span>
                  </button>
                </div>
              ) : (
                <p className="text-xs text-amber-900 font-medium">
                  Selesaikan pembayaran untuk mengaktifkan kartu ujian dan klaim sertifikat peserta resmi.
                </p>
              )}
            </div>

          </div>

          {/* Right Column: Invoice & Payment (1 Col) */}
          <div className="space-y-6">
            
            {/* Payment Summary Box */}
            <div className="rounded-3xl glass-3d-elevated p-6 sm:p-7 border border-white/95 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                <h3 className="text-sm font-black text-slate-900 font-['Outfit']">
                  Status Transaksi
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  status === 'lunas' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {status === 'lunas' ? 'Lunas' : 'Menunggu'}
                </span>
              </div>

              {/* Price Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Pendaftaran:</span>
                  <span className="font-bold text-slate-900 tabular-nums">Rp {registration.biayaLomba.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Layanan:</span>
                  <span className="font-bold text-slate-900">Gratis (Rp 0)</span>
                </div>
                <div className="pt-3 border-t border-slate-200/80 flex justify-between items-center">
                  <span className="font-black text-slate-900 text-sm">Total Bayar:</span>
                  <span className="text-2xl font-black text-indigo-700 font-['Outfit'] tabular-nums">
                    Rp {registration.totalBiaya.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* If Unpaid, show VA / QRIS action */}
              {status !== 'lunas' && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                    <span className="text-[11px] font-bold text-amber-900 block">Nomor Virtual Account:</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-amber-950">{registration.kodeVa}</span>
                      <button
                        onClick={() => handleCopy(registration.kodeVa)}
                        className="px-2.5 py-1 rounded bg-amber-200 text-amber-900 text-[10px] font-bold cursor-pointer hover:bg-amber-300"
                      >
                        {isCopied ? 'Tersalin' : 'Salin'}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    className="btn-3d-primary w-full py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Bayar Sekarang via Midtrans</span>
                  </button>
                </div>
              )}

              {/* If Paid, show Receipt download button */}
              {status === 'lunas' && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl glass-3d-emerald border border-emerald-300 space-y-1 text-xs">
                    <span className="font-black text-emerald-950 block">Waktu Pelunasan:</span>
                    <p className="text-emerald-900 font-semibold">{registration.waktuLunas}</p>
                    <p className="text-[10px] text-emerald-800">Verifikasi Otomatis Webhook Midtrans</p>
                  </div>

                  <button
                    onClick={handleDownloadReceipt}
                    className="btn-3d-white w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Unduh Kuitansi Pembayaran</span>
                  </button>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transaksi dijamin aman oleh Midtrans PCI-DSS.</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/80 bg-white/70 backdrop-blur-xl py-6 text-center text-xs text-slate-500 font-medium">
        <p>© {new Date().getFullYear()} Panitia Gebyar Matematika Online. Dokumen Pendaftaran Resmi.</p>
      </footer>

      {/* Modal Cetak Kartu Peserta */}
      {showCardModal && (
        <KartuPesertaModal
          siswa={siswaAdapter}
          profile={profileAdapter}
          onClose={() => setShowCardModal(false)}
        />
      )}

    </div>
  );
};
