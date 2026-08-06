'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText, CheckCircle2, Clock, BookOpen, Filter, Search, ChevronDown,
  Sparkles, Zap, ChevronRight, MoreVertical, Play, ArrowUpRight, TrendingUp,
  Brain, HelpCircle, Check, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';
import { useListExamsQuery } from '@/lib/features/exam/examApi';
import { GCE_SUBJECTS } from '@/lib/constants/subjects';

interface PaperItem {
  id: string;
  subject: string;
  year: number;
  paper: number;
  level: string;
  duration: string;
  marks: number;
  status: 'Unattempted' | 'In Progress' | 'Completed';
  progress?: number;
  score?: number;
  isNew?: boolean;
}

export default function JunesPage() {
  const router = useRouter();
  const { level, department } = useAppSelector((state) => state.user);
  const { data: exams, isLoading } = useListExamsQuery();

  const [activeTab, setActiveTab] = useState<'All Papers' | 'Unattempted' | 'In Progress' | 'Completed' | 'Bookmarked'>('All Papers');
  const [selectedSubject, setSelectedSubject] = useState<string>('Biology');
  const [selectedLevel, setSelectedLevel] = useState<string>(level === 'Advanced' ? 'Advanced Level' : 'Ordinary Level');
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedType, setSelectedType] = useState<string>('All Paper Types');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentLevelLabel = level === 'Advanced' ? 'A-Level' : 'O-Level';

  // Sample papers dataset matching the design visually & functionally
  const samplePapers: PaperItem[] = [
    { id: '1', subject: 'Biology', year: 2022, paper: 2, level: 'Advanced Level', duration: '2h 30m', marks: 100, status: 'Unattempted', isNew: true },
    { id: '2', subject: 'Biology', year: 2021, paper: 1, level: 'Advanced Level', duration: '1h 45m', marks: 80, status: 'In Progress', progress: 65 },
    { id: '3', subject: 'Biology', year: 2021, paper: 2, level: 'Advanced Level', duration: '2h 30m', marks: 100, status: 'Completed', score: 82 },
    { id: '4', subject: 'Biology', year: 2020, paper: 1, level: 'Advanced Level', duration: '1h 45m', marks: 80, status: 'Completed', score: 75 },
    { id: '5', subject: 'Biology', year: 2020, paper: 2, level: 'Advanced Level', duration: '2h 30m', marks: 100, status: 'Unattempted' },
    { id: '6', subject: 'Biology', year: 2019, paper: 1, level: 'Advanced Level', duration: '1h 45m', marks: 80, status: 'Unattempted' },
  ];

  // Filter papers based on tab & dropdowns
  const filteredPapers = samplePapers.filter(paper => {
    if (activeTab === 'Unattempted') return paper.status === 'Unattempted';
    if (activeTab === 'In Progress') return paper.status === 'In Progress';
    if (activeTab === 'Completed') return paper.status === 'Completed';
    return true;
  });

  const getSubjectSvgIcon = (name: string) => {
    switch (name) {
      case 'Biology':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 15c6.667-6 13.333 0 20-6" />
              <path d="M2 9c6.667 6 13.333 0 20 6" />
            </svg>
          </div>
        );
      case 'Physics':
        return (
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <ellipse cx="12" cy="12" rx="9" ry="4" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <BookOpen size={22} />
          </div>
        );
    }
  };

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* ═══════════════ HEADER TITLE SECTION ═══════════════ */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Practice Papers</h1>
        <p className="text-sm text-muted-fg mt-1">
          Sharpen your skills with past questions and improve your exam performance.
        </p>
      </div>

      {/* ═══════════════ TOP METRICS ROW ═══════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            icon: (
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <FileText size={18} />
              </div>
            ),
            value: '128',
            label: 'Papers Available',
            sub: 'Across all subjects',
          },
          {
            icon: (
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <CheckCircle2 size={18} />
              </div>
            ),
            value: '24',
            label: 'Completed',
            sub: 'Papers solved',
          },
          {
            icon: (
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <TrendingUp size={18} />
              </div>
            ),
            value: '78%',
            label: 'Average Score',
            sub: 'Your performance',
          },
          {
            icon: (
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600">
                <BookOpen size={18} />
              </div>
            ),
            value: '12',
            label: 'Subjects',
            sub: 'Explore & practice',
          },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center gap-4">
            {item.icon}
            <div>
              <div className="text-xl font-bold text-foreground leading-none mb-1">{item.value}</div>
              <div className="text-xs font-semibold text-foreground leading-tight">{item.label}</div>
              <div className="text-[10px] text-muted-fg leading-tight">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════ FILTERS & TABS ═══════════════ */}
      <div className="mb-6 space-y-4">
        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Selector */}
          <div className="relative">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-4 py-2.5 pr-9 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow hover:border-primary/30 transition-all"
            >
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
          </div>

          {/* Level Selector */}
          <div className="relative">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-4 py-2.5 pr-9 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow hover:border-primary/30 transition-all"
            >
              <option value="Advanced Level">Advanced Level</option>
              <option value="Ordinary Level">Ordinary Level</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
          </div>

          {/* Year Selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-4 py-2.5 pr-9 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow hover:border-primary/30 transition-all"
            >
              <option value="All Years">All Years</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
          </div>

          {/* Paper Type Selector */}
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-4 py-2.5 pr-9 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow hover:border-primary/30 transition-all"
            >
              <option value="All Paper Types">All Paper Types</option>
              <option value="Paper 1">Paper 1</option>
              <option value="Paper 2">Paper 2</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
          </div>

          {/* Filters Button */}
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-card-bg border border-border-subtle rounded-xl text-xs font-medium text-foreground card-shadow hover:bg-muted transition-all">
            <Filter size={14} />
            Filters
          </button>

          {/* Sort By Dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-fg">Sort by:</span>
            <div className="relative">
              <select className="appearance-none bg-card-bg border border-border-subtle rounded-xl px-3 py-2 pr-8 text-xs font-medium text-foreground outline-none cursor-pointer card-shadow">
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-6 border-b border-border-subtle pb-1">
          {(['All Papers', 'Unattempted', 'In Progress', 'Completed', 'Bookmarked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 text-xs font-medium relative transition-colors",
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
      </div>

      {/* ═══════════════ MAIN CONTENT GRID (two columns) ═══════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* ────── LEFT COLUMN: PAPERS LIST ────── */}
        <div className="space-y-4">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow-hover flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                {getSubjectSvgIcon(paper.subject)}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-foreground">
                      {paper.subject} P{paper.paper} {paper.year}
                    </h3>
                    {paper.isNew && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-fg mt-0.5">
                    {paper.level} • Paper {paper.paper}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-fg mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> May/June {paper.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {paper.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText size={12} /> {paper.marks} marks
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Status & Progress */}
              <div className="flex flex-col items-start md:items-end min-w-[140px]">
                {paper.status === 'Unattempted' && (
                  <span className="px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-600 rounded-lg">
                    Unattempted
                  </span>
                )}
                {paper.status === 'In Progress' && (
                  <div className="w-full space-y-1 md:text-right">
                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-500/10 text-blue-600 rounded-lg inline-block mb-1">
                      In Progress
                    </span>
                    <div className="text-xs font-semibold text-foreground">{paper.progress}%</div>
                    <div className="w-32 bg-muted h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${paper.progress}%` }} />
                    </div>
                  </div>
                )}
                {paper.status === 'Completed' && (
                  <div className="md:text-right space-y-1">
                    <span className="px-2.5 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-600 rounded-lg inline-block">
                      Completed
                    </span>
                    <div className="text-xs text-muted-fg">
                      Score: <span className="font-bold text-foreground">{paper.score}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Action Button & Menu */}
              <div className="flex items-center gap-2 self-end md:self-center">
                {paper.status === 'Unattempted' && (
                  <button
                    onClick={() => router.push(`/student/junes/${paper.subject.toLowerCase()}/papers/${paper.year}-${paper.paper}`)}
                    className="px-4 py-2 text-xs font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    Start Practice
                  </button>
                )}
                {paper.status === 'In Progress' && (
                  <button
                    onClick={() => router.push(`/student/junes/${paper.subject.toLowerCase()}/papers/${paper.year}-${paper.paper}`)}
                    className="px-4 py-2 text-xs font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    Continue
                  </button>
                )}
                {paper.status === 'Completed' && (
                  <button
                    onClick={() => router.push(`/student/junes/${paper.subject.toLowerCase()}/papers/${paper.year}-${paper.paper}`)}
                    className="px-4 py-2 text-xs font-semibold text-primary border border-primary/30 rounded-xl hover:bg-primary hover:text-white transition-all"
                  >
                    Review Answers
                  </button>
                )}
                <button className="p-2 text-muted-fg hover:text-foreground rounded-lg transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-muted-fg">Showing 1 to 6 of 24 papers</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 text-xs border border-border-subtle rounded-lg text-muted-fg hover:text-foreground">
                &lt;
              </button>
              <button className="px-3 py-1 text-xs bg-primary text-white font-semibold rounded-lg">1</button>
              <button className="px-3 py-1 text-xs border border-border-subtle rounded-lg text-muted-fg hover:text-foreground">2</button>
              <button className="px-3 py-1 text-xs border border-border-subtle rounded-lg text-muted-fg hover:text-foreground">3</button>
              <button className="px-3 py-1 text-xs border border-border-subtle rounded-lg text-muted-fg hover:text-foreground">4</button>
              <button className="px-2.5 py-1 text-xs border border-border-subtle rounded-lg text-muted-fg hover:text-foreground">
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* ────── RIGHT COLUMN: SIDEBAR WIDGETS ────── */}
        <div className="space-y-6">
          {/* Quick Practice Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              <h3 className="text-xs font-bold text-foreground">Quick Practice</h3>
            </div>
            <p className="text-[11px] text-muted-fg">
              Jump into a random paper based on your level and subject.
            </p>
            <div className="space-y-3">
              <div className="relative">
                <select className="w-full appearance-none bg-muted border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none">
                  <option>Biology</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
              </div>
              <div className="relative">
                <select className="w-full appearance-none bg-muted border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none">
                  <option>Advanced Level</option>
                  <option>Ordinary Level</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
              </div>
              <button className="w-full py-2.5 bg-primary text-white text-xs font-semibold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                Start Quick Practice <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Topic Practice Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div>
              <h3 className="text-xs font-bold text-foreground">Topic Practice</h3>
              <p className="text-[11px] text-muted-fg mt-0.5">
                Practice questions by topic and track your
              </p>
            </div>
            <div className="space-y-3">
              {[
                { topic: 'Cell Biology', percent: 85, color: 'bg-emerald-500' },
                { topic: 'Plant Physiology', percent: 72, color: 'bg-emerald-500' },
                { topic: 'Human Physiology', percent: 68, color: 'bg-emerald-500' },
                { topic: 'Genetics', percent: 60, color: 'bg-emerald-500' },
                { topic: 'Ecology', percent: 55, color: 'bg-emerald-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-muted-fg text-[11px] truncate flex-1">{item.topic}</span>
                  <div className="w-24 bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="font-semibold text-foreground text-[11px] w-7 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>
            <button className="w-full pt-2 text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1">
              Explore Topics <ChevronRight size={14} />
            </button>
          </div>

          {/* Performance Overview Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Performance Overview</h3>
              <div className="relative">
                <select className="appearance-none bg-transparent text-[10px] text-muted-fg font-medium outline-none pr-4">
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
                <ChevronDown size={10} className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
              </div>
            </div>

            {/* Sparkline chart */}
            <div className="h-16 flex items-end justify-between gap-1 pt-2">
              <svg width="100%" height="100%" viewBox="0 0 200 50" className="overflow-visible text-primary">
                <path
                  d="M0,35 Q20,25 40,38 T80,15 T120,30 T160,10 T200,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-border-subtle">
              <div>
                <div className="text-sm font-bold text-foreground">82%</div>
                <div className="text-[10px] text-muted-fg">Best Score</div>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">12</div>
                <div className="text-[10px] text-muted-fg">Papers Solved</div>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">18h 30m</div>
                <div className="text-[10px] text-muted-fg">Total Practice Time</div>
              </div>
            </div>

            <button className="w-full pt-1 text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1">
              View Full Analytics <ChevronRight size={14} />
            </button>
          </div>

          {/* Need help solving a paper? AI Card */}
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-card-bg border border-border-subtle flex items-center justify-center text-primary shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground">Need help solving a paper?</h4>
              <p className="text-[10px] text-muted-fg leading-tight mt-0.5">
                Ask the AI Tutor for hints, explanations and step-by-step solutions.
              </p>
              <button
                onClick={() => router.push('/student/chat')}
                className="mt-2.5 px-3 py-1.5 text-xs font-semibold text-primary bg-card-bg border border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center gap-1"
              >
                Ask AI Tutor <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
