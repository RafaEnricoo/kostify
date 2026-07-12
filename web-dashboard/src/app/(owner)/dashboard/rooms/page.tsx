'use client';

import React, { useState } from 'react';
import { 
  BedDouble, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  Building2, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  Edit2,
  Trash2
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function RoomsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Data Gedung Kost
  const properties = [
    { id: 'prop-1', name: 'Kost Melati Indah' },
    { id: 'prop-2', name: 'Kost Campur Bahagia' },
    { id: 'prop-3', name: 'Kost Putri Mentari' }
  ];

  // Data Kamar Kost (Mockup Premium)
  const roomsData = [
    { id: 'room-1', number: 'A-01', propertyId: 'prop-1', propertyName: 'Kost Melati Indah', type: 'Deluxe', price: 1500000, status: 'Tersedia', tenant: null },
    { id: 'room-2', number: 'A-02', propertyId: 'prop-1', propertyName: 'Kost Melati Indah', type: 'Deluxe', price: 1500000, status: 'Terisi', tenant: 'Ahmad Faisal' },
    { id: 'room-3', number: 'A-03', propertyId: 'prop-1', propertyName: 'Kost Melati Indah', type: 'Standard', price: 1200000, status: 'Terisi', tenant: 'Budi Santoso' },
    { id: 'room-4', number: 'B-01', propertyId: 'prop-2', propertyName: 'Kost Campur Bahagia', type: 'Suite', price: 2000000, status: 'Terisi', tenant: 'Siti Rahma' },
    { id: 'room-5', number: 'B-02', propertyId: 'prop-2', propertyName: 'Kost Campur Bahagia', type: 'Standard', price: 1500000, status: 'Perbaikan', tenant: null },
    { id: 'room-6', number: 'B-03', propertyId: 'prop-2', propertyName: 'Kost Campur Bahagia', type: 'Standard', price: 1500000, status: 'Tersedia', tenant: null },
    { id: 'room-7', number: 'C-01', propertyId: 'prop-3', propertyName: 'Kost Putri Mentari', type: 'Deluxe', price: 1800000, status: 'Terisi', tenant: 'Diana Putri' },
    { id: 'room-8', number: 'C-02', propertyId: 'prop-3', propertyName: 'Kost Putri Mentari', type: 'Standard', price: 1300000, status: 'Tersedia', tenant: null }
  ];

  const filteredRooms = roomsData.filter(room => {
    const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (room.tenant && room.tenant.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesProperty = selectedProperty === 'all' || room.propertyId === selectedProperty;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;

    return matchesSearch && matchesProperty && matchesStatus;
  });

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manajemen Kamar Kost 🛏️</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Kelola nomor kamar, harga sewa, tipe fasilitas, dan status ketersediaan secara berkala.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Tambah Kamar Baru</span>
        </button>
      </div>

      {/* FILTER BAR PANEL */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* Search Room or Tenant */}
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text"
              placeholder="Cari nomor kamar atau nama penyewa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500' 
                  : 'bg-neutral-50 border-neutral-200 text-neutral-800 placeholder-neutral-400'
              } ${transClass}`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Filter by Property */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <select 
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className={`w-full sm:w-48 text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-white' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                }`}
              >
                <option value="all">Semua Properti</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-neutral-400 shrink-0" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`w-full sm:w-44 text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 text-white' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-800'
                }`}
              >
                <option value="all">Semua Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Terisi">Terisi</option>
                <option value="Perbaikan">Perbaikan</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRooms.map((room) => {
          return (
            <div 
              key={room.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 group hover:shadow-md transition-shadow relative ${
                isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
              } ${transClass}`}
            >
              {/* Card Top: Number, Type, & Status */}
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="text-xl font-black tracking-tight">{room.number}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider block mt-1 w-max ${
                      room.type === 'Suite' 
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                        : room.type === 'Deluxe'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                    }`}>
                      {room.type}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider flex items-center gap-1 ${
                    room.status === 'Tersedia'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : room.status === 'Terisi'
                        ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      room.status === 'Tersedia' ? 'bg-emerald-500' : room.status === 'Terisi' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`} />
                    {room.status}
                  </span>
                </div>

                <div className={`mt-4 pt-3 border-t text-xs ${isDark ? 'border-neutral-900 text-neutral-400' : 'border-neutral-100 text-neutral-500'}`}>
                  <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider mb-0.5">Nama Properti</span>
                  <span className="font-semibold block truncate">{room.propertyName}</span>
                </div>
              </div>

              {/* Card Middle: Tenant / Price info */}
              <div className={`py-3 px-3.5 rounded-xl ${isDark ? 'bg-neutral-900/40' : 'bg-neutral-50'}`}>
                {room.status === 'Terisi' ? (
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Penyewa Sesi Ini</span>
                    <span className="text-xs font-bold block truncate mt-0.5">{room.tenant}</span>
                  </div>
                ) : room.status === 'Perbaikan' ? (
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold">Kamar dalam Perbaikan</span>
                  </div>
                ) : (
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-wider block ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>Kamar Kosong</span>
                    <span className="text-xs font-bold text-emerald-500 block mt-0.5">Siap Ditempati</span>
                  </div>
                )}
              </div>

              {/* Card Bottom: Rent Rate & Quick Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2">
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Harga Sewa</span>
                  <span className="text-sm font-black text-orange-500 block mt-0.5">Rp {(room.price / 1000).toLocaleString('id-ID')}k<span className="text-[10px] font-normal text-neutral-500">/bln</span></span>
                </div>

                <div className="flex gap-1.5">
                  <button className={`p-2 rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                    isDark 
                      ? 'border-neutral-800 text-neutral-400 hover:text-white bg-neutral-900/60' 
                      : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 bg-neutral-50'
                  }`} title="Edit Kamar">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all hover:scale-105 active:scale-95" title="Hapus Kamar">
                    <Trash2 className="w-3.5 h-3.5" />
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
