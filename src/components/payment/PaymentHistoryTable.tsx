import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import type { Pembayaran } from '../../types';

interface PaymentHistoryTableProps {
  history: Pembayaran[];
  onSelectPayment: (payment: Pembayaran) => void;
}

export const PaymentHistoryTable: React.FC<PaymentHistoryTableProps> = ({
  history,
  onSelectPayment,
}) => {
  return (
    <div className="rounded-3xl glass-panel border border-slate-200/80 bg-white/80 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
            Riwayat Transaksi & Status Pendaftaran
          </h3>
          <p className="text-xs text-slate-500">
            Daftar seluruh pendaftaran lomba dan status verifikasi pembayaran otomatis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
            Total {history.length} Transaksi
          </span>
        </div>
      </div>

      {/* Table responsive */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/90 text-slate-600 font-bold border-b border-slate-200/80 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3.5 px-6">Order ID & Tanggal</th>
              <th className="py-3.5 px-6">Nama Peserta / Sekolah</th>
              <th className="py-3.5 px-6">Kategori</th>
              <th className="py-3.5 px-6">Metode</th>
              <th className="py-3.5 px-6">Nominal</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {history.map((item) => {
              const isPaid = item.status === 'lunas';
              return (
                <tr 
                  key={item.id}
                  onClick={() => onSelectPayment(item)}
                  className="hover:bg-indigo-50/50 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-6 font-mono">
                    <span className="font-bold text-slate-900 block group-hover:text-indigo-600 transition-colors">
                      {item.orderId}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.waktuBatas}</span>
                  </td>

                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900 font-['Outfit']">{item.peserta.namaSiswa}</p>
                    <p className="text-[11px] text-slate-500">{item.peserta.asalSekolah}</p>
                  </td>

                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.peserta.tingkat}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-semibold text-slate-700">
                    {item.metode.replace('_', ' ')}
                  </td>

                  <td className="py-4 px-6 font-extrabold text-slate-900 font-['Outfit']">
                    Rp {item.total.toLocaleString('id-ID')}
                  </td>

                  <td className="py-4 px-6">
                    {isPaid ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Lunas
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Menunggu
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPayment(item);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-500 group-hover:text-indigo-600 transition-colors"
                      title="Lihat Detail Transaksi"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
