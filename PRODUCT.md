# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React

## Users

1. **Peserta Mandiri (Siswa SD, SMP, SMA)**: Siswa yang mendaftar secara mandiri untuk berkompetisi, mengecek jadwal, mengikuti ujian CBT, dan mengunduh kartu ujian serta e-sertifikat ber-QR resmi.
2. **Guru Pendamping & Sekolah**: Guru atau perwakilan instansi sekolah yang mendaftarkan delegasi siswa secara kolektif, mengelola data peserta sekolah, dan mengunduh sertifikat rombongan.
3. **Panitia Pelaksana & Super Admin**: Penyelenggara kompetisi yang memantau rekap pendaftaran, memverifikasi pembayaran/transaksi Midtrans, mengawasi status CBT daring, dan mengelola panitia.

## Product Purpose

Platform resmi terpadu kompetisi matematika daring nasional **Gebyar Matematika Online**. Platform ini memfasilitasi seluruh siklus kompetisi matematika nasional mulai dari pendaftaran instan tanpa manual approval, verifikasi pembayaran otomatis (Midtrans QRIS & Virtual Account), kartu ujian otomatis, arsip bank soal, galeri kegiatan, hingga verifikasi keaslian sertifikat berbasis QR code dan hash digital.

## Positioning

Solusi kompetisi matematika nasional yang 100% transparan, instan, dan terintegrasi: pendaftar langsung mendapatkan ID peserta & kartu ujian begitu pembayaran terkonfirmasi, dengan portal terpisah untuk Siswa, Guru Pendamping, dan Panitia Pelaksana.

## Operating Context

- Dioperasikan secara daring oleh siswa dan guru di seluruh 34 provinsi Indonesia dari berbagai perangkat (desktop sekolah/rumah, tablet, dan smartphone).
- Mengelola data sensitif ujian: nomor peserta, jadwal sesi CBT, verifikasi pembayaran, dan keaslian e-sertifikat nasional.
- Alur cepat: pengunjung dapat melihat kategori lomba, mengunduh arsip soal tahun sebelumnya, mendaftar dalam hitungan menit, dan memeriksa bukti bayar.

## Capabilities and Constraints

- **Multi-Role Portal**: Akses langsung ke Beranda publik, Status Pembayaran (Midtrans), Portal Guru & Sekolah, Dashboard Panitia, dan Detail Pendaftaran Peserta.
- **Jenjang Lomba**: SD/MI (Kelas 4-6), SMP/MTs (Kelas 7-9), SMA/MA/SMK (Kelas 10-12).
- **Verifikasi Sertifikat**: Pengecekan kode sertifikat dengan validasi keaslian real-time.
- **Ketersediaan Offline/Responsif**: Harus tetap tajam, cepat, dan terbaca dengan sempurna pada mobile (390px) hingga wide desktop (1440px+).

## Brand Commitments

- Nama Resmi: **Gebyar Matematika Online**
- Identitas: Prestisius, futuristik, ilmiah, ramah edukasi, dan terpercaya.
- Estetika Terpilih: **3D Glassmorphism Polychromatic** (Frosted acrylic glass, specular light reflections, ambient jewel-tone glows, floating 3D mathematical geometry, rich vibrant color coding per level, tactile depth).

## Evidence on Hand

- Data kategori lomba, biaya, jadwal babak penyisihan & final di `src/data/mockData.ts`.
- Komponen simulasi pembayaran Midtrans di `src/pages/PaymentPage.tsx`.
- Portal pendaftaran mandiri & kolektif di `src/pages/GuruAccountPage.tsx` dan `src/pages/RegistrationDetailPage.tsx`.
- Dashboard panitia komprehensif di `src/pages/DashboardPanitiaPage.tsx`.

## Product Principles

1. **Clarity Over Decoration**: Efek 3D glassmorphism harus memperkuat hierarki visual dan keterbacaan data, bukan mengaburkan teks atau tombol.
2. **Vibrant & Alive**: Warna-warni kaya (vivid emerald, cyan, royal violet, solar gold, rose) membedakan jenjang dan status secara instan tanpa terasa melelahkan.
3. **Tactile Depth**: Setiap kartu dan tombol terasa seperti objek nyata dari kaca akrilik berbobot dengan pantulan cahaya dan respon hover interaktif.
4. **Zero AI Slop**: Tidak ada gradien abu-abu pudar, tidak ada kartu boilerplate yang identik, teks memiliki kontras rasio tinggi (WCAG AA/AAA).
