-- ==========================================================
-- GEBYAR MATEMATIKA ONLINE 2026 - MASTER DATABASE SCHEMA
-- Relasi Database: Guru Pendamping & Satuan Pendidikan (Sekolah)
-- ==========================================================

-- 1. Tabel Pelacak Migrasi
CREATE TABLE IF NOT EXISTS _migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    batch INTEGER NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabel Sekolah (Satuan Pendidikan)
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

-- 3. Tabel Guru (Pembimbing & Koordinator Lomba)
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

-- 4. Indeks Kinerja Query
CREATE INDEX IF NOT EXISTS idx_sekolah_npsn ON sekolah(npsn);
CREATE INDEX IF NOT EXISTS idx_sekolah_nama ON sekolah(nama_sekolah);
CREATE INDEX IF NOT EXISTS idx_sekolah_kota ON sekolah(kabupaten_kota);
CREATE INDEX IF NOT EXISTS idx_guru_email ON guru(email);
CREATE INDEX IF NOT EXISTS idx_guru_google_id ON guru(google_id);
CREATE INDEX IF NOT EXISTS idx_guru_sekolah_id ON guru(sekolah_id);

-- 5. Data Awal / Seed Referensi Sekolah
INSERT OR IGNORE INTO sekolah (id, npsn, nama_sekolah, jenjang, status, alamat, kabupaten_kota, provinsi, telepon, email)
VALUES 
('sch-001', '20108842', 'SMP IT Al-Madani', 'SMP/MTs', 'Swasta', 'Jl. Pasir Kaliki No. 128, Cicendo', 'Kota Bandung', 'Jawa Barat', '(022) 7208192', 'kontak@smpitalmadani.sch.id'),
('sch-002', '20403176', 'SMA Negeri 3 Yogyakarta', 'SMA/MA/SMK', 'Negeri', 'Jl. Yos Sudarso No. 7, Kotabaru, Gondokusuman', 'Kota Yogyakarta', 'DI Yogyakarta', '(0274) 512345', 'info@sman3yogya.sch.id'),
('sch-003', '20532210', 'MAN 2 Kota Malang', 'SMA/MA/SMK', 'Negeri', 'Jl. Bandung No. 7, Penanggungan, Klojen', 'Kota Malang', 'Jawa Timur', '(0341) 551357', 'humas@man2kotamalang.sch.id'),
('sch-004', '20328901', 'SMP Negeri 1 Semarang', 'SMP/MTs', 'Negeri', 'Jl. Kyai Saleh No. 3, Mugassari', 'Kota Semarang', 'Jawa Tengah', '(024) 8310056', 'info@smpn1smg.sch.id');

-- 6. Data Awal / Seed Guru Pendamping
INSERT OR IGNORE INTO guru (id, email, nama_lengkap, gelar_belakang, nip, no_whatsapp, jabatan, sekolah_id, status_verifikasi)
VALUES 
('guru-001', 'siti.rahmawati@sekolah.sch.id', 'Siti Rahmawati', 'S.Pd', '19870512 201101 2 008', '0812-9876-5432', 'Guru Pembina Olimpiade Matematika', 'sch-001', 'terverifikasi');
