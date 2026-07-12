'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, LogIn, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      // Simpan token ke localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect berdasarkan role
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

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 p-4">
      
      {/* CARD LOGIN */}
      <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl backdrop-blur-sm">
          
          {/* LOGO & JUDUL */}
          <div className="flex flex-col items-center mb-8">
              <div className="h-14 w-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                  {/* Icon Rumah/Kost (Solid Vector) */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Selamat Datang</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sistem Manajemen Kost Pemilik & Admin</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-2.5 mb-5">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <span className="text-red-400 text-xs font-medium leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                    Email
                  </label>
                  <div className="relative mt-1">
                    <input 
                      id="email" 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm" 
                    />
                  </div>
              </div>

              {/* Password */}
              <div>
                  <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Password
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="underline text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-md focus:outline-none"
                      >
                        Lupa Password?
                      </Link>
                  </div>
                  <div className="relative mt-1">
                    <input 
                      id="password" 
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
                    />
                  </div>
              </div>

              {/* Remember Me */}
              <div className="block">
                  <label htmlFor="remember_me" className="inline-flex items-center cursor-pointer select-none">
                      <input 
                        id="remember_me" 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-700 text-blue-600 shadow-sm focus:ring-blue-500/20 dark:bg-gray-800 cursor-pointer" 
                      />
                      <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Ingat perangkat ini</span>
                  </label>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-800 disabled:to-indigo-800 border border-transparent rounded-xl font-semibold text-sm text-white uppercase tracking-wider shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition-all duration-200"
                  >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        'Masuk Ke Sistem'
                      )}
                  </button>
              </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Belum memiliki akun owner?{' '}
              <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors">
                Daftar Properti
              </Link>
            </p>
          </div>

      </div>
    </div>
  );
}
