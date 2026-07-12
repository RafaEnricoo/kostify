'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme, hasLoadedTheme } = useTheme();
  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-300' : '';

  return (
    <div 
      className={`min-h-screen relative overflow-y-auto overflow-x-hidden flex flex-col ${
        isDark ? 'bg-[#0F0F0F]' : 'bg-[#F8F9FA]'
      } ${transClass}`}
    >
      {/* Moving Dot Grid Background */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${
        isDark ? 'dot-pattern-dark' : 'dot-pattern-light'
      } ${transClass}`} />

      {/* Background Glows (Bergerak secara dinamis) */}
      <div className={`fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none animate-float-slow ${
        isDark ? 'bg-orange-600/10' : 'bg-orange-500/8'
      } ${transClass}`} />
      <div className={`fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none animate-float-reverse ${
        isDark ? 'bg-orange-600/5' : 'bg-orange-500/4'
      } ${transClass}`} />

      {/* Children Pages */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-12 px-4">
        {children}
      </div>
    </div>
  );
}
