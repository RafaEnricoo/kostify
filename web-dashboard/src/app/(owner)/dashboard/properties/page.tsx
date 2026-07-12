'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Plus, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Percent,
  CheckCircle2,
  Trash2,
  Edit3
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function PropertiesPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Data Properti Kost (Mockup Premium)
  const propertiesData = [
    {
      id: 'prop-1',
      name: 'Kost Melati Indah',
      address: 'Jl. Melati No. 12, Coblong, Bandung',
      totalRooms: 16,
      occupiedRooms: 14,
      monthlyRevenue: 16800000,
      imageGradient: 'from-orange-500 to-amber-600',
      status: 'Ada Kosong'
    },
    {
      id: 'prop-2',
      name: 'Kost Campur Bahagia',
      address: 'Jl. Sukajadi No. 45, Sukajadi, Bandung',
      totalRooms: 12,
      occupiedRooms: 12,
      monthlyRevenue: 18000000,
      imageGradient: 'from-blue-600 to-indigo-700',
      status: 'Penuh'
    },
    {
      id: 'prop-3',
      name: 'Kost Putri Mentari',
      address: 'Jl. Dago Asri No. 89, Coblong, Bandung',
      totalRooms: 20,
      occupiedRooms: 18,
      monthlyRevenue: 24000000,
      imageGradient: 'from-rose-500 to-pink-600',
      status: 'Ada Kosong'
    }
  ];

  const stats = [
    { name: 'Total Properti', value: propertiesData.length, icon: Building2, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Total Kamar', value: 48, icon: BedDouble, color: 'text-orange-500 bg-orange-500/10' },
    { name: 'Tingkat Hunian', value: '91.6%', icon: Percent, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Kost Terisi Penuh', value: 1, icon: CheckCircle2, color: 'text-indigo-500 bg-indigo-500/10' },
  ];

  const filteredProperties = propertiesData.filter(prop => {
    const matchesSearch = prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'full') return matchesSearch && prop.status === 'Penuh';
    if (statusFilter === 'available') return matchesSearch && prop.status === 'Ada Kosong';
    return matchesSearch;
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Kelola Properti Kost 🏢</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Tambah, sunting, dan pantau performa seluruh cabang kost milik Anda.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Tambah Kost Baru</span>
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl border ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-900' 
                  : 'bg-white border-neutral-200 shadow-sm'
              } ${transClass}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className={`text-xs font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>{stat.name}</p>
                  <h3 className="text-2xl font-black mt-2 tracking-tight">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
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
            placeholder="Cari nama properti atau alamat..."
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
          <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
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
            <option value="available">Ada Kamar Kosong</option>
            <option value="full">Penuh</option>
          </select>
        </div>
      </div>

      {/* PROPERTIES LIST (CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => {
          const occupancyRate = (prop.occupiedRooms / prop.totalRooms) * 100;
          return (
            <div 
              key={prop.id}
              className={`rounded-2xl border overflow-hidden flex flex-col hover:shadow-lg transition-shadow group ${
                isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
              } ${transClass}`}
            >
              {/* Card Thumbnail (Premium Gradient Pattern) */}
              <div className={`h-36 bg-gradient-to-br ${prop.imageGradient} p-5 flex flex-col justify-between relative`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="flex justify-between items-start z-10">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                    prop.status === 'Penuh'
                      ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/30'
                  }`}>
                    {prop.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors" title="Edit Properti">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white backdrop-blur-md transition-colors border border-red-500/30" title="Hapus Properti">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="z-10 text-white">
                  <div className="text-xs font-bold opacity-80 uppercase tracking-widest">Cabang Kost</div>
                  <h3 className="text-lg font-black tracking-tight mt-0.5">{prop.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      {prop.address}
                    </p>
                  </div>

                  {/* Occupancy Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>Okupansi Kamar</span>
                      <span className="text-orange-500 font-bold">{prop.occupiedRooms}/{prop.totalRooms} Kamar</span>
                    </div>
                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
                      <div 
                        className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer (Revenue Info & Room Link) */}
                <div className={`pt-4 border-t flex items-center justify-between gap-4 ${
                  isDark ? 'border-neutral-900' : 'border-neutral-100'
                }`}>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Omset Bulanan
                    </span>
                    <span className="text-sm font-black text-orange-500 mt-0.5 block">
                      Rp {prop.monthlyRevenue.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all border ${
                    isDark 
                      ? 'border-neutral-800 hover:bg-neutral-900 hover:text-white' 
                      : 'border-neutral-200 hover:bg-neutral-50 hover:text-neutral-950 shadow-sm'
                  }`}>
                    <span>Kelola Kamar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
