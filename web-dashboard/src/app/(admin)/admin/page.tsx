'use client';

import React from 'react';
import { 
  ShieldAlert, 
  Users, 
  Building2, 
  CircleDollarSign, 
  Check, 
  X, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function AdminDashboard() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-300' : '';

  // Data palsu untuk dashboard super admin
  const stats = [
    { 
      name: 'Total Owner Terdaftar', 
      value: '42 Owner', 
      sub: '+3 pendaftaran minggu ini', 
      change: '+8.1%', 
      isUp: true, 
      icon: Users,
      color: 'text-rose-500 bg-rose-500/10'
    },
    { 
      name: 'Total Properti Kost', 
      value: '128 Properti', 
      sub: '8 pending persetujuan', 
      change: '+15.2%', 
      isUp: true, 
      icon: Building2,
      color: 'text-orange-500 bg-orange-500/10'
    },
    { 
      name: 'Penyewa Aktif Platform', 
      value: '512 Orang', 
      sub: '+48 penyewa bulan ini', 
      change: '+10.4%', 
      isUp: true, 
      icon: Users,
      color: 'text-blue-500 bg-blue-500/10'
    },
    { 
      name: 'GMV Transaksi Platform', 
      value: 'Rp 185,4 Miliar', 
      sub: 'Total transaksi diproses', 
      change: '+22.5%', 
      isUp: true, 
      icon: CircleDollarSign,
      color: 'text-emerald-500 bg-emerald-500/10'
    },
  ];

  const pendingVerifications = [
    { id: 'KV012', name: 'Kost Melati Indah', owner: 'Budi Santoso', location: 'Bandung', price: 'Rp 1.200.000/bln' },
    { id: 'KV013', name: 'Apartemen Cozy Room', owner: 'Siti Rahma', location: 'Jakarta Selatan', price: 'Rp 3.500.000/bln' },
    { id: 'KV014', name: 'Kost Putri Mentari', owner: 'Diana Putri', location: 'Yogyakarta', price: 'Rp 950.000/bln' },
    { id: 'KV015', name: 'Kost Campur Bahagia', owner: 'Hendra Wijaya', location: 'Surabaya', price: 'Rp 1.500.000/bln' },
  ];

  const systemLogs = [
    { message: 'Owner Ahmad Faisal mendaftarkan Kost baru', time: '5 menit lalu', type: 'info' },
    { message: 'Pembayaran sewa TX001 sukses terverifikasi otomatis', time: '12 menit lalu', type: 'success' },
    { message: 'Request OTP gagal dari email guest@tempmail.com', time: '34 menit lalu', type: 'warning' },
    { message: 'Payout sebesar Rp 12.450.000 terkirim ke Owner John Doe', time: '1 jam lalu', type: 'success' },
  ];

  const handleApprove = (id: string) => {
    console.log(`Approved kost ${id}`);
  };

  const handleReject = (id: string) => {
    console.log(`Rejected kost ${id}`);
  };

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Konsol Super Admin 🛡️</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Portal pusat manajemen, verifikasi properti, dan analitik bisnis platform Kostify.
          </p>
        </div>
        <div className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border ${
          isDark ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-orange-50 border-orange-100 text-orange-600'
        }`}>
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Sistem Aktif & Normal</span>
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
                <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg text-emerald-500 bg-emerald-500/10">
                  <ArrowUpRight className="w-3.5 h-3.5" />
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

      {/* 3. VERIFICATIONS & LOGS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Verification Queue (2/3 width) */}
        <div 
          className={`p-6 rounded-2xl border lg:col-span-2 flex flex-col ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-base font-bold">Antrian Verifikasi Kost</h2>
              <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Kost baru yang didaftarkan owner dan butuh persetujuan</p>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-orange-500 bg-orange-500/10`}>
              {pendingVerifications.length} Pengajuan Pending
            </span>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-455'}`}>
                  <th className="pb-3.5">PROPERTI KOST</th>
                  <th className="pb-3.5">PEMILIK (OWNER)</th>
                  <th className="pb-3.5">LOKASI</th>
                  <th className="pb-3.5">KIPAS / HARGA</th>
                  <th className="pb-3.5 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
                {pendingVerifications.map((kost) => (
                  <tr key={kost.id} className="text-xs">
                    <td className="py-4">
                      <div className="font-bold">{kost.name}</div>
                      <div className={`text-[9px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>ID: {kost.id}</div>
                    </td>
                    <td className="py-4 text-neutral-500 font-medium">{kost.owner}</td>
                    <td className="py-4 text-neutral-500">{kost.location}</td>
                    <td className="py-4 font-bold">{kost.price}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleApprove(kost.id)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                          title="Setujui Kost"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleReject(kost.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                          title="Tolak Kost"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Audit Logs (1/3 width) */}
        <div 
          className={`p-6 rounded-2xl border flex flex-col ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
          } ${transClass}`}
        >
          <div className="mb-5">
            <h2 className="text-base font-bold">Log Aktivitas Sistem</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Aktivitas waktu nyata pengguna platform</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-1">
            {systemLogs.map((log, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 ${
                  isDark ? 'bg-neutral-900/30 border-neutral-850' : 'bg-neutral-50 border-neutral-100'
                }`}
              >
                <p className="text-[11px] font-bold leading-normal">{log.message}</p>
                <div className="flex items-center justify-between mt-1 text-[9px] text-neutral-500">
                  <span>⏰ {log.time}</span>
                  <span className={`font-semibold uppercase tracking-wider ${
                    log.type === 'success' ? 'text-emerald-500' : log.type === 'warning' ? 'text-rose-500' : 'text-blue-500'
                  }`}>
                    {log.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className={`w-full py-3 border text-xs font-bold rounded-xl mt-5 hover:scale-[1.02] active:scale-[0.98] transition-all ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
              : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-sm'
          }`}>
            Lihat Audit Log Lengkap
          </button>
        </div>

      </div>

      {/* 4. PERFORMANCE GROWTH SECTION */}
      <div 
        className={`p-6 rounded-2xl border flex flex-col ${
          isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
        } ${transClass}`}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-base font-bold">Grafik Pertumbuhan Bisnis Platform</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Peningkatan jumlah owner kost terdaftar (Januari - Juni 2026)</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-orange-500 bg-orange-500/10 px-3 py-1.5 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span>+28% Pertumbuhan Owner</span>
          </div>
        </div>

        {/* Business Performance Area Chart SVG */}
        <div className="w-full flex items-end min-h-[180px]">
          <svg className="w-full h-44" viewBox="0 0 500 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="37.5" x2="500" y2="37.5" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
            <line x1="0" y1="75" x2="500" y2="75" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
            <line x1="0" y1="112.5" x2="500" y2="112.5" stroke={isDark ? "#1C1C1C" : "#F1F1F1"} strokeWidth="1" />
            
            {/* Area Path */}
            <path 
              d="M 0 130 C 70 120, 120 100, 180 85 C 240 70, 300 45, 360 40 C 420 35, 450 18, 500 15 L 500 150 L 0 150 Z" 
              fill="url(#adminGradient)" 
            />
            
            {/* Line Path */}
            <path 
              d="M 0 130 C 70 120, 120 100, 180 85 C 240 70, 300 45, 360 40 C 420 35, 450 18, 500 15" 
              fill="none" 
              stroke="#FF6B00" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            
            <circle cx="180" cy="85" r="4.5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="1.5" />
            <circle cx="360" cy="40" r="4.5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="1.5" />
            <circle cx="500" cy="15" r="4.5" fill="#FF6B00" stroke={isDark ? "#0A0A0A" : "#FFFFFF"} strokeWidth="1.5" />
          </svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-3 px-1 text-[10px] font-bold text-neutral-500">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>Mei</span>
          <span>Jun</span>
        </div>
      </div>

    </div>
  );
}
