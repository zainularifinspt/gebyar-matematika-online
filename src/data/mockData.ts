import type { 
  KategoriLomba, 
  Pengumuman, 
  JadwalEvent, 
  ArsipSoal, 
  VideoKegiatan, 
  FaqItem, 
  Pembayaran, 
  KartuPeserta,
  PesertaAdminItem,
  NilaiUjianItem,
  TemplateDokumenItem,
  SiswaBimbinganItem,
  TagihanKolektifItem,
  GuruProfileData,
  BatchPendaftaranItem
} from '../types';

export const MOCK_KATEGORI: KategoriLomba[] = [
  {
    id: 'kat-sd',
    nama: 'Matematika Dasar SD / MI',
    kategori: 'Olimpiade Perorangan',
    tingkat: 'SD/MI',
    tipeKepesertaan: 'individu',
    biaya: 50000,
    terdaftar: 0,
    status: 'aktif',
    persyaratan: [
      'Siswa aktif kelas 4, 5, atau 6 SD/MI se-Indonesia',
      'Memiliki NISN valid yang terdaftar di Kemendikbudristek/Kemenag',
      'Surat keterangan siswa aktif atau Kartu Pelajar',
      'Pas foto formal berwarna ukuran 3x4'
    ],
    jadwalPenyisihan: '24 Oktober 2027, 08:30 - 10:30 WIB',
    jadwalFinal: '07 November 2027, 09:00 - 11:30 WIB',
    deskripsi: 'Kompetisi penalaran aritmetika, pola bilangan, geometri dasar, dan pemecahan masalah kontekstual untuk siswa kelas 4, 5, dan 6 SD/MI.',
    hadiah: [
      'Juara 1: Trofi Emas + Piagam + Uang Pembinaan Rp 3.500.000',
      'Juara 2: Trofi Perak + Piagam + Uang Pembinaan Rp 2.500.000',
      'Juara 3: Trofi Perunggu + Piagam + Uang Pembinaan Rp 1.500.000',
      'Harapan 1-3: Piagam Penghargaan + Merchandise Spesial'
    ],
    materi: [
      'Aritmetika & Teori Bilangan Dasar',
      'Geometri Bangun Datar & Ruang Sederhana',
      'Kombinatorika & Pola Bilangan',
      'Logika dan Eksplorasi Soal Cerita'
    ],
    warnaAksen: 'amber',
  },
  {
    id: 'kat-smp',
    nama: 'Matematika Terapan SMP / MTs',
    kategori: 'Olimpiade Perorangan',
    tingkat: 'SMP/MTs',
    tipeKepesertaan: 'individu',
    biaya: 65000,
    terdaftar: 0,
    status: 'aktif',
    persyaratan: [
      'Siswa aktif kelas 7, 8, atau 9 SMP/MTs se-Indonesia',
      'Memiliki NISN aktif dan terverifikasi',
      'Kartu Pelajar atau Surat Keterangan dari Kepala Sekolah',
      'Pas foto formal berwarna ukuran 3x4'
    ],
    jadwalPenyisihan: '24 Oktober 2027, 13:00 - 15:00 WIB',
    jadwalFinal: '07 November 2027, 13:00 - 15:30 WIB',
    deskripsi: 'Tantangan aljabar, teori bilangan, statistika terapan, dan eksplorasi logika matematika untuk siswa kelas 7, 8, dan 9 SMP/MTs.',
    hadiah: [
      'Juara 1: Trofi Emas + Piagam + Uang Pembinaan Rp 5.000.000',
      'Juara 2: Trofi Perak + Piagam + Uang Pembinaan Rp 3.500.000',
      'Juara 3: Trofi Perunggu + Piagam + Uang Pembinaan Rp 2.000.000',
      'Harapan 1-3: Piagam Penghargaan + Voucher Beasiswa'
    ],
    materi: [
      'Aljabar Lanjutan & Fungsi',
      'Geometri Bidang & Transformasi',
      'Teori Bilangan & Modulo',
      'Statistika, Peluang & Kombinatorika'
    ],
    warnaAksen: 'cyan',
  },
  {
    id: 'kat-sma',
    nama: 'Olimpiade Matematika SMA / MA / SMK',
    kategori: 'Olimpiade Perorangan',
    tingkat: 'SMA/MA/SMK',
    tipeKepesertaan: 'individu',
    biaya: 75000,
    terdaftar: 0,
    status: 'aktif',
    persyaratan: [
      'Siswa aktif kelas 10, 11, atau 12 SMA/MA/SMK se-Indonesia',
      'Memiliki NISN aktif dan terdaftar resmi',
      'Kartu Pelajar yang masih berlaku',
      'Pas foto formal berwarna ukuran 3x4'
    ],
    jadwalPenyisihan: '25 Oktober 2027, 09:00 - 11:30 WIB',
    jadwalFinal: '08 November 2027, 09:00 - 12:00 WIB',
    deskripsi: 'Kompetisi tingkat tinggi berstandar olimpiade nasional mencakup aljabar abstrak, trigonometri, kalkulus dasar, dan kombinatorika analitik.',
    hadiah: [
      'Juara 1: Trofi Bergilir Rektor ULM + Uang Pembinaan Rp 7.500.000 + Rekomendasi Pendidikan Matematika ULM',
      'Juara 2: Trofi Perak + Piagam + Uang Pembinaan Rp 5.000.000',
      'Juara 3: Trofi Perunggu + Piagam + Uang Pembinaan Rp 3.000.000',
      'Harapan 1-3: Medali Kehormatan + Piagam Prestasi'
    ],
    materi: [
      'Aljabar Kompleks & Polinomial',
      'Geometri Euklides & Trigonometri',
      'Teori Bilangan Olimpiade & Kongruensi',
      'Prinsip Pigeonhole & Kombinatorika Pembuktian'
    ],
    warnaAksen: 'purple',
  },
  {
    id: 'kat-ccm',
    nama: 'Cerdas Cermat Matematika (CCM)',
    kategori: 'Cerdas Cermat Cepat Tepat',
    tingkat: 'SMP/MTs & SMA',
    tipeKepesertaan: 'kelompok',
    maksAnggota: 3,
    biaya: 120000,
    terdaftar: 0,
    status: 'aktif',
    persyaratan: [
      'Tim terdiri dari 3 siswa aktif dari sekolah yang sama',
      'Surat Rekomendasi/Tugas Resmi dari Kepala Sekolah atau Guru Pembina',
      'Kartu Pelajar masing-masing anggota tim',
      '1 Ketua Tim bertindak sebagai kontak perwakilan delegasi'
    ],
    jadwalPenyisihan: '26 Oktober 2027, 09:00 - 12:00 WIB',
    jadwalFinal: '09 November 2027, 09:00 - 13:00 WIB',
    deskripsi: 'Kompetisi beregu 3 siswa yang menguji kecepatan berhitung, analisis strategi pemecahan masalah, dan kekompakan tim dalam babak rebutan & adu cepat matematika.',
    hadiah: [
      'Juara 1: Trofi Bergilir Dekan FKIP ULM + Uang Pembinaan Rp 6.000.000 + Sertifikat Tim Juara',
      'Juara 2: Trofi Perak + Piagam + Uang Pembinaan Rp 4.000.000',
      'Juara 3: Trofi Perunggu + Piagam + Uang Pembinaan Rp 2.500.000',
      'Harapan 1: Piagam Apresiasi + Paket Buku Olimpiade'
    ],
    materi: [
      'Aritmetika Cepat & Pola Bilangan Kilat',
      'Logika Matematika & Teka-Teki Pemecahan Masalah',
      'Aljabar Terapan & Geometri Praktis',
      'Strategi Adu Cepat & Babak Rebutan'
    ],
    warnaAksen: 'emerald',
  },
];

