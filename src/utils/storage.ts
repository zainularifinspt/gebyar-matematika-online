import { useState, useEffect } from 'react';
import type { 
  Pengumuman, 
  VideoKegiatan, 
  ArsipSoal, 
  PesertaAdminItem, 
  NilaiUjianItem, 
  TemplateDokumenItem 
} from '../types';
import { 
  MOCK_PENGUMUMAN, 
  MOCK_VIDEOS, 
  MOCK_ARSIP_SOAL, 
  MOCK_TEMPLATE_DOKUMEN,
  MOCK_PANITIA,
  type PanitiaMember
} from '../data/mockData';

// LocalStorage Keys
const KEYS = {
  PENGUMUMAN: 'gm_pengumuman_v2',
  VIDEOS: 'gm_videos_v2',
  ARSIP: 'gm_arsip_soal_v2',
  PESERTA: 'gm_peserta_admin_v2',
  NILAI: 'gm_nilai_ujian_v2',
  TEMPLATES: 'gm_templates_v2',
  PANITIA: 'gm_panitia_v2',
} as const;

// Custom Event Name for real-time reactive sync across components
const STORAGE_EVENT = 'gm_reactive_storage_update';

function notifyStorageChange(key: string, data: unknown) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key, data } }));
  }
}

// ----------------------------------------------------
// PENGUMUMAN STORAGE
// ----------------------------------------------------
export function getStoredPengumuman(): Pengumuman[] {
  if (typeof window === 'undefined') return MOCK_PENGUMUMAN;
  try {
    const raw = localStorage.getItem(KEYS.PENGUMUMAN);
    if (!raw) {
      localStorage.setItem(KEYS.PENGUMUMAN, JSON.stringify(MOCK_PENGUMUMAN));
      return MOCK_PENGUMUMAN;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_PENGUMUMAN;
  } catch {
    return MOCK_PENGUMUMAN;
  }
}

export function saveStoredPengumuman(list: Pengumuman[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.PENGUMUMAN, JSON.stringify(list));
    notifyStorageChange(KEYS.PENGUMUMAN, list);
  } catch (e) {
    console.error('Error saving pengumuman:', e);
  }
}

export function addStoredPengumuman(ann: Pengumuman): Pengumuman[] {
  const current = getStoredPengumuman();
  const updated = [ann, ...current.filter(p => p.id !== ann.id)];
  saveStoredPengumuman(updated);
  return updated;
}

export function updateStoredPengumuman(ann: Pengumuman): Pengumuman[] {
  const current = getStoredPengumuman();
  const updated = current.map(p => p.id === ann.id ? ann : p);
  saveStoredPengumuman(updated);
  return updated;
}

export function deleteStoredPengumuman(id: string): Pengumuman[] {
  const current = getStoredPengumuman();
  const updated = current.filter(p => p.id !== id);
  saveStoredPengumuman(updated);
  return updated;
}

export function useStoredPengumuman(): [Pengumuman[], (list: Pengumuman[]) => void] {
  const [data, setData] = useState<Pengumuman[]>(getStoredPengumuman);

  useEffect(() => {
    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; data: Pengumuman[] }>;
      if (customEvent.detail && customEvent.detail.key === KEYS.PENGUMUMAN) {
        setData(customEvent.detail.data);
      }
    };

    const handleWindowStorage = (e: StorageEvent) => {
      if (e.key === KEYS.PENGUMUMAN && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {
          // fallback
        }
      }
    };

    window.addEventListener(STORAGE_EVENT, handleStorageUpdate);
    window.addEventListener('storage', handleWindowStorage);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleStorageUpdate);
      window.removeEventListener('storage', handleWindowStorage);
    };
  }, []);

  return [data, saveStoredPengumuman];
}

