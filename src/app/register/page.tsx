'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, BookOpen, Bot, Users, Trophy, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { googleSignInUser, registerUser } from '@/lib/features/user/userSlice';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);
  const isLoading = status === 'loading';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialNotice, setSocialNotice] = useState('');

  const handleGoogleSignIn = async () => {
    if (socialLoading) return;
    setSocialLoading(true);
    setSocialNotice('');
    try {
      await dispatch(googleSignInUser()).unwrap();
      router.push('/dashboard');
    } catch {
      // error is displayed from state.error
    } finally {
      setSocialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (password !== confirmPassword) {
      setSocialNotice('Passwords do not match.');
      return;
    }

    try {
      await dispatch(registerUser({ fullName, email, password })).unwrap();
      router.push('/dashboard');
    } catch {
      // error is displayed from state.error
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-between p-4 md:p-8 animate-fade-in text-slate-800">

      {/* Top Bar Logo & Navigation link */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            n
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Ŋwà'</span>
        </Link>

        <div className="text-xs md:text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">

        {/* Left Side: Marketing / Features Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-semibold border border-emerald-500/20">
            <Sparkles size={14} /> Learn Smarter. Achieve More.
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Create your account and start your journey to <span className="text-emerald-600">excellence</span>
          </h1>

          <p className="text-sm text-slate-500 leading-relaxed">
            Join thousands of GCE students who are mastering their subjects, together.
          </p>

          <div className="space-y-4 pt-2">
            {[
              {
                icon: BookOpen,
                iconBg: 'bg-emerald-500/10 text-emerald-600',
                title: 'Personalized Learning',
                desc: 'Get study plans that adapt to your strengths and weak areas.',
              },
              {
                icon: Bot,
                iconBg: 'bg-blue-500/10 text-blue-600',
                title: 'AI Tutor Support',
                desc: 'Ask questions, get explanations, and solve problems 24/7 with your AI study assistant.',
              },
              {
                icon: Users,
                iconBg: 'bg-purple-500/10 text-purple-600',
                title: 'Community & Collaboration',
                desc: 'Connect with other students, join groups, and learn together.',
              },
              {
                icon: Trophy,
                iconBg: 'bg-amber-500/10 text-amber-600',
                title: 'Track & Achieve',
                desc: 'Stay motivated with goals, streaks, badges, and performance insights.',
              },
            ].map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${feat.iconBg}`}>
                  <feat.icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 3D Render Image */}
          <div className="hidden lg:block pt-2">
            <Image
              src="/auth-books.png"
              alt="Stacked Books"
              width={260}
              height={260}
              className="object-contain mx-auto"
              priority
            />
          </div>
        </div>

        {/* Right Side: Sign Up Form Card (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="space-y-1 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Sign up</h2>
            <p className="text-xs md:text-sm text-slate-500">
              Create your Ŋwà' account in a few simple steps.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={socialLoading}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xs"
            >
              {socialLoading ? (
                <Loader2 size={16} className="animate-spin text-slate-400" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              {socialLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium whitespace-nowrap absolute">
              or sign up with email
            </span>
          </div>

          {socialNotice && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] font-medium text-blue-700">
              {socialNotice}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[11px] font-medium text-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all"
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
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all"
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

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="text-[11px] text-slate-600">
                I agree to the <span className="font-semibold text-emerald-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="font-semibold text-emerald-600 hover:underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreed || isLoading || socialLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-emerald-600/20 mt-2 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className="text-[10px] text-center text-slate-400 mt-2">
              By signing up, you agree to our <span className="text-slate-600 font-medium hover:underline cursor-pointer">Terms of Service</span> and <span className="text-slate-600 font-medium hover:underline cursor-pointer">Privacy Policy</span>.
            </p>
          </form>
        </div>

      </div>

      {/* Footer copyright */}
      <div className="max-w-6xl w-full mx-auto text-center text-[11px] text-slate-400 py-2">
        © {new Date().getFullYear()} Ŋwà' AI. All rights reserved.
      </div>

    </div>
  );
}
