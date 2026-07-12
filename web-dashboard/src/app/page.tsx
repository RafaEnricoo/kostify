'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Search, 
  Star, 
  ShieldCheck, 
  CreditCard, 
  MessageSquareText, 
  ArrowRight, 
  Sun, 
  Moon, 
  Sparkles,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  Compass,
  FileCheck,
  BellRing,
  Coins
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const { theme, toggleTheme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  // State untuk form pencarian
  const [location, setLocation] = useState('');
  const [type, setType] = useState('all');
  const [price, setPrice] = useState('all');

  // Mock Data Kost Terpopuler
  const featuredKosts = [
    {
      id: 'kost-1',
      name: 'Kost Melati Indah',
      type: 'Putri',
      city: 'Coblong, Bandung',
      rating: 4.9,
      reviews: 18,
      price: 1500000,
      facilities: ['Wifi', 'AC', 'Km. Dalam'],
      gradient: 'from-orange-500 to-amber-600',
      badge: 'Pilihan Utama'
    },
    {
      id: 'kost-2',
      name: 'Kost Campur Bahagia',
      type: 'Campur',
      city: 'Sukajadi, Bandung',
      rating: 4.8,
      reviews: 24,
      price: 2000000,
      facilities: ['Wifi', 'AC', 'Parkir Mobil'],
      gradient: 'from-blue-600 to-indigo-700',
      badge: 'Fasilitas Lengkap'
    },
    {
      id: 'kost-3',
      name: 'Kost Putra Mentari',
      type: 'Putra',
      city: 'Dago Asri, Bandung',
      rating: 4.7,
      reviews: 12,
      price: 1200000,
      facilities: ['Wifi', 'Kasur', 'Lemari'],
      gradient: 'from-rose-500 to-pink-600',
      badge: 'Ekonomis'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col selection:bg-orange-500 selection:text-white ${
      isDark ? 'bg-[#050505] text-neutral-100' : 'bg-neutral-50 text-neutral-900'
    } ${transClass}`}>
      
      {/* Grid Pattern Overlay for High-end developer/designer look */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* 1. HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        isDark ? 'bg-[#050505]/80 border-neutral-900' : 'bg-white/80 border-neutral-200/80 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-20 blur group-hover:opacity-40 transition-opacity duration-300" />
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white bg-orange-600 relative z-10 shadow-md shadow-orange-600/10`}>
                K
              </div>
            </div>
            <span className="text-lg font-black tracking-tight">
              Kost<span className="text-orange-500">ify.</span>
            </span>
          </Link>

          {/* Center Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            <a href="#cari" className="hover:text-orange-500 transition-colors">Cari Kost</a>
            <a href="#keunggulan" className="hover:text-orange-500 transition-colors">Keunggulan</a>
            <a href="#rekomendasi" className="hover:text-orange-500 transition-colors">Rekomendasi</a>
            <a href="#mitra" className="hover:text-orange-500 transition-colors">Gabung Owner</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border group hover:scale-105 active:scale-95 transition-transform ${
                isDark 
                  ? 'bg-neutral-900/50 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Auth Buttons */}
            <Link 
              href="/login"
              className={`hidden sm:inline-block px-4.5 py-2.5 rounded-xl text-xs font-extrabold border transition-all hover:bg-neutral-500/5 ${
                isDark ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700 shadow-sm'
              }`}
            >
              Masuk
            </Link>
            <Link 
              href="/register"
              className="px-4.5 py-2.5 rounded-xl text-xs font-extrabold bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all"
            >
              Daftar
            </Link>
          </div>

        </div>
      </header>

      {/* 2. ASYMMETRICAL BENTO HERO SECTION */}
      <section id="cari" className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        
        {/* Soft Orange Aura blur */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] pointer-events-none -z-10 animate-pulse duration-[8000ms]" />

        {/* LEFT COLUMN: HERO CONTENT */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Sewa Kost Terpercaya</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.05] max-w-2xl">
            Hunian Kost Nyaman. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Legalitas Terjamin.</span>
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed max-w-xl ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Platform sewa kost cerdas bagi mahasiswa dan pekerja. Cari lokasi terdekat kampus, verifikasi kelayakan properti real-time, dan lakukan pembayaran otomatis bergaransi refund.
          </p>

          {/* Sleek Stats Counter */}
          <div className="grid grid-cols-3 gap-6 pt-4 max-w-md border-t dark:border-neutral-900 border-neutral-200">
            <div>
              <span className="text-2xl font-black tracking-tight block">12k+</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Kamar Aktif</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight block">100%</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Terverifikasi</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight block">4.9★</span>
              <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-wider">Rating Kepuasan</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE APP WINDOW MOCKUP */}
        <div className="lg:col-span-5 relative w-full select-none">
          <div className={`rounded-3xl border p-5 shadow-2xl relative ${
            isDark 
              ? 'bg-[#0c0c0c] border-neutral-850 shadow-orange-950/5' 
              : 'bg-white border-neutral-200 shadow-neutral-200/50'
          }`}>
            
            {/* Window Top Controls */}
            <div className="flex items-center gap-1.5 border-b dark:border-neutral-900 border-neutral-100 pb-4 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="text-[9px] text-neutral-500 font-bold ml-2">app.kostify.com/search</span>
            </div>

            {/* Simulated Kost Item Detail */}
            <div className="space-y-4">
              {/* Map Preview Placeholder (Sleek grid) */}
              <div className={`h-36 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                isDark ? 'bg-neutral-900/60' : 'bg-neutral-100'
              }`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff6b00_1.5px,transparent_1.5px)] [background-size:12px_12px]" />
                
                {/* Simulated Location Marker */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="px-2.5 py-1.5 rounded-xl bg-orange-600 text-white font-extrabold text-[10px] shadow-lg flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Dago, Bandung</span>
                  </div>
                  <div className="w-2 h-2 bg-orange-600 rotate-45 -mt-1" />
                </div>
              </div>

              {/* Float Card Mockup */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDark ? 'bg-neutral-950/80 border-neutral-900' : 'bg-neutral-50 border-neutral-150'
              }`}>
                <div>
                  <h4 className="text-xs font-black">Kost Melati Indah A-02</h4>
                  <span className="text-[9px] text-neutral-500 block mt-0.5">Coblong • Putri Only</span>
                  <span className="text-xs font-bold text-orange-500 block mt-2">Rp 1.500.000 / bln</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg border border-emerald-500/20 text-emerald-500 bg-emerald-500/10 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Tersedia
                </span>
              </div>

              {/* Chat Bubble Mockup */}
              <div className="flex gap-2.5 items-end justify-start max-w-[90%]">
                <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">JD</div>
                <div className={`p-3 rounded-2xl text-[10px] leading-relaxed rounded-bl-none border ${
                  isDark ? 'bg-neutral-900 border-neutral-850 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-700 shadow-sm'
                }`}>
                  "Halo Pak, apa kamar Deluxe bisa dipesan hari ini?"
                </div>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* 3. SLEEK SEARCH ENGINE BAR (Floating Capsule) */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-8 mb-20">
        <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col md:flex-row items-center gap-4 text-left shadow-xl ${
          isDark ? 'bg-[#0a0a0a]/90 border-neutral-900 shadow-neutral-950/40' : 'bg-white border-neutral-200 shadow-neutral-100/60'
        }`}>
          
          {/* Input 1: Lokasi */}
          <div className="w-full md:flex-1 space-y-1.5">
            <label className="text-[9px] font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Lokasi / Area Kost</span>
            </label>
            <input 
              type="text"
              placeholder="Cari Kota, Universitas, atau jalan..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 ${
                isDark ? 'bg-neutral-900 border-neutral-850 text-white placeholder-neutral-600' : 'bg-neutral-50 border-neutral-250 placeholder-neutral-400'
              }`}
            />
          </div>

          <div className="hidden md:block h-8 w-[1px] bg-neutral-200 dark:bg-neutral-900" />

          {/* Input 2: Tipe Kost */}
          <div className="w-full md:w-44 space-y-1.5">
            <label className="text-[9px] font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Tipe Kost</span>
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 font-bold ${
                isDark ? 'bg-neutral-900 border-neutral-850 text-white' : 'bg-neutral-50 border-neutral-250 text-neutral-700'
              }`}
            >
              <option value="all">Semua Tipe</option>
              <option value="campur">Campur</option>
              <option value="putra">Putra</option>
              <option value="putri">Putri</option>
            </select>
          </div>

          <div className="hidden md:block h-8 w-[1px] bg-neutral-200 dark:bg-neutral-900" />

          {/* Input 3: Budget */}
          <div className="w-full md:w-48 space-y-1.5">
            <label className="text-[9px] font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-orange-500" />
              <span>Kisaran Harga</span>
            </label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 font-bold ${
                isDark ? 'bg-neutral-900 border-neutral-850 text-white' : 'bg-neutral-50 border-neutral-250 text-neutral-700'
              }`}
            >
              <option value="all">Semua Budget</option>
              <option value="under1">Di bawah 1 Juta</option>
              <option value="1to2">1 - 2 Juta / bln</option>
              <option value="over2">Di atas 2 Juta</option>
            </select>
          </div>

          <button className="w-full md:w-auto px-6 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-600/10 md:self-end">
            <Search className="w-4 h-4" />
            <span>Cari Properti</span>
          </button>

        </div>
      </section>

      {/* 4. BENTO GRID "KEUNGGULAN" SECTION */}
      <section id="keunggulan" className={`py-24 border-y ${
        isDark ? 'bg-[#080808]/40 border-neutral-900' : 'bg-white border-neutral-200/60 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-black tracking-tight">Kenapa Harus Memilih Kostify? ✨</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Fitur teknologi terdepan untuk menyelesaikan masalah klasik sewa-menyewa kost.
            </p>
          </div>

          {/* Bento-style Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Legalitas */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between gap-6 group hover:border-orange-500/30 transition-colors ${
              isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200/80 shadow-sm'
            }`}>
              <div className="w-11 h-11 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Dokumen Terverifikasi 100%</h3>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Setiap kost yang didaftarkan melalui tahap pemeriksaan berkas KTP, kepemilikan tanah, dan legalitas izin operasional oleh tim admin kami.
                </p>
              </div>
            </div>

            {/* Bento Card 2: Pengingat Tagihan WhatsApp */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between gap-6 group hover:border-orange-500/30 transition-colors ${
              isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200/80 shadow-sm'
            }`}>
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Reminder WhatsApp Otomatis</h3>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Sistem mengirimkan pemberitahuan pengingat tagihan bulanan langsung ke nomor WhatsApp penyewa 3 hari sebelum batas sewa jatuh tempo.
                </p>
              </div>
            </div>

            {/* Bento Card 3: Transaksi & Pencairan */}
            <div className={`p-8 rounded-3xl border flex flex-col justify-between gap-6 group hover:border-orange-500/30 transition-colors ${
              isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-neutral-50 border-neutral-200/80 shadow-sm'
            }`}>
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">Pencairan Dana Terjadwal</h3>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Kemudahan pencairan omset sewa bagi pemilik kost (payouts) yang aman, cepat, dan transparan dalam potongan komisi sistem.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FEATURED REKOMENDASI SECTION */}
      <section id="rekomendasi" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Rekomendasi Kost Terpopuler ⭐</h2>
              <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Pilihan properti teratas dengan penilaian istimewa dari para penyewa sebelumnya.
              </p>
            </div>
            <Link 
              href="/login"
              className="flex items-center gap-1 font-bold text-xs text-orange-500 hover:text-orange-600 transition-colors group"
            >
              <span>Eksplor Semua Unit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredKosts.map((kost) => (
              <div 
                key={kost.id}
                className={`rounded-3xl border overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1 duration-300 group ${
                  isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                {/* Thumbnail Gradient */}
                <div className={`h-44 bg-gradient-to-br ${kost.gradient} p-6 flex flex-col justify-between relative`}>
                  <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  <span className="text-[9px] font-black px-2.5 py-1 rounded-lg bg-white/10 text-white backdrop-blur-md uppercase tracking-wider block w-max border border-white/20">
                    {kost.badge}
                  </span>
                  <div className="text-white z-10">
                    <span className="text-[9px] font-extrabold opacity-80 uppercase tracking-widest block">KOST {kost.type.toUpperCase()}</span>
                    <h3 className="text-lg font-black tracking-tight mt-0.5">{kost.name}</h3>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    {/* Location & Rating */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span className="font-semibold">{kost.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{kost.rating}</span>
                        <span className="text-[10px] text-neutral-500 font-normal">({kost.reviews})</span>
                      </div>
                    </div>

                    {/* Facilities Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {kost.facilities.map((fac, idx) => (
                        <span 
                          key={idx}
                          className={`text-[9px] font-extrabold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
                            isDark 
                              ? 'bg-neutral-900 border-neutral-850 text-neutral-450' 
                              : 'bg-neutral-100 border-neutral-200/50 text-neutral-600'
                          }`}
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className={`pt-4 border-t flex justify-between items-center ${
                    isDark ? 'border-neutral-900' : 'border-neutral-100'
                  }`}>
                    <div>
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Harga Mulai</span>
                      <span className="text-sm font-black text-orange-500 block mt-0.5">
                        Rp {kost.price.toLocaleString('id-ID')}
                        <span className="text-[10px] font-normal text-neutral-500">/bln</span>
                      </span>
                    </div>
                    
                    <Link 
                      href="/login"
                      className="px-4 py-2.5 rounded-xl text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. MITRA OWNER CTA BANNER */}
      <section id="mitra" className="py-8 px-6 lg:px-8 max-w-7xl mx-auto w-full mb-24">
        <div className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 ${
          isDark 
            ? 'bg-gradient-to-br from-[#080808] to-neutral-950 border-neutral-900 shadow-lg' 
            : 'bg-gradient-to-br from-white to-neutral-100 border-neutral-200 shadow-md shadow-neutral-200/30'
        }`}>
          {/* Subtle Orange Glow inside card */}
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Mitra Bisnis Kostify</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Punya Properti Kosong? <br className="hidden sm:inline" />
              Kelola Praktis Bersama <span className="text-orange-500">Kostify.</span>
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Dapatkan dasbor manajemen hunian otomatis, reminder tagihan otomatis WhatsApp, log riwayat arus kas terkelola, dan perluas promosi kost Anda tanpa biaya bulanan tersembunyi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0 justify-center">
            <Link 
              href="/register"
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all text-center"
            >
              Mulai Sewakan Properti
            </Link>
            <Link 
              href="/login"
              className={`px-6 py-3.5 rounded-xl text-xs font-extrabold border transition-all text-center ${
                isDark 
                  ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-900' 
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-sm'
              }`}
            >
              Hubungi CS
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className={`py-12 border-t mt-auto ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white bg-orange-600 text-xs">
              K
            </div>
            <span className="text-sm font-black tracking-tight">
              Kost<span className="text-orange-500">ify.</span>
              <span className="text-[10px] font-medium text-neutral-500 ml-2">© 2026. Hak Cipta Dilindungi.</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
            <Link href="/login" className="hover:text-orange-500 transition-colors">Dasbor Owner</Link>
            <Link href="/login" className="hover:text-orange-500 transition-colors">Dasbor Admin</Link>
            <a href="#" className="hover:text-orange-500 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
