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
  MOCK_PESERTA_ADMIN, 
  MOCK_NILAI_UJIAN, 
  MOCK_TEMPLATE_DOKUMEN 
} from '../data/mockData';
import type { PesertaAdminItem, NilaiUjianItem, TemplateDokumenItem } from '../types';
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
  const [pesertaList, setPesertaList] = useState<PesertaAdminItem[]>(MOCK_PESERTA_ADMIN);
  const [nilaiList, setNilaiList] = useState<NilaiUjianItem[]>(MOCK_NILAI_UJIAN);
  const [templates, setTemplates] = useState<TemplateDokumenItem[]>(MOCK_TEMPLATE_DOKUMEN);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportCsv = () => {
    showToast(`Mengekspor rekap pendaftar (${pesertaList.length} data) ke format Excel/CSV...`);
  };

  const handleSyncCbtScores = () => {
    setIsSyncing(true);
    showToast('Menghubungkan ke Internal API Web Ujian...');

    setTimeout(() => {
      setIsSyncing(false);
      setNilaiList(prev => [...prev]);
      showToast('✓ Sinkronisasi Nilai CBT Berhasil! Data nilai penjurian telah diperbarui.');
    }, 1200);
  };

  const handleManualVerify = (id: string) => {
    setPesertaList(prev => 
      prev.map(p => p.id === id ? { ...p, statusPembayaran: 'lunas', kartuTercetak: true } : p)
    );
    showToast('✓ Status pembayaran berhasil diverifikasi manual oleh Panitia.');
  };

  return (
    <div className="min-h-screen light-mesh-bg text-slate-900 p-4 sm:p-6 lg:p-8 relative overflow-x-clip">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 text-slate-900 text-xs font-semibold shadow-xl animate-fade-in backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
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
                setTemplates(prev => 
                  prev.map(t => t.id === tplId ? { ...t, layoutJson: layout } : t)
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
