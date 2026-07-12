'use client';

import React, { useState } from 'react';
import { 
  Sliders, 
  ShieldAlert, 
  Database, 
  Save, 
  ToggleLeft, 
  ToggleRight,
  DatabaseBackup,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function AdminSettingsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [activeTab, setActiveTab] = useState('commission');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states
  const [commissionForm, setCommissionForm] = useState({
    feePercent: 10,
    minPayout: 50000,
    ppnPercent: 11
  });

  const [systemForm, setSystemForm] = useState({
    maintenanceMode: false,
    registerAllowed: true,
    backupInterval: 'Harian'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Konfigurasi sistem berhasil diperbarui!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const tabs = [
    { id: 'commission', name: 'Biaya & Komisi', icon: Percent },
    { id: 'maintenance', name: 'Pemeliharaan Sistem', icon: ShieldAlert },
    { id: 'database', name: 'Database & Cadangan', icon: Database },
  ];

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Konfigurasi Sistem Platform ⚙️</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Kelola parameter operasional Kostify, persentase komisi bagi hasil, status server, dan pencadangan database.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* TAB SELECTION ROW */}
      <div className="flex border-b overflow-x-auto gap-2 dark:border-neutral-900">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs shrink-0 transition-all ${
                isActive 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* SETTINGS CARD CONTAINER */}
      <div className={`p-6 sm:p-8 rounded-2xl border max-w-2xl ${
        isDark ? 'bg-neutral-950/60 border-neutral-900' : 'bg-white border-neutral-200 shadow-sm'
      }`}>
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* 1. COMMISSION & FEES TAB */}
          {activeTab === 'commission' && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Potongan Komisi Platform (%)</label>
                  <input 
                    type="number" 
                    value={commissionForm.feePercent}
                    onChange={(e) => setCommissionForm({ ...commissionForm, feePercent: Number(e.target.value) })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                  <p className="text-[10px] text-neutral-500">Persentase yang ditarik platform dari setiap transaksi sewa kost lunas milik owner.</p>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Batas Minimal Payout (Rupiah)</label>
                  <input 
                    type="number" 
                    value={commissionForm.minPayout}
                    onChange={(e) => setCommissionForm({ ...commissionForm, minPayout: Number(e.target.value) })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. MAINTENANCE TAB */}
          {activeTab === 'maintenance' && (
            <div className="space-y-5">
              <div className="space-y-4 divide-y dark:divide-neutral-900">
                {/* Maintenance Mode Toggle */}
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h4 className="text-xs font-bold text-red-500">Mode Pemeliharaan (Maintenance Mode)</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Mengunci akses dashboard bagi seluruh owner & penyewa selama perbaikan server.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSystemForm({ ...systemForm, maintenanceMode: !systemForm.maintenanceMode })}
                    className={`text-neutral-400 transition-colors hover:text-orange-500`}
                  >
                    {systemForm.maintenanceMode ? (
                      <ToggleRight className="w-8 h-8 text-orange-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>
                
                {/* Registration Allowed Toggle */}
                <div className="flex justify-between items-center py-3.5">
                  <div>
                    <h4 className="text-xs font-bold">Izinkan Pendaftaran Pengguna Baru</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Mengaktifkan/menonaktifkan tombol Register pada halaman depan utama.</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSystemForm({ ...systemForm, registerAllowed: !systemForm.registerAllowed })}
                    className="text-neutral-400 transition-colors hover:text-orange-500"
                  >
                    {systemForm.registerAllowed ? (
                      <ToggleRight className="w-8 h-8 text-orange-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. DATABASE TAB */}
          {activeTab === 'database' && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border dark:border-neutral-900 bg-neutral-500/5">
                  <div className="flex items-center gap-3">
                    <DatabaseBackup className="w-8 h-8 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold">Cadangkan Seluruh Basis Data</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Ekspor SQL dump untuk tabel users, kosts, transactions, dan logs.</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="px-3.5 py-2 rounded-xl bg-orange-600 text-white font-bold text-[10px] hover:bg-orange-700 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Mulai Backup
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SAVE BUTTON */}
          <div className={`pt-6 border-t flex justify-end ${
            isDark ? 'border-neutral-900' : 'border-neutral-100'
          }`}>
            <button 
              type="submit"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-xs hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-600/15 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
