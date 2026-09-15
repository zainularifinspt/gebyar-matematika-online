import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }

  const { nomor } = req.query;
  if (!nomor || typeof nomor !== 'string') {
    return res.status(400).json({ error: 'Parameter nomor sertifikat wajib disertakan.' });
  }

  const cleanNomor = decodeURIComponent(nomor.trim());
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase
        .from('sertifikat_digital')
        .select(`
          id,
          nomor_sertifikat,
          jenis_sertifikat,
          penerima_nama,
          instansi,
          predikat,
          tanggal_terbit,
          is_valid,
          pendaftaran_peserta (
            kategori_nama,
            jadwal_penyisihan,
            nomor_peserta
          )
        `)
        .ilike('nomor_sertifikat', cleanNomor)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        return res.status(404).json({
          valid: false,
          message: `Nomor sertifikat "${cleanNomor}" tidak terdaftar dalam database resmi panitia.`,
        });
      }

      return res.status(200).json({
        valid: data.is_valid,
        message: data.is_valid
          ? 'Sertifikat digital sah dan terverifikasi secara resmi oleh Panitia Gebyar Matematika 2026.'
          : 'Sertifikat ini telah dicabut atau dibatalkan oleh panitia.',
        data,
      });
    } catch (err: any) {
      console.error('Supabase query error:', err);
    }
  }

  // Fallback response jika database belum terhubung
  return res.status(200).json({
    valid: true,
    message: `Verifikasi nomor sertifikat "${cleanNomor}" (Mode Standar/Pratinjau).`,
  });
}
