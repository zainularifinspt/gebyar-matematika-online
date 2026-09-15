/**
 * Profile Routes - API Endpoints untuk Profil Guru & Sekolah
 * Gebyar Matematika Online 2026
 */

import { validateSession } from '../services/session.service.ts';
import { 
  getGuruProfile, 
  getGuruProfileByEmail,
  updateGuruAndSekolahProfile, 
  getSekolahByNpsn, 
  searchSekolah, 
  toGuruProfileData,
  type UpdateProfileDTO 
} from '../services/profile.service.ts';
import type { GuruWithSekolahDTO, SekolahEntity } from '../database/schema.ts';
import type { GuruProfileData } from '../../types/index.ts';
import type { ApiResponse } from './auth.routes.ts';

/**
 * GET /api/guru/profile
 * Mengambil profil guru yang sedang login (atau berdasarkan guruId / email)
 */
export function handleGetProfile(
  authHeader?: string,
  guruId?: string
): ApiResponse<{ profile: GuruWithSekolahDTO; uiProfile: GuruProfileData }> {
  try {
    let resolvedGuruId = guruId;

    if (!resolvedGuruId && authHeader) {
      const sessionCheck = validateSession(authHeader);
      if (sessionCheck.valid && sessionCheck.session) {
        resolvedGuruId = sessionCheck.session.userId;
        
        // Coba cari berdasarkan ID, jika tidak ada cari berdasarkan email
        try {
          const profile = getGuruProfile(resolvedGuruId);
          return {
            statusCode: 200,
            success: true,
            data: {
              profile,
              uiProfile: toGuruProfileData(profile),
            },
            message: 'Data profil guru berhasil diambil.',
          };
        } catch {
          const profileByEmail = getGuruProfileByEmail(sessionCheck.session.email);
          if (profileByEmail) {
            return {
              statusCode: 200,
              success: true,
              data: {
                profile: profileByEmail,
                uiProfile: toGuruProfileData(profileByEmail),
              },
              message: 'Data profil guru berhasil diambil.',
            };
          }
        }
      }
    }

    if (!resolvedGuruId) {
      // Fallback untuk kemudahan development/preview: gunakan akun guru pertama
      resolvedGuruId = 'guru-001';
    }

    const profile = getGuruProfile(resolvedGuruId);
    return {
      statusCode: 200,
      success: true,
      data: {
        profile,
        uiProfile: toGuruProfileData(profile),
      },
      message: 'Data profil guru dan sekolah berhasil diambil.',
    };
  } catch (error: any) {
    return {
      statusCode: 404,
      success: false,
      error: error.message || 'Profil guru tidak ditemukan.',
    };
  }
}

/**
 * PUT /api/guru/profile
 * Memperbarui profil guru dan data sekolah
 */
export function handleUpdateProfile(
  payload: UpdateProfileDTO,
  authHeader?: string,
  targetGuruId?: string
): ApiResponse<{ profile: GuruWithSekolahDTO; uiProfile: GuruProfileData }> {
  try {
    let guruId = targetGuruId;

    if (!guruId && authHeader) {
      const sessionCheck = validateSession(authHeader);
      if (sessionCheck.valid && sessionCheck.session) {
        guruId = sessionCheck.session.userId;
      }
    }

    if (!guruId) {
      guruId = 'guru-001';
    }

    // Validasi input minimal
    if (payload.nama_lengkap !== undefined && !payload.nama_lengkap.trim()) {
      return {
        statusCode: 400,
        success: false,
        error: 'Nama lengkap guru tidak boleh kosong.',
      };
    }

    if (payload.nama_sekolah !== undefined && !payload.nama_sekolah.trim()) {
      return {
        statusCode: 400,
        success: false,
        error: 'Nama sekolah tidak boleh kosong.',
      };
    }

    const updatedProfile = updateGuruAndSekolahProfile(guruId, payload);

    return {
      statusCode: 200,
      success: true,
      data: {
        profile: updatedProfile,
        uiProfile: toGuruProfileData(updatedProfile),
      },
      message: 'Profil guru dan sekolah berhasil diperbarui.',
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      success: false,
      error: error.message || 'Gagal memperbarui profil guru dan sekolah.',
    };
  }
}

/**
 * GET /api/sekolah/search?q=...
 * Pencarian data referensi sekolah
 */
export function handleSearchSekolah(query: string = ''): ApiResponse<SekolahEntity[]> {
  const list = searchSekolah(query);
  return {
    statusCode: 200,
    success: true,
    data: list,
  };
}

/**
 * GET /api/sekolah/:npsn
 * Mengambil informasi sekolah berdasarkan nomor NPSN
 */
export function handleGetSekolahByNpsn(npsn: string): ApiResponse<SekolahEntity> {
  const sekolah = getSekolahByNpsn(npsn);
  if (!sekolah) {
    return {
      statusCode: 404,
      success: false,
      error: `Sekolah dengan NPSN ${npsn} tidak ditemukan.`,
    };
  }

  return {
    statusCode: 200,
    success: true,
    data: sekolah,
  };
}
