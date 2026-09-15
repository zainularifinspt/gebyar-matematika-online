-- ==========================================================
-- Migration: 001_create_sekolah_table.sql
-- Description: Membuat tabel sekolah / satuan pendidikan
-- ==========================================================

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

-- Indeks untuk pencarian cepat nama sekolah dan NPSN
CREATE INDEX IF NOT EXISTS idx_sekolah_npsn ON sekolah(npsn);
CREATE INDEX IF NOT EXISTS idx_sekolah_nama ON sekolah(nama_sekolah);
CREATE INDEX IF NOT EXISTS idx_sekolah_kota ON sekolah(kabupaten_kota);
CREATE INDEX IF NOT EXISTS idx_sekolah_jenjang ON sekolah(jenjang);
