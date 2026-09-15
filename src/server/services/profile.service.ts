/**
 * Profile Service - Manajemen Data Profil Guru & Sekolah
 * Gebyar Matematika Online 2026
 */

import type { GuruEntity, SekolahEntity, GuruWithSekolahDTO, JenjangPendidikan, StatusSekolah } from '../database/schema.ts';
import { DB_GURU_STORE, DB_SEKOLAH_STORE } from './googleAuth.service.ts';
import type { GuruProfileData } from '../../types/index.ts';

export interface UpdateProfileDTO {
  // Informasi Guru
  nama_lengkap?: string;
  gelar_depan?: string | null;
  gelar_belakang?: string | null;
  nip?: string | null;
  nuptk?: string | null;
  no_whatsapp?: string;
  jabatan?: string;
  surat_tugas_url?: string | null;

  // Informasi Sekolah
  npsn?: string;
  nama_sekolah?: string;
  jenjang?: JenjangPendidikan;
  status?: StatusSekolah;
  alamat?: string;
  kelurahan?: string | null;
  kecamatan?: string | null;
  kabupaten_kota?: string;
  provinsi?: string;
  kode_pos?: string | null;
  telepon_sekolah?: string | null;
  email_sekolah?: string | null;
  website_sekolah?: string | null;
}

/**
 * Mengambil profil guru beserta data sekolah terkait
 */
export function getGuruProfile(guruId: string): GuruWithSekolahDTO {
  const guru = DB_GURU_STORE.get(guruId);
  if (!guru) {
    throw new Error(`Data guru dengan ID "${guruId}" tidak ditemukan.`);
  }

  let sekolah = DB_SEKOLAH_STORE.get(guru.sekolah_id);
  if (!sekolah) {
    // Fallback ke sekolah default jika relasi belum lengkap
    sekolah = Array.from(DB_SEKOLAH_STORE.values())[0];
  }

  return {
    ...guru,
    sekolah,
  };
}

/**
 * Mengambil profil guru berdasarkan alamat email
 */
export function getGuruProfileByEmail(email: string): GuruWithSekolahDTO | null {
  const normalized = email.toLowerCase().trim();
  for (const guru of DB_GURU_STORE.values()) {
    if (guru.email.toLowerCase() === normalized) {
      return getGuruProfile(guru.id);
    }
  }
  return null;
}

/**
 * Memperbarui data profil guru
 */
export function updateGuru(guruId: string, updates: Partial<GuruEntity>): GuruEntity {
  const guru = DB_GURU_STORE.get(guruId);
  if (!guru) {
    throw new Error(`Guru dengan ID "${guruId}" tidak ditemukan.`);
  }

  const updatedGuru: GuruEntity = {
    ...guru,
    ...updates,
    id: guru.id, // ID tidak boleh diganti
    email: guru.email, // Email SSO terikat
    updated_at: new Date().toISOString(),
  };

  DB_GURU_STORE.set(guruId, updatedGuru);
  return updatedGuru;
}

/**
 * Memperbarui data profil sekolah
 */
export function updateSekolah(sekolahId: string, updates: Partial<SekolahEntity>): SekolahEntity {
  const sekolah = DB_SEKOLAH_STORE.get(sekolahId);
  if (!sekolah) {
    throw new Error(`Sekolah dengan ID "${sekolahId}" tidak ditemukan.`);
  }

  const updatedSekolah: SekolahEntity = {
    ...sekolah,
    ...updates,
    id: sekolah.id,
    updated_at: new Date().toISOString(),
  };

  DB_SEKOLAH_STORE.set(sekolahId, updatedSekolah);
  return updatedSekolah;
}

/**
 * Mengubah profil lengkap (Guru dan Sekolah) secara atomik
 */
