-- ==========================================================
-- Migration: 002_create_guru_table.sql
-- Description: Membuat tabel guru pendamping & koordinator lomba
-- ==========================================================

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

-- Indeks untuk lookup login Google OAuth, email, dan relasi sekolah
CREATE INDEX IF NOT EXISTS idx_guru_email ON guru(email);
CREATE INDEX IF NOT EXISTS idx_guru_google_id ON guru(google_id);
CREATE INDEX IF NOT EXISTS idx_guru_sekolah_id ON guru(sekolah_id);
CREATE INDEX IF NOT EXISTS idx_guru_no_whatsapp ON guru(no_whatsapp);
