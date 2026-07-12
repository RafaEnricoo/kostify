'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle, Loader2, ArrowLeft, KeyRound, CheckCircle, Eye, EyeOff, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { theme, toggleTheme, hasLoadedTheme } = useTheme();
  
  // State Steps: 1 = Email, 2 = OTP, 3 = New Password
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  
  // OTP States
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Password States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer untuk Kirim Ulang OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2 && countdown > 0) {
      setCanResend(false);
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Auto-hide error alert setelah 5 detik
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handler input OTP (Auto focus next/prev)
  const handleOtpChange = (value: string, index: number) => {
    // Hanya izinkan angka
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah ke kotak berikutnya jika diisi
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Pindah ke kotak sebelumnya jika menekan Backspace sewaktu kosong
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // MOCK API: Menyimulasikan pengiriman OTP untuk demo UI
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      setCountdown(60);
      setCanResend(false);
    }, 1200);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fullOtp = otp.join('');
    
    if (fullOtp.length < 6) {
      setError('Harap masukkan 6 digit kode OTP secara lengkap');
      return;
    }

    setLoading(true);

    // MOCK API: Menyimulasikan verifikasi OTP
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  // Kirim Ulang OTP Handler
  const handleResendOtp = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(Array(6).fill(''));
    // Simulasi kirim ulang
    console.log('OTP resent successfully');
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Kata sandi minimal harus terdiri dari 6 karakter');
      return;
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    setLoading(true);

    // MOCK API: Menyimulasikan penyimpanan password baru
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2500);
    }, 1500);
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

      {/* Tombol Back Adaptif */}
      {step === 1 ? (
        <Link
          href="/login"
          className={`absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border z-20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800' 
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 shadow-sm'
          } ${transClass}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Masuk</span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            setStep((prev) => (prev - 1) as 1 | 2 | 3);
            setError('');
          }}
          className={`absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border z-20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800' 
              : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 shadow-sm'
          } ${transClass}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>
      )}

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
        {success ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-5">
              <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
            </div>
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'} ${transClass}`}>
              Kata Sandi Diperbarui!
            </h1>
            <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'} ${transClass}`}>
              Kata sandi Anda berhasil diatur ulang. Mengalihkan ke halaman masuk...
            </p>
          </div>
        ) : (
          <>
            {/* Header Steps */}
            <div className="text-center mb-8">
              <h1 className={`text-2xl font-bold mb-1.5 ${isDark ? 'text-white' : 'text-neutral-900'} ${transClass}`}>
                {step === 1 && 'Lupa Kata Sandi'}
                {step === 2 && 'Verifikasi Kode OTP'}
                {step === 3 && 'Buat Sandi Baru'}
              </h1>
              <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-500'} ${transClass}`}>
                {step === 1 && 'Masukkan email Anda untuk menerima kode verifikasi OTP'}
                {step === 2 && `Kode OTP telah dikirimkan ke email ${email || 'Anda'}`}
                {step === 3 && 'Atur kata sandi baru yang aman untuk akun owner Anda'}
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3.5 rounded-xl flex items-start gap-2.5 mb-6">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-red-400 text-xs font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* STEP 1: INPUT EMAIL */}
            {step === 1 && (
              <form onSubmit={handleRequestOtp} className="space-y-5">
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

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-850 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 mt-6 text-sm ${transClass}`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-5 h-5" />
                      <span>Kirim Kode OTP</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: VERIFY OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className={`block text-xs font-bold tracking-wider mb-4 text-center ${isDark ? 'text-neutral-400' : 'text-neutral-600'} ${transClass}`}>
                    Masukkan 6 Digit OTP
                  </label>
                  
                  {/* 6 OTP Boxes */}
                  <div className="flex justify-center gap-1.5 sm:gap-2.5">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpRefs.current[idx] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                        className={`w-10 h-11 sm:w-12 sm:h-13 text-center text-base sm:text-lg font-bold rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                          isDark 
                            ? 'bg-black border-neutral-800 text-white focus:border-orange-500' 
                            : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:bg-white focus:border-orange-500'
                        } ${transClass}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-850 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 text-sm ${transClass}`}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5" />
                      <span>Verifikasi Kode</span>
                    </>
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className={`text-xs ${isDark ? 'text-neutral-500' : 'text-neutral-500'} ${transClass}`}>
                    Tidak menerima kode?{' '}
                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-orange-500 hover:text-orange-400 font-bold ml-1 transition-colors"
                      >
                        Kirim Ulang
                      </button>
                    ) : (
                      <span className="text-orange-500/60 font-bold ml-1">
                        Kirim Ulang ({countdown}s)
                      </span>
                    )}
                  </p>
                </div>
              </form>
            )}

            {/* STEP 3: RESET PASSWORD */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className={`block text-xs font-bold tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'} ${transClass}`}>
                    Kata Sandi Baru
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
                  <p className={`mt-1.5 text-[10px] ${isDark ? 'text-neutral-500' : 'text-neutral-500'} ${transClass}`}>
                    * Minimal terdiri dari 6 karakter
                  </p>
                </div>

                <div>
                  <label className={`block text-xs font-bold tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'} ${transClass}`}>
                    Konfirmasi Sandi Baru
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-12 py-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                        isDark 
                          ? 'bg-black border-neutral-800 text-white placeholder-neutral-600 focus:border-orange-500' 
                          : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:bg-white focus:border-orange-500'
                      } ${transClass}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 focus:outline-none"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
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
                      <Lock className="w-5 h-5" />
                      <span>Simpan Sandi Baru</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
}
