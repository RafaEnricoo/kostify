'use client';

import React from 'react';
import { Menu, Search, Sun, Moon, Bell } from 'lucide-react';

interface TopbarProps {
  role: 'owner' | 'admin';
  onMenuClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  transClass: string;
  userInitials: string;
  userName: string;
  userRoleLabel: string;
}

export default function Topbar({
  role,
  onMenuClick,
  isDark,
  toggleTheme,
  transClass,
  userInitials,
  userName,
  userRoleLabel,
}: TopbarProps) {
  const isOwner = role === 'owner';
  
  return (
    <header 
      className={`h-20 border-b flex items-center justify-between px-4 sm:px-8 z-10 shrink-0 sticky top-0 backdrop-blur-md ${
        isDark ? 'bg-neutral-950/80 border-neutral-900' : 'bg-white/80 border-neutral-200'
      } ${transClass}`}
    >
      {/* Hamburger & Search */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className={`p-2.5 rounded-xl border md:hidden ${
            isDark 
              ? 'border-neutral-800 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white' 
              : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600'
          }`}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search Input Bar (Desktop Only) */}
        <div className="relative hidden sm:block w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text"
            placeholder={
              isOwner 
                ? 'Cari properti, kamar, penyewa...' 
                : 'Cari owner, kost, keluhan sistem...'
            }
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-orange-500' 
                : 'bg-neutral-50 border-neutral-200 text-neutral-800 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
            } ${transClass}`}
          />
        </div>
      </div>

      {/* Action Tools */}
      <div className="flex items-center gap-3">
        
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl border group hover:scale-105 active:scale-95 ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 hover:border-neutral-700' 
              : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
          } ${transClass}`}
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Moon className="w-4 h-4 text-amber-500 group-hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        {/* Notification Bell */}
        <button
          className={`p-2.5 rounded-xl border relative ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-850 text-neutral-400 hover:text-white' 
              : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-600 shadow-sm'
          } ${transClass}`}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full animate-pulse bg-orange-500" />
        </button>

        {/* Divider Line */}
        <div className={`h-8 w-[1px] ${isDark ? 'bg-neutral-900' : 'bg-neutral-200'}`} />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border flex items-center justify-center text-white font-bold text-sm border-orange-500/30 bg-orange-600">
            {userInitials}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold leading-none mb-1">{userName}</p>
            <p className="text-[10px] text-neutral-500 leading-none">{userRoleLabel}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
