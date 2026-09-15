import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageCircle, 
  Clock, 
  Send,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import type { FaqItem } from '../../types';

interface FaqContactSectionProps {
  faqs: FaqItem[];
}

export const FaqContactSection: React.FC<FaqContactSectionProps> = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [activeFaqTab, setActiveFaqTab] = useState<string>('Semua');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    nama: '',
    email: '',
    pesan: '',
  });

  const categories = ['Semua', 'Pendaftaran', 'Pembayaran', 'Ujian Online', 'Sertifikat'];

  const filteredFaqs = faqs.filter(
    (f) => activeFaqTab === 'Semua' || f.kategori === activeFaqTab
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nama || !contactForm.pesan) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ nama: '', email: '', pesan: '' });
    }, 4000);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-3d-base text-emerald-800 text-xs font-black uppercase tracking-wider shadow-sm border border-white/90">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            Bantuan & Layanan
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-['Outfit']">
            Tanya Jawab & Kontak Panitia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Temukan jawaban cepat atas pertanyaan seputar pendaftaran, pembayaran Midtrans, atau hubungi langsung panitia pendamping.
          </p>
        </div>

        {/* 2 Columns: Left FAQ Accordion, Right Contact Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* FAQ Accordion (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter category pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFaqTab(cat)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    activeFaqTab === cat
                      ? 'btn-3d-primary text-white'
                      : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion Items (3D Glass) */}
            <div className="space-y-3.5">
              {filteredFaqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl glass-3d-base border border-white/90 overflow-hidden shadow-sm transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs">
                          {faq.kategori}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-slate-900 font-['Outfit']">
                          {faq.pertanyaan}
                        </span>
                      </div>
                      <ChevronDown 
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-emerald-600' : ''
                        }`} 
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-white/50 font-normal">
                        {faq.jawaban}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Contact Cards & Direct Message (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Help Card (3D Emerald Jewel) */}
            <div className="p-7 rounded-3xl glass-3d-emerald border border-emerald-300/90 shadow-xl space-y-4 relative overflow-hidden">
              {/* Specular Rim */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 border border-white/40">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-emerald-950 font-['Outfit']">
                    Layanan Helpdesk WhatsApp
                  </h4>
                  <p className="text-xs text-emerald-800 font-semibold">Respon cepat panitia setiap hari</p>
                </div>
              </div>

              <p className="text-xs text-emerald-900/90 leading-relaxed font-normal">
                Butuh bantuan kendala teknis pembayaran atau verifikasi sekolah? Tim helpdesk panitia siap melayani via WhatsApp resmi.
              </p>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/25 cursor-pointer"
              >
                <span>Hubungi via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Contact Form (3D Glass Elevated) */}
            <div className="p-7 rounded-3xl glass-3d-elevated border border-white/95 shadow-2xl space-y-4 relative overflow-hidden">
              {/* Specular Rim */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

              <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                Kirim Pesan ke Panitia
              </h4>

              {contactSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-black text-slate-900">Pesan Berhasil Terkirim!</p>
                  <p className="text-[11px] text-emerald-800 font-semibold">
                    Panitia akan merespon pertanyaan Anda ke alamat email yang disertakan.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Nama Lengkap / Sekolah
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.nama}
                      onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
                      placeholder="Mis: Budi Santoso (SMA 1)"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Email Aktif
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Pertanyaan / Kendala
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={contactForm.pesan}
                      onChange={(e) => setContactForm({ ...contactForm, pesan: e.target.value })}
                      placeholder="Tuliskan pertanyaan Anda..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/90 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 resize-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-3d-primary w-full py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                    <span>Kirim Pesan</span>
                  </button>
                </form>
              )}

              {/* Secretariat info note */}
              <div className="pt-3 border-t border-slate-200/70 text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Jam Layanan: Senin - Sabtu (08.00 - 17.00 WIB)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
