'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Lock, 
  Save, 
  Upload,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../../../../context/ThemeContext';

export default function SettingsPage() {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  const [activeTab, setActiveTab] = useState('profile');
  const [successMsg, setSuccessMsg] = useState('');

  // Mock Form State
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '0812-3456-7890',
  });

  const [bankForm, setBankForm] = useState({
    bankName: 'BCA',
    accountNumber: '8910-22-3456',
    accountHolder: 'John Doe',
  });

  const [notifForm, setNotifForm] = useState({
    emailBilling: true,
    emailMarketing: false,
    waReminder: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Pengaturan berhasil disimpan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const tabs = [
    { id: 'profile', name: 'Profil Pemilik', icon: User },
    { id: 'bank', name: 'Rekening Payout', icon: CreditCard },
    { id: 'notifications', name: 'Notifikasi', icon: Bell },
    { id: 'security', name: 'Keamanan', icon: Lock },
  ];

  return (
    <div className={`space-y-8 ${transClass}`}>
      
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pengaturan Akun & Properti ⚙️</h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Kelola profil pribadi, metode penarikan omset, notifikasi whatsapp, dan keamanan akun Anda.
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
          
          {/* 1. PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              {/* Profile Avatar Edit Mock */}
              <div className="flex items-center gap-4 py-2">
                <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                  JD
                </div>
                <div>
                  <button type="button" className="flex items-center gap-1.5 px-3.5 py-2 border rounded-xl text-xs font-bold hover:bg-neutral-500/10 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Unggah Foto</span>
                  </button>
                  <p className="text-[10px] text-neutral-500 mt-1.5">Mendukung format JPG atau PNG, Maksimal 2MB.</p>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nama Lengkap</label>
                  <input 
                    type="text" 
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Alamat Email</label>
                  <input 
                    type="email" 
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nomor Handphone</label>
                  <input 
                    type="text" 
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. BANK PAYOUT ACCOUNT TAB */}
          {activeTab === 'bank' && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Pilih Nama Bank</label>
                  <select 
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                    className={`px-3.5 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs font-medium ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <option value="BCA">Bank Central Asia (BCA)</option>
                    <option value="Mandiri">Bank Mandiri</option>
                    <option value="BNI">Bank Negara Indonesia (BNI)</option>
                    <option value="BRI">Bank Rakyat Indonesia (BRI)</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nomor Rekening</label>
                  <input 
                    type="text" 
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Nama Pemilik Rekening</label>
                  <input 
                    type="text" 
                    value={bankForm.accountHolder}
                    onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <div className="space-y-4 divide-y dark:divide-neutral-900">
                {/* Email Billing Toggle */}
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h4 className="text-xs font-bold">Email Invoice & Transaksi</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Kirim otomatis kuitansi digital ke email penyewa setiap transaksi lunas.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifForm.emailBilling}
                    onChange={(e) => setNotifForm({ ...notifForm, emailBilling: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
                  />
                </div>
                
                {/* WhatsApp Reminder Toggle */}
                <div className="flex justify-between items-center py-3.5">
                  <div>
                    <h4 className="text-xs font-bold">Pengingat Tagihan WhatsApp</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Kirim chat pengingat tagihan sewa ke nomor Whatsapp penyewa H-3 jatuh tempo.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notifForm.waReminder}
                    onChange={(e) => setNotifForm({ ...notifForm, waReminder: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-orange-600 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 4. SECURITY (PASSWORD) TAB */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Kata Sandi Lama</label>
                  <input 
                    type="password" 
                    placeholder="Masukkan sandi saat ini..."
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-neutral-50 border-neutral-200 placeholder-neutral-400'
                    }`}
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Kata Sandi Baru</label>
                  <input 
                    type="password" 
                    placeholder="Masukkan sandi baru..."
                    className={`px-4 py-2.5 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                      isDark ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-neutral-50 border-neutral-200 placeholder-neutral-400'
                    }`}
                  />
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
