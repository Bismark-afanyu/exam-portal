'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play, Clock, Star, Search, ChevronRight, Video as VideoIcon, Layers, Bookmark,
  Filter, ChevronDown, CheckCircle2, TrendingUp, Sparkles, UserCheck, Eye, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VideosPage() {
  const router = useRouter();

  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const categories = ['All Videos', 'Biology', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'];

  const videos = [
    {
      id: '1',
      title: 'Photosynthesis & Light-Dependent Reactions Deep Dive',
      subject: 'Biology',
      level: 'Advanced Level',
      duration: '18:45',
      views: '3.4k',
      rating: '4.9',
      tutor: 'Dr. Afanyu B.',
      thumbColor: 'from-emerald-600/30 to-teal-900/40',
      badge: 'Popular',
    },
    {
      id: '2',
      title: 'Newton\'s Laws of Motion & Projectile Calculations',
      subject: 'Physics',
      level: 'Advanced Level',
      duration: '24:10',
      views: '2.8k',
      rating: '4.8',
      tutor: 'Prof. Nkwenti',
      thumbColor: 'from-blue-600/30 to-indigo-900/40',
      badge: 'Featured',
    },
    {
      id: '3',
      title: 'Organic Chemistry: Reaction Mechanisms & Synthesis',
      subject: 'Chemistry',
      level: 'Advanced Level',
      duration: '31:15',
      views: '4.1k',
      rating: '4.9',
      tutor: 'Dr. Mbeng',
      thumbColor: 'from-purple-600/30 to-violet-900/40',
      badge: 'High Score Focus',
    },
    {
      id: '4',
      title: 'Calculus: Integration by Parts & Partial Fractions',
      subject: 'Mathematics',
      level: 'Advanced Level',
      duration: '22:30',
      views: '5.2k',
      rating: '5.0',
      tutor: 'Mr. Tanyi',
      thumbColor: 'from-amber-600/30 to-orange-900/40',
    },
    {
      id: '5',
      title: 'Cell Division: Mitosis vs Meiosis Step-by-Step',
      subject: 'Biology',
      level: 'Ordinary Level',
      duration: '15:20',
      views: '1.9k',
      rating: '4.7',
      tutor: 'Dr. Afanyu B.',
      thumbColor: 'from-emerald-600/30 to-teal-900/40',
    },
    {
      id: '6',
      title: 'Electromagnetism & Faraday\'s Law of Induction',
      subject: 'Physics',
      level: 'Advanced Level',
      duration: '27:50',
      views: '2.1k',
      rating: '4.8',
      tutor: 'Prof. Nkwenti',
      thumbColor: 'from-blue-600/30 to-indigo-900/40',
    },
  ];

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* ═══════════════ HEADER TITLE SECTION ═══════════════ */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Video Tutorials</h1>
          <p className="text-sm text-muted-fg mt-1">
            Watch step-by-step video explanations for tough GCE topics & past questions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" />
          <input
            type="text"
            placeholder="Search videos, topics, tutors..."
            className="w-full pl-9 pr-4 py-2.5 bg-card-bg border border-border-subtle rounded-xl text-xs text-foreground placeholder:text-muted-fg card-shadow outline-none focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* ═══════════════ FEATURED HERO VIDEO BANNER ═══════════════ */}
      <div className="mb-8 rounded-2xl bg-card-bg border border-border-subtle card-shadow overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center">
          
          {/* Left Video Thumbnail Banner */}
          <div className="relative aspect-video lg:aspect-auto lg:h-64 bg-gradient-to-br from-teal-900 via-emerald-800 to-slate-900 flex items-center justify-center p-6 group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
              <Play size={26} fill="currentColor" className="ml-1" />
            </div>
            <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
              Featured Tutorial
            </div>
            <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-mono font-bold text-white">
              18:45
            </div>
          </div>

          {/* Right Info Details */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 rounded-full">
                Biology
              </span>
              <span className="text-xs text-muted-fg font-medium">Advanced Level</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-foreground leading-snug hover:text-primary transition-colors cursor-pointer">
              Photosynthesis & Light-Dependent Reactions Deep Dive
            </h2>
            <p className="text-xs text-muted-fg line-clamp-2">
              Master the thylakoid membrane reactions, photolysis of water, ATP synthesis, and Calvin cycle mechanisms with step-by-step GCE exam breakdown.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-fg pt-1">
              <span className="flex items-center gap-1"><UserCheck size={14} className="text-primary" /> Dr. Afanyu B.</span>
              <span className="flex items-center gap-1"><Eye size={14} /> 3.4k views</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-500" /> 4.9</span>
            </div>
            <div className="pt-2">
              <button className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-sm">
                <Play size={14} fill="currentColor" /> Watch Full Lesson
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ CATEGORY TABS & FILTERS ═══════════════ */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all card-shadow",
                i === 0
                  ? "bg-primary text-white font-semibold"
                  : "bg-card-bg border border-border-subtle text-muted-fg hover:text-foreground hover:border-primary/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-3 py-1.5 pr-7 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow"
            >
              <option value="All Levels">All Levels</option>
              <option value="Advanced Level">Advanced Level</option>
              <option value="Ordinary Level">Ordinary Level</option>
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ═══════════════ VIDEO CARDS GRID ═══════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((vid) => (
          <div
            key={vid.id}
            className="rounded-2xl bg-card-bg border border-border-subtle card-shadow-hover overflow-hidden group cursor-pointer flex flex-col"
          >
            {/* Thumbnail Box */}
            <div className={cn("relative aspect-video bg-gradient-to-br flex items-center justify-center p-4", vid.thumbColor)}>
              <div className="w-12 h-12 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Play size={20} fill="currentColor" className="ml-0.5" />
              </div>

              {vid.badge && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-semibold text-white">
                  {vid.badge}
                </div>
              )}

              <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/75 backdrop-blur-md rounded-md text-[11px] font-mono font-bold text-white">
                {vid.duration}
              </div>
            </div>

            {/* Card Body Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {vid.subject}
                  </span>
                  <span className="text-[10px] text-muted-fg">{vid.level}</span>
                </div>
                <h3 className="text-xs font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {vid.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[11px] text-muted-fg">
                <span className="font-medium text-foreground">{vid.tutor}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye size={12} /> {vid.views}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star size={12} fill="currentColor" /> {vid.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