export const MOCK_PENGUMUMAN: Pengumuman[] = [
  {
    id: 'ann-1',
    judul: 'Pendaftaran Gelombang 1 Gebyar Matematika 2027 Resmi Dibuka!',
    ringkasan: 'Dapatkan diskon biaya early-bird untuk 100 pendaftar pertama dari seluruh Indonesia.',
    isi: 'Panitia Gebyar Matematika 2027 Jurusan Pendidikan Matematika ULM mengumumkan bahwa pendaftaran resmi dibuka mulai hari ini. Peserta mandiri dan sekolah dapat langsung mendaftarkan peserta dengan konfirmasi instan (QRIS & Virtual Account).',
    tanggal: '15 September 2027',
    kategori: 'Penting',
    isPenting: true,
  },
  {
    id: 'ann-2',
    judul: 'Panduan Teknis Sistem Ujian Daring Terintegrasi',
    ringkasan: 'Simulasi ujian mandiri dapat diakses H-7 sebelum babak penyisihan dengan akun yang sama.',
    isi: 'Web Ujian Gebyar Matematika menggunakan sistem proctoring daring modern. Peserta cukup login menggunakan akun pendaftaran yang telah terkonfirmasi lunas.',
    tanggal: '12 September 2027',
    kategori: 'Informasi',
    isPenting: false,
  },
  {
    id: 'ann-3',
    judul: 'Perilisan Arsip Soal dan Pembahasan Resmi Tahun Sebelumnya',
    ringkasan: 'Unduh paket soal latihan resmi untuk persiapan seleksi penyisihan.',
    isi: 'Arsip soal lengkap beserta lembar kunci jawaban dan pembahasan untuk tingkat SD, SMP, dan SMA telah tersedia di tab Arsip Soal.',
    tanggal: '08 September 2027',
    kategori: 'Informasi',
    isPenting: false,
  },
];

