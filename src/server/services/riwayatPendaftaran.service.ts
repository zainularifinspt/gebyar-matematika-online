/**
 * Riwayat Pendaftaran Service - Manajemen Data Pendaftaran Kolektif Akun Guru
 * Gebyar Matematika Online 2026
 */

import type { BatchPendaftaranItem, PesertaBatchItem, StatusPembayaran, MetodePembayaran } from '../../types/index.ts';

export interface CreateBatchPayload {
  gelombang?: 'Gelombang 1 (Early Bird)' | 'Gelombang 2 (Reguler)';
  metode?: MetodePembayaran;
  peserta: Array<{
    nama: string;
    nisn: string;
    kelas: string;
    kategori: string;
    biaya: number;
  }>;
}

export interface GuruPendaftaranSummary {
  totalBatch: number;
  totalSiswa: number;
  totalBiaya: number;
  totalDiskon: number;
  totalLunas: number;
  totalMenunggu: number;
}

export interface StoredBatchRecord extends BatchPendaftaranItem {
  guruId: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory store untuk riwayat pendaftaran per akun guru
export const DB_BATCH_PENDAFTARAN_STORE: Map<string, StoredBatchRecord> = new Map();

/**
 * Mengambil daftar pendaftaran batch milik seorang guru dengan filter & pencarian
 */
export function getBatchesByGuru(
  guruId: string,
  options?: { status?: string; search?: string }
): BatchPendaftaranItem[] {
  let list = Array.from(DB_BATCH_PENDAFTARAN_STORE.values()).filter(
    (b) => b.guruId === guruId
  );

  // Filter berdasarkan status pembayaran
  if (options?.status && options.status !== 'semua') {
    list = list.filter((b) => b.status === options.status);
  }

  // Pencarian
  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.batchCode.toLowerCase().includes(q) ||
        b.orderId.toLowerCase().includes(q) ||
        b.peserta.some((p) => p.nama.toLowerCase().includes(q) || p.nisn.includes(q))
    );
  }

  // Urutkan dari yang terbaru
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Mengambil detail batch pendaftaran berdasarkan ID atau Kode Batch
 */
export function getBatchDetail(
  identifier: string,
  guruId?: string
): BatchPendaftaranItem | null {
  for (const batch of DB_BATCH_PENDAFTARAN_STORE.values()) {
    if (batch.id === identifier || batch.batchCode === identifier || batch.orderId === identifier) {
      if (guruId && batch.guruId !== guruId) {
        return null; // Tidak berhak mengakses batch akun lain
      }
      return batch;
    }
  }
  return null;
}

/**
 * Membuat pendaftaran batch baru untuk akun guru
 */
export function createBatchPendaftaran(
  guruId: string,
  payload: CreateBatchPayload
): BatchPendaftaranItem {
  if (!payload.peserta || payload.peserta.length === 0) {
    throw new Error('Pendaftaran harus menyertakan minimal 1 peserta siswa.');
  }

  const existingCount = Array.from(DB_BATCH_PENDAFTARAN_STORE.values()).filter(
    (b) => b.guruId === guruId
  ).length;

  const batchIndex = existingCount + 1;
  const batchId = `batch-${Date.now()}`;
  const batchCode = `GM26-BATCH-${String(batchIndex).padStart(2, '0')}`;
  const orderId = `GM26-KOL-${Math.floor(10000 + Math.random() * 90000)}`;

  const subtotal = payload.peserta.reduce((sum, p) => sum + p.biaya, 0);
  
  // Diskon kolektif: Rp 20.000 untuk setiap 4 siswa
  const diskonKolektif = payload.peserta.length >= 4 
    ? Math.floor(payload.peserta.length / 4) * 20000 
    : 0;

  const totalBiaya = Math.max(0, subtotal - diskonKolektif);
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + `, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

  const pesertaList: PesertaBatchItem[] = payload.peserta.map((p) => ({
    nama: p.nama.trim(),
    nisn: p.nisn.trim(),
    kelas: p.kelas.trim(),
    kategori: p.kategori.trim(),
    biaya: p.biaya,
  }));

  const newRecord: StoredBatchRecord = {
    id: batchId,
    guruId,
    batchCode,
    orderId,
    gelombang: payload.gelombang || 'Gelombang 1 (Early Bird)',
    tanggalDaftar: dateFormatted,
    jumlahPeserta: pesertaList.length,
    peserta: pesertaList,
    subtotal,
    diskonKolektif,
    totalBiaya,
    status: 'menunggu_pembayaran',
    metode: payload.metode || 'QRIS',
    berkasPendaftaranUrl: `https://example.com/docs/faktur-${batchCode.toLowerCase()}.pdf`,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  DB_BATCH_PENDAFTARAN_STORE.set(batchId, newRecord);
  return newRecord;
}

/**
 * Memperbarui status pembayaran batch pendaftaran
 */
export function updateBatchStatus(
  batchId: string,
  status: StatusPembayaran,
  guruId?: string
): BatchPendaftaranItem {
  const batch = DB_BATCH_PENDAFTARAN_STORE.get(batchId);
  if (!batch) {
    throw new Error(`Batch dengan ID ${batchId} tidak ditemukan.`);
  }

  if (guruId && batch.guruId !== guruId) {
    throw new Error('Anda tidak memiliki izin mengubah pendaftaran akun lain.');
  }

  const updated: StoredBatchRecord = {
    ...batch,
    status,
    updatedAt: new Date().toISOString(),
  };

  DB_BATCH_PENDAFTARAN_STORE.set(batchId, updated);
  return updated;
}

/**
 * Menghitung ringkasan statistik pendaftaran guru
 */
export function getGuruPendaftaranSummary(guruId: string): GuruPendaftaranSummary {
  const list = Array.from(DB_BATCH_PENDAFTARAN_STORE.values()).filter(
    (b) => b.guruId === guruId
  );

  let totalSiswa = 0;
  let totalBiaya = 0;
  let totalDiskon = 0;
  let totalLunas = 0;
  let totalMenunggu = 0;

  for (const b of list) {
    totalSiswa += b.jumlahPeserta;
    totalBiaya += b.totalBiaya;
    totalDiskon += b.diskonKolektif;
    if (b.status === 'lunas') {
      totalLunas++;
    } else if (b.status === 'menunggu_pembayaran') {
      totalMenunggu++;
    }
  }

  return {
    totalBatch: list.length,
    totalSiswa,
    totalBiaya,
    totalDiskon,
    totalLunas,
    totalMenunggu,
  };
}
