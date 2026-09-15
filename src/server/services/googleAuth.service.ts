/**
 * Google OAuth Authentication & Automatic Account Provisioning Service
 * Gebyar Matematika Online 2026
 */

import type { GuruEntity, SekolahEntity } from '../database/schema.ts';

export interface GooglePayload {
  sub: string; // Google User ID
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
  hd?: string; // Hosted domain (optional, e.g. sekolah.sch.id)
}

export interface AuthResult {
  success: boolean;
  isNewUser: boolean;
  user: GuruEntity;
  sekolah: SekolahEntity;
  token: string;
  message: string;
}

// In-memory mock database store for server state
export const DB_SEKOLAH_STORE: Map<string, SekolahEntity> = new Map([
  [
    'sch-001',
    {
      id: 'sch-001',
      npsn: '20108842',
      nama_sekolah: 'SMP IT Al-Madani',
      jenjang: 'SMP/MTs',
      status: 'Swasta',
      alamat: 'Jl. Pasir Kaliki No. 128, Cicendo',
      kelurahan: 'Pasirkaliki',
      kecamatan: 'Cicendo',
      kabupaten_kota: 'Kota Bandung',
      provinsi: 'Jawa Barat',
      kode_pos: '40171',
      telepon: '(022) 7208192',
      email: 'kontak@smpitalmadani.sch.id',
      website: 'https://smpitalmadani.sch.id',
      created_at: '2026-09-01T08:00:00Z',
      updated_at: '2026-09-01T08:00:00Z',
    },
  ],
  [
    'sch-002',
    {
      id: 'sch-002',
      npsn: '20403176',
      nama_sekolah: 'SMA Negeri 3 Yogyakarta',
      jenjang: 'SMA/MA/SMK',
      status: 'Negeri',
      alamat: 'Jl. Yos Sudarso No. 7, Kotabaru',
      kelurahan: 'Kotabaru',
      kecamatan: 'Gondokusuman',
      kabupaten_kota: 'Kota Yogyakarta',
      provinsi: 'DI Yogyakarta',
      kode_pos: '55224',
      telepon: '(0274) 512345',
      email: 'info@sman3yogya.sch.id',
      website: 'https://sman3yogya.sch.id',
      created_at: '2026-09-01T08:00:00Z',
      updated_at: '2026-09-01T08:00:00Z',
    },
  ],
]);

export const DB_GURU_STORE: Map<string, GuruEntity> = new Map([
  [
    'guru-001',
    {
      id: 'guru-001',
      google_id: 'google-sub-10829182910',
      email: 'siti.rahmawati@sekolah.sch.id',
      nama_lengkap: 'Siti Rahmawati',
      gelar_belakang: 'S.Pd',
      nip: '19870512 201101 2 008',
      no_whatsapp: '0812-9876-5432',
      jabatan: 'Guru Pembina Olimpiade Matematika',
      sekolah_id: 'sch-001',
      status_verifikasi: 'terverifikasi',
      is_active: true,
      last_login_at: '2026-09-14T10:00:00Z',
      created_at: '2026-09-01T08:00:00Z',
      updated_at: '2026-09-14T10:00:00Z',
    },
  ],
]);

/**
 * Simulasi pembuatan link login OAuth Google
 */
export function generateGoogleOAuthUrl(redirectUri: string, state?: string): string {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: redirectUri,
    client_id: 'gebyar-matematika-client-id.apps.googleusercontent.com',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    state: state || 'gm26-auth-state',
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

/**
 * Otentikasi dan Pembuatan Akun Otomatis dari kredensial Google
 */
export async function authenticateWithGoogle(payload: GooglePayload): Promise<AuthResult> {
  if (!payload.email || !payload.email_verified) {
    throw new Error('Email Google tidak terverifikasi atau tidak valid.');
  }

  const normalizedEmail = payload.email.toLowerCase().trim();

  // Cari apakah user sudah pernah terdaftar
  let existingUser: GuruEntity | undefined = undefined;
  for (const user of DB_GURU_STORE.values()) {
    if (user.email.toLowerCase() === normalizedEmail || (payload.sub && user.google_id === payload.sub)) {
      existingUser = user;
      break;
    }
  }

  const now = new Date().toISOString();

  // Jika akun sudah ada: lakukan sinkronisasi google_id dan update waktu login terakhir
  if (existingUser) {
    const updatedUser: GuruEntity = {
      ...existingUser,
      google_id: payload.sub || existingUser.google_id,
      last_login_at: now,
      updated_at: now,
    };
    DB_GURU_STORE.set(updatedUser.id, updatedUser);

    const sekolah = DB_SEKOLAH_STORE.get(updatedUser.sekolah_id) || Array.from(DB_SEKOLAH_STORE.values())[0];

    return {
      success: true,
      isNewUser: false,
      user: updatedUser,
      sekolah: sekolah,
      token: `gm26_jwt_${updatedUser.id}_${Date.now()}`,
      message: `Selamat datang kembali, ${updatedUser.nama_lengkap}!`,
    };
  }

  // Jika akun belum ada: buat akun otomatis (Auto Account Provisioning)
  const newUserId = `guru-${Date.now()}`;
  const defaultSekolah = Array.from(DB_SEKOLAH_STORE.values())[0];

  const newUser: GuruEntity = {
    id: newUserId,
    google_id: payload.sub,
    email: normalizedEmail,
    nama_lengkap: payload.name || 'Guru Pendamping',
    gelar_belakang: '',
    nip: null,
    nuptk: null,
    no_whatsapp: '0812-0000-0000',
    jabatan: 'Guru Pembina Matematika',
    sekolah_id: defaultSekolah.id,
    surat_tugas_url: null,
    status_verifikasi: 'terverifikasi',
    catatan_verifikasi: 'Akun dibuat otomatis via Google OAuth SSO',
    is_active: true,
    last_login_at: now,
    created_at: now,
    updated_at: now,
  };

  DB_GURU_STORE.set(newUserId, newUser);

  return {
    success: true,
    isNewUser: true,
    user: newUser,
    sekolah: defaultSekolah,
    token: `gm26_jwt_${newUserId}_${Date.now()}`,
    message: `Akun berhasil dibuat otomatis melalui Google. Selamat bergabung, ${newUser.nama_lengkap}!`,
  };
}