export const MOCK_JADWAL: JadwalEvent[] = [
  {
    id: 'j-1',
    fase: 'Pendaftaran Gelombang 1',
    tanggal: '15 Sep - 10 Okt 2027',
    keterangan: 'Pendaftaran dibuka terbuka untuk seluruh peserta mandiri & delegasi sekolah nasional.',
    status: 'berlangsung',
  },
  {
    id: 'j-2',
    fase: 'Pendaftaran Gelombang 2',
    tanggal: '11 Okt - 20 Okt 2027',
    keterangan: 'Pendaftaran reguler nasional dan finalisasi data peserta lomba.',
    status: 'akan_datang',
  },
  {
    id: 'j-3',
    fase: 'Uji Coba & Simulasi Sistem Ujian',
    tanggal: '21 - 22 Okt 2027',
    keterangan: 'Simulasi koneksi dan adaptasi antarmuka Web Ujian Online.',
    status: 'akan_datang',
  },
  {
    id: 'j-4',
    fase: 'Babak Penyisihan (Online Serentak)',
    tanggal: '24 - 25 Okt 2027',
    keterangan: 'Pelaksanaan ujian serentak nasional berbasis CBT proctoring.',
    status: 'akan_datang',
  },
  {
    id: 'j-5',
    fase: 'Pengumuman Finalis (Top 20)',
    tanggal: '30 Okt 2027',
    keterangan: 'Pengumuman 20 peserta terbaik per kategori yang lolos ke babak final.',
    status: 'akan_datang',
  },
  {
    id: 'j-6',
    fase: 'Babak Final & Grand Awarding',
    tanggal: '07 - 08 Nov 2027',
    keterangan: 'Ujian babak final, presentasi penalaran, dan seremoni pengumuman juara nasional.',
    status: 'akan_datang',
  },
];

