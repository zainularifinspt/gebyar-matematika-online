import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';
import { MathLogo } from '../common/MathLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-24 border-t border-white/80 bg-white/75 backdrop-blur-2xl overflow-hidden shadow-lg shadow-slate-900/5">
      {/* Top Specular Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <MathLogo size="md" showSubtitle={false} />
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Platform terpadu kompetisi matematika daring nasional. Menyatukan pendaftaran instan tanpa approval manual, pembayaran otomatis Midtrans (QRIS & VA), ujian CBT andal, serta verifikasi e-sertifikat ber-QR resmi.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold glass-3d-emerald text-emerald-900 border border-emerald-300 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Sertifikat Ber-QR Validasi Nasional
              </span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div>
            <h4 className="text-slate-900 font-black text-xs mb-4 tracking-wider uppercase font-['Outfit']">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#profil" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Profil & Penyelenggara
                </a>
              </li>
              <li>
                <a href="#kategori" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Kategori & Kuota Lomba
                </a>
              </li>
              <li>
                <a href="#jadwal" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Jadwal & Timeline
                </a>
              </li>
              <li>
                <a href="#arsip" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Arsip Soal & Pembahasan
                </a>
              </li>
              <li>
                <a href="#video" className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  Galeri Video Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          {/* Kategori Jenjang (3D Glass Badges) */}
          <div>
            <h4 className="text-slate-900 font-black text-xs mb-4 tracking-wider uppercase font-['Outfit']">
              Kategori Jenjang
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="p-2.5 rounded-xl glass-3d-emerald">
                <span className="text-emerald-950 font-extrabold block text-xs">Tingkat SD / MI</span>
                <p className="text-[11px] text-emerald-800 font-semibold">Kelas 4-6 — Logika Aritmetika</p>
              </li>
              <li className="p-2.5 rounded-xl glass-3d-cyan">
                <span className="text-sky-950 font-extrabold block text-xs">Tingkat SMP / MTs</span>
                <p className="text-[11px] text-sky-800 font-semibold">Kelas 7-9 — Aljabar & Geometri</p>
              </li>
              <li className="p-2.5 rounded-xl glass-3d-violet">
                <span className="text-purple-950 font-extrabold block text-xs">Tingkat SMA / SMK</span>
                <p className="text-[11px] text-purple-800 font-semibold">Kelas 10-12 — Standar Olimpiade</p>
              </li>
            </ul>
          </div>

          {/* Kontak & Sekretariat */}
          <div>
            <h4 className="text-slate-900 font-black text-xs mb-4 tracking-wider uppercase font-['Outfit']">
              Sekretariat Panitia
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-xs">Gedung Pusat Gebyar Matematika, Kampus FMIPA, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <a href="mailto:panitia@gebyarmatematika.id" className="text-xs hover:text-indigo-600 transition-colors font-semibold">
                  panitia@gebyarmatematika.id
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-xs hover:text-indigo-600 transition-colors inline-flex items-center gap-1 font-semibold">
                  +62 812-3456-7890 (WA Helpdesk)
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Panitia Gebyar Matematika Online. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-1.5 font-semibold text-slate-600">
            <span>Didesain dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>untuk talenta matematika se-Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
