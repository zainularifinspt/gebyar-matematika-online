import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const notification = req.body;
  if (!notification || !notification.order_id) {
    return res.status(400).json({ error: 'Payload tidak valid.' });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
  const {
    order_id,
    status_code,
    gross_amount,
    signature_key,
    transaction_status,
    fraud_status,
    payment_type,
    settlement_time,
  } = notification;

  // 1. Verifikasi Keaslian Webhook Signature dari Midtrans (SHA-512)
  if (serverKey && signature_key) {
    const rawString = `${order_id}${status_code}${gross_amount}${serverKey}`;
    const calculatedHash = crypto.createHash('sha512').update(rawString).digest('hex');

    if (calculatedHash !== signature_key) {
      console.error('Signature Midtrans tidak cocok!', { calculatedHash, signature_key });
      return res.status(403).json({ error: 'Invalid Midtrans signature key.' });
    }
  }

  // 2. Tentukan status pembayaran baru
  let newStatus: 'lunas' | 'menunggu_pembayaran' | 'kedaluwarsa' | 'gagal' = 'menunggu_pembayaran';
  const now = settlement_time ? new Date(settlement_time).toISOString() : new Date().toISOString();

  if (transaction_status === 'capture') {
    if (fraud_status === 'challenge') {
      newStatus = 'menunggu_pembayaran';
    } else if (fraud_status === 'accept') {
      newStatus = 'lunas';
    }
  } else if (transaction_status === 'settlement') {
    newStatus = 'lunas';
  } else if (transaction_status === 'cancel' || transaction_status === 'deny') {
    newStatus = 'gagal';
  } else if (transaction_status === 'expire') {
    newStatus = 'kedaluwarsa';
  } else if (transaction_status === 'pending') {
    newStatus = 'menunggu_pembayaran';
  }

  // 3. Update status ke Database Supabase (jika Supabase credentials tersedia)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseServiceKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Cek apakah order ini milik pendaftaran mandiri (pendaftaran_peserta)
      const { data: pesertaData } = await supabase
        .from('pendaftaran_peserta')
        .select('*')
        .eq('order_id', order_id)
        .maybeSingle();

      if (pesertaData) {
        await supabase
          .from('pendaftaran_peserta')
          .update({
            status_pembayaran: newStatus,
            metode_pembayaran: payment_type ? payment_type.toUpperCase() : pesertaData.metode_pembayaran,
            waktu_lunas: newStatus === 'lunas' ? now : null,
            updated_at: now,
          })
          .eq('order_id', order_id);

        // Jika lunas, otomatis terbitkan E-Sertifikat Digital dan nomor peserta resmi jika belum ada
        if (newStatus === 'lunas') {
          const certNumber = `GM26/CERT-PESERTA/${pesertaData.kategori_id?.toUpperCase() || 'NAS'}/${pesertaData.nomor_peserta || order_id.substring(0, 8)}`;
          
          await supabase
            .from('sertifikat_digital')
            .upsert({
              pendaftaran_id: pesertaData.id,
              nomor_sertifikat: certNumber,
              jenis_sertifikat: 'peserta',
              penerima_nama: pesertaData.nama_siswa,
              instansi: pesertaData.asal_sekolah,
              predikat: `Peserta Babak Penyisihan ${pesertaData.kategori_nama}`,
              file_pdf_url: `https://gebyarmatematika.id/certificates/${order_id}.pdf`,
              qr_verifikasi_url: `https://gebyarmatematika.vercel.app/?verify=${encodeURIComponent(certNumber)}`,
              tanggal_terbit: now,
              is_valid: true,
              created_at: now,
            }, { onConflict: 'pendaftaran_id' });
        }
      }

      // Cek apakah order ini milik pendaftaran batch kolektif guru (pendaftaran_batch)
      const { data: batchData } = await supabase
        .from('pendaftaran_batch')
        .select('*')
        .eq('order_id', order_id)
        .maybeSingle();

      if (batchData) {
        await supabase
          .from('pendaftaran_batch')
          .update({
            status: newStatus,
            metode: payment_type ? payment_type.toUpperCase() : batchData.metode,
            updated_at: now,
          })
          .eq('order_id', order_id);
      }
    } catch (dbError) {
      console.error('Database update error in webhook:', dbError);
    }
  }

  return res.status(200).json({
    status: 'OK',
    order_id,
    payment_status: newStatus,
    timestamp: now,
  });
}
