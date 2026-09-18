export interface KategoriLomba {
  id: string;
  nama: string;
  kategori?: string;
  tingkat: 'SD/MI' | 'SMP/MTs' | 'SMA/MA/SMK' | 'Umum' | string;
  tipeKepesertaan: 'individu' | 'kelompok';
  maksAnggota?: number;
  biaya: number;
  deskripsi: string;
  persyaratan?: string[];
  jadwalPenyisihan?: string;
  jadwalFinal?: string;
  hadiah?: string[];
  materi?: string[];
  warnaAksen: 'amber' | 'cyan' | 'purple' | 'emerald' | 'rose' | 'blue';
  status: 'aktif' | 'tutup';
  terdaftar?: number;
  kuota?: number;
}

export interface Pengumuman {
  id: string;
  judul: string;
  ringkasan: string;
  isi: string;
  tanggal: string;
  kategori: 'Penting' | 'Jadwal' | 'Hasil' | 'Informasi';
  isPenting?: boolean;
}

export interface JadwalEvent {
  id: string;
  fase: string;
  tanggal: string;
  keterangan: string;
  status: 'selesai' | 'berlangsung' | 'akan_datang';
}

export interface ArsipSoal {
  id: string;
  tahun: number;
  kategoriId: string;
  kategoriNama: string;
  tingkat: string;
  judul: string;
  jumlahHalaman: number;
  fileUrl: string;
  ukuranFile: string;
}

export interface VideoKegiatan {
  id: string;
  judul: string;
  tahun: number;
  deskripsi: string;
  embedUrl: string;
  thumbnailUrl: string;
  durasi: string;
}

export interface FaqItem {
  id: string;
  pertanyaan: string;
  jawaban: string;
  kategori: 'Pendaftaran' | 'Pembayaran' | 'Ujian Online' | 'Sertifikat';
}

export type MetodePembayaran = 'QRIS' | 'BCA_VA' | 'MANDIRI_VA' | 'BNI_VA' | 'BRI_VA';
export type StatusPembayaran = 'menunggu_pembayaran' | 'lunas' | 'kedaluwarsa' | 'gagal';

export interface DetailPesertaOrder {
  namaSiswa: string;
  asalSekolah: string;
  kategoriNama: string;
  tingkat: string;
  emailPendaftar: string;
  noHp: string;
  tipeKepesertaan?: 'individu' | 'kelompok';
  namaTim?: string;
  anggotaTim?: string[];
}

export interface Pembayaran {
  id: string;
  orderId: string;
  pendaftaranId: string;
  metode: MetodePembayaran;
  kodeBayar: string;
  jumlah: number;
  biayaLayanan: number;
  total: number;
  status: StatusPembayaran;
  waktuBatas: string;
  waktuLunas?: string;
  peserta: DetailPesertaOrder;
  buktiBayarUrl?: string;
}

export interface KartuPeserta {
  id: string;
  pendaftaranId: string;
  kodeKartu: string;
  namaSiswa: string;
  asalSekolah: string;
  kategori: string;
  jadwalUjian: string;
  sesi: string;
  qrCodeUrl: string;
  fileUrl: string;
  tipeKepesertaan?: 'individu' | 'kelompok';
  namaTim?: string;
}

export interface PesertaAdminItem {
  id: string;
  pendaftaranId: string;
  namaSiswa: string;
  kelas: string;
  asalSekolah: string;
  kota: string;
  kategoriId: string;
  kategoriNama: string;
  namaPendaftar: string;
  emailPendaftar: string;
  rolePendaftar: 'Siswa Mandiri' | 'Guru Pendamping';
  statusPembayaran: StatusPembayaran;
  orderId: string;
  tanggalDaftar: string;
  kartuTercetak: boolean;
  tipeKepesertaan?: 'individu' | 'kelompok';
  namaTim?: string;
}

export interface NilaiUjianItem {
  id: string;
  siswaId: string;
  namaSiswa: string;
  asalSekolah: string;
  kategoriNama: string;
  skor: number;
  jumlahBenar: number;
  jumlahSalah: number;
  jumlahKosong: number;
  waktuPengerjaan: string;
  sesiUjian: string;
  peringkat?: number;
  statusLolos: boolean;
}

export interface TemplateDokumenItem {
  id: string;
  jenis: 'sertifikat' | 'kartu_peserta';
  nama: string;
  fileUrl: string;
  aktif: boolean;
  diunggahOleh: string;
  tanggalUnggah: string;
  layoutJson: {
    namaPosition: { x: number; y: number; fontSize: number };
    sekolahPosition: { x: number; y: number; fontSize: number };
    nomorPosition: { x: number; y: number; fontSize: number };
    qrPosition: { x: number; y: number; size: number };
  };
}

export interface SiswaBimbinganItem {
  id: string;
  namaSiswa: string;
  nisn: string;
  kelas: string;
  kategoriId: string;
  kategoriNama: string;
  statusPembayaran: StatusPembayaran;
  orderId: string;
  nomorPeserta?: string;
  sesiUjian?: string;
  kartuTersedia: boolean;
  sertifikatTersedia: boolean;
}

export interface TagihanKolektifItem {
  id: string;
  orderId: string;
  tanggal: string;
  jumlahSiswa: number;
  totalBiaya: number;
  status: StatusPembayaran;
  metode: MetodePembayaran;
  rincianSiswa: string[];
}

export interface GuruProfileData {
  id: string;
  nama: string;
  nip?: string;
  email: string;
  telepon: string;
  sekolah: string;
  npsn: string;
  kabupatenKota: string;
  provinsi: string;
  jabatan: string;
  jenjang?: 'SD/MI' | 'SMP/MTs' | 'SMA/MA/SMK';
  statusSekolah?: 'Negeri' | 'Swasta';
  alamatSekolah?: string;
  teleponSekolah?: string;
  emailSekolah?: string;
  suratTugasUrl?: string;
}

export interface PesertaBatchItem {
  nama: string;
  nisn: string;
  kelas: string;
  kategori: string;
  biaya: number;
}

export interface BatchPendaftaranItem {
  id: string;
  batchCode: string;
  orderId: string;
  gelombang: 'Gelombang 1 (Early Bird)' | 'Gelombang 2 (Reguler)';
  tanggalDaftar: string;
  jumlahPeserta: number;
  peserta: PesertaBatchItem[];
  subtotal: number;
  diskonKolektif: number;
  totalBiaya: number;
  status: StatusPembayaran;
  metode: MetodePembayaran;
  berkasPendaftaranUrl: string;
}

