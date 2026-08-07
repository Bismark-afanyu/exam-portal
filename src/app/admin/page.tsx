'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser, logoutUser } from '@/lib/features/user/userSlice';
import { getErrorMessage } from '@/services/authService';

export default function AdminLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, isAuthenticated } = useAppSelector((state) => state.user);
  const isLoading = status === 'loading';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      if (user.role !== 'admin' && user.role !== 'editor') {
        dispatch(logoutUser());
        setError('This portal is for team members only. Please use the student login instead.');
        return;
      }
      router.push('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please try again.'));
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-between p-4 md:p-8 animate-fade-in text-slate-800">

      {/* Top Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            n
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Ŋwà&apos; Admin</span>
        </Link>

        <div className="text-xs md:text-sm text-slate-500">
          Student?{' '}
          <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
            Student login
          </Link>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
              <p className="text-xs text-slate-500">Sign in to manage the platform.</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[11px] font-medium text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Admin Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-slate-900/20 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign in to Admin Portal'}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 font-medium"
          >
            <ArrowLeft size={12} /> Go to student login
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center text-[11px] text-slate-400 py-2">
        © {new Date().getFullYear()} Ŋwà&apos; AI. All rights reserved.
      </div>

    </div>
  );
}
