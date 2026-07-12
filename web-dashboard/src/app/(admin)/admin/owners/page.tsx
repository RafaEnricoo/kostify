'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  Ban,
  Mail
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function OwnersPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');

  // Data Mitra Owner (Mockup Premium)
  const ownersData = [
    { id: 'OW-8901', name: 'Budi Santoso', email: 'budi.santoso@email.com', phone: '0812-3456-7890', joinedDate: '12 Jan 2026', totalProps: 3, status: 'Aktif', initials: 'BS', color: 'bg-blue-600' },
    { id: 'OW-8902', name: 'Siti Rahma', email: 'siti.rahma@email.com', phone: '0856-9876-5432', joinedDate: '24 Feb 2026', totalProps: 1, status: 'Aktif', initials: 'SR', color: 'bg-emerald-600' },
    { id: 'OW-8903', name: 'Diana Putri', email: 'diana.putri@email.com', phone: '0899-7777-8888', joinedDate: '18 Nov 2025', totalProps: 2, status: 'Pending Verifikasi', initials: 'DP', color: 'bg-purple-600' },
    { id: 'OW-8904', name: 'Hendra Wijaya', email: 'hendra.w@email.com', phone: '0821-4444-5555', joinedDate: '01 Mar 2026', totalProps: 0, status: 'Ditangguhkan', initials: 'HW', color: 'bg-red-650' }
  ];

  const stats = [
    { name: 'Total Owner Terdaftar', value: ownersData.length, icon: Users, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Total Kamar Dikelola', value: 72, icon: Building2, color: 'text-blue-500 bg-blue-500/10' },
  ];

  const filteredOwners = ownersData.filter(owner => {
    return owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           owner.phone.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manajemen Mitra Owner Kost 👥</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Daftar lengkap pemilik properti, kuota kost terkelola, status lisensi, dan manajemen penangguhan akun.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Daftarkan Owner Baru</span>
        </button>
      </div>

      {/* STATS PANEL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
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
            placeholder="Cari nama owner, email, atau nomor HP..."
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

      {/* OWNERS TABLE */}
      <div className={`border rounded-2xl overflow-hidden ${
        isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      } ${transClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${
                isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-400'
              }`}>
                <th className="px-6 py-4">MITRA OWNER</th>
                <th className="px-6 py-4">KONTAK</th>
                <th className="px-6 py-4">TANGGAL BERGABUNG</th>
                <th className="px-6 py-4">PROPERTI TERKELOLA</th>
                <th className="px-6 py-4">STATUS LISENSI</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-neutral-900' : 'divide-neutral-100'}`}>
              {filteredOwners.length > 0 ? (
                filteredOwners.map((owner) => (
                  <tr key={owner.id} className="text-xs group hover:bg-neutral-500/5 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${owner.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                          {owner.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{owner.name}</p>
                          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            ID: {owner.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-medium">{owner.phone}</div>
                      <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'} flex items-center gap-1 mt-0.5`}>
                        <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{owner.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-neutral-500">
                      {owner.joinedDate}
                    </td>
                    <td className="px-6 py-4.5 font-bold">
                      {owner.totalProps} Properti
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 w-max ${
                        owner.status === 'Aktif'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : owner.status === 'Ditangguhkan'
                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}>
                        {owner.status === 'Aktif' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : owner.status === 'Ditangguhkan' ? (
                          <Ban className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                        )}
                        <span>{owner.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {owner.status === 'Aktif' && (
                          <button 
                            className="p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-[10px] font-bold"
                            title="Tangguhkan Akun"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Suspend</span>
                          </button>
                        )}
                        <button 
                          className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                            isDark 
                              ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900' 
                              : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                          }`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    Tidak ada owner yang ditemukan.
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
