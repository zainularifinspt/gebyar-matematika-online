/**
 * Entity Definitions and Database Models
 * Tabel Guru & Sekolah - Gebyar Matematika Online 2026
 */

export type JenjangPendidikan = 'SD/MI' | 'SMP/MTs' | 'SMA/MA/SMK';
export type StatusSekolah = 'Negeri' | 'Swasta';
export type StatusVerifikasiGuru = 'menunggu' | 'terverifikasi' | 'ditolak';

export interface SekolahEntity {
  id: string;
  npsn: string;
  nama_sekolah: string;
  jenjang: JenjangPendidikan;
  status: StatusSekolah;
  alamat: string;
  kelurahan?: string | null;
  kecamatan?: string | null;
  kabupaten_kota: string;
  provinsi: string;
  kode_pos?: string | null;
  telepon?: string | null;
  email?: string | null;
  website?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuruEntity {
  id: string;
  google_id?: string | null;
  email: string;
  nama_lengkap: string;
  gelar_depan?: string | null;
  gelar_belakang?: string | null;
  nip?: string | null;
  nuptk?: string | null;
  no_whatsapp: string;
  jabatan: string;
  sekolah_id: string;
  surat_tugas_url?: string | null;
  status_verifikasi: StatusVerifikasiGuru;
  catatan_verifikasi?: string | null;
  is_active: boolean;
  last_login_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuruWithSekolahDTO extends GuruEntity {
  sekolah: SekolahEntity;
}

export interface MigrationRecord {
  id: number;
  migration_name: string;
  batch: number;
  executed_at: string;
}

export interface PendaftaranBatchEntity {
  id: string;
  guru_id: string;
  batch_code: string;
  order_id: string;
  gelombang: 'Gelombang 1 (Early Bird)' | 'Gelombang 2 (Reguler)';
  tanggal_daftar: string;
  jumlah_peserta: number;
  subtotal: number;
  diskon_kolektif: number;
  total_biaya: number;
  status: 'menunggu_pembayaran' | 'lunas' | 'kedaluwarsa' | 'gagal';
  metode: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'BNI_VA' | 'BRI_VA';
  berkas_pendaftaran_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PendaftaranBatchPesertaEntity {
  id: string;
  batch_id: string;
  nama: string;
  nisn: string;
  kelas: string;
  kategori: string;
  biaya: number;
  created_at: string;
}

export interface BatchWithPesertaDTO extends PendaftaranBatchEntity {
  peserta: PendaftaranBatchPesertaEntity[];
}

export interface PendaftaranPesertaEntity {
  id: string;
  nomor_registrasi: string;
  order_id: string;
  user_id?: string | null;
  nama_siswa: string;
  email: string;
  no_hp: string;
  asal_sekolah: string;
  nisn: string;
  kelas: string;
  kategori_id: string;
  kategori_nama: string;
  jadwal_penyisihan: string;
  nomor_peserta?: string | null;
  sesi_ujian?: string | null;
  biaya_lomba: number;
  biaya_admin: number;
  total_biaya: number;
  status_pembayaran: 'menunggu_pembayaran' | 'lunas' | 'kedaluwarsa' | 'gagal';
  metode_pembayaran: 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'BNI_VA' | 'BRI_VA';
  kode_va?: string | null;
  waktu_daftar: string;
  waktu_lunas?: string | null;
  bukti_bayar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SertifikatDigitalEntity {
  id: string;
  pendaftaran_id: string;
  nomor_sertifikat: string;
  jenis_sertifikat: 'peserta' | 'pembimbing' | 'juara';
  penerima_nama: string;
  instansi: string;
  predikat: string;
  file_pdf_url: string;
  qr_verifikasi_url: string;
  tanggal_terbit: string;
  is_valid: boolean;
  created_at: string;
}

export interface RegistrationDetailDTO extends PendaftaranPesertaEntity {
  sertifikat?: SertifikatDigitalEntity | null;
}