export const MOCK_ARSIP_SOAL: ArsipSoal[] = [
  {
    id: 'soal-2024-sma',
    tahun: 2024,
    kategoriId: 'kat-sma',
    kategoriNama: 'Olimpiade SMA/MA/SMK',
    tingkat: 'SMA',
    judul: 'Naskah Soal & Kunci Jawaban Babak Penyisihan GM 2024',
    jumlahHalaman: 12,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Olimpiade-SMA-2024?usp=sharing',
    ukuranFile: '2.4 MB',
  },
  {
    id: 'soal-2024-smp',
    tahun: 2024,
    kategoriId: 'kat-smp',
    kategoriNama: 'Matematika Terapan SMP/MTs',
    tingkat: 'SMP',
    judul: 'Naskah Soal & Pembahasan Analitis Babak Penyisihan GM 2024',
    jumlahHalaman: 10,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Terapan-SMP-2024?usp=sharing',
    ukuranFile: '1.9 MB',
  },
  {
    id: 'soal-2024-sd',
    tahun: 2024,
    kategoriId: 'kat-sd',
    kategoriNama: 'Matematika Dasar SD/MI',
    tingkat: 'SD',
    judul: 'Naskah Soal Eksplorasi Aritmetika & Logika GM 2024',
    jumlahHalaman: 8,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Dasar-SD-2024?usp=sharing',
    ukuranFile: '1.6 MB',
  },
  {
    id: 'soal-2023-sma',
    tahun: 2023,
    kategoriId: 'kat-sma',
    kategoriNama: 'Olimpiade SMA/MA/SMK',
    tingkat: 'SMA',
    judul: 'Paket Soal Final & Kunci Solusi Gebyar Matematika 2023',
    jumlahHalaman: 14,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Olimpiade-SMA-2023?usp=sharing',
    ukuranFile: '3.1 MB',
  },
  {
    id: 'soal-2023-smp',
    tahun: 2023,
    kategoriId: 'kat-smp',
    kategoriNama: 'Matematika Terapan SMP/MTs',
    tingkat: 'SMP',
    judul: 'Paket Soal Penyisihan & Final Gebyar Matematika 2023',
    jumlahHalaman: 11,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Terapan-SMP-2023?usp=sharing',
    ukuranFile: '2.1 MB',
  },
  {
    id: 'soal-2022-all',
    tahun: 2022,
    kategoriId: 'kat-sd',
    kategoriNama: 'Kompilasi Lengkap SD, SMP, SMA',
    tingkat: 'Semua Tingkat',
    judul: 'Kompilasi Soal Seleksi Gebyar Matematika Nasional 2022',
    jumlahHalaman: 28,
    fileUrl: 'https://drive.google.com/drive/folders/1GM-Arsip-Semua-Tahun?usp=sharing',
    ukuranFile: '4.8 MB',
  },
];

export const MOCK_VIDEOS: VideoKegiatan[] = [
  {
    id: 'vid-1',
    judul: 'Aftermovie & Sorotan Kemeriahan Gebyar Matematika 2024',
    tahun: 2024,
    deskripsi: 'Kilasan antusiasme lebih dari 3.200 peserta dari 28 provinsi dalam kompetisi dan seremoni penghargaan nasional.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=800&auto=format&fit=crop&q=80',
    durasi: '04:18',
  },
  {
    id: 'vid-2',
    judul: 'Testimoni Juara 1 Olimpiade SMA & Tips Menghadapi Soal Penalaran',
    tahun: 2024,
    deskripsi: 'Berbagi pengalaman dan strategi manajemen waktu saat mengerjakan soal analitik babak final Gebyar Matematika.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    durasi: '05:45',
  },
  {
    id: 'vid-3',
    judul: 'Sambutan Dewan Juri & Penjelasan Standar Penilaian Nasional',
    tahun: 2023,
    deskripsi: 'Panduan objektivitas penilaian, integritas proctoring daring, dan rubrik solusi pembuktian matematika.',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',
    durasi: '06:12',
  },
];

