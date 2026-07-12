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
  ChevronDown,
  Compass,
  CheckCircle,
  HelpCircle
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

  // Mock Rekomendasi Kost Terpopuler
  const featuredKosts = [
    {
      id: 'kost-1',
      name: 'Kost Melati Indah',
      type: 'Putri',
      city: 'Coblong, Bandung',
      rating: 4.9,
      reviews: 18,
      price: 1500000,
      facilities: ['Wifi', 'AC', 'Kamar Mandi Dalam'],
      gradient: 'from-orange-500 to-amber-600',
      badge: 'Terpopuler'
    },
    {
      id: 'kost-2',
      name: 'Kost Campur Bahagia',
      type: 'Campur',
      city: 'Sukajadi, Bandung',
      rating: 4.8,
      reviews: 24,
      price: 2000000,
      facilities: ['Wifi', 'AC', 'Parkir Mobil', 'Dapur'],
      gradient: 'from-blue-600 to-indigo-700',
      badge: 'Fasilitas Lengkap'
    },
    {
      id: 'kost-3',
      name: 'Kost Putri Mentari',
      type: 'Putra',
      city: 'Dago Asri, Bandung',
      rating: 4.7,
      reviews: 12,
      price: 1200000,
      facilities: ['Wifi', 'Lemari', 'Kasur Kasur'],
      gradient: 'from-rose-500 to-pink-600',
      badge: 'Hemat / Nyaman'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark ? 'bg-[#0A0A0A] text-white' : 'bg-neutral-50 text-neutral-900'
    } ${transClass}`}>
      
      {/* 1. HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all duration-300 ${
        isDark ? 'bg-neutral-950/80 border-neutral-900' : 'bg-white/80 border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={isDark ? "/images/logo_white.png" : "/images/logo.png"} 
              alt="Kostify Logo" 
              className={`w-9 h-9 rounded-lg object-contain p-1 border ${
                isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
              }`}
            />
            <span className="text-xl font-bold tracking-tight">
              Kost<span className="text-orange-500">ify</span>
            </span>
          </Link>

          {/* Center Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            <a href="#cari" className="hover:text-orange-500 transition-colors">Cari Kost</a>
            <a href="#cara-kerja" className="hover:text-orange-500 transition-colors">Cara Kerja</a>
            <a href="#rekomendasi" className="hover:text-orange-500 transition-colors">Rekomendasi</a>
            <a href="#mitra" className="hover:text-orange-500 transition-colors">Gabung Mitra</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border group hover:scale-105 active:scale-95 transition-transform ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-amber-500 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Auth Buttons */}
            <Link 
              href="/login"
              className={`hidden sm:inline-block px-4 py-2.5 rounded-xl text-xs font-bold border transition-all hover:bg-neutral-500/5 ${
                isDark ? 'border-neutral-800 text-neutral-300' : 'border-neutral-200 text-neutral-700 shadow-sm'
              }`}
            >
              Masuk
            </Link>
            <Link 
              href="/register"
              className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="cari" className="relative py-20 lg:py-32 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        {/* Glow Effects (Hanya pemanis tipis untuk Homepage) */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Sewa Kost Modern #1</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] max-w-3xl mx-auto">
            Temukan Hunian Kost <br className="hidden sm:inline" />
            Impianmu <span className="text-orange-500">Tanpa Ribet</span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Cari kost dengan legalitas 100% terverifikasi aman. Hubungi owner langsung via chat terintegrasi dan selesaikan transaksi bulanan instan otomatis.
          </p>
        </div>

        {/* 3. INTERACTIVE SEARCH BAR */}
        <div className="max-w-4xl w-full mx-auto mt-12 px-2 sm:px-4">
          <div className={`p-4 sm:p-6 rounded-3xl border flex flex-col md:flex-row items-center gap-4 text-left shadow-xl ${
            isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200'
          }`}>
            
            {/* Input 1: Lokasi */}
            <div className="w-full md:flex-1 space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Pilih Lokasi / Kampus</span>
              </label>
              <input 
                type="text"
                placeholder="Bandung, ITB, UNPAD..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-neutral-50 border-neutral-200 placeholder-neutral-400'
                }`}
              />
            </div>

            {/* Divider Line (Desktop only) */}
            <div className="hidden md:block h-10 w-[1px] bg-neutral-200 dark:bg-neutral-900" />

            {/* Input 2: Tipe Kost */}
            <div className="w-full md:w-44 space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-orange-500" />
                <span>Tipe Kost</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 font-medium ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <option value="all">Semua Tipe</option>
                <option value="campur">Campur</option>
                <option value="putra">Putra Only</option>
                <option value="putri">Putri Only</option>
              </select>
            </div>

            {/* Divider Line (Desktop only) */}
            <div className="hidden md:block h-10 w-[1px] bg-neutral-200 dark:bg-neutral-900" />

            {/* Input 3: Kisaran Harga */}
            <div className="w-full md:w-48 space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                <span>Harga Bulanan</span>
              </label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/25 font-medium ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <option value="all">Semua Budget</option>
                <option value="under1">Di bawah 1 Juta</option>
                <option value="1to2">1 - 2 Juta / bln</option>
                <option value="over2">Di atas 2 Juta</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto px-6 py-4.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-600/10 md:self-end">
              <Search className="w-4 h-4" />
              <span>Cari Sekarang</span>
            </button>

          </div>
        </div>

      </section>

      {/* 4. CARA KERJA SECTION */}
      <section id="cara-kerja" className={`py-20 border-y ${
        isDark ? 'bg-neutral-950/20 border-neutral-900' : 'bg-white border-neutral-200/60 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight">Sewa Kost Mudah dengan 3 Langkah ⚡</h2>
            <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Sistem terintegrasi yang mempertemukan penyewa dan pemilik kost dengan aman dan efisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">1. Cari Unit Kost</h3>
              <p className={`text-xs leading-relaxed max-w-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Cari kost berdasarkan lokasi, nama kampus, atau fasilitas penunjang yang kamu butuhkan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                <MessageSquareText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">2. Chat Langsung Pemilik</h3>
              <p className={`text-xs leading-relaxed max-w-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Tanyakan ketersediaan kamar, diskusikan aturan, dan verifikasi legalitas kost langsung ke owner.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold">3. Sewa & Bayar Online</h3>
              <p className={`text-xs leading-relaxed max-w-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Lakukan pemesanan aman dan bayar sewa bulanan langsung via transfer digital platform.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FEATURED REKOMENDASI SECTION */}
      <section id="rekomendasi" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight">Rekomendasi Kost Terpopuler ⭐</h2>
              <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Pilihan kost terbaik dengan rating tinggi dan legalitas aman terverifikasi.
              </p>
            </div>
            <Link 
              href="/login"
              className="flex items-center gap-1 font-bold text-xs text-orange-500 hover:underline"
            >
              <span>Lihat Semua Properti</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredKosts.map((kost) => (
              <div 
                key={kost.id}
                className={`rounded-2xl border overflow-hidden flex flex-col hover:shadow-lg transition-shadow group ${
                  isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                {/* Thumbnail Gradient */}
                <div className={`h-40 bg-gradient-to-br ${kost.gradient} p-5 flex flex-col justify-between relative`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                  <span className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg bg-white/10 text-white backdrop-blur-md uppercase tracking-wider block w-max border border-white/20">
                    {kost.badge}
                  </span>
                  <div className="text-white z-10">
                    <span className="text-[10px] font-bold opacity-85 uppercase tracking-widest">KOST {kost.type.toUpperCase()}</span>
                    <h3 className="text-lg font-black tracking-tight mt-0.5">{kost.name}</h3>
                  </div>
                </div>

                {/* Body info */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    {/* Location & Rating */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                        <span className="font-medium">{kost.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
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
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                            isDark ? 'bg-neutral-900 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
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
                      <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Mulai Dari</span>
                      <span className="text-sm font-black text-orange-500 block mt-0.5">
                        Rp {kost.price.toLocaleString('id-ID')}
                        <span className="text-[10px] font-normal text-neutral-500">/bln</span>
                      </span>
                    </div>
                    
                    <Link 
                      href="/login"
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Detail</span>
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
      <section id="mitra" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
        <div className={`rounded-3xl border p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 ${
          isDark 
            ? 'bg-gradient-to-br from-neutral-950 to-neutral-900 border-neutral-900' 
            : 'bg-gradient-to-br from-white to-neutral-100 border-neutral-200/80 shadow-md'
        }`}>
          {/* Subtle Orange Glow inside card */}
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Untuk Pemilik Kost</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Punya Properti Kosong? <br className="hidden sm:inline" />
              Sewakan di <span className="text-orange-500">Kostify!</span>
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Dapatkan reminder tagihan WhatsApp otomatis, pencatatan keuangan real-time, sebar luaskan info kost kamu, dan kelola omset sewa cabang kost langsung dari dasbor pemilik.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto shrink-0 justify-center">
            <Link 
              href="/register"
              className="px-6 py-3.5 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all text-center"
            >
              Gabung Mitra Owner
            </Link>
            <Link 
              href="/login"
              className={`px-6 py-3.5 rounded-xl text-xs font-bold border transition-all text-center ${
                isDark 
                  ? 'border-neutral-800 text-neutral-300 hover:bg-neutral-900' 
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-sm'
              }`}
            >
              Tanya CS
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className={`py-12 border-t mt-auto ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={isDark ? "/images/logo_white.png" : "/images/logo.png"} 
              alt="Kostify Logo" 
              className="w-7 h-7 object-contain"
            />
            <span className="text-sm font-black tracking-tight">
              Kost<span className="text-orange-500">ify</span>
              <span className="text-[10px] font-medium text-neutral-500 ml-1.5">© 2026. Hak Cipta Dilindungi.</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-bold text-neutral-500">
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
