'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role: 'OWNER',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal melakukan pendaftaran');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-50 dark:bg-gray-950 transition-colors duration-500 p-4">
      
      {/* CARD REGISTER */}
      <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-3xl backdrop-blur-sm">
          
          {success ? (
            <div className="text-center py-6">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pendaftaran Sukses!</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Akun Owner Anda berhasil dibuat. Mengalihkan ke halaman masuk...</p>
            </div>
          ) : (
            <>
              {/* LOGO & JUDUL */}
              <div className="flex flex-col items-center mb-8">
                  <div className="h-14 w-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                      {/* Icon Rumah/Kost (Solid Vector) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Daftar Akun Owner</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Mulai pasang kost dan kelola penyewa Anda</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-2.5 mb-5">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-red-400 text-xs font-medium leading-relaxed">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nama Lengkap */}
                  <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Nama Lengkap
                      </label>
                      <input 
                        id="name" 
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama lengkap Anda"
                        className="block mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm" 
                      />
                  </div>

                  {/* Email Address */}
                  <div>
                      <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Email Properti
                      </label>
                      <input 
                        id="email" 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="block mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm" 
                      />
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                      <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Nomor Handphone (WhatsApp)
                      </label>
                      <input 
                        id="phone" 
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812xxxxxxxx"
                        className="block mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm" 
                      />
                  </div>

                  {/* Password */}
                  <div>
                      <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Password
                      </label>
                      <input 
                        id="password" 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="block mt-1 w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
                      />
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border border-transparent rounded-xl font-semibold text-sm text-white uppercase tracking-wider shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 transition-all duration-200"
                      >
                          {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            'Daftarkan Sekarang'
                          )}
                      </button>
                  </div>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Sudah memiliki akun?{' '}
                  <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors">
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </>
          )}

      </div>
    </div>
  );
}
