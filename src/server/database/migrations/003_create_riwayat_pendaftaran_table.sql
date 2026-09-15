-- Migration: 003_create_riwayat_pendaftaran_table.sql
-- Tabel Riwayat Pendaftaran Batch Kolektif Guru & Rincian Siswa Peserta
-- Gebyar Matematika Online 2026

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
