-- Migration: 004_create_pendaftaran_detail_dan_sertifikat_table.sql
-- Tabel Pendaftaran Mandiri Peserta, Transaksi Pembayaran, dan E-Sertifikat
-- Gebyar Matematika Online 2026

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
