'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  SlidersHorizontal, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  Mail,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function AdminTenantsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');

  // Data Penyewa Global Platform (Mockup Premium)
  const tenantsData = [
    { id: 'TE-5501', name: 'Ahmad Faisal', email: 'faisal.ahmad@email.com', room: 'A-02', property: 'Kost Melati Indah', owner: 'Budi Santoso', phone: '0812-3456-7890', status: 'Lunas', initials: 'AF', color: 'bg-blue-600' },
    { id: 'TE-5502', name: 'Budi Santoso', email: 'budi.s@email.com', room: 'A-03', property: 'Kost Melati Indah', owner: 'Budi Santoso', phone: '0856-9876-5432', status: 'Tunggakan', initials: 'BS', color: 'bg-emerald-600' },
    { id: 'TE-5503', name: 'Siti Rahma', email: 'siti.r@email.com', room: 'B-01', property: 'Kost Campur Bahagia', owner: 'Siti Rahma', phone: '0899-7777-8888', status: 'Lunas', initials: 'SR', color: 'bg-purple-600' },
    { id: 'TE-5504', name: 'Diana Putri', email: 'diana.p@email.com', room: 'C-01', property: 'Kost Putri Mentari', owner: 'Diana Putri', phone: '0821-4444-5555', status: 'Tunggakan', initials: 'DP', color: 'bg-rose-600' }
  ];

  const stats = [
    { name: 'Penyewa Aktif Platform', value: tenantsData.length, icon: Users, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Penyewa Terverifikasi', value: 4, icon: UserCheck, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  const filteredTenants = tenantsData.filter(tenant => {
    return tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tenant.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tenant.owner.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Database Penyewa Platform 👥</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Lihat seluruh penyewa terdaftar secara nasional, status hunian kamar, nama pemilik cabang, dan riwayat tagihan.
        </p>
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
            placeholder="Cari nama penyewa, properti kost, atau pemilik..."
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

      {/* TENANTS TABLE */}
      <div className={`border rounded-2xl overflow-hidden ${
        isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      } ${transClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${
                isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-400'
              }`}>
                <th className="px-6 py-4">PENYEWA AKTIF</th>
                <th className="px-6 py-4">KONTAK</th>
                <th className="px-6 py-4">KAMAR & GEDUNG</th>
                <th className="px-6 py-4">MITRA OWNER</th>
                <th className="px-6 py-4">STATUS TAGIHAN</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-neutral-900' : 'divide-neutral-100'}`}>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="text-xs group hover:bg-neutral-500/5 transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${tenant.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                          {tenant.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{tenant.name}</p>
                          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            ID: {tenant.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-medium">{tenant.phone}</div>
                      <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'} flex items-center gap-1 mt-0.5`}>
                        <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{tenant.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-bold">Kamar {tenant.room}</div>
                      <div className={`text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-400'} flex items-center gap-1 mt-0.5`}>
                        <Building2 className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{tenant.property}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4.5 font-bold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {tenant.owner}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 w-max ${
                        tenant.status === 'Lunas'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {tenant.status === 'Lunas' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                        )}
                        <span>{tenant.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <button 
                        className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                          isDark 
                            ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900' 
                            : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                        }`}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 font-medium">
                    Tidak ada penyewa yang ditemukan.
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
