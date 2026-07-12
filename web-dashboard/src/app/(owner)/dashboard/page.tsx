'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Bed, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Plus,
  UserPlus,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function OwnerDashboard() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-300' : '';

  // Data palsu untuk dashboard owner
  const stats = [
    { 
      name: 'Hunian Kamar', 
      value: '85%', 
      sub: '17 dari 20 kamar terisi', 
      change: '+5.4%', 
      isUp: true, 
      icon: Bed,
      color: 'text-orange-500 bg-orange-500/10'
    },
    { 
      name: 'Pendapatan Bulan Ini', 
      value: 'Rp 24,5jt', 
      sub: 'vs Rp 21,8jt bulan lalu', 
      change: '+12.3%', 
      isUp: true, 
      icon: Wallet,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    { 
      name: 'Penyewa Aktif', 
      value: '17 Orang', 
      sub: '1 tenant baru bulan ini', 
      change: '+2.1%', 
      isUp: true, 
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10'
    },
    { 
      name: 'Tagihan Pending', 
      value: '2 Kamar', 
      sub: 'Belum verifikasi transfer', 
      change: '-4.2%', 
      isUp: false, 
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10'
    },
  ];

  const recentTransactions = [
    { id: 'TX001', tenant: 'Ahmad Faisal', room: 'A-02', date: '12 Jul 2026', amount: 'Rp 1.500.000', status: 'SUCCESS' },
    { id: 'TX002', tenant: 'Siti Rahma', room: 'B-05', date: '11 Jul 2026', amount: 'Rp 1.800.000', status: 'SUCCESS' },
    { id: 'TX003', tenant: 'Budi Santoso', room: 'A-10', date: '10 Jul 2026', amount: 'Rp 1.200.000', status: 'PENDING' },
    { id: 'TX004', tenant: 'Rian Hidayat', room: 'B-01', date: '08 Jul 2026', amount: 'Rp 1.500.000', status: 'SUCCESS' },
  ];

  const expiringRents = [
    { name: 'Diana Putri', room: 'A-08', daysLeft: 3 },
    { name: 'Hendra Wijaya', room: 'B-12', daysLeft: 5 },
    { name: 'Rahmat Kartolo', room: 'A-04', daysLeft: 7 },
  ];

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Halo, John Doe! 👋</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Kelola properti Kostify Anda dengan efisien hari ini.
          </p>
        </div>
        <div className={`text-xs font-bold px-4 py-2.5 rounded-xl border ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-600 shadow-sm'
        }`}>
          📅 Minggu, 12 Juli 2026
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-900 hover:border-neutral-800' 
                  : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
              } ${transClass}`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                  stat.isUp 
                    ? 'text-emerald-500 bg-emerald-500/10' 
                    : 'text-rose-500 bg-rose-500/10'
                }`}>
                  {stat.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-5">
                <p className={`text-xs font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.name}</p>
                <h3 className="text-2xl font-black mt-1 tracking-tight">{stat.value}</h3>
                <p className={`text-[11px] font-medium mt-1.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. CHARTS AND EXPIRATION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SVG Chart Card */}
        <div 
          className={`p-6 rounded-2xl border lg:col-span-2 flex flex-col ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold">Tren Pendapatan Bulanan</h2>
              <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Januari - Juni 2026 (Rupiah)</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span>+18% Semester Ini</span>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="flex-1 min-h-[220px] w-full flex items-end">
            <svg className="w-full h-48" viewBox="0 0 500 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA580C" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="50" x2="500" y2="50" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
              
              {/* Area Under Curve */}
              <path 
                d="M 0 170 C 80 150, 100 120, 160 130 C 220 140, 260 70, 330 80 C 400 90, 420 40, 500 30 L 500 200 L 0 200 Z" 
                fill="url(#chartGradient)" 
              />
              
              {/* Curved Trend Line */}
              <path 
                d="M 0 170 C 80 150, 100 120, 160 130 C 220 140, 260 70, 330 80 C 400 90, 420 40, 500 30" 
                fill="none" 
                stroke="#FF6B00" 
                strokeWidth="3.5" 
                strokeLinecap="round"
              />
              
              {/* Data points */}
              <circle cx="160" cy="130" r="5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="2" />
              <circle cx="330" cy="80" r="5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="2" />
              <circle cx="500" cy="30" r="5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="2" />
            </svg>
          </div>
          
          {/* Months labels */}
          <div className="flex justify-between mt-3 px-1 text-[10px] font-bold text-neutral-500">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>Mei</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Expiring Rents Card */}
        <div 
          className={`p-6 rounded-2xl border flex flex-col ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div className="mb-5">
            <h2 className="text-base font-bold">Jatuh Tempo Sewa</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Penyewa yang masa aktif sewa segera habis</p>
          </div>

          <div className="flex-1 space-y-4">
            {expiringRents.map((rent, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                  isDark ? 'bg-neutral-900/40 border-neutral-800/60' : 'bg-neutral-50 border-neutral-100'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{rent.name}</h4>
                  <p className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-450'}`}>Kamar {rent.room}</p>
                </div>
                <div className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg ${
                  rent.daysLeft <= 3 
                    ? 'text-rose-500 bg-rose-500/10' 
                    : 'text-amber-500 bg-amber-500/10'
                }`}>
                  {rent.daysLeft} Hari Lagi
                </div>
              </div>
            ))}
          </div>

          <button className={`w-full py-3 border text-xs font-bold rounded-xl mt-5 hover:scale-[1.02] active:scale-[0.98] transition-all ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
              : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-sm'
          }`}>
            Kirim Pengingat Masal
          </button>
        </div>

      </div>

      {/* 4. ACTIONS & RECENT TRANSACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions Table */}
        <div 
          className={`p-6 rounded-2xl border lg:col-span-2 flex flex-col ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div className="mb-5">
            <h2 className="text-base font-bold">Transaksi Terbaru</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Pembayaran sewa kost terkini</p>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-455'}`}>
                  <th className="pb-3.5">PENYEWA</th>
                  <th className="pb-3.5">KAMAR</th>
                  <th className="pb-3.5">TANGGAL</th>
                  <th className="pb-3.5">NOMINAL</th>
                  <th className="pb-3.5 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="text-xs">
                    <td className="py-4 font-bold">{tx.tenant}</td>
                    <td className="py-4 text-neutral-500">{tx.room}</td>
                    <td className="py-4 text-neutral-500">{tx.date}</td>
                    <td className="py-4 font-bold">{tx.amount}</td>
                    <td className="py-4 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        tx.status === 'SUCCESS'
                          ? 'text-emerald-500 bg-emerald-500/10'
                          : 'text-amber-500 bg-amber-500/10'
                      }`}>
                        {tx.status === 'SUCCESS' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Berhasil</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Pending</span>
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div 
          className={`p-6 rounded-2xl border flex flex-col justify-between ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div>
            <h2 className="text-base font-bold mb-1">Aksi Cepat</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Tautan cepat operasional kost Anda</p>
          </div>

          <div className="space-y-3.5 my-6">
            <button className="w-full flex items-center justify-between px-4 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/15 hover:scale-[1.02] active:scale-[0.98] transition-all">
              <div className="flex items-center gap-3">
                <Plus className="w-4 h-4" />
                <span>Tambah Kamar Kost</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </button>

            <button className={`w-full flex items-center justify-between px-4 py-3.5 border font-bold text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
            }`}>
              <div className="flex items-center gap-3">
                <UserPlus className="w-4 h-4 text-orange-500" />
                <span>Daftarkan Penyewa Baru</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </button>

            <button className={`w-full flex items-center justify-between px-4 py-3.5 border font-bold text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 hover:bg-neutral-100'
            }`}>
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-orange-500" />
                <span>Tambah Properti Baru</span>
              </div>
              <ArrowUpRight className="w-4 h-4 opacity-80" />
            </button>
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-3.5 ${
            isDark ? 'bg-orange-500/5 border-orange-500/20' : 'bg-orange-50/50 border-orange-100'
          }`}>
            <Building className="w-5 h-5 text-orange-500 shrink-0" />
            <div className="text-left">
              <h4 className="text-[11px] font-bold text-orange-500">Kostify Pro Tips</h4>
              <p className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Tambahkan foto menarik pada kamar agar properti Anda lebih cepat tersewa.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
