'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Building2, 
  BedDouble, 
  Users, 
  MessageSquareText,
  CreditCard, 
  Settings 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Sidebar, { MenuItem } from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme, hasLoadedTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Kelola Kost', href: '/dashboard/properties', icon: Building2 },
    { name: 'Kelola Kamar', href: '/dashboard/rooms', icon: BedDouble },
    { name: 'Penyewa', href: '/dashboard/tenants', icon: Users },
    { name: 'Transaksi', href: '/dashboard/billing', icon: CreditCard },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageSquareText },
    { name: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out owner...');
    window.location.href = '/login';
  };

  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-350' : '';

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0A0A0A] text-white' : 'bg-neutral-50 text-neutral-900'} ${transClass}`}>
      
      {/* Sidebar Modular */}
      <Sidebar
        role="owner"
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
          role="owner"
          onMenuClick={() => setSidebarOpen(true)}
          isDark={isDark}
          toggleTheme={toggleTheme}
          transClass={transClass}
          userInitials="JD"
          userName="John Doe"
          userRoleLabel="Property Owner"
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
