/**
 * Registration Detail & Certificate Service
 * Mengelola data detail pendaftaran siswa mandiri, transaksi pembayaran Midtrans/VA/QRIS,
 * serta penerbitan dan verifikasi E-Sertifikat digital resmi ber-QR Code.
 * Gebyar Matematika Online 2026
 */

import type {
  PendaftaranPesertaEntity,
  SertifikatDigitalEntity,
  RegistrationDetailDTO
} from '../database/schema.ts';

// In-memory store untuk data pendaftaran individual / detail pendaftaran
export const DB_PENDAFTARAN_PESERTA_STORE: Map<string, PendaftaranPesertaEntity> = new Map();

// In-memory store untuk sertifikat digital resmi
export const DB_SERTIFIKAT_STORE: Map<string, SertifikatDigitalEntity> = new Map();

/**
 * Mengambil detail pendaftaran beserta status sertifikatnya
 * Mendukung pencarian via id, nomor registrasi, atau orderId
 */
export function getRegistrationDetail(identifier: string): RegistrationDetailDTO | null {
  const clean = identifier.trim().toLowerCase();
  
  let target: PendaftaranPesertaEntity | undefined;
  for (const reg of DB_PENDAFTARAN_PESERTA_STORE.values()) {
    if (
      reg.id.toLowerCase() === clean ||
      reg.nomor_registrasi.toLowerCase() === clean ||
      reg.order_id.toLowerCase() === clean ||
      reg.email.toLowerCase() === clean
    ) {
      target = reg;
      break;
    }
  }

  if (!target) return null;

  // Cari sertifikat jika pendaftaran sudah lunas
  let sertifikat: SertifikatDigitalEntity | null = null;
  if (target.status_pembayaran === 'lunas') {
    for (const cert of DB_SERTIFIKAT_STORE.values()) {
      if (cert.pendaftaran_id === target.id) {
        sertifikat = cert;
        break;
      }
    }
  }

  return {
    ...target,
    sertifikat,
  };
}

/**
 * Mengambil daftar pendaftaran milik email / user tertentu
 */
export function getRegistrationsByUser(userEmailOrId: string): RegistrationDetailDTO[] {
  const clean = userEmailOrId.trim().toLowerCase();
  const results: RegistrationDetailDTO[] = [];

  for (const reg of DB_PENDAFTARAN_PESERTA_STORE.values()) {
    if (
      (reg.user_id && reg.user_id.toLowerCase() === clean) ||
      reg.email.toLowerCase() === clean
    ) {
      const detail = getRegistrationDetail(reg.id);
      if (detail) results.push(detail);
    }
  }

  return results;
}

/**
 * Konfirmasi atau simulasi pembayaran lunas pendaftaran
 * Otomatis menerbitkan e-sertifikat peserta jika pembayaran lunas
 */
export function confirmPaymentSuccess(
  identifier: string,
  metode: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'BNI_VA' | 'BRI_VA' = 'QRIS'
): RegistrationDetailDTO {
  const reg = getRegistrationDetail(identifier);
  if (!reg) {
    throw new Error(`Pendaftaran dengan kode/ID "${identifier}" tidak ditemukan.`);
  }

  const now = new Date().toISOString();
  const updatedReg: PendaftaranPesertaEntity = {
    ...reg,
    status_pembayaran: 'lunas',
    metode_pembayaran: metode,
    waktu_lunas: now,
    bukti_bayar_url: `https://example.com/receipt/${reg.order_id}.pdf`,
    updated_at: now,
  };

  DB_PENDAFTARAN_PESERTA_STORE.set(reg.id, updatedReg);

  // Otomatis terbitkan E-Sertifikat jika belum ada
  let cert = reg.sertifikat;
  if (!cert) {
    cert = generateCertificate(updatedReg);
  }

  return {
    ...updatedReg,
    sertifikat: cert,
  };
}

/**
 * Menerbitkan E-Sertifikat Digital resmi
 */
export function generateCertificate(
  pendaftaran: PendaftaranPesertaEntity,
  jenis: 'peserta' | 'pembimbing' | 'juara' = 'peserta'
): SertifikatDigitalEntity {
  // Cek apakah sertifikat sudah pernah terbit
  for (const existing of DB_SERTIFIKAT_STORE.values()) {
    if (existing.pendaftaran_id === pendaftaran.id && existing.jenis_sertifikat === jenis) {
      return existing;
    }
  }

  const certId = `cert-${Date.now()}`;
  const cleanNum = pendaftaran.nomor_peserta || `SMA-${Math.floor(1000 + Math.random() * 9000)}`;
  const nomorSertifikat = `GM27/CERT-${jenis.toUpperCase()}/${cleanNum}`;
  const now = new Date().toISOString();

  const newCert: SertifikatDigitalEntity = {
    id: certId,
    pendaftaran_id: pendaftaran.id,
    nomor_sertifikat: nomorSertifikat,
    jenis_sertifikat: jenis,
    penerima_nama: pendaftaran.nama_siswa,
    instansi: pendaftaran.asal_sekolah,
    predikat: `Peserta Babak Penyisihan ${pendaftaran.kategori_nama}`,
    file_pdf_url: `https://example.com/certificates/${nomorSertifikat.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`,
    qr_verifikasi_url: `https://gebyarmatematika.id/verify/${encodeURIComponent(nomorSertifikat)}`,
    tanggal_terbit: now,
    is_valid: true,
    created_at: now,
  };

  DB_SERTIFIKAT_STORE.set(certId, newCert);
  return newCert;
}

/**
 * Verifikasi keabsahan E-Sertifikat secara publik melalui nomor sertifikat
 */
export function verifyCertificate(nomorSertifikat: string): {
  valid: boolean;
  sertifikat?: SertifikatDigitalEntity;
  message: string;
} {
  const clean = nomorSertifikat.trim().toLowerCase();

  for (const cert of DB_SERTIFIKAT_STORE.values()) {
    if (cert.nomor_sertifikat.toLowerCase() === clean) {
      if (!cert.is_valid) {
        return {
          valid: false,
          sertifikat: cert,
          message: 'Sertifikat ini telah dibatalkan atau dicabut oleh panitia.',
        };
      }
      return {
        valid: true,
        sertifikat: cert,
        message: 'Sertifikat digital sah dan terdaftar resmi di database panitia Gebyar Matematika 2027.',
      };
    }
  }

  return {
    valid: false,
    message: `Nomor sertifikat "${nomorSertifikat}" tidak terdaftar di sistem verifikasi resmi panitia.`,
  };
}
