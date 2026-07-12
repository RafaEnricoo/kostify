'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LogOut, ChevronRight, X, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

interface SidebarProps {
  role: 'owner' | 'admin';
  menuItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  transClass: string;
  pathname: string;
  onLogout: () => void;
}

export default function Sidebar({
  role,
  menuItems,
  isOpen,
  onClose,
  isDark,
  transClass,
  pathname,
  onLogout,
}: SidebarProps) {
  const isOwner = role === 'owner';
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Ambil status collapse dari localStorage setelah mount
  useEffect(() => {
    const saved = localStorage.getItem('sidebar_collapsed');
    if (saved === 'true') {
      setIsCollapsed(true);
    }
  }, []);

  const toggleCollapse = () => {
    const nextValue = !isCollapsed;
    setIsCollapsed(nextValue);
    localStorage.setItem('sidebar_collapsed', String(nextValue));
  };

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const brandLogoAndTitle = (
    <div className={`flex items-center justify-between w-full ${isCollapsed ? 'justify-center' : ''}`}>
      {!isCollapsed ? (
        <>
          <div className="flex items-center gap-3">
            <img 
              src={isDark ? "/images/logo_white.png" : "/images/logo.png"} 
              alt="Kostify Logo" 
              className={`w-9 h-9 rounded-lg object-contain p-1 border transition-transform ${
                isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
              }`}
            />
            <span className="text-xl font-bold tracking-tight">
              Kost<span className="text-orange-500">ify</span>
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
            }`}>
              {role}
            </span>
          </div>

          <button
            onClick={toggleCollapse}
            className={`p-1.5 rounded-lg border hover:scale-105 active:scale-95 transition-all ${
              isDark 
                ? 'border-neutral-800 text-neutral-400 hover:text-white bg-neutral-900/60' 
                : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 bg-neutral-50'
            }`}
            title="Sembunyikan Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </>
      ) : (
        <img 
          src={isDark ? "/images/logo_white.png" : "/images/logo.png"} 
          alt="Kostify Logo" 
          onClick={toggleCollapse}
          className={`w-9 h-9 rounded-lg object-contain p-1 border transition-transform cursor-pointer hover:scale-110 ${
            isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'
          }`}
          title="Klik untuk melebarkan"
        />
      )}
    </div>
  );

  const navigationList = (isMobile: boolean) => {
    const collapsedMode = isCollapsed && !isMobile;
    return (
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              title={collapsedMode ? item.name : undefined}
              className={`flex items-center rounded-xl text-sm font-medium transition-all group ${
                collapsedMode ? 'justify-center p-3' : 'justify-between px-4 py-3'
              } ${
                isActive 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/10'
                  : isDark 
                    ? 'text-neutral-400 hover:text-white hover:bg-neutral-900' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                {!collapsedMode && <span>{item.name}</span>}
              </div>
              {isActive && !collapsedMode && <ChevronRight className="w-4 h-4 opacity-80" />}
            </Link>
          );
        })}
      </nav>
    );
  };

  const logoutArea = (isMobile: boolean) => {
    const collapsedMode = isCollapsed && !isMobile;
    return (
      <div className={`p-4 border-t ${isDark ? 'border-neutral-900' : 'border-neutral-100'}`}>
        <button
          onClick={() => {
            onClose();
            setShowLogoutConfirm(true);
          }}
          title={collapsedMode ? "Keluar Akun" : undefined}
          className={`w-full flex items-center rounded-xl text-sm font-medium transition-all text-red-500 hover:bg-red-500/10 ${
            collapsedMode ? 'justify-center p-3' : 'gap-3 px-4 py-3'
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsedMode && <span>Keluar Akun</span>}
        </button>
      </div>
    );
  };

  return (
    <>
      {/* SIDEBAR DESKTOP */}
      <aside 
        className={`hidden md:flex flex-col border-r shrink-0 z-20 sticky top-0 h-screen transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isDark ? 'bg-neutral-950/80 border-neutral-900 backdrop-blur-md' : 'bg-white border-neutral-200 shadow-sm'
        } ${transClass}`}
      >
        <div className={`flex items-center px-4 h-20 border-b ${isDark ? 'border-neutral-900' : 'border-neutral-100'}`}>
          {brandLogoAndTitle}
        </div>
        {navigationList(false)}
        {logoutArea(false)}
      </aside>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* SIDEBAR MOBILE */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 w-72 z-40 border-r md:hidden flex flex-col transform transition-transform duration-350 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          isDark ? 'bg-neutral-950 border-neutral-900' : 'bg-white border-neutral-200'
        }`}
      >
        <div className={`flex items-center justify-between px-6 h-20 border-b ${isDark ? 'border-neutral-900' : 'border-neutral-100'}`}>
          {brandLogoAndTitle}
          <button 
            onClick={onClose}
            className={`p-2 rounded-lg border ${
              isDark 
                ? 'border-neutral-800 text-neutral-400 hover:text-white' 
                : 'border-neutral-200 text-neutral-600 hover:text-neutral-950'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {navigationList(true)}
        {logoutArea(true)}
      </aside>

      {/* POPUP LOGOUT CONFIRMATION MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-fade">
          <div 
            className={`w-full max-w-sm rounded-2xl border p-8 text-center animate-modal-spring shadow-2xl ${
              isDark 
                ? 'bg-neutral-950 border-neutral-900 text-white' 
                : 'bg-white border-neutral-200 text-neutral-900'
            }`}
          >
            {/* Red Alert Circle Icon */}
            <div className="mx-auto w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-5">
              <LogOut className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold tracking-tight">Keluar dari Akun?</h3>
            <p className="text-xs text-neutral-500 mt-3.5 mb-8 leading-relaxed px-2">
              Apakah Anda yakin ingin keluar? Sesi aktif Anda akan segera diakhiri dan Anda perlu masuk kembali.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className={`flex-1 py-3 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                  isDark 
                    ? 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-900' 
                    : 'border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-red-600/15 active:scale-95"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
