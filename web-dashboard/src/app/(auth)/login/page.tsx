'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, AlertCircle, Loader2, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { theme, toggleTheme, hasLoadedTheme } = useTheme();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync email dari localStorage jika ada 'Remember Me'
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Menghilangkan pesan error secara otomatis setelah 5 detik
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email atau password salah');
      }

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }

      if (data.user.role === 'OWNER' || data.user.role === 'SUPER_ADMIN') {
        router.push('/dashboard');
      } else {
        setError('Akses ditolak. Dashboard Web hanya untuk Pemilik Kost & Admin.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';
  const transClass = hasLoadedTheme ? 'transition-all duration-300' : '';

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-xl border z-20 group hover:scale-110 active:scale-95 ${
          isDark 
            ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800' 
            : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
        } ${transClass}`}
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun className={`w-5 h-5 text-amber-500 ${transClass} group-hover:rotate-90`} />
        ) : (
          <Moon className={`w-5 h-5 text-amber-500 ${transClass} group-hover:-rotate-12`} />
        )}
      </button>

      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 z-10">
        <img 
          src={isDark ? "/images/logo_white.png" : "/images/logo.png"} 
          alt="Kostify Logo" 
          className={`w-11 h-11 rounded-xl object-contain p-1.5 shadow-sm ${
            isDark ? 'border border-neutral-800 bg-neutral-900' : 'border border-neutral-200 bg-white'
          } ${transClass}`}
        />
        <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'} ${transClass}`}>
          Kost<span className="text-orange-500">ify</span>
        </span>
      </div>

      {/* Card Wrapper */}
      <div 
        className={`w-full max-w-md p-6 sm:p-8 rounded-2xl border shadow-2xl z-10 ${
          isDark 
            ? 'bg-neutral-900/60 backdrop-blur-xl border-neutral-800/80 hover:border-neutral-700/50' 
            : 'bg-white border-neutral-200/80 hover:border-neutral-300/80 shadow-neutral-200/40'
        } ${transClass}`}
      >
        <div className="text-center mb-8">
          <h1 className={`text-2xl font-bold mb-1.5 ${isDark ? 'text-white' : 'text-neutral-900'} ${transClass}`}>
            Selamat Datang Kembali
          </h1>
          <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'} ${transClass}`}>
            Masuk untuk mengelola kost Anda
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <span className="text-red-400 text-xs font-medium leading-relaxed">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-xs font-bold tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'} ${transClass}`}>
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  isDark 
                    ? 'bg-black border-neutral-800 text-white placeholder-neutral-600 focus:border-orange-500' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
                } ${transClass}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'} ${transClass}`}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  isDark 
                    ? 'bg-black border-neutral-800 text-white placeholder-neutral-600 focus:border-orange-500' 
                    : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
                } ${transClass}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`w-5 h-5 rounded-md border flex items-center justify-center mr-2 shrink-0 ${
                  rememberMe 
                    ? 'bg-orange-600 border-orange-600 text-white scale-100 shadow-md shadow-orange-500/20' 
                    : isDark 
                      ? 'bg-black border-neutral-800 text-transparent group-hover:border-neutral-700' 
                      : 'bg-neutral-50 border-neutral-300 text-transparent group-hover:border-neutral-400'
                } ${transClass}`}
              >
                <svg 
                  className={`w-3.5 h-3.5 stroke-[3] ${
                    rememberMe ? 'scale-100' : 'scale-0'
                  } ${transClass}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span 
                className={`text-xs font-semibold ${
                  isDark ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-900'
                } ${transClass}`}
              >
                Ingat saya
              </span>
            </label>
            
            <Link 
              href="/forgot-password" 
              className="text-xs font-semibold text-orange-500 hover:text-orange-400"
            >
              Lupa Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-850 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 mt-6 text-sm ${transClass}`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>Masuk Sekarang</span>
              </>
            )}
          </button>
        </form>

        {/* Separator 'atau masuk dengan' */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className={`w-full border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'} ${transClass}`} />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className={`px-3 font-semibold ${
              isDark ? 'bg-[#151515] text-neutral-500' : 'bg-white text-neutral-400'
            } ${transClass}`}>
              atau masuk dengan
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={() => {
            console.log('Google login clicked');
          }}
          className={`w-full py-3 rounded-xl border font-semibold text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800' 
              : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-sm'
          } ${transClass}`}
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span>Masuk dengan Google</span>
        </button>

        <div className="mt-6 text-center">
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'} ${transClass}`}>
            Belum memiliki akun owner?{' '}
            <Link 
              href="/register" 
              className="text-orange-500 hover:text-orange-400 font-bold ml-1"
            >
              Daftar Akun
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
