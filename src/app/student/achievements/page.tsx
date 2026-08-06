'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Trophy, Award, Zap, Target, TrendingUp, CheckCircle2, ChevronRight,
  Sparkles, Star, BookOpen, Brain, Download, Grid, List, Shield,
  ArrowRight, Lock, Clock, Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AchievementsPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'All Achievements' | 'Badges' | 'Milestones' | 'Certificates' | 'Rewards'>('All Achievements');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    {
      id: '1',
      title: 'Learning Mastery',
      progressText: '7 / 10',
      description: 'Achievements for building strong knowledge and understanding.',
      icon: '🎓',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      progressPercent: 70,
      barColor: 'bg-emerald-500',
    },
    {
      id: '2',
      title: 'Consistency',
      progressText: '6 / 9',
      description: 'Stay consistent and build powerful study habits.',
      icon: '📘',
      iconBg: 'bg-blue-500/10 text-blue-600',
      progressPercent: 66,
      barColor: 'bg-blue-500',
    },
    {
      id: '3',
      title: 'Practice Pro',
      progressText: '5 / 8',
      description: 'Excel in practice papers and question solving.',
      icon: '🎯',
      iconBg: 'bg-amber-500/10 text-amber-600',
      progressPercent: 62,
      barColor: 'bg-amber-500',
    },
    {
      id: '4',
      title: 'AI Explorer',
      progressText: '4 / 7',
      description: 'Use AI tools to learn smarter and deeper.',
      icon: '🧠',
      iconBg: 'bg-purple-500/10 text-purple-600',
      progressPercent: 57,
      barColor: 'bg-purple-500',
    },
    {
      id: '5',
      title: 'Streak Champion',
      progressText: '4 / 6',
      description: 'Maintain amazing streaks and stay unstoppable.',
      icon: '⭐',
      iconBg: 'bg-amber-500/10 text-amber-500',
      progressPercent: 66,
      barColor: 'bg-amber-500',
    },
    {
      id: '6',
      title: 'Community Star',
      progressText: '3 / 5',
      description: 'Help others learn and grow together.',
      icon: '💖',
      iconBg: 'bg-rose-500/10 text-rose-500',
      progressPercent: 60,
      barColor: 'bg-rose-500',
    },
    {
      id: '7',
      title: 'Subject Specialist',
      progressText: '3 / 6',
      description: 'Master concepts across different subjects.',
      icon: '🏅',
      iconBg: 'bg-teal-500/10 text-teal-600',
      progressPercent: 50,
      barColor: 'bg-teal-500',
    },
    {
      id: '8',
      title: 'Early Achiever',
      progressText: '2 / 4',
      description: 'Be among the first to achieve new milestones.',
      icon: '🚀',
      iconBg: 'bg-emerald-500/10 text-emerald-600',
      progressPercent: 50,
      barColor: 'bg-emerald-500',
    },
  ];

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* ═══════════════ HEADER TITLE SECTION ═══════════════ */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Achievements</h1>
          <span className="text-xl">🏆</span>
        </div>
        <p className="text-xs md:text-sm text-muted-fg mt-1">
          Celebrate your progress and unlock new milestones on your learning journey.
        </p>
      </div>

      {/* ═══════════════ TOP METRICS CARDS ROW ═══════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total XP */}
        <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Total XP
            </span>
            <div className="text-xl font-bold text-foreground leading-tight">2,450 <span className="text-xs font-semibold text-muted-fg">XP</span></div>
            <span className="text-[11px] text-muted-fg mt-1 block">Keep learning!</span>
          </div>
          {/* Sparkline curve preview */}
          <div className="w-16 h-8 text-emerald-500 shrink-0">
            <svg width="100%" height="100%" viewBox="0 0 60 30" fill="none">
              <path d="M0 25 Q15 20 30 15 T60 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Badges Earned */}
        <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
              Badges Earned
            </span>
            <div className="text-xl font-bold text-foreground leading-tight">32</div>
            <span className="text-[11px] text-muted-fg mt-1 block">Next badge in 120 XP</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <Shield size={20} />
          </div>
        </div>

        {/* Card 3: Milestones */}
        <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
              Milestones
            </span>
            <div className="text-xl font-bold text-foreground leading-tight">8</div>
            <span className="text-[11px] text-muted-fg mt-1 block">Great progress!</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy size={20} />
          </div>
        </div>

        {/* Card 4: Rank */}
        <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-1">
              Rank
            </span>
            <div className="text-xl font-bold text-foreground leading-tight">Top 12%</div>
            <span className="text-[11px] text-muted-fg mt-1 block">Among all students</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* ═══════════════ NAVIGATION TABS & FILTERS BAR ═══════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border-subtle pb-1">
        {/* Tabs */}
        <div className="flex items-center gap-6 overflow-x-auto">
          {(['All Achievements', 'Badges', 'Milestones', 'Certificates', 'Rewards'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-xs font-medium relative transition-colors whitespace-nowrap",
                activeTab === tab ? "text-primary font-semibold" : "text-muted-fg hover:text-foreground"
              )}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Filters & View Switcher */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 pb-2 sm:pb-0">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-3 py-1.5 pr-7 text-xs font-medium text-foreground outline-none card-shadow cursor-pointer"
          >
            <option>All Categories</option>
            <option>Learning Mastery</option>
            <option>Consistency</option>
            <option>Practice Pro</option>
          </select>

          <div className="flex items-center gap-1 p-1 bg-card-bg border border-border-subtle rounded-xl card-shadow">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-1.5 rounded-lg text-muted-fg hover:text-foreground transition-all",
                viewMode === 'grid' && "bg-primary/10 text-primary"
              )}
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-1.5 rounded-lg text-muted-fg hover:text-foreground transition-all",
                viewMode === 'list' && "bg-primary/10 text-primary"
              )}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN TWO COLUMN LAYOUT ═══════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

        {/* ────── LEFT COLUMN: CATEGORIES & RECENT ACHIEVEMENTS ────── */}
        <div className="space-y-8">

          {/* Section 1: Achievement Categories Grid */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-foreground">Achievement Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow-hover flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0", cat.iconBg)}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-bold text-foreground">{cat.progressText}</span>
                    </div>

                    <h3 className="text-xs font-bold text-foreground">{cat.title}</h3>
                    <p className="text-[11px] text-muted-fg mt-1 leading-relaxed min-h-[32px]">
                      {cat.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-700", cat.barColor)} style={{ width: `${cat.progressPercent}%` }} />
                    </div>

                    <button className="w-full py-1.5 bg-muted/60 border border-border-subtle rounded-xl text-[11px] font-semibold text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all text-center">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Recent Achievements Row */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Recent Achievements</h2>
              <button className="text-xs text-primary font-medium hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  badge: '14',
                  badgeBg: 'bg-emerald-500 text-white',
                  title: 'Two Week Streak',
                  desc: 'Study for 14 days in a row',
                  xp: '+150 XP',
                  date: 'Earned on May 19, 2025',
                },
                {
                  icon: Shield,
                  iconBg: 'bg-blue-500/10 text-blue-600',
                  title: 'Practice Pro I',
                  desc: 'Solve 10 practice papers',
                  xp: '+200 XP',
                  date: 'Earned on May 18, 2025',
                },
                {
                  icon: Brain,
                  iconBg: 'bg-amber-500/10 text-amber-600',
                  title: 'AI Explorer I',
                  desc: 'Ask 20 questions to AI Tutor',
                  xp: '+120 XP',
                  date: 'Earned on May 17, 2025',
                },
                {
                  icon: BookOpen,
                  iconBg: 'bg-purple-500/10 text-purple-600',
                  title: 'Biology Mastery',
                  desc: 'Complete 5 Biology topics',
                  xp: '+180 XP',
                  date: 'Earned on May 16, 2025',
                },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-start gap-3">
                  {item.badge ? (
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {item.badge}
                    </div>
                  ) : (
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", item.iconBg)}>
                      {item.icon && <item.icon size={16} />}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-foreground truncate">{item.title}</h4>
                    <p className="text-[10px] text-muted-fg truncate mt-0.5">{item.desc}</p>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">{item.xp}</span>
                    <div className="flex items-center gap-1 text-[9px] text-muted-fg mt-1">
                      <span className="truncate">{item.date}</span>
                      <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Quote Encouragement Banner */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Star size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">
                  "Success is the sum of small efforts, repeated day in and day out."
                </p>
                <p className="text-[11px] text-muted-fg mt-0.5">Keep going, you're doing amazing! 🚀</p>
              </div>
            </div>

            <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0">
              Explore More Achievements <ChevronRight size={14} />
            </button>
          </div>

        </div>

        {/* ────── RIGHT COLUMN: PROGRESS & MILESTONES ────── */}
        <div className="space-y-6">

          {/* Your Progress Donut Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <h3 className="text-xs font-bold text-foreground">Your Progress</h3>

            <div className="flex items-center gap-5">
              {/* Donut graphic */}
              <div className="relative shrink-0 w-24 h-24 flex items-center justify-center">
                <svg width="96" height="96" className="transform -rotate-90">
                  <circle cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted" />
                  <circle
                    cx="48" cy="48" r="38" stroke="currentColor" strokeWidth="8" fill="none"
                    strokeDasharray={2 * Math.PI * 38} strokeDashoffset={(2 * Math.PI * 38) * (1 - 0.78)}
                    strokeLinecap="round" className="text-emerald-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-base font-bold text-foreground">78%</span>
                  <span className="text-[9px] text-muted-fg">Overall Progress</span>
                </div>
              </div>

              {/* Progress items */}
              <div className="flex-1 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-muted-fg text-[11px]">Completed</span>
                  </div>
                  <span className="font-bold text-foreground">25</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-muted-fg text-[11px]">In Progress</span>
                  </div>
                  <span className="font-bold text-foreground">7</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-muted-fg text-[11px]">Locked</span>
                  </div>
                  <span className="font-bold text-foreground">14</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-muted/50 border border-border-subtle rounded-xl text-xs font-semibold text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-1">
              View Full Progress <ArrowRight size={14} />
            </button>
          </div>

          {/* Next Milestone Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <h3 className="text-xs font-bold text-foreground">Next Milestone</h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center text-xl shrink-0">
                ⭐
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground">Milestone: Knowledge Seeker</h4>
                <p className="text-[10px] text-muted-fg">Earn 3,000 XP</p>
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '81%' }} />
                </div>
                <div className="flex items-center justify-between text-[9px] text-muted-fg mt-1">
                  <span className="font-semibold text-emerald-600">🛡️ 550 XP to go!</span>
                  <span>2,450 / 3,000 XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Badges */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Top Badges</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Streak', badge: '14', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
                { label: 'Practice Pro I', badge: '🛡️', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
                { label: 'AI Explorer I', badge: '🏆', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
                { label: 'Helpful Student', badge: '💎', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
              ].map((b, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-bold mb-1", b.color)}>
                    {b.badge}
                  </div>
                  <span className="text-[9px] font-semibold text-muted-fg truncate w-full">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates Earned */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Certificates Earned</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>

            <div className="p-3 rounded-xl border border-border-subtle bg-muted/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  📜
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground leading-tight">AI Study Master</h4>
                  <p className="text-[10px] text-muted-fg mt-0.5">Awarded for completing advanced study milestones.</p>
                  <span className="text-[9px] text-muted-fg block mt-0.5">Earned on May 10, 2025</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-card-bg border border-border-subtle text-xs font-semibold text-foreground rounded-lg hover:bg-primary hover:text-white transition-all shrink-0">
                Download
              </button>
            </div>
          </div>

          {/* How to Earn More */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <h3 className="text-xs font-bold text-foreground">How to Earn More</h3>

            <div className="space-y-3 text-xs">
              {[
                { title: 'Solve more practice papers', desc: 'Earn XP and unlock badges' },
                { title: 'Maintain your study streak', desc: 'Consistency leads to rewards' },
                { title: 'Help others in the community', desc: 'Share knowledge and earn badges' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-muted-fg mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
