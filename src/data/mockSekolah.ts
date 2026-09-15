export interface ReferensiSekolah {
  npsn: string;
  nama: string;
  jenjang: 'SD/MI' | 'SMP/MTs' | 'SMA/MA/SMK';
  status: 'Negeri' | 'Swasta';
  kabupatenKota: string;
  provinsi: string;
  alamat: string;
  kategoriRekomendasi: string;
}

export const MOCK_DATABASE_SEKOLAH: ReferensiSekolah[] = [
  {
    npsn: '20108842',
    nama: 'SMP IT Al-Madani',
    jenjang: 'SMP/MTs',
    status: 'Swasta',
    kabupatenKota: 'Kota Bandung',
    provinsi: 'Jawa Barat',
    alamat: 'Jl. Pasir Kaliki No. 128, Cicendo',
    kategoriRekomendasi: 'kat-smp',
  },
  {
    npsn: '20403176',
    nama: 'SMA Negeri 3 Yogyakarta',
    jenjang: 'SMA/MA/SMK',
    status: 'Negeri',
    kabupatenKota: 'Kota Yogyakarta',
    provinsi: 'DI Yogyakarta',
    alamat: 'Jl. Yos Sudarso No. 7, Kotabaru, Gondokusuman',
    kategoriRekomendasi: 'kat-sma',
  },
  {
    npsn: '20532210',
    nama: 'MAN 2 Kota Malang',
    jenjang: 'SMA/MA/SMK',
    status: 'Negeri',
    kabupatenKota: 'Kota Malang',
    provinsi: 'Jawa Timur',
    alamat: 'Jl. Bandung No. 7, Penanggungan, Klojen',
    kategoriRekomendasi: 'kat-sma',
  },
  {
    npsn: '20328901',
    nama: 'SMP Negeri 1 Semarang',
    jenjang: 'SMP/MTs',
    status: 'Negeri',
    kabupatenKota: 'Kota Semarang',
    provinsi: 'Jawa Tengah',
    alamat: 'Jl. Kyai Saleh No. 3, Mugassari, Semarang Selatan',
    kategoriRekomendasi: 'kat-smp',
  },
  {
    npsn: '20100412',
    nama: 'SD Pelita Bangsa',
    jenjang: 'SD/MI',
    status: 'Swasta',
    kabupatenKota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    alamat: 'Jl. Kemang Raya No. 45, Mampang Prapatan',
    kategoriRekomendasi: 'kat-sd',
  },
  {
    npsn: '20103388',
    nama: 'SD Islam Al-Azhar 1 Kebayoran Baru',
    jenjang: 'SD/MI',
    status: 'Swasta',
    kabupatenKota: 'Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    alamat: 'Jl. Sisingamangaraja No. 1, Kebayoran Baru',
    kategoriRekomendasi: 'kat-sd',
  },
  {
    npsn: '20219430',
    nama: 'SMA Negeri 1 Bogor',
    jenjang: 'SMA/MA/SMK',
    status: 'Negeri',
    kabupatenKota: 'Kota Bogor',
    provinsi: 'Jawa Barat',
    alamat: 'Jl. Ir. H. Juanda No. 16, Paledang, Bogor Tengah',
    kategoriRekomendasi: 'kat-sma',
  },
  {
    npsn: '20536410',
    nama: 'SMP Negeri 1 Surabaya',
    jenjang: 'SMP/MTs',
    status: 'Negeri',
    kabupatenKota: 'Kota Surabaya',
    provinsi: 'Jawa Timur',
    alamat: 'Jl. Pacar No. 4-6, Ketabang, Genteng',
    kategoriRekomendasi: 'kat-smp',
  },
];
