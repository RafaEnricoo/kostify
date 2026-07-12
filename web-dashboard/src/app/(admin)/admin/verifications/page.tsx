'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  User, 
  FileText,
  Check, 
  X,
  Clock,
  Eye
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function VerificationsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');

  // Data Antrian Verifikasi Kost (Mockup Premium)
  const verificationsData = [
    {
      id: 'KV-0012',
      name: 'Kost Melati Indah',
      owner: 'Budi Santoso',
      location: 'Coblong, Bandung',
      roomsCount: 16,
      submittedDate: '12 Jun 2026, 14:30',
      documents: ['Sertifikat Tanah.pdf', 'KTP_Pemilik.jpg', 'Izin_Operasional.pdf'],
      status: 'Pending'
    },
    {
      id: 'KV-0013',
      name: 'Apartemen Cozy Room',
      owner: 'Siti Rahma',
      location: 'Jakarta Selatan',
      roomsCount: 12,
      submittedDate: '11 Jun 2026, 10:15',
      documents: ['Sertifikat_Apartemen.pdf', 'KTP_Siti.jpg'],
      status: 'Pending'
    },
    {
      id: 'KV-0014',
      name: 'Kost Putri Mentari',
      owner: 'Diana Putri',
      location: 'Coblong, Bandung',
      roomsCount: 20,
      submittedDate: '10 Jun 2026, 16:45',
      documents: ['Surat_Tanah.pdf', 'KTP_Diana.jpg', 'SIUP.pdf'],
      status: 'Pending'
    }
  ];

  const stats = [
    { name: 'Menunggu Verifikasi', value: verificationsData.length, icon: Clock, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Disetujui Bulan Ini', value: 34, icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Verifikasi Properti Kost 🛡️</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Tinjau berkas legalitas, sertifikat tanah, KTP owner, dan setujui operasional kost baru pada platform.
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
            placeholder="Cari nama kost, pemilik, atau ID pengajuan..."
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

      {/* VERIFICATIONS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {verificationsData.map((item) => (
          <div 
            key={item.id}
            className={`rounded-2xl border p-6 flex flex-col justify-between gap-5 ${
              isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
            } ${transClass}`}
          >
            {/* Header info */}
            <div>
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-lg font-black tracking-tight">{item.name}</h3>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg border border-orange-500/20 text-orange-500 bg-orange-500/10 uppercase tracking-wider block mt-1 w-max`}>
                    ID: {item.id}
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border border-orange-500/20 text-orange-500 bg-orange-500/10 uppercase tracking-wider flex items-center gap-1 shrink-0`}>
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Pending</span>
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500 shrink-0" />
                  <div>
                    <span className="text-[9px] text-neutral-500 block uppercase font-bold tracking-wider">Pemilik</span>
                    <span className="text-xs font-bold block">{item.owner}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                  <div>
                    <span className="text-[9px] text-neutral-500 block uppercase font-bold tracking-wider">Lokasi</span>
                    <span className="text-xs font-bold block truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents List */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-neutral-900/40 border-neutral-900' : 'bg-neutral-50 border-neutral-100'
            }`}>
              <h4 className="text-xs font-bold mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Dokumen Pendukung ({item.documents.length})</span>
              </h4>
              <div className="space-y-2">
                {item.documents.map((doc, idx) => (
                  <div key={idx} className={`flex justify-between items-center p-2 rounded-lg text-[11px] font-medium border ${
                    isDark ? 'bg-neutral-900 border-neutral-850 hover:bg-neutral-800' : 'bg-white border-neutral-100 hover:bg-neutral-50'
                  } transition-colors`}>
                    <span className="truncate pr-4">📄 {doc}</span>
                    <button className="flex items-center gap-0.5 font-bold text-orange-500 hover:underline">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Approve / Reject Actions */}
            <div className="flex gap-3 pt-2">
              <button 
                className="flex-1 py-3 rounded-xl bg-red-600/10 text-red-500 border border-red-600/20 text-xs font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Tolak Properti</span>
              </button>
              <button 
                className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-600/15 active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Setujui Properti</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
