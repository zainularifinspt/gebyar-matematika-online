/**
 * Riwayat Pendaftaran Routes - API Endpoints untuk Riwayat Pendaftaran Guru
 * Gebyar Matematika Online 2026
 */

import { validateSession } from '../services/session.service.ts';
import {
  getBatchesByGuru,
  getBatchDetail,
  createBatchPendaftaran,
  updateBatchStatus,
  getGuruPendaftaranSummary,
  type CreateBatchPayload,
  type GuruPendaftaranSummary
} from '../services/riwayatPendaftaran.service.ts';
import type { BatchPendaftaranItem, StatusPembayaran } from '../../types/index.ts';
import type { ApiResponse } from './auth.routes.ts';

/**
 * Resolve Guru ID dari authHeader atau fallback ke guru-001 (untuk kemudahan tes)
 */
function resolveGuruId(authHeader?: string, explicitGuruId?: string): string {
  if (explicitGuruId) return explicitGuruId;

  if (authHeader) {
    const check = validateSession(authHeader);
    if (check.valid && check.session) {
      return check.session.userId;
    }
  }

  // Fallback ID pendaftar default
  return 'guru-001';
}

/**
 * GET /api/guru/riwayat-pendaftaran
 * Mengambil daftar pendaftaran batch milik guru
 */
export function handleGetRiwayatPendaftaran(
  authHeader?: string,
  queryOptions?: { guruId?: string; status?: string; search?: string }
): ApiResponse<{ batches: BatchPendaftaranItem[]; summary: GuruPendaftaranSummary }> {
  try {
    const guruId = resolveGuruId(authHeader, queryOptions?.guruId);
    const batches = getBatchesByGuru(guruId, {
      status: queryOptions?.status,
      search: queryOptions?.search,
    });
    const summary = getGuruPendaftaranSummary(guruId);

    return {
      statusCode: 200,
      success: true,
      data: {
        batches,
        summary,
      },
      message: `Ditemukan ${batches.length} riwayat pengajuan pendaftaran untuk akun guru ini.`,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal memuat riwayat pendaftaran guru.',
    };
  }
}

/**
 * GET /api/guru/riwayat-pendaftaran/stats
 * Mengambil ringkasan statistik pendaftaran guru
 */
export function handleGetRiwayatStats(
  authHeader?: string,
  guruId?: string
): ApiResponse<GuruPendaftaranSummary> {
  try {
    const resolvedId = resolveGuruId(authHeader, guruId);
    const summary = getGuruPendaftaranSummary(resolvedId);

    return {
      statusCode: 200,
      success: true,
      data: summary,
      message: 'Statistik pendaftaran guru berhasil dihitung.',
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal menghitung statistik pendaftaran.',
    };
  }
}

/**
 * GET /api/guru/riwayat-pendaftaran/:batchId
 * Mengambil detail satu pendaftaran batch tertentu
 */
export function handleGetBatchDetail(
  batchId: string,
  authHeader?: string,
  guruId?: string
): ApiResponse<BatchPendaftaranItem> {
  try {
    const resolvedGuruId = resolveGuruId(authHeader, guruId);
    const batch = getBatchDetail(batchId, resolvedGuruId);

    if (!batch) {
      return {
        statusCode: 404,
        success: false,
        error: `Pendaftaran dengan kode/ID "${batchId}" tidak ditemukan atau Anda tidak berhak mengaksesnya.`,
      };
    }

    return {
      statusCode: 200,
      success: true,
      data: batch,
      message: 'Detail batch pendaftaran berhasil diambil.',
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal mengambil detail pendaftaran.',
    };
  }
}

/**
 * POST /api/guru/riwayat-pendaftaran
 * Membuat pendaftaran batch baru oleh akun guru
 */
export function handleCreateBatchPendaftaran(
  payload: CreateBatchPayload,
  authHeader?: string,
  guruId?: string
): ApiResponse<BatchPendaftaranItem> {
  try {
    const resolvedGuruId = resolveGuruId(authHeader, guruId);
    const newBatch = createBatchPendaftaran(resolvedGuruId, payload);

    return {
      statusCode: 201,
      success: true,
      data: newBatch,
      message: `Pendaftaran batch ${newBatch.batchCode} berhasil dibuat dengan status ${newBatch.status}.`,
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      success: false,
      error: error.message || 'Gagal membuat pendaftaran batch baru.',
    };
  }
}

/**
 * PATCH /api/guru/riwayat-pendaftaran/:batchId/status
 * Mengubah status pembayaran batch (misal integrasi gateway pembayaran/admin)
 */
export function handleUpdateBatchStatus(
  batchId: string,
  status: StatusPembayaran,
  authHeader?: string,
  guruId?: string
): ApiResponse<BatchPendaftaranItem> {
  try {
    const resolvedGuruId = resolveGuruId(authHeader, guruId);
    const updated = updateBatchStatus(batchId, status, resolvedGuruId);

    return {
      statusCode: 200,
      success: true,
      data: updated,
      message: `Status pembayaran batch ${updated.batchCode} berhasil diperbarui menjadi ${status}.`,
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      success: false,
      error: error.message || 'Gagal memperbarui status pendaftaran.',
    };
  }
}
