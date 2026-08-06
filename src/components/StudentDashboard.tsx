'use client';

import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import {
  ChevronRight, Flame, Clock, Star, Target, ArrowRight,
  AlertCircle, Play, TrendingUp, Calendar,
  BrainCircuit, Calculator, FileText, Sparkles, MessageSquare, BookMarked,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useListExamsQuery } from '@/lib/features/exam/examApi';
import { GCE_SUBJECTS } from '@/lib/constants/subjects';
import Image from 'next/image';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';

/* ─── Subject style map ─── */
const subjectIcons: Record<string, { icon: string; color: string; bgColor: string }> = {
  Physics: { icon: '⚛️', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  Chemistry: { icon: '🧪', color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
  Mathematics: { icon: 'π', color: 'text-primary', bgColor: 'bg-primary/10' },
  'English Language': { icon: '📝', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  Biology: { icon: '🧬', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
};

function getSubjectStyle(name: string) {
  return subjectIcons[name] || { icon: '📚', color: 'text-muted-fg', bgColor: 'bg-muted' };
}

/* ─── Donut chart ─── */
function CircularChart({ percent, size = 60, stroke = 5, textSize = 'text-sm' }: { percent: number; size?: number; stroke?: number; textSize?: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-muted" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="text-primary transition-all duration-1000"
        />
      </svg>
    </div>
  );
}

/* ─── Mini sparkline ─── */
function MiniSparkline({ data, color = 'text-primary' }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={cn("shrink-0", color)}>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

/* ─── AI Robot icon (simple SVG) ─── */
function AIRobotIcon({ className }: { className?: string }) {
  return (
    <div className={cn("w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", className)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary">
        <rect x="4" y="8" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="14" r="1.5" fill="currentColor" />
        <circle cx="15" cy="14" r="1.5" fill="currentColor" />
        <path d="M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 13H4M20 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/* ─── MAIN COMPONENT ─── */
/* ═══════════════════════════════════════════ */
export default function StudentDashboard() {
  const router = useRouter();
  const { level, department, name } = useAppSelector((state) => state.user);
  const { data: exams, isLoading, isError } = useListExamsQuery();

  const currentLevel: string = level === 'Advanced' ? 'A-Level' : 'O-Level';

  const subjects = exams
    ? Array.from(new Set(exams.map((e) => e.subject)))
        .map((subjectName) => {
          const meta = GCE_SUBJECTS.find((s) => s.name === subjectName);
          if (!meta) return null;
          if (meta.level !== currentLevel || meta.category !== department) return null;
          const paperCount = exams.filter((e) => e.subject === subjectName).length;
          return { name: subjectName, level: meta.level, papers: meta.papers.length, fetchedPapers: paperCount };
        })
        .filter((s): s is NonNullable<typeof s> => s !== null)
    : [];

  const recentPaper = exams
    ? (() => {
        const paper = [...exams].reverse()[0];
        return paper ? { ...paper, progress: 65 } : null;
      })()
    : null;

  const upcomingExams = exams
    ? [...exams].reverse().slice(0, 3).map((e, i) => ({
        ...e,
        daysUntil: (i + 1) * 14,
        duration: `${2 + i}h ${15 + i * 10}m`,
      }))
    : [];

  /* ─── Loading / Error states ─── */
  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center max-w-sm mx-auto">
        <div className="p-3 bg-red-50 rounded-xl text-red-500">
          <AlertCircle size={28} />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
        <p className="text-sm text-muted-fg">We couldn't load your dashboard. Please try again.</p>
        <button onClick={() => window.location.reload()} className="mt-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition">
          Retry
        </button>
      </div>
    );
  }

  /* ─── Greeting ─── */
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  const firstName = name?.split(' ')[0] || 'Student';

  return (
    <div className="w-full animate-fade-in">
      {/* ═══════════════ HERO GREETING ═══════════════ */}
      <div className="relative rounded-2xl bg-card-bg border border-border-subtle card-shadow overflow-hidden mb-6">
        <div className="relative z-10 flex items-center justify-between p-6 md:p-8">
          {/* Left content */}
          <div className="space-y-3 max-w-md">
            <h1 className="text-2xl md:text-[28px] font-bold text-foreground leading-tight">
              {greeting}, {firstName}! 👋
            </h1>
            <p className="text-sm text-muted-fg">
              Every question you solve today is a step closer to your success.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-all shadow-sm">
                Continue Learning <ArrowRight size={16} />
              </button>
              <button
                onClick={() => router.push('/student/junes')}
                className="flex items-center gap-2 px-5 py-2.5 bg-card-bg border border-border-subtle hover:bg-muted text-foreground text-sm font-medium rounded-lg transition-all"
              >
                Explore Subjects
              </button>
            </div>
          </div>

          {/* Right illustration */}
          <div className="hidden md:block w-48 h-40 shrink-0">
            <Image
              src="/student-hero.png"
              alt="Student studying"
              width={192}
              height={160}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>

        {/* Subtle green gradient accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </div>

      {/* ═══════════════ STATS ROW ═══════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Daily Streak', value: '14', unit: 'days', sub: 'Best: 21 days',
            icon: Flame, iconColor: 'text-orange-500', iconBg: 'bg-orange-500/10',
            sparkData: [5, 8, 12, 10, 14, 11, 14], sparkColor: 'text-orange-400',
          },
          {
            label: 'Study Time', value: '2h', valueSuffix: '45m', unit: '', sub: '+18% vs last week',
            icon: Clock, iconColor: 'text-blue-500', iconBg: 'bg-blue-500/10',
            sparkData: [30, 45, 40, 60, 55, 70, 80], sparkColor: 'text-blue-400',
          },
          {
            label: 'XP Points', value: '1,250', unit: 'XP', sub: 'Level 6 · Scholar',
            icon: Star, iconColor: 'text-amber-500', iconBg: 'bg-amber-500/10',
            bar: true, barPercent: 65, barColor: 'bg-primary',
          },
          {
            label: 'Weekly Goal', value: '78', unit: '%', sub: '6h 15m / 8h',
            icon: Target, iconColor: 'text-primary', iconBg: 'bg-primary/10',
            bar: true, barPercent: 78, barColor: 'bg-primary',
          },
        ].map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-card-bg border border-border-subtle card-shadow-hover">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", stat.iconBg)}>
                <stat.icon size={16} className={stat.iconColor} />
              </div>
              {stat.sparkData && <MiniSparkline data={stat.sparkData} color={stat.sparkColor} />}
            </div>
            <p className="text-[11px] font-medium text-muted-fg uppercase tracking-wider mb-0.5">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">{stat.value}</span>
              {'valueSuffix' in stat && <span className="text-lg font-bold text-foreground">{stat.valueSuffix}</span>}
              {stat.unit && <span className="text-xs text-muted-fg">{stat.unit}</span>}
            </div>
            {stat.bar && (
              <div className="w-full bg-muted h-1.5 rounded-full mt-2 overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000", stat.barColor)} style={{ width: `${stat.barPercent}%` }} />
              </div>
            )}
            <p className="text-[11px] text-muted-fg mt-1.5">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════ MAIN CONTENT GRID (two columns) ═══════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 mb-6">
        {/* ────── LEFT COLUMN ────── */}
        <div className="space-y-6">
          {/* Continue Learning */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Continue Learning</h2>
              <button className="text-xs text-primary hover:underline font-medium transition-colors">View all</button>
            </div>
            {recentPaper ? (() => {
              const style = getSubjectStyle(recentPaper.subject);
              return (
                <div
                  onClick={() => router.push(`/student/junes/${recentPaper.subject.toLowerCase().replace(/\s+/g, '-')}/papers/${recentPaper.year}-${recentPaper.paper}`)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0", style.bgColor)}>
                    {style.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{recentPaper.subject}</h3>
                    </div>
                    <p className="text-xs text-muted-fg mt-0.5">{currentLevel} · Paper {recentPaper.paper}</p>
                    <p className="text-[11px] text-muted-fg mt-0.5">You left off: Transport in Plants</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 bg-muted h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: `${recentPaper.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-fg font-medium">{recentPaper.progress}% complete</span>
                    </div>
                  </div>
                  <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:bg-primary/90 transition-all shrink-0">
                    <Play size={10} fill="currentColor" /> Continue
                  </button>
                  <ChevronRight size={16} className="text-muted-fg group-hover:text-foreground transition-colors shrink-0" />
                </div>
              );
            })() : (
              <div className="py-8 text-center text-sm text-muted-fg">
                Start your first exam to see progress here!
              </div>
            )}
          </div>

          {/* Recommended for You */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Recommended for You</h2>
              <button className="text-xs text-primary hover:underline font-medium transition-colors">View all</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(subjects.length > 0 ? subjects : [
                { name: 'Physics', level: 'A-Level', papers: 5, fetchedPapers: 12 },
                { name: 'Chemistry', level: 'A-Level', papers: 5, fetchedPapers: 15 },
                { name: 'Mathematics', level: 'A-Level', papers: 5, fetchedPapers: 18 },
                { name: 'English Language', level: 'O-Level', papers: 3, fetchedPapers: 10 },
              ]).slice(0, 4).map((subject, i) => {
                const style = getSubjectStyle(subject.name);
                const progress = [72, 68, 53, 60][i] || 50;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      const exam = exams?.find((e) => e.subject === subject.name);
                      if (exam) router.push(`/student/junes/${exam.subject.toLowerCase().replace(/\s+/g, '-')}/papers/${exam.year}-${exam.paper}`);
                    }}
                    className="p-4 rounded-xl border border-border-subtle hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group text-center"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-lg mx-auto mb-2", style.bgColor)}>
                      {style.icon}
                    </div>
                    <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{subject.name}</h3>
                    <p className="text-[11px] text-muted-fg mt-0.5">{subject.level === 'A-Level' ? 'Advanced Level' : 'Ordinary Level'}</p>
                    <p className="text-[10px] text-muted-fg">{subject.fetchedPapers} Papers</p>
                    <div className="mt-2 relative inline-flex items-center justify-center">
                      <CircularChart percent={progress} size={40} stroke={3} />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-foreground">{progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Study Recommendations */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-5">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-semibold text-foreground">AI Study Recommendations</h2>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-semibold">Beta</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {[
                { title: 'Focus on: Cell Division', desc: 'You got 5/7 questions', action: 'Review Now', actionColor: 'bg-primary/10 text-primary hover:bg-primary hover:text-white', iconBg: 'bg-primary/10' },
                { title: 'Practice More', desc: 'Photosynthesis topic', action: 'Start Practice', actionColor: 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white', iconBg: 'bg-blue-50' },
                { title: 'Weak Area Alert', desc: 'Organic Chemistry', action: 'Strengthen', actionColor: 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white', iconBg: 'bg-red-50' },
              ].map((rec, i) => (
                <div key={i} className="min-w-[200px] flex-1 p-4 rounded-xl border border-border-subtle hover:shadow-sm transition-all">
                  <AIRobotIcon className={rec.iconBg} />
                  <h3 className="text-xs font-semibold text-foreground mt-2">{rec.title}</h3>
                  <p className="text-[11px] text-muted-fg mt-0.5">{rec.desc}</p>
                  <button className={cn("mt-3 w-full py-1.5 text-xs font-medium rounded-lg transition-all", rec.actionColor)}>
                    {rec.action}
                  </button>
                </div>
              ))}
              {/* Scroll indicator */}
              <div className="flex items-center justify-center pl-1 shrink-0">
                <ChevronRight size={18} className="text-muted-fg" />
              </div>
            </div>
          </div>
        </div>

        {/* ────── RIGHT COLUMN ────── */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Upcoming Exams</h2>
              <button className="text-xs text-primary hover:underline font-medium transition-colors">View all</button>
            </div>
            <div className="space-y-3">
              {upcomingExams.map((exam, i) => {
                const date = new Date();
                date.setDate(date.getDate() + exam.daysUntil);
                const monthShort = date.toLocaleDateString('en', { month: 'short' }).toUpperCase();
                const dayNum = String(date.getDate()).padStart(2, '0');
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border-subtle hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    {/* Calendar date box */}
                    <div className="w-11 h-12 rounded-lg bg-primary/5 border border-primary/10 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[9px] font-semibold text-primary tracking-wider">{monthShort}</span>
                      <span className="text-base font-bold text-primary leading-none">{dayNum}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-semibold text-foreground">{exam.subject} P{exam.paper} {exam.year}</h3>
                        <span className="text-[9px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full font-medium">{currentLevel === 'A-Level' ? 'Advanced' : 'Ordinary'}</span>
                      </div>
                      <p className="text-[11px] text-muted-fg mt-0.5">In {exam.daysUntil} days · {exam.duration}</p>
                    </div>
                    <ChevronRight size={14} className="text-muted-fg group-hover:text-foreground transition-colors shrink-0" />
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => router.push('/student/junes')}
              className="w-full mt-4 py-2.5 text-xs font-medium text-primary bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
            >
              <Calendar size={14} /> View All Exams
            </button>
          </div>

          {/* Performance Overview */}
          <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Performance Overview</h2>
              <button className="text-xs text-primary hover:underline font-medium transition-colors">View full report</button>
            </div>
            <div className="flex items-center gap-5 mb-4">
              {/* Donut chart */}
              <div className="relative shrink-0">
                <CircularChart percent={78} size={100} stroke={8} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-primary">78%</span>
                  <span className="text-[10px] text-muted-fg">Overall Score</span>
                </div>
              </div>
              {/* Stats */}
              <div className="flex-1 space-y-2.5">
                {[
                  { label: 'Correct Answers', value: 245, dotColor: 'bg-primary' },
                  { label: 'Incorrect Answers', value: 68, dotColor: 'bg-red-500' },
                  { label: 'Unattempted', value: 27, dotColor: 'bg-gray-300' },
                  { label: 'Accuracy', value: '78%', dotColor: 'bg-blue-500' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", stat.dotColor)} />
                      <span className="text-xs text-muted-fg">{stat.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium pt-2 border-t border-border-subtle">
              <TrendingUp size={14} /> ↑ 12% improvement from last week
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ QUICK ACTIONS BAR ═══════════════ */}
      <div className="rounded-2xl bg-card-bg border border-border-subtle card-shadow p-4 flex items-center justify-between gap-4">
        {/* Left: Quick Actions pills */}
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-xs font-semibold text-foreground whitespace-nowrap">Quick Actions</span>
          {[
            { icon: FileText, label: 'Past Papers', href: '/student/junes' },
            { icon: Sparkles, label: 'AI Tutor', href: '/student/chat' },
            { icon: BrainCircuit, label: 'Flashcards', href: '/student/junes' },
            { icon: BookMarked, label: 'Notes', href: '/student/junes' },
            { icon: Calculator, label: 'Calculator', href: '#' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => action.href !== '#' && router.push(action.href)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle hover:border-primary/20 hover:bg-primary/5 transition-all text-xs font-medium text-foreground whitespace-nowrap shrink-0"
            >
              <action.icon size={14} className="text-primary" />
              {action.label}
            </button>
          ))}
        </div>

        {/* Right: Need Help */}
        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-border-subtle shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare size={14} className="text-primary" />
            </div>
            <div>
              <span className="text-xs font-semibold text-foreground block leading-tight">Need Help?</span>
              <span className="text-[10px] text-muted-fg leading-tight">Ask the AI Tutor anything</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
