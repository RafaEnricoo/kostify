'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  FileSpreadsheet,
  CheckCircle,
  Clock,
  XCircle,
  Coins,
  Download
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function BillingPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Data Transaksi Keuangan (Mockup Premium)
  const transactionsData = [
    { id: 'TX-10023', tenant: 'Ahmad Faisal', room: 'A-02', amount: 1500000, date: '12 Jun 2026, 09:30', method: 'Bank Transfer (BCA)', status: 'Sukses' },
    { id: 'TX-10022', tenant: 'Siti Rahma', room: 'B-01', amount: 2000000, date: '11 Jun 2026, 14:15', method: 'E-Wallet (Gopay)', status: 'Sukses' },
    { id: 'TX-10021', tenant: 'Budi Santoso', room: 'A-03', amount: 1200000, date: '10 Jun 2026, 18:00', method: 'Bank Transfer (Mandiri)', status: 'Pending' },
    { id: 'TX-10020', tenant: 'Hendra Wijaya', room: 'B-04', amount: 1500000, date: '08 Jun 2026, 10:45', method: 'Bank Transfer (BCA)', status: 'Sukses' },
    { id: 'TX-10019', tenant: 'Diana Putri', room: 'C-01', amount: 1800000, date: '07 Jun 2026, 16:30', method: 'E-Wallet (OVO)', status: 'Gagal' }
  ];

  const stats = [
    { name: 'Total Pendapatan Juni', value: 'Rp 36.300.000', sub: '+12.4% dari bulan lalu', icon: Coins, color: 'text-emerald-500 bg-emerald-500/10', trend: 'up' },
    { name: 'Saldo Dapat Dicairkan', value: 'Rp 14.500.000', sub: 'Pencairan otomatis ke Mandiri', icon: CreditCard, color: 'text-orange-500 bg-orange-500/10', trend: 'none' },
    { name: 'Tagihan Belum Terbayar', value: 'Rp 3.000.000', sub: '2 Invoice pending kirim', icon: Clock, color: 'text-yellow-500 bg-yellow-500/10', trend: 'warning' },
  ];

  const filteredTransactions = transactionsData.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.room.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Riwayat Keuangan & Transaksi 💳</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Pantau arus kas masuk sewa kost, nominal saldo siap tarik, dan rekapan laporan bulanan.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all self-start sm:self-auto">
          <Download className="w-4 h-4" />
          <span>Ekspor Laporan XLS</span>
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border flex flex-col justify-between gap-4 ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-900' 
                  : 'bg-white border-neutral-200 shadow-sm'
              } ${transClass}`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-lg">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{stat.sub.split(' ')[0]}</span>
                  </div>
                )}
              </div>
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.name}</p>
                <h3 className="text-2xl font-black mt-1.5 tracking-tight">{stat.value}</h3>
                <p className={`text-[10px] mt-1.5 ${
                  stat.trend === 'warning' ? 'text-yellow-500' : 'text-neutral-400'
                }`}>
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text"
            placeholder="Cari ID transaksi, nama penyewa, nomor kamar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
            } ${transClass}`}
          />
        </div>
        <div className="flex items-center gap-3 self-end md:self-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 focus:bg-white focus:border-orange-500'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="Sukses">Sukses</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
          </select>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className={`border rounded-2xl overflow-hidden ${
        isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      } ${transClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${
                isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-400'
              }`}>
                <th className="px-6 py-4">ID TRANSAKSI</th>
                <th className="px-6 py-4">PENYEWA / UNIT</th>
                <th className="px-6 py-4">TANGGAL TRANSAKSI</th>
                <th className="px-6 py-4">METODE PEMBAYARAN</th>
                <th className="px-6 py-4">NOMINAL</th>
                <th className="px-6 py-4">STATUS</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-neutral-900' : 'divide-neutral-100'}`}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="text-xs group hover:bg-neutral-500/5 transition-colors">
                    <td className="px-6 py-4.5 font-bold tracking-tight text-neutral-400 group-hover:text-orange-500 transition-colors">
                      {tx.id}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-bold text-sm">{tx.tenant}</div>
                      <div className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        Kamar {tx.room}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-neutral-500">
                      {tx.date}
                    </td>
                    <td className={`px-6 py-4.5 font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {tx.method}
                    </td>
                    <td className="px-6 py-4.5 font-bold text-sm text-orange-500">
                      Rp {tx.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 w-max ${
                        tx.status === 'Sukses'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : tx.status === 'Pending'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {tx.status === 'Sukses' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : tx.status === 'Pending' ? (
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{tx.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