export const MOCK_FAQ: FaqItem[] = [
  {
    id: 'faq-1',
    kategori: 'Pendaftaran',
    pertanyaan: 'Siapa saja yang boleh mendaftar di Gebyar Matematika Online?',
    jawaban: 'Pendaftaran terbuka untuk seluruh siswa SD/MI (kelas 4-6), SMP/MTs (kelas 7-9), dan SMA/MA/SMK sederajat di seluruh Indonesia. Pendaftaran dapat dilakukan secara mandiri oleh siswa maupun dikoordinasikan oleh guru pendamping/sekolah.',
  },
  {
    id: 'faq-2',
    kategori: 'Pembayaran',
    pertanyaan: 'Bagaimana metode pembayaran dan apakah verifikasi berjalan otomatis?',
    jawaban: 'Pembayaran didukung dengan opsi QRIS (GoPay, OVO, Dana, ShopeePay, BCA Mobile, dll) serta Virtual Account (BCA, Mandiri, BNI, BRI, Permata). Verifikasi terjadi secara real-time dan otomatis; pendaftaran langsung aktif dan kartu peserta langsung terbit tanpa harus menunggu konfirmasi panitia.',
  },
  {
    id: 'faq-3',
    kategori: 'Ujian Online',
    pertanyaan: 'Di mana peserta mengerjakan ujian dan apakah butuh instalasi aplikasi khusus?',
    jawaban: 'Ujian dilaksanakan secara online melalui portal Web Ujian mandiri. Peserta cukup membuka browser modern (Chrome, Edge, Firefox) di laptop/komputer berkamera tanpa perlu mengunduh aplikasi tambahan.',
  },
  {
    id: 'faq-4',
    kategori: 'Sertifikat',
    pertanyaan: 'Apakah semua peserta memperoleh sertifikat dan bagaimana cara mengecek keasliannya?',
    jawaban: 'Ya, seluruh peserta yang mengikuti babak penyisihan mendapatkan e-sertifikat resmi ber-QR code. Siapa pun dapat memverifikasi keaslian sertifikat melalui menu Cek Keaslian Sertifikat di website ini.',
  },
  {
    id: 'faq-5',
    kategori: 'Pendaftaran',
    pertanyaan: 'Apakah satu akun dapat mendaftarkan lebih dari satu siswa?',
    jawaban: 'Ya! Guru pendamping atau koordinator sekolah dapat mendaftarkan banyak siswa sekaligus dari satu akun dashboard, dan status tiap siswa dapat dipantau dalam satu tabel terpusat.',
  },
];

export const MOCK_PEMBAYARAN_AKTIF: Pembayaran = {
  id: 'pay-001',
  orderId: 'GM27-ORD-98412',
  pendaftaranId: 'reg-001',
  metode: 'QRIS',
  kodeBayar: 'ID102003910293049182390192839',
  jumlah: 75000,
  biayaLayanan: 1500,
  total: 76500,
  status: 'menunggu_pembayaran',
  waktuBatas: '23:59:59',
  peserta: {
    namaSiswa: 'Peserta Terdaftar',
    asalSekolah: 'Sekolah Pendaftar',
    kategoriNama: 'Olimpiade Matematika SMA / MA / SMK',
    tingkat: 'SMA/MA/SMK',
    emailPendaftar: 'peserta@gmail.com',
    noHp: '0812-0000-0000',
  },
};

export const MOCK_RIWAYAT_PEMBAYARAN: Pembayaran[] = [];

export const MOCK_KARTU_PESERTA: KartuPeserta = {
  id: 'kp-001',
  pendaftaranId: 'reg-001',
  kodeKartu: 'GM27-SMA-0142',
  namaSiswa: 'Peserta Terdaftar',
  asalSekolah: 'Sekolah Pendaftar',
  kategori: 'Olimpiade Matematika SMA / MA / SMK',
  jadwalUjian: 'Minggu, 24 Oktober 2027 (09:00 - 11:30 WIB)',
  sesi: 'Sesi 1 (Pagi)',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=GM27-SMA-0142',
  fileUrl: '#',
};

export interface PanitiaMember {
  id: string;
  nama: string;
  email: string;
  username: string;
  password?: string;
  divisi: 'Penjurian & CBT' | 'Kesekretariatan & Verifikasi' | 'IT & Infrastruktur' | 'Bendahara & Keuangan' | 'Logistik & Sertifikat';
  role: 'Staf Panitia' | 'Koordinator Divisi' | 'Super Admin';
  status: 'aktif' | 'nonaktif';
  terakhirLogin: string;
}

// Data Pendaftar Dimulai Bersih (Tanpa Dummy Data)
export const MOCK_PESERTA_ADMIN: PesertaAdminItem[] = [];

// Data Nilai CBT Dimulai Bersih (Tanpa Dummy Data)
export const MOCK_NILAI_UJIAN: NilaiUjianItem[] = [];

