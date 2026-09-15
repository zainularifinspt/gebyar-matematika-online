-- ==========================================================
-- GEBYAR MATEMATIKA ONLINE 2026 - MASTER SUPABASE SCHEMA
-- Platform Terpadu Pendaftaran, Midtrans, & Sertifikasi Digital
-- Dialect: PostgreSQL (Supabase Compatible)
-- ==========================================================

-- Enable pgcrypto / uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABEL SEKOLAH (Satuan Pendidikan)
CREATE TABLE IF NOT EXISTS public.sekolah (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexing Sekolah
CREATE INDEX IF NOT EXISTS idx_sekolah_npsn ON public.sekolah(npsn);
CREATE INDEX IF NOT EXISTS idx_sekolah_nama ON public.sekolah(nama_sekolah);
CREATE INDEX IF NOT EXISTS idx_sekolah_kota ON public.sekolah(kabupaten_kota);
CREATE INDEX IF NOT EXISTS idx_sekolah_jenjang ON public.sekolah(jenjang);

-- 2. TABEL GURU (Pembimbing & Koordinator Lomba)
CREATE TABLE IF NOT EXISTS public.guru (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    google_id VARCHAR(100) UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    nama_lengkap VARCHAR(255) NOT NULL,
    gelar_depan VARCHAR(50),
    gelar_belakang VARCHAR(50),
    nip VARCHAR(30),
    nuptk VARCHAR(30),
    no_whatsapp VARCHAR(30) NOT NULL,
    jabatan VARCHAR(100) NOT NULL DEFAULT 'Guru Pembina Matematika',
    sekolah_id UUID REFERENCES public.sekolah(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    surat_tugas_url VARCHAR(500),
    status_verifikasi VARCHAR(20) DEFAULT 'terverifikasi' CHECK (status_verifikasi IN ('menunggu', 'terverifikasi', 'ditolak')),
    catatan_verifikasi TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexing Guru
CREATE INDEX IF NOT EXISTS idx_guru_email ON public.guru(email);
CREATE INDEX IF NOT EXISTS idx_guru_google_id ON public.guru(google_id);
CREATE INDEX IF NOT EXISTS idx_guru_sekolah_id ON public.guru(sekolah_id);
CREATE INDEX IF NOT EXISTS idx_guru_whatsapp ON public.guru(no_whatsapp);

-- 3. TABEL PENDAFTARAN BATCH (Kolektif Guru)
CREATE TABLE IF NOT EXISTS public.pendaftaran_batch (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guru_id UUID NOT NULL REFERENCES public.guru(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    batch_code VARCHAR(50) NOT NULL UNIQUE,
    order_id VARCHAR(50) NOT NULL UNIQUE,
    gelombang VARCHAR(50) NOT NULL,
    tanggal_daftar TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    jumlah_peserta INT NOT NULL DEFAULT 0,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0,
    diskon_kolektif NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_biaya NUMERIC(12, 2) NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'menunggu_pembayaran' CHECK (status IN ('menunggu_pembayaran', 'lunas', 'kedaluwarsa', 'gagal')),
    metode VARCHAR(30) NOT NULL DEFAULT 'QRIS',
    berkas_pendaftaran_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.pendaftaran_batch_peserta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID NOT NULL REFERENCES public.pendaftaran_batch(id) ON DELETE CASCADE ON UPDATE CASCADE,
    nama VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    kategori VARCHAR(100) NOT NULL,
    biaya NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_batch_guru_id ON public.pendaftaran_batch(guru_id);
CREATE INDEX IF NOT EXISTS idx_batch_order_id ON public.pendaftaran_batch(order_id);
CREATE INDEX IF NOT EXISTS idx_batch_status ON public.pendaftaran_batch(status);
CREATE INDEX IF NOT EXISTS idx_batch_peserta_batch_id ON public.pendaftaran_batch_peserta(batch_id);

-- 4. TABEL PENDAFTARAN PESERTA (Mandiri / Individual)
CREATE TABLE IF NOT EXISTS public.pendaftaran_peserta (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor_registrasi VARCHAR(50) NOT NULL UNIQUE,
    order_id VARCHAR(50) NOT NULL UNIQUE,
    user_id UUID,
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
    biaya_lomba NUMERIC(12, 2) NOT NULL,
    biaya_admin NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_biaya NUMERIC(12, 2) NOT NULL,
    status_pembayaran VARCHAR(30) NOT NULL DEFAULT 'menunggu_pembayaran' CHECK (status_pembayaran IN ('menunggu_pembayaran', 'lunas', 'kedaluwarsa', 'gagal')),
    metode_pembayaran VARCHAR(30) NOT NULL DEFAULT 'QRIS',
    kode_va VARCHAR(50),
    waktu_daftar TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    waktu_lunas TIMESTAMPTZ,
    bukti_bayar_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pendaftaran_nomor ON public.pendaftaran_peserta(nomor_registrasi);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_order ON public.pendaftaran_peserta(order_id);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_email ON public.pendaftaran_peserta(email);
CREATE INDEX IF NOT EXISTS idx_pendaftaran_status ON public.pendaftaran_peserta(status_pembayaran);

-- 5. TABEL SERTIFIKAT DIGITAL
CREATE TABLE IF NOT EXISTS public.sertifikat_digital (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pendaftaran_id UUID NOT NULL UNIQUE REFERENCES public.pendaftaran_peserta(id) ON DELETE CASCADE ON UPDATE CASCADE,
    nomor_sertifikat VARCHAR(100) NOT NULL UNIQUE,
    jenis_sertifikat VARCHAR(30) NOT NULL CHECK (jenis_sertifikat IN ('peserta', 'pembimbing', 'juara')),
    penerima_nama VARCHAR(255) NOT NULL,
    instansi VARCHAR(255) NOT NULL,
    predikat VARCHAR(100) DEFAULT 'Peserta Babak Penyisihan',
    file_pdf_url VARCHAR(500) NOT NULL,
    qr_verifikasi_url VARCHAR(500) NOT NULL,
    tanggal_terbit TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_valid BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sertifikat_nomor ON public.sertifikat_digital(nomor_sertifikat);

-- Row Level Security (RLS) policies
ALTER TABLE public.sekolah ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guru ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftaran_batch ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftaran_batch_peserta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pendaftaran_peserta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sertifikat_digital ENABLE ROW LEVEL SECURITY;

-- Allow public read for sekolah (referensi) and sertifikat (verifikasi QR publik)
CREATE POLICY "Allow public read on sekolah" ON public.sekolah FOR SELECT USING (true);
CREATE POLICY "Allow public read on sertifikat" ON public.sertifikat_digital FOR SELECT USING (true);

-- Allow service role full access for backend webhook & serverless functions
CREATE POLICY "Service role full access sekolah" ON public.sekolah USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access guru" ON public.guru USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access batch" ON public.pendaftaran_batch USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access peserta" ON public.pendaftaran_peserta USING (auth.jwt() ->> 'role' = 'service_role');
CREATE POLICY "Service role full access sertifikat" ON public.sertifikat_digital USING (auth.jwt() ->> 'role' = 'service_role');
