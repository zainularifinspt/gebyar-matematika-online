import React, { useState } from 'react';
import { GuruHeader } from '../components/guru/GuruHeader';
import { GuruNavigation, type GuruTabType } from '../components/guru/GuruNavigation';
import { GuruOverviewTab } from '../components/guru/GuruOverviewTab';
import { GuruSiswaTab } from '../components/guru/GuruSiswaTab';
import { GuruPendaftaranKolektifTab } from '../components/guru/GuruPendaftaranKolektifTab';
import { GuruTagihanTab } from '../components/guru/GuruTagihanTab';
import { GuruSertifikatTab } from '../components/guru/GuruSertifikatTab';
import { GuruProfilSekolahTab } from '../components/guru/GuruProfilSekolahTab';
import { GuruRiwayatPendaftaranTab } from '../components/guru/GuruRiwayatPendaftaranTab';
import { KartuPesertaModal } from '../components/guru/KartuPesertaModal';

import { 
  MOCK_GURU_PROFILE, 
  MOCK_SISWA_BIMBINGAN, 
  MOCK_TAGIHAN_KOLEKTIF,
  MOCK_BATCH_PENDAFTARAN
} from '../data/mockData';
import type { SiswaBimbinganItem, TagihanKolektifItem, GuruProfileData, BatchPendaftaranItem } from '../types';

interface GuruAccountPageProps {
  onBackToHome: () => void;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
}

export const GuruAccountPage: React.FC<GuruAccountPageProps> = ({
  onBackToHome,
  currentUser,
}) => {
  const [profile, setProfile] = useState<GuruProfileData>({
    ...MOCK_GURU_PROFILE,
    nama: currentUser?.name || MOCK_GURU_PROFILE.nama,
    email: currentUser?.email || MOCK_GURU_PROFILE.email,
    sekolah: currentUser?.sekolah || MOCK_GURU_PROFILE.sekolah,
  });

  const [siswaList, setSiswaList] = useState<SiswaBimbinganItem[]>(MOCK_SISWA_BIMBINGAN);
  const [tagihanList, setTagihanList] = useState<TagihanKolektifItem[]>(MOCK_TAGIHAN_KOLEKTIF);
  const [batches, setBatches] = useState<BatchPendaftaranItem[]>(MOCK_BATCH_PENDAFTARAN);
  const [activeTab, setActiveTab] = useState<GuruTabType>('ringkasan');
  const [selectedSiswaForCard, setSelectedSiswaForCard] = useState<SiswaBimbinganItem | null>(null);

  // When teacher registers students in bulk
  const handleSuccessRegister = (newStudents: SiswaBimbinganItem[]) => {
    setSiswaList(prev => [...prev, ...newStudents]);

    // Generate matching collective invoice
    const orderId = newStudents[0]?.orderId || `GM27-KOL-${Math.floor(10000 + Math.random() * 90000)}`;
    const totalBiaya = newStudents.length * 65000 - (newStudents.length >= 3 ? newStudents.length * 5000 : 0);

    const newInvoice: TagihanKolektifItem = {
      id: `inv-kol-${Date.now()}`,
      orderId: orderId,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', 10:00 WIB',
      jumlahSiswa: newStudents.length,
      totalBiaya: totalBiaya,
      status: 'menunggu_pembayaran',
      metode: 'QRIS',
      rincianSiswa: newStudents.map(s => `${s.namaSiswa} (${s.kelas})`),
    };

    setTagihanList(prev => [newInvoice, ...prev]);

    // Also create registration batch record
    const newBatch: BatchPendaftaranItem = {
      id: `batch-${Date.now()}`,
      batchCode: `GM27-BATCH-0${batches.length + 1}`,
      orderId: orderId,
      gelombang: 'Gelombang 1 (Early Bird)',
      tanggalDaftar: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ', 10:00 WIB',
      jumlahPeserta: newStudents.length,
      peserta: newStudents.map(s => ({
        nama: s.namaSiswa,
        nisn: s.nisn,
        kelas: s.kelas,
        kategori: s.kategoriNama,
        biaya: 65000,
      })),
      subtotal: newStudents.length * 65000,
      diskonKolektif: newStudents.length >= 3 ? newStudents.length * 5000 : 0,
      totalBiaya: totalBiaya,
      status: 'menunggu_pembayaran',
      metode: 'QRIS',
      berkasPendaftaranUrl: 'https://example.com/docs/faktur-baru.pdf',
    };
    setBatches(prev => [newBatch, ...prev]);
  };

  // When an invoice is simulated as paid automatically
  const handleMarkInvoicePaid = (orderId: string) => {
    setTagihanList(prev => prev.map(inv => 
      inv.orderId === orderId ? { ...inv, status: 'lunas' } : inv
    ));

    // Also update batch status
    setBatches(prev => prev.map(b => 
      b.orderId === orderId ? { ...b, status: 'lunas' } : b
    ));

    // Update matching students to lunas and issue exam card
    setSiswaList(prev => prev.map((siswa, idx) => {
      if (siswa.orderId === orderId) {
        return {
          ...siswa,
          statusPembayaran: 'lunas',
          nomorPeserta: `GM27-SMP-0${100 + idx}`,
          sesiUjian: 'Sesi 2 (13:00 - 15:00 WIB)',
          kartuTersedia: true,
          sertifikatTersedia: true,
        };
      }
      return siswa;
    }));
  };

  const pendingInvoices = tagihanList.filter(t => t.status === 'menunggu_pembayaran');

  return (
    <div className="min-h-screen light-mesh-bg text-slate-800 flex flex-col justify-between relative overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* Guru Header */}
      <GuruHeader
        profile={profile}
        onBackToHome={onBackToHome}
        onLogout={onBackToHome}
      />

      {/* Guru Navigation Bar */}
      <GuruNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        siswaCount={siswaList.length}
        pendingInvoiceCount={pendingInvoices.length}
      />

      {/* Main Tab Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {activeTab === 'ringkasan' && (
          <GuruOverviewTab
            profile={profile}
            siswaList={siswaList}
            tagihanList={tagihanList}
            onNavigateTab={setActiveTab}
            onOpenCardModal={setSelectedSiswaForCard}
          />
        )}

        {activeTab === 'siswa' && (
          <GuruSiswaTab
            siswaList={siswaList}
            onOpenCardModal={setSelectedSiswaForCard}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'daftar' && (
          <GuruPendaftaranKolektifTab
            onSuccessRegister={handleSuccessRegister}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'riwayat' && (
          <GuruRiwayatPendaftaranTab
            batches={batches}
            profile={profile}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'tagihan' && (
          <GuruTagihanTab
            tagihanList={tagihanList}
            onMarkInvoicePaid={handleMarkInvoicePaid}
          />
        )}

        {activeTab === 'sertifikat' && (
          <GuruSertifikatTab
            profile={profile}
            siswaList={siswaList}
          />
        )}

        {activeTab === 'profil' && (
          <GuruProfilSekolahTab
            profile={profile}
            onSaveProfile={(updated) => setProfile(updated)}
          />
        )}
      </main>

      {/* Modal Kartu Peserta */}
      <KartuPesertaModal
        siswa={selectedSiswaForCard}
        profile={profile}
        onClose={() => setSelectedSiswaForCard(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/60 py-6 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Panitia Gebyar Matematika Nasional. Sistem Terintegrasi Pembimbing Sekolah.</p>
        </div>
      </footer>

    </div>
  );
};