// Daftar Akun Panitia Pelaksana Resmi
export const MOCK_PANITIA: PanitiaMember[] = [
  {
    id: 'panitia-root-1',
    nama: 'M. Zainul Arifin',
    email: 'zainularifin9195@gmail.com',
    username: 'zainularifin9195',
    divisi: 'IT & Infrastruktur',
    role: 'Super Admin',
    status: 'aktif',
    terakhirLogin: 'Online Sekarang',
  },
  {
    id: 'panitia-root-2',
    nama: 'M. Zainul Arifin (Admin ULM)',
    email: 'mzainul.arifin@ulm.ac.id',
    username: 'admin',
    divisi: 'IT & Infrastruktur',
    role: 'Super Admin',
    status: 'aktif',
    terakhirLogin: 'Online Sekarang',
  },
  {
    id: 'panitia-1',
    nama: 'Koordinator Penjurian & CBT',
    email: 'cbt@gebyar.id',
    username: 'cbt_gebyar',
    divisi: 'Penjurian & CBT',
    role: 'Koordinator Divisi',
    status: 'aktif',
    terakhirLogin: 'Baru ditambahkan',
  },
  {
    id: 'panitia-2',
    nama: 'Staf Kesekretariatan & Verifikasi',
    email: 'sekretariat@gebyar.id',
    username: 'sekretariat_gebyar',
    divisi: 'Kesekretariatan & Verifikasi',
    role: 'Staf Panitia',
    status: 'aktif',
    terakhirLogin: 'Baru ditambahkan',
  },
];

export const MOCK_TEMPLATE_DOKUMEN: TemplateDokumenItem[] = [
  {
    id: 'tpl-001',
    jenis: 'sertifikat',
    nama: 'Template E-Sertifikat Juara & Peserta GM 2027 (Resmi)',
    fileUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1200&auto=format&fit=crop&q=80',
    aktif: true,
    diunggahOleh: 'Super Admin / Ketua Panitia ULM',
    tanggalUnggah: '01 Sep 2027',
    layoutJson: {
      namaPosition: { x: 50, y: 45, fontSize: 32 },
      sekolahPosition: { x: 50, y: 55, fontSize: 18 },
      nomorPosition: { x: 50, y: 65, fontSize: 14 },
      qrPosition: { x: 80, y: 80, size: 90 },
    },
  },
  {
    id: 'tpl-002',
    jenis: 'kartu_peserta',
    nama: 'Template Kartu Peserta Daring (A4 Landscape)',
    fileUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
    aktif: true,
    diunggahOleh: 'Divisi Kesekretariatan ULM',
    tanggalUnggah: '05 Sep 2027',
    layoutJson: {
      namaPosition: { x: 30, y: 35, fontSize: 24 },
      sekolahPosition: { x: 30, y: 45, fontSize: 16 },
      nomorPosition: { x: 30, y: 55, fontSize: 18 },
      qrPosition: { x: 75, y: 50, size: 110 },
    },
  },
];

export const MOCK_GURU_PROFILE: GuruProfileData = {
  id: 'guru-001',
  nama: 'Siti Rahmawati, S.Pd',
  nip: '19870512 201101 2 008',
  email: 'siti.rahmawati@sekolah.sch.id',
  telepon: '0812-9876-5432',
  sekolah: 'SMP IT Al-Madani',
  npsn: '20108842',
  kabupatenKota: 'Kota Bandung',
  provinsi: 'Jawa Barat',
  jabatan: 'Guru Pembina Olimpiade Matematika',
  jenjang: 'SMP/MTs',
  statusSekolah: 'Swasta',
  alamatSekolah: 'Jl. Pasir Kaliki No. 128, Cicendo, Kota Bandung',
  teleponSekolah: '(022) 7208192',
  emailSekolah: 'kontak@smpitalmadani.sch.id',
  suratTugasUrl: 'https://example.com/docs/surat-tugas-pembimbing-2027.pdf',
};

export const MOCK_SISWA_BIMBINGAN: SiswaBimbinganItem[] = [];

export const MOCK_TAGIHAN_KOLEKTIF: TagihanKolektifItem[] = [];

export const MOCK_BATCH_PENDAFTARAN: BatchPendaftaranItem[] = [];