export function updateGuruAndSekolahProfile(
  guruId: string,
  payload: UpdateProfileDTO
): GuruWithSekolahDTO {
  const existingProfile = getGuruProfile(guruId);
  const now = new Date().toISOString();

  // 1. Update data guru
  const updatedGuru: GuruEntity = {
    ...existingProfile,
    nama_lengkap: payload.nama_lengkap !== undefined ? payload.nama_lengkap.trim() : existingProfile.nama_lengkap,
    gelar_depan: payload.gelar_depan !== undefined ? payload.gelar_depan : existingProfile.gelar_depan,
    gelar_belakang: payload.gelar_belakang !== undefined ? payload.gelar_belakang : existingProfile.gelar_belakang,
    nip: payload.nip !== undefined ? payload.nip : existingProfile.nip,
    nuptk: payload.nuptk !== undefined ? payload.nuptk : existingProfile.nuptk,
    no_whatsapp: payload.no_whatsapp !== undefined ? payload.no_whatsapp.trim() : existingProfile.no_whatsapp,
    jabatan: payload.jabatan !== undefined ? payload.jabatan.trim() : existingProfile.jabatan,
    surat_tugas_url: payload.surat_tugas_url !== undefined ? payload.surat_tugas_url : existingProfile.surat_tugas_url,
    updated_at: now,
  };
  DB_GURU_STORE.set(guruId, updatedGuru);

  // 2. Update atau asosiasi data sekolah
  let targetSekolahId = existingProfile.sekolah_id;

  // Jika ada update NPSN dan NPSN cocok dengan sekolah lain yang sudah terdaftar
  if (payload.npsn && payload.npsn !== existingProfile.sekolah.npsn) {
    const existingSekolahByNpsn = getSekolahByNpsn(payload.npsn);
    if (existingSekolahByNpsn) {
      targetSekolahId = existingSekolahByNpsn.id;
      updatedGuru.sekolah_id = targetSekolahId;
      DB_GURU_STORE.set(guruId, updatedGuru);
    }
  }

  const existingSekolah = DB_SEKOLAH_STORE.get(targetSekolahId) || existingProfile.sekolah;
  const updatedSekolah: SekolahEntity = {
    ...existingSekolah,
    npsn: payload.npsn !== undefined ? payload.npsn.trim() : existingSekolah.npsn,
    nama_sekolah: payload.nama_sekolah !== undefined ? payload.nama_sekolah.trim() : existingSekolah.nama_sekolah,
    jenjang: payload.jenjang !== undefined ? payload.jenjang : existingSekolah.jenjang,
    status: payload.status !== undefined ? payload.status : existingSekolah.status,
    alamat: payload.alamat !== undefined ? payload.alamat.trim() : existingSekolah.alamat,
    kelurahan: payload.kelurahan !== undefined ? payload.kelurahan : existingSekolah.kelurahan,
    kecamatan: payload.kecamatan !== undefined ? payload.kecamatan : existingSekolah.kecamatan,
    kabupaten_kota: payload.kabupaten_kota !== undefined ? payload.kabupaten_kota.trim() : existingSekolah.kabupaten_kota,
    provinsi: payload.provinsi !== undefined ? payload.provinsi.trim() : existingSekolah.provinsi,
    kode_pos: payload.kode_pos !== undefined ? payload.kode_pos : existingSekolah.kode_pos,
    telepon: payload.telepon_sekolah !== undefined ? payload.telepon_sekolah : existingSekolah.telepon,
    email: payload.email_sekolah !== undefined ? payload.email_sekolah : existingSekolah.email,
    website: payload.website_sekolah !== undefined ? payload.website_sekolah : existingSekolah.website,
    updated_at: now,
  };
  DB_SEKOLAH_STORE.set(targetSekolahId, updatedSekolah);

  return {
    ...updatedGuru,
    sekolah: updatedSekolah,
  };
}

/**
 * Mencari sekolah berdasarkan NPSN
 */
export function getSekolahByNpsn(npsn: string): SekolahEntity | undefined {
  const cleanNpsn = npsn.trim();
  for (const sekolah of DB_SEKOLAH_STORE.values()) {
    if (sekolah.npsn === cleanNpsn) {
      return sekolah;
    }
  }
  return undefined;
}

/**
 * Pencarian sekolah berdasarkan nama atau NPSN
 */
export function searchSekolah(query: string): SekolahEntity[] {
  const q = query.toLowerCase().trim();
  if (!q) return Array.from(DB_SEKOLAH_STORE.values());

  return Array.from(DB_SEKOLAH_STORE.values()).filter(
    (s) => s.nama_sekolah.toLowerCase().includes(q) || s.npsn.includes(q) || s.kabupaten_kota.toLowerCase().includes(q)
  );
}

/**
 * Konversi model entity GuruWithSekolahDTO ke model UI GuruProfileData
 */
export function toGuruProfileData(dto: GuruWithSekolahDTO): GuruProfileData {
  return {
    id: dto.id,
    nama: dto.nama_lengkap + (dto.gelar_belakang ? `, ${dto.gelar_belakang}` : ''),
    nip: dto.nip || undefined,
    email: dto.email,
    telepon: dto.no_whatsapp,
    sekolah: dto.sekolah.nama_sekolah,
    npsn: dto.sekolah.npsn,
    kabupatenKota: dto.sekolah.kabupaten_kota,
    provinsi: dto.sekolah.provinsi,
    jabatan: dto.jabatan,
    jenjang: dto.sekolah.jenjang,
    statusSekolah: dto.sekolah.status,
    alamatSekolah: dto.sekolah.alamat,
    teleponSekolah: dto.sekolah.telepon || undefined,
    emailSekolah: dto.sekolah.email || undefined,
    suratTugasUrl: dto.surat_tugas_url || undefined,
  };
}
