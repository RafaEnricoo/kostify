'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  MessageSquareText,
  Coins, 
  Settings 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Sidebar, { MenuItem } from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme, hasLoadedTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Verifikasi Kost', href: '/admin/verifications', icon: ShieldCheck },
    { name: 'Manajemen Owner', href: '/admin/owners', icon: UserCheck },
    { name: 'Manajemen Penyewa', href: '/admin/tenants', icon: Users },
    { name: 'Laporan Keuangan', href: '/admin/payouts', icon: Coins },
    { name: 'Chat', href: '/admin/chat', icon: MessageSquareText },
    { name: 'Pengaturan Sistem', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out admin...');
    window.location.href = '/login';
  };

  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-neutral-50 text-neutral-900'} ${transClass}`}>
      
      {/* Sidebar Modular */}
      <Sidebar
        role="admin"
        menuItems={menuItems}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDark={isDark}
        transClass={transClass}
        pathname={pathname}
        onLogout={handleLogout}
      />

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Topbar Modular */}
        <Topbar
          role="admin"
          onMenuClick={() => setSidebarOpen(true)}
          isDark={isDark}
          toggleTheme={toggleTheme}
          transClass={transClass}
          userInitials="SA"
          userName="Jane Doe"
          userRoleLabel="Super Administrator"
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