// ----------------------------------------------------
// VIDEOS STORAGE
// ----------------------------------------------------
export function getStoredVideos(): VideoKegiatan[] {
  if (typeof window === 'undefined') return MOCK_VIDEOS;
  try {
    const raw = localStorage.getItem(KEYS.VIDEOS);
    if (!raw) {
      localStorage.setItem(KEYS.VIDEOS, JSON.stringify(MOCK_VIDEOS));
      return MOCK_VIDEOS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_VIDEOS;
  } catch {
    return MOCK_VIDEOS;
  }
}

export function saveStoredVideos(list: VideoKegiatan[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.VIDEOS, JSON.stringify(list));
    notifyStorageChange(KEYS.VIDEOS, list);
  } catch (e) {
    console.error('Error saving videos:', e);
  }
}

export function useStoredVideos(): [VideoKegiatan[], (list: VideoKegiatan[]) => void] {
  const [data, setData] = useState<VideoKegiatan[]>(getStoredVideos);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: VideoKegiatan[] }>;
      if (ce.detail?.key === KEYS.VIDEOS) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredVideos];
}

// ----------------------------------------------------
// ARSIP SOAL STORAGE
// ----------------------------------------------------
export function getStoredArsipSoal(): ArsipSoal[] {
  if (typeof window === 'undefined') return MOCK_ARSIP_SOAL;
  try {
    const raw = localStorage.getItem(KEYS.ARSIP);
    if (!raw) {
      localStorage.setItem(KEYS.ARSIP, JSON.stringify(MOCK_ARSIP_SOAL));
      return MOCK_ARSIP_SOAL;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_ARSIP_SOAL;
  } catch {
    return MOCK_ARSIP_SOAL;
  }
}

export function saveStoredArsipSoal(list: ArsipSoal[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.ARSIP, JSON.stringify(list));
    notifyStorageChange(KEYS.ARSIP, list);
  } catch (e) {
    console.error('Error saving arsip soal:', e);
  }
}

export function useStoredArsipSoal(): [ArsipSoal[], (list: ArsipSoal[]) => void] {
  const [data, setData] = useState<ArsipSoal[]>(getStoredArsipSoal);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: ArsipSoal[] }>;
      if (ce.detail?.key === KEYS.ARSIP) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredArsipSoal];
}

// ----------------------------------------------------
// PESERTA ADMIN STORAGE
// ----------------------------------------------------
export function getStoredPeserta(): PesertaAdminItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.PESERTA);
    if (!raw) {
      localStorage.setItem(KEYS.PESERTA, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge old mock data if present
      const clean = parsed.filter(p => !p.id.startsWith('adm-p-'));
      if (clean.length !== parsed.length) {
        localStorage.setItem(KEYS.PESERTA, JSON.stringify(clean));
      }
      return clean;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveStoredPeserta(list: PesertaAdminItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.PESERTA, JSON.stringify(list));
    notifyStorageChange(KEYS.PESERTA, list);
  } catch (e) {
    console.error('Error saving peserta:', e);
  }
}

export function verifyPesertaManual(id: string): PesertaAdminItem[] {
  const current = getStoredPeserta();
  const updated = current.map(p => 
    p.id === id ? { ...p, statusPembayaran: 'lunas' as const, kartuTercetak: true } : p
  );
  saveStoredPeserta(updated);
  return updated;
}

export function useStoredPeserta(): [PesertaAdminItem[], (list: PesertaAdminItem[]) => void] {
  const [data, setData] = useState<PesertaAdminItem[]>(getStoredPeserta);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: PesertaAdminItem[] }>;
      if (ce.detail?.key === KEYS.PESERTA) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredPeserta];
}

// ----------------------------------------------------
// NILAI CBT STORAGE
// ----------------------------------------------------
export function getStoredNilai(): NilaiUjianItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEYS.NILAI);
    if (!raw) {
      localStorage.setItem(KEYS.NILAI, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Purge old mock scores if present
      const clean = parsed.filter(n => !n.id.startsWith('sc-00'));
      if (clean.length !== parsed.length) {
        localStorage.setItem(KEYS.NILAI, JSON.stringify(clean));
      }
      return clean;
    }
    return [];
  } catch {
    return [];
  }
}

export function saveStoredNilai(list: NilaiUjianItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.NILAI, JSON.stringify(list));
    notifyStorageChange(KEYS.NILAI, list);
  } catch (e) {
    console.error('Error saving nilai:', e);
  }
}

