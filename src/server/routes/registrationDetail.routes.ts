/**
 * Registration Detail & Certificate Routes
 * API Endpoints untuk Rincian Pendaftaran, Konfirmasi Pembayaran, dan E-Sertifikat Digital
 * Gebyar Matematika Online 2026
 */

import { validateSession } from '../services/session.service.ts';
import {
  getRegistrationDetail,
  getRegistrationsByUser,
  confirmPaymentSuccess,
  verifyCertificate
} from '../services/registrationDetail.service.ts';
import type { RegistrationDetailDTO, SertifikatDigitalEntity } from '../database/schema.ts';
import type { ApiResponse } from './auth.routes.ts';

/**
 * GET /api/pendaftaran/detail/:identifier
 * Mengambil detail lengkap pendaftaran (nomor reg / order ID / ID)
 */
export function handleGetRegistrationDetail(
  identifier: string
): ApiResponse<RegistrationDetailDTO> {
  try {
    const detail = getRegistrationDetail(identifier);
    if (!detail) {
      return {
        statusCode: 404,
        success: false,
        error: `Data pendaftaran dengan nomor/order "${identifier}" tidak ditemukan.`,
      };
    }

    return {
      statusCode: 200,
      success: true,
      data: detail,
      message: 'Detail pendaftaran berhasil diambil.',
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal memuat detail pendaftaran.',
    };
  }
}

/**
 * GET /api/pendaftaran/me
 * Mengambil daftar pendaftaran milik akun siswa yang sedang login
 */
export function handleGetMyRegistrations(
  authHeader?: string
): ApiResponse<RegistrationDetailDTO[]> {
  try {
    let userIdentifier = 'farhan.maulana@gmail.com'; // Default demo

    if (authHeader) {
      const check = validateSession(authHeader);
      if (check.valid && check.session) {
        userIdentifier = check.session.email || check.session.userId;
      }
    }

    const list = getRegistrationsByUser(userIdentifier);
    return {
      statusCode: 200,
      success: true,
      data: list,
      message: `Ditemukan ${list.length} data pendaftaran untuk akun Anda.`,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal memuat pendaftaran akun.',
    };
  }
}

/**
 * POST /api/pendaftaran/:identifier/pay
 * Konfirmasi / simulasi pelunasan pembayaran pendaftaran
 */
export function handleConfirmPayment(
  identifier: string,
  metode: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'BNI_VA' | 'BRI_VA' = 'QRIS'
): ApiResponse<RegistrationDetailDTO> {
  try {
    const updated = confirmPaymentSuccess(identifier, metode);
    return {
      statusCode: 200,
      success: true,
      data: updated,
      message: 'Pembayaran berhasil dikonfirmasi lunas! E-Sertifikat dan kartu peserta telah siap diakses.',
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      success: false,
      error: error.message || 'Gagal memproses pembayaran.',
    };
  }
}

/**
 * GET /api/sertifikat/verify/:nomorSertifikat
 * Endpoint publik verifikasi keaslian QR E-Sertifikat
 */
export function handleVerifyCertificate(
  nomorSertifikat: string
): ApiResponse<{ valid: boolean; sertifikat?: SertifikatDigitalEntity }> {
  try {
    const result = verifyCertificate(nomorSertifikat);
    return {
      statusCode: result.valid ? 200 : 404,
      success: result.valid,
      data: {
        valid: result.valid,
        sertifikat: result.sertifikat,
      },
      message: result.message,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      success: false,
      error: error.message || 'Gagal memverifikasi sertifikat.',
    };
  }
}
