import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore
import midtransClient from 'midtrans-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Hanya izinkan HTTP POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const clientKey = process.env.VITE_MIDTRANS_CLIENT_KEY;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

  // Validasi konfigurasi server Midtrans
  if (!serverKey) {
    return res.status(500).json({
      error: 'MIDTRANS_SERVER_KEY belum dikonfigurasi di environment variable Vercel.',
    });
  }

  try {
    const { 
      orderId, 
      grossAmount, 
      customerName, 
      customerEmail, 
      customerPhone,
      itemName,
      itemId 
    } = req.body;

    if (!orderId || !grossAmount || !customerName) {
      return res.status(400).json({ 
        error: 'Data pesanan tidak lengkap (orderId, grossAmount, customerName wajib diisi).' 
      });
    }

    const snap = new midtransClient.Snap({
      isProduction,
      serverKey,
      clientKey: clientKey || '',
    });

    const parameter = {
      transaction_details: {
        order_id: String(orderId),
        gross_amount: Math.round(Number(grossAmount)),
      },
      customer_details: {
        first_name: customerName,
        email: customerEmail || 'peserta@gebyarmatematika.id',
        phone: customerPhone || '081234567890',
      },
      item_details: [
        {
          id: itemId || 'GM26-REG',
          price: Math.round(Number(grossAmount)),
          quantity: 1,
          name: (itemName || 'Pendaftaran Gebyar Matematika 2026').substring(0, 50),
        },
      ],
      enabled_payments: [
        'qris',
        'gopay',
        'shopeepay',
        'bca_va',
        'bni_va',
        'bri_va',
        'mandiri_va',
        'permata_va',
        'other_va',
      ],
      callbacks: {
        finish: `${process.env.VITE_APP_URL || 'https://gebyarmatematika.vercel.app'}/?payment_status=finish&order_id=${orderId}`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return res.status(200).json({
      success: true,
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId,
    });
  } catch (error: any) {
    console.error('Midtrans Snap Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Gagal membuat transaksi Midtrans Snap.',
    });
  }
}
