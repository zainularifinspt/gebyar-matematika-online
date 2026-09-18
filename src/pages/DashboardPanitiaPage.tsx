import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import type { DashboardTab } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardOverviewView } from '../components/dashboard/DashboardOverviewView';
import { PesertaTableView } from '../components/dashboard/PesertaTableView';
import { NilaiUjianView } from '../components/dashboard/NilaiUjianView';
import { TemplateEditorView } from '../components/dashboard/TemplateEditorView';
import { KelolaPanitiaView } from '../components/dashboard/KelolaPanitiaView';
import { KontenPublikView } from '../components/dashboard/KontenPublikView';
import { 
  MOCK_NILAI_UJIAN 
} from '../data/mockData';
import { 
  useStoredPeserta, 
  useStoredNilai, 
  useStoredTemplates, 
  downloadAsCsv 
} from '../utils/storage';
import type { TemplateDokumenItem } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface DashboardPanitiaPageProps {
  onExitDashboard: () => void;
  currentUser?: { name: string; email: string; role: string; sekolah?: string } | null;
}

export const DashboardPanitiaPage: React.FC<DashboardPanitiaPageProps> = ({
  onExitDashboard,
  currentUser: initialUser,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const userProfile = {
    name: initialUser?.name || 'M. Zainul Arifin',
    email: initialUser?.email || 'mzainul.arifin@ulm.ac.id',
    role: initialUser?.role || 'Super Admin',
  };

  // Persistent reactive state
  const [pesertaList, setPesertaList] = useStoredPeserta();
  const [nilaiList, setNilaiList] = useStoredNilai();
  const [templates, setTemplates] = useStoredTemplates();

  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportCsv = () => {
    if (pesertaList.length === 0) {
      showToast('Belum ada data pendaftar untuk diekspor.');
      return;
    }
    const filename = `rekap-peserta-gebyar-matematika-${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = [
      'ID Registrasi',
      'Nama Siswa',
      'Kelas',
      'Asal Sekolah',
      'Kota / Kab',
      'Kategori Lomba',
      'Nama Pendaftar',
      'Email Pendaftar',
      'Status Pembayaran',
      'Kartu Terbit',
      'Tanggal Daftar'
    ];
    const rows = pesertaList.map(p => [
      p.id,
      p.namaSiswa,
      p.kelas,
      p.asalSekolah,
      p.kota,
      p.kategoriNama,
      p.namaPendaftar,
      p.emailPendaftar,
      p.statusPembayaran.toUpperCase(),
      p.kartuTercetak ? 'SUDAH TERBIT' : 'MENUNGGU VERIFIKASI',
      p.tanggalDaftar
    ]);

    downloadAsCsv(filename, headers, rows);
    showToast(`✓ Berhasil mengunduh rekap ${pesertaList.length} data pendaftar (${filename})!`);
  };

  const handleSyncCbtScores = () => {
    setIsSyncing(true);
    showToast('Menghubungkan ke Web Ujian CBT & Mengunduh Berkas Nilai...');

    setTimeout(() => {
      setIsSyncing(false);
      // Sync fresh scores from CBT test server
      setNilaiList([...MOCK_NILAI_UJIAN]);
      showToast(`✓ Sinkronisasi Berhasil! ${MOCK_NILAI_UJIAN.length} data skor ujian CBT peserta telah dimutakhirkan.`);
    }, 1100);
  };

  const handleManualVerify = (id: string) => {
    const updated = pesertaList.map(p => 
      p.id === id ? { ...p, statusPembayaran: 'lunas' as const, kartuTercetak: true } : p
    );
    setPesertaList(updated);
    showToast('✓ Status pembayaran berhasil diverifikasi manual oleh Panitia. Kartu ujian otomatis terbit.');
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-900 p-4 sm:p-6 lg:p-8 relative overflow-x-clip font-['Plus_Jakarta_Sans']">
      
      {/* Toast Notification (3D Glass Elevated) */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl glass-3d-elevated border border-white/90 text-slate-900 text-xs font-bold shadow-2xl animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sidebar */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onExitDashboard={onExitDashboard}
          currentUser={userProfile}
          pesertaCount={pesertaList.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 w-full space-y-6">
          
          {/* Header */}
          <DashboardHeader
            activeTab={activeTab}
            onExportData={handleExportCsv}
            onSyncCbtScores={handleSyncCbtScores}
            isSyncing={isSyncing}
            currentUser={userProfile}
          />

          {/* Active Tab View */}
          {activeTab === 'overview' && (
            <DashboardOverviewView
              pesertaList={pesertaList}
              nilaiList={nilaiList}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {(activeTab === 'peserta' || activeTab === 'pembayaran') && (
            <PesertaTableView
              pesertaList={pesertaList}
              onManualVerify={handleManualVerify}
              onExportCsv={handleExportCsv}
            />
          )}

          {activeTab === 'nilai' && (
            <NilaiUjianView
              nilaiList={nilaiList}
              onSyncScores={handleSyncCbtScores}
              isSyncing={isSyncing}
            />
          )}

          {activeTab === 'template' && (
            <TemplateEditorView
              templates={templates}
              onSaveTemplateLayout={(tplId, layout) => {
                setTemplates(
                  templates.map((t: TemplateDokumenItem) => t.id === tplId ? { ...t, layoutJson: layout } : t)
                );
                showToast('✓ Layout template dokumen berhasil diperbarui!');
              }}
            />
          )}

          {activeTab === 'panitia_mgmt' && (
            <KelolaPanitiaView />
          )}

          {activeTab === 'konten' && (
            <KontenPublikView onShowToast={(msg) => showToast(msg)} />
          )}

        </div>

      </div>

    </div>
  );
};