export function useStoredNilai(): [NilaiUjianItem[], (list: NilaiUjianItem[]) => void] {
  const [data, setData] = useState<NilaiUjianItem[]>(getStoredNilai);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: NilaiUjianItem[] }>;
      if (ce.detail?.key === KEYS.NILAI) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredNilai];
}

// ----------------------------------------------------
// PANITIA STORAGE
// ----------------------------------------------------
export function getStoredPanitia(): PanitiaMember[] {
  if (typeof window === 'undefined') return MOCK_PANITIA;
  try {
    const raw = localStorage.getItem(KEYS.PANITIA);
    let list: PanitiaMember[] = MOCK_PANITIA;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    }

    // Ensure zainularifin9195@gmail.com is always present as Super Admin
    const hasZainul = list.some(p => p.email.toLowerCase() === 'zainularifin9195@gmail.com');
    if (!hasZainul) {
      list = [
        {
          id: 'panitia-root-1',
          nama: 'M. Zainul Arifin',
          email: 'zainularifin9195@gmail.com',
          username: 'zainularifin9195',
          divisi: 'IT & Infrastruktur',
          role: 'Super Admin',
          status: 'aktif',
          terakhirLogin: 'Online Sekarang',
        },
        ...list,
      ];
      localStorage.setItem(KEYS.PANITIA, JSON.stringify(list));
    }

    return list;
  } catch {
    return MOCK_PANITIA;
  }
}

export function saveStoredPanitia(list: PanitiaMember[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.PANITIA, JSON.stringify(list));
    notifyStorageChange(KEYS.PANITIA, list);
  } catch (e) {
    console.error('Error saving panitia:', e);
  }
}

export function useStoredPanitia(): [PanitiaMember[], (list: PanitiaMember[]) => void] {
  const [data, setData] = useState<PanitiaMember[]>(getStoredPanitia);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: PanitiaMember[] }>;
      if (ce.detail?.key === KEYS.PANITIA) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredPanitia];
}

// ----------------------------------------------------
// TEMPLATES STORAGE
// ----------------------------------------------------
export function getStoredTemplates(): TemplateDokumenItem[] {
  if (typeof window === 'undefined') return MOCK_TEMPLATE_DOKUMEN;
  try {
    const raw = localStorage.getItem(KEYS.TEMPLATES);
    if (!raw) {
      localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(MOCK_TEMPLATE_DOKUMEN));
      return MOCK_TEMPLATE_DOKUMEN;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_TEMPLATE_DOKUMEN;
  } catch {
    return MOCK_TEMPLATE_DOKUMEN;
  }
}

export function saveStoredTemplates(list: TemplateDokumenItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEYS.TEMPLATES, JSON.stringify(list));
    notifyStorageChange(KEYS.TEMPLATES, list);
  } catch (e) {
    console.error('Error saving templates:', e);
  }
}

export function useStoredTemplates(): [TemplateDokumenItem[], (list: TemplateDokumenItem[]) => void] {
  const [data, setData] = useState<TemplateDokumenItem[]>(getStoredTemplates);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: TemplateDokumenItem[] }>;
      if (ce.detail?.key === KEYS.TEMPLATES) {
        setData(ce.detail.data);
      }
    };
    window.addEventListener(STORAGE_EVENT, handleUpdate);
    return () => window.removeEventListener(STORAGE_EVENT, handleUpdate);
  }, []);

  return [data, saveStoredTemplates];
}

// ----------------------------------------------------
// REAL CSV FILE EXPORT HELPER
// ----------------------------------------------------
export function downloadAsCsv(filename: string, headers: string[], rows: (string | number)[][]): void {
  if (typeof window === 'undefined') return;

  const escapeCell = (cell: string | number) => {
    const str = String(cell ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = [
    headers.map(escapeCell).join(','),
    ...rows.map(row => row.map(escapeCell).join(','))
  ].join('\r\n');

  // Add UTF-8 BOM so Microsoft Excel renders Indonesian characters perfectly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
