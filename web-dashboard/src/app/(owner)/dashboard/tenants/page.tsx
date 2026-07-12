'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MessageCircle, 
  Send, 
  MoreVertical,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function TenantsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');
  const [billingFilter, setBillingFilter] = useState('all');

  // Data Penyewa (Mockup Premium)
  const tenantsData = [
    { id: 't-1', name: 'Ahmad Faisal', room: 'A-02', property: 'Kost Melati Indah', phone: '0812-3456-7890', checkIn: '12 Jan 2026', billingStatus: 'Lunas', initials: 'AF', color: 'bg-blue-600' },
    { id: 't-2', name: 'Budi Santoso', room: 'A-03', property: 'Kost Melati Indah', phone: '0856-9876-5432', checkIn: '05 Feb 2026', billingStatus: 'Tunggakan', initials: 'BS', color: 'bg-emerald-600' },
    { id: 't-3', name: 'Siti Rahma', room: 'B-01', property: 'Kost Campur Bahagia', phone: '0899-7777-8888', checkIn: '20 Des 2025', billingStatus: 'Lunas', initials: 'SR', color: 'bg-purple-600' },
    { id: 't-4', name: 'Diana Putri', room: 'C-01', property: 'Kost Putri Mentari', phone: '0821-4444-5555', checkIn: '01 Mar 2026', billingStatus: 'Tunggakan', initials: 'DP', color: 'bg-rose-600' },
    { id: 't-5', name: 'Hendra Wijaya', room: 'B-04', property: 'Kost Campur Bahagia', phone: '0877-3333-1111', checkIn: '10 Jan 2026', billingStatus: 'Lunas', initials: 'HW', color: 'bg-amber-600' }
  ];

  const filteredTenants = tenantsData.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tenant.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tenant.property.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBilling = billingFilter === 'all' || 
                           (billingFilter === 'paid' && tenant.billingStatus === 'Lunas') ||
                           (billingFilter === 'unpaid' && tenant.billingStatus === 'Tunggakan');

    return matchesSearch && matchesBilling;
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Daftar Penyewa Kost 👥</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Pantau biodata penyewa, nomor kontak aktif, masa sewa, dan riwayat tagihan bulanan.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Tambah / Undang Penyewa</span>
        </button>
      </div>

      {/* FILTER BAR PANEL */}
      <div className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text"
            placeholder="Cari nama penyewa, nomor kamar, atau properti..."
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
            value={billingFilter}
            onChange={(e) => setBillingFilter(e.target.value)}
            className={`text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 focus:bg-white focus:border-orange-500'
            }`}
          >
            <option value="all">Semua Status Tagihan</option>
            <option value="paid">Lunas Bulan Ini</option>
            <option value="unpaid">Ada Tunggakan</option>
          </select>
        </div>
      </div>

      {/* TENANT TABLE */}
      <div className={`border rounded-2xl overflow-hidden ${
        isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      } ${transClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className={`text-[10px] font-bold tracking-wider text-left border-b ${
                isDark ? 'border-neutral-900 text-neutral-500' : 'border-neutral-100 text-neutral-400'
              }`}>
                <th className="px-6 py-4">PENYEWA KOST</th>
                <th className="px-6 py-4">KAMAR</th>
                <th className="px-6 py-4">GEDUNG PROPERTI</th>
                <th className="px-6 py-4">TANGGAL MASUK</th>
                <th className="px-6 py-4">STATUS SEWA</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-neutral-900' : 'divide-neutral-100'}`}>
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="text-xs group hover:bg-neutral-500/5 transition-colors">
                    {/* Tenant Profile Cell */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${tenant.color} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm`}>
                          {tenant.initials}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{tenant.name}</p>
                          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            📞 {tenant.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Room Cell */}
                    <td className="px-6 py-4.5 font-bold">
                      {tenant.room}
                    </td>

                    {/* Property Cell */}
                    <td className={`px-6 py-4.5 font-semibold ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      {tenant.property}
                    </td>

                    {/* Date Cell */}
                    <td className="px-6 py-4.5 text-neutral-500">
                      {tenant.checkIn}
                    </td>

                    {/* Billing Status Cell */}
                    <td className="px-6 py-4.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 w-max ${
                        tenant.billingStatus === 'Lunas'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {tenant.billingStatus === 'Lunas' ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
                        )}
                        <span>{tenant.billingStatus}</span>
                      </span>
                    </td>

                    {/* Quick Action Cell */}
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex justify-end items-center gap-2">
                        {tenant.billingStatus === 'Tunggakan' && (
                          <button 
                            className="p-2 rounded-xl bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all hover:scale-105 active:scale-95 border border-orange-500/20 flex items-center gap-1 text-[10px] font-bold"
                            title="Kirim Pengingat Tagihan"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Tagihan</span>
                          </button>
                        )}
                        <button 
                          className={`p-2 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                            isDark 
                              ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900' 
                              : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                          }`}
                          title="Hubungi WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button 
                          className={`p-2 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                            isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-neutral-950'
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
