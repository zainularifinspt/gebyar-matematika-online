/**
 * Migration Manager
 * Mengelola eksekusi migrasi tabel database Guru & Sekolah
 */

import type { MigrationRecord } from './schema.ts';

export interface MigrationFile {
  name: string;
  sql: string;
}

export const MIGRATIONS_REGISTRY: MigrationFile[] = [
  {
    name: '001_create_sekolah_table',
    sql: `
      CREATE TABLE IF NOT EXISTS sekolah (
          id VARCHAR(36) PRIMARY KEY,
          npsn VARCHAR(8) NOT NULL UNIQUE,
          nama_sekolah VARCHAR(255) NOT NULL,
          jenjang VARCHAR(20) NOT NULL CHECK (jenjang IN ('SD/MI', 'SMP/MTs', 'SMA/MA/SMK')),
          status VARCHAR(20) NOT NULL CHECK (status IN ('Negeri', 'Swasta')),
          alamat TEXT NOT NULL,
          kelurahan VARCHAR(100),
          kecamatan VARCHAR(100),
          kabupaten_kota VARCHAR(100) NOT NULL,
          provinsi VARCHAR(100) NOT NULL,
          kode_pos VARCHAR(10),
          telepon VARCHAR(50),
          email VARCHAR(150),
          website VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_sekolah_npsn ON sekolah(npsn);
      CREATE INDEX IF NOT EXISTS idx_sekolah_nama ON sekolah(nama_sekolah);
      CREATE INDEX IF NOT EXISTS idx_sekolah_kota ON sekolah(kabupaten_kota);
      CREATE INDEX IF NOT EXISTS idx_sekolah_jenjang ON sekolah(jenjang);
    `,
  },
  {
    name: '002_create_guru_table',
    sql: `
      CREATE TABLE IF NOT EXISTS guru (
          id VARCHAR(36) PRIMARY KEY,
          google_id VARCHAR(100) UNIQUE,
          email VARCHAR(150) NOT NULL UNIQUE,
          nama_lengkap VARCHAR(255) NOT NULL,
          gelar_depan VARCHAR(50),
          gelar_belakang VARCHAR(50),
          nip VARCHAR(30),
          nuptk VARCHAR(30),
          no_whatsapp VARCHAR(30) NOT NULL,
          jabatan VARCHAR(100) NOT NULL DEFAULT 'Guru Pembina Matematika',
          sekolah_id VARCHAR(36) NOT NULL,
          surat_tugas_url VARCHAR(500),
          status_verifikasi VARCHAR(20) DEFAULT 'terverifikasi' CHECK (status_verifikasi IN ('menunggu', 'terverifikasi', 'ditolak')),
          catatan_verifikasi TEXT,
          is_active BOOLEAN DEFAULT TRUE,
          last_login_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_guru_sekolah FOREIGN KEY (sekolah_id) REFERENCES sekolah(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_guru_email ON guru(email);
      CREATE INDEX IF NOT EXISTS idx_guru_google_id ON guru(google_id);
      CREATE INDEX IF NOT EXISTS idx_guru_sekolah_id ON guru(sekolah_id);
      CREATE INDEX IF NOT EXISTS idx_guru_no_whatsapp ON guru(no_whatsapp);
    `,
  },
  {
    name: '003_create_riwayat_pendaftaran_table',
    sql: `
      CREATE TABLE IF NOT EXISTS pendaftaran_batch (
          id VARCHAR(36) PRIMARY KEY,
          guru_id VARCHAR(36) NOT NULL,
          batch_code VARCHAR(50) NOT NULL UNIQUE,
          order_id VARCHAR(50) NOT NULL UNIQUE,
          gelombang VARCHAR(50) NOT NULL,
          tanggal_daftar TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          jumlah_peserta INT NOT NULL DEFAULT 0,
          subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
          diskon_kolektif DECIMAL(12, 2) NOT NULL DEFAULT 0,
          total_biaya DECIMAL(12, 2) NOT NULL DEFAULT 0,
          status VARCHAR(30) NOT NULL DEFAULT 'menunggu_pembayaran' CHECK (status IN ('menunggu_pembayaran', 'lunas', 'kedaluwarsa', 'gagal')),
          metode VARCHAR(30) NOT NULL DEFAULT 'QRIS' CHECK (metode IN ('QRIS', 'BCA_VA', 'MANDIRI_VA', 'BNI_VA', 'BRI_VA')),
          berkas_pendaftaran_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_batch_guru FOREIGN KEY (guru_id) REFERENCES guru(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
      CREATE TABLE IF NOT EXISTS pendaftaran_batch_peserta (
          id VARCHAR(36) PRIMARY KEY,
          batch_id VARCHAR(36) NOT NULL,
          nama VARCHAR(255) NOT NULL,
          nisn VARCHAR(20) NOT NULL,
          kelas VARCHAR(50) NOT NULL,
          kategori VARCHAR(100) NOT NULL,
          biaya DECIMAL(12, 2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_peserta_batch FOREIGN KEY (batch_id) REFERENCES pendaftaran_batch(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_batch_guru_id ON pendaftaran_batch(guru_id);
      CREATE INDEX IF NOT EXISTS idx_batch_code ON pendaftaran_batch(batch_code);
      CREATE INDEX IF NOT EXISTS idx_batch_order_id ON pendaftaran_batch(order_id);
      CREATE INDEX IF NOT EXISTS idx_batch_status ON pendaftaran_batch(status);
      CREATE INDEX IF NOT EXISTS idx_peserta_batch_id ON pendaftaran_batch_peserta(batch_id);
      CREATE INDEX IF NOT EXISTS idx_peserta_nisn ON pendaftaran_batch_peserta(nisn);
    `,
  },
  {
    name: '004_create_pendaftaran_detail_dan_sertifikat_table',
    sql: `
      CREATE TABLE IF NOT EXISTS pendaftaran_peserta (
          id VARCHAR(36) PRIMARY KEY,
          nomor_registrasi VARCHAR(50) NOT NULL UNIQUE,
          order_id VARCHAR(50) NOT NULL UNIQUE,
          user_id VARCHAR(36),
          nama_siswa VARCHAR(255) NOT NULL,
          email VARCHAR(150) NOT NULL,
          no_hp VARCHAR(30) NOT NULL,
          asal_sekolah VARCHAR(255) NOT NULL,
          nisn VARCHAR(20) NOT NULL,
          kelas VARCHAR(50) NOT NULL,
          kategori_id VARCHAR(50) NOT NULL,
          kategori_nama VARCHAR(150) NOT NULL,
          jadwal_penyisihan VARCHAR(150) NOT NULL,
          nomor_peserta VARCHAR(50),
          sesi_ujian VARCHAR(100),
          biaya_lomba DECIMAL(12, 2) NOT NULL,
          biaya_admin DECIMAL(12, 2) NOT NULL DEFAULT 0,
          total_biaya DECIMAL(12, 2) NOT NULL,
          status_pembayaran VARCHAR(30) NOT NULL DEFAULT 'menunggu_pembayaran' CHECK (status_pembayaran IN ('menunggu_pembayaran', 'lunas', 'kedaluwarsa', 'gagal')),
          metode_pembayaran VARCHAR(30) NOT NULL DEFAULT 'QRIS' CHECK (metode_pembayaran IN ('QRIS', 'BCA_VA', 'MANDIRI_VA', 'BNI_VA', 'BRI_VA')),
          kode_va VARCHAR(50),
          waktu_daftar TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          waktu_lunas TIMESTAMP,
          bukti_bayar_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS sertifikat_digital (
          id VARCHAR(36) PRIMARY KEY,
          pendaftaran_id VARCHAR(36) NOT NULL UNIQUE,
          nomor_sertifikat VARCHAR(100) NOT NULL UNIQUE,
          jenis_sertifikat VARCHAR(30) NOT NULL CHECK (jenis_sertifikat IN ('peserta', 'pembimbing', 'juara')),
          penerima_nama VARCHAR(255) NOT NULL,
          instansi VARCHAR(255) NOT NULL,
          predikat VARCHAR(100) DEFAULT 'Peserta Babak Penyisihan',
          file_pdf_url VARCHAR(500) NOT NULL,
          qr_verifikasi_url VARCHAR(500) NOT NULL,
          tanggal_terbit TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          is_valid BOOLEAN DEFAULT TRUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_sertifikat_pendaftaran FOREIGN KEY (pendaftaran_id) REFERENCES pendaftaran_peserta(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
      CREATE INDEX IF NOT EXISTS idx_pendaftaran_nomor ON pendaftaran_peserta(nomor_registrasi);
      CREATE INDEX IF NOT EXISTS idx_pendaftaran_order ON pendaftaran_peserta(order_id);
      CREATE INDEX IF NOT EXISTS idx_pendaftaran_email ON pendaftaran_peserta(email);
      CREATE INDEX IF NOT EXISTS idx_pendaftaran_nisn ON pendaftaran_peserta(nisn);
      CREATE INDEX IF NOT EXISTS idx_sertifikat_nomor ON sertifikat_digital(nomor_sertifikat);
      CREATE INDEX IF NOT EXISTS idx_sertifikat_pendaftaran_id ON sertifikat_digital(pendaftaran_id);
    `,
  },
];

/**
 * Simulasi eksekusi migrasi untuk validasi skema database
 */
export function executeMigrations(alreadyExecutedNames: string[] = []): {
  executed: string[];
  pending: string[];
  history: MigrationRecord[];
} {
  const executed: string[] = [];
  const history: MigrationRecord[] = [];

  const pending = MIGRATIONS_REGISTRY.filter(
    (m) => !alreadyExecutedNames.includes(m.name)
  ).map((m) => m.name);

  MIGRATIONS_REGISTRY.forEach((migration, index) => {
    if (!alreadyExecutedNames.includes(migration.name)) {
      executed.push(migration.name);
      history.push({
        id: index + 1,
        migration_name: migration.name,
        batch: 1,
        executed_at: new Date().toISOString(),
      });
    }
  });

  return { executed, pending, history };
}
