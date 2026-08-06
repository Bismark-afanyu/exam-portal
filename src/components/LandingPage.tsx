'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/lib/hooks';

function FloatingStars() {
  const [stars, setStars] = useState<Array<{id: number, top: number, left: number, size: number, duration: number, delay: number, xMove: number, yMove: number}>>([]);

  useEffect(() => {
    setStars(Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 5,
      xMove: (Math.random() - 0.5) * 200,
      yMove: (Math.random() - 0.5) * 200,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-60 z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-green-200 rounded-full"
          style={{ width: star.size, height: star.size, top: `${star.top}%`, left: `${star.left}%` }}
          animate={{
            x: [0, star.xMove, star.xMove * 0.2, 0],
            y: [0, star.yMove, star.yMove * -0.5, 0],
            opacity: [0.1, 0.8, 0.1]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

const TYPEWRITER_WORDS = ["Learning", "Exams", "Potential", "Knowledge", "Confidence"];

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex % TYPEWRITER_WORDS.length];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text.length === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span className="inline-block text-white">
      {text}
      <span className="animate-pulse ml-1 opacity-60 font-light">|</span>
    </span>
  );
}

export default function LandingPage() {
  const { role } = useAppSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#052415] text-white flex flex-col relative overflow-x-hidden">

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34, 197, 94, 0.16),transparent_60%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#052415,#03140d)]" />

        <FloatingStars />
      </div>

      {/* Navbar */}
      <header 
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-[850px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl py-1.5' 
            : 'top-0 w-full backdrop-blur-md bg-[#052415]/60 py-4 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isScrolled && (
              <div className="w-6 h-6 bg-[#052415] rounded-md flex items-center justify-center">
                <Sparkles size={12} className="text-white" />
              </div>
            )}
            <span className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-[#052415]' : 'text-white text-3xl'}`}>
              Nwa
            </span>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-[13px] transition-colors duration-300 ${isScrolled ? 'text-[#052415]/60 font-medium' : 'text-white/70'}`}>
            <Link href="#" className={isScrolled ? 'hover:text-[#052415]' : 'hover:text-white'}>Support</Link>
            <Link href="#" className={isScrolled ? 'hover:text-[#052415]' : 'hover:text-white'}>Changelog</Link>
            <Link href="#" className={isScrolled ? 'hover:text-[#052415]' : 'hover:text-white'}>Pricing</Link>
            <Link href="#" className={isScrolled ? 'hover:text-[#052415]' : 'hover:text-white'}>School</Link>
          </nav>

          <div className="flex items-center gap-3">
            {!isScrolled && (
              <Link
                href="/login"
                className="text-sm px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-white"
              >
                Log In
              </Link>
            )}
            <Link
              href="/register"
              className={`text-[13px] font-medium px-5 py-2 transition-all duration-300 ${
                isScrolled 
                  ? 'bg-[#1b3d2b] text-white rounded-[10px] hover:bg-[#052415] shadow-md' 
                  : 'bg-[#F4F2F0] text-black rounded-lg hover:bg-white'
              }`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 relative z-10 container mx-auto px-6 pt-40 pb-24">

        {/* Hero */}
        <section className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/10 text-green-300 text-[11px] tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,197,94,0.2)]"
          >
            ✦ New: Custom Agents & Integrations
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-[family-name:var(--font-bricolage)] text-[45px] md:text-[82px] leading-[1.05] tracking-tighter font-light"
          >
            The AI Study Partner That
            <br />
            Transforms Your <TypewriterEffect />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[16px] md:text-[20px] text-white/70 max-w-[680px] leading-relaxed"
          >
            Within 10 minutes, you will{' '}
            <span className="text-white font-medium">
              master complex concepts
            </span>{' '}
            and gain total confidence for your upcoming exams.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href={role ? '/dashboard' : '/register'}
              className="px-8 py-4 rounded-xl bg-[#F4F2F0] text-[#052415] text-[15px] font-medium shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:scale-[1.03] transition"
            >
              Get My Study Partner
            </Link>

            <div className="mt-5">
              <Link href="/admin" className="text-[13px] text-white/50 hover:text-white transition">
                Are you an admin? Sign in to the admin portal →
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Floating Cards Section */}
        <section className="mt-32 w-full max-w-[1200px] mx-auto relative h-[450px] overflow-hidden">

          <div className="absolute inset-0 flex justify-center items-end">

            {/* Left Image */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute left-[6%] bottom-[10%] w-[160px] h-[220px] rounded-2xl bg-[#0a1811] border border-white/10 shadow-2xl hidden md:block"
            />

            {/* Folder */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute left-[22%] bottom-[15%] w-[180px] h-[140px] rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center"
            >
              <div className="w-20 h-16 bg-[#d95d4e] rounded-lg" />
            </motion.div>

            {/* Center Card */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-[150px] h-[180px] rounded-2xl bg-[#0a1811] border border-white/10 shadow-2xl z-20"
            />

            {/* Right Card */}
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="absolute right-[22%] bottom-[2%] w-[190px] h-[160px] rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hidden sm:flex"
            />

            {/* Far Right */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute right-[5%] bottom-[5%] w-[180px] h-[260px] rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 hidden lg:block"
            />

          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, type: 'spring', damping: 20 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] max-w-[700px] h-[60px] bg-white rounded-t-2xl flex items-center px-6 gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]"
          >
            <span className="font-serif text-[#052415]">Ŋwà</span>

            <div className="flex-1 bg-[#f4f2f0] h-10 rounded-full flex items-center px-4 text-[#052415]/40 text-sm">
              <FileText size={16} />
              <span className="ml-2">Workspace</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#f4f2f0] flex items-center justify-center">
              <Sparkles size={14} className="text-[#052415]/50" />
            </div>
          </motion.div>
        </section>

        {/* --- SCROLL TESTING PLACEHOLDER DATA --- */}
        <section className="mt-40 max-w-5xl mx-auto space-y-20 pb-40 opacity-40">
          <div className="text-center text-white/50 text-sm font-mono tracking-widest uppercase mb-10">
            Scroll to Test Nav Transformation
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[350px] w-[90%] mx-auto bg-gradient-to-b from-white/[0.03] to-transparent rounded-[2rem] border border-white/5 flex items-center justify-center text-white/20 font-serif text-2xl">
              Future Content Section {i + 1}
            </div>
          ))}
        </section>

      </main>
    </div>
  );
}