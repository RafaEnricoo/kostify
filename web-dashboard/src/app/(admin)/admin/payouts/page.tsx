'use client';

import React, { useState } from 'react';
import { 
  Coins, 
  Search, 
  ArrowUpRight, 
  CheckCircle, 
  Clock, 
  Ban,
  Wallet,
  Check,
  Building
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function PayoutsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');

  // Data Pengajuan Payout Owner (Mockup Premium)
  const payoutsData = [
    { id: 'PAY-77012', owner: 'Budi Santoso', bank: 'BCA', accNum: '8910-22-3456', amount: 12450000, date: '12 Jun 2026, 09:30', status: 'Pending' },
    { id: 'PAY-77013', owner: 'Siti Rahma', bank: 'Mandiri', accNum: '132-00-145678-9', amount: 8900000, date: '11 Jun 2026, 14:15', status: 'Pending' },
    { id: 'PAY-77011', owner: 'John Doe', bank: 'BCA', accNum: '012-34-5678-9', amount: 14500000, date: '10 Jun 2026, 18:00', status: 'Sukses' },
    { id: 'PAY-77010', owner: 'Diana Putri', bank: 'BRI', accNum: '0012-01-234567-53-1', amount: 5600000, date: '08 Jun 2026, 10:45', status: 'Sukses' }
  ];

  const stats = [
    { name: 'Total Payouts Tertunda', value: 'Rp 21.350.000', count: 2, icon: Clock, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Pendapatan Komisi Platform (10%)', value: 'Rp 41.450.000', count: 'Total Komisi', icon: Wallet, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  const filteredPayouts = payoutsData.filter(pay => {
    return pay.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
           pay.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Laporan Keuangan & Payouts 🪙</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Proses pencairan dana bagi hasil sewa kost milik owner, verifikasi nomor rekening, dan pantau potongan komisi platform.
        </p>
      </div>

      {/* STATS PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border flex justify-between items-center ${
                isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
              } ${transClass}`}
            >
              <div>
                <p className={`text-xs font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.name}</p>
                <h3 className="text-2xl font-black mt-2 tracking-tight">{stat.value}</h3>
                <p className={`text-[10px] text-neutral-500 mt-1 block`}>{stat.count} transaksi pending</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* SEARCH BAR PANEL */}
      <div className={`p-4 rounded-2xl border ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text"
            placeholder="Cari nama owner atau ID payout..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
            } ${transClass}`}
          />
        </div>
      </div>

      {/* PAYOUTS TABLE */}
      <div className={`border rounded-2xl overflow-hidden ${
        isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      } ${transClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${
                isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-400'
              }`}>
                <th className="px-6 py-4">ID PENARIKAN (PAYOUT)</th>
                <th className="px-6 py-4">PEMILIK (OWNER)</th>
                <th className="px-6 py-4">REKENING TUJUAN</th>
                <th className="px-6 py-4">TANGGAL PERMINTAAN</th>
                <th className="px-6 py-4">NOMINAL PENCARIAN</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-neutral-900' : 'divide-neutral-100'}`}>
              {filteredPayouts.length > 0 ? (
                filteredPayouts.map((pay) => (
                  <tr key={pay.id} className="text-xs group hover:bg-neutral-500/5 transition-colors">
                    <td className="px-6 py-4.5 font-bold tracking-tight text-neutral-400 group-hover:text-orange-500 transition-colors">
                      {pay.id}
                    </td>
                    <td className="px-6 py-4.5 font-bold">
                      {pay.owner}
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-xs">{pay.bank}</div>
                      <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'} flex items-center gap-1 mt-0.5`}>
                        <Building className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>No. Rek: {pay.accNum}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-neutral-500">
                      {pay.date}
                    </td>
                    <td className="px-6 py-4.5 font-bold text-sm text-orange-500">
                      Rp {pay.amount.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 w-max ${
                        pay.status === 'Sukses'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                      }`}>
                        {pay.status === 'Sukses' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 animate-pulse" />
                        )}
                        <span>{pay.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {pay.status === 'Pending' && (
                          <button 
                            className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-[10px] font-bold"
                            title="Konfirmasi Pengiriman Dana"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Proses Transfer</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    Tidak ada pengajuan payout yang ditemukan.
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
