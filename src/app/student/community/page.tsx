'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  MessageSquare, Plus, ThumbsUp, Eye, FileText, BarChart2,
  Users, Award, Calendar, ChevronRight, ShieldCheck, ArrowRight,
  MoreHorizontal, Sparkles, HelpCircle, Share2, UserPlus, Check, Volume2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CommunityPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'For You' | 'Discussions' | 'Questions' | 'Study Groups' | 'Resources' | 'Following'>('For You');
  const [activeLeaderboardPeriod, setActiveLeaderboardPeriod] = useState<'Week' | 'Month' | 'All Time'>('Week');

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* ═══════════════ HEADER TITLE & CREATE POST BUTTON ═══════════════ */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Community</h1>
          <p className="text-xs md:text-sm text-muted-fg mt-1">
            Learn together, share knowledge, and grow with other students.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shrink-0 self-start sm:self-auto">
          <Plus size={16} /> Create Post
        </button>
      </div>

      {/* ═══════════════ CATEGORY TABS ═══════════════ */}
      <div className="flex items-center gap-6 border-b border-border-subtle mb-6 overflow-x-auto pb-1">
        {(['For You', 'Discussions', 'Questions', 'Study Groups', 'Resources', 'Following'] as const).map((tab) => (
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

      {/* ═══════════════ MAIN TWO COLUMN GRID ═══════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">

        {/* ────── LEFT COLUMN: FEED ────── */}
        <div className="space-y-6">

          {/* Quick Action Cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Ask a Question', sub: 'Get help from the community', icon: MessageSquare, color: 'bg-blue-500/10 text-blue-600' },
              { label: 'Share a Resource', sub: 'Help others learn', icon: FileText, color: 'bg-emerald-500/10 text-emerald-600' },
              { label: 'Join a Study Group', sub: 'Study together', icon: Users, color: 'bg-purple-500/10 text-purple-600' },
              { label: 'Create a Poll', sub: 'Get opinions', icon: BarChart2, color: 'bg-amber-500/10 text-amber-600' },
            ].map((action, i) => (
              <button
                key={i}
                className="p-3.5 rounded-2xl bg-card-bg border border-border-subtle card-shadow-hover flex items-start gap-3 text-left group"
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", action.color)}>
                  <action.icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {action.label}
                  </h4>
                  <p className="text-[10px] text-muted-fg mt-0.5 leading-tight">{action.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Post 1: Question Post */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                  AO
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-foreground">Amaka O.</h4>
                    <span className="px-2 py-0.5 text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 rounded-full">
                      Top Contributor
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-fg mt-0.5">Advanced Level • Biology • 2h ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-amber-500/10 text-amber-600 rounded-lg">
                  Question
                </span>
                <button className="p-1 text-muted-fg hover:text-foreground"><MoreHorizontal size={16} /></button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-foreground leading-snug">
                Can someone explain the Calvin Cycle simply?
              </h3>
              <p className="text-xs text-muted-fg leading-relaxed">
                I understand the light-dependent reactions, but I'm struggling to connect how CO₂ is converted to glucose in the Calvin Cycle. A step-by-step explanation would really help!
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {['#Photosynthesis', '#Biology', '#CalvinCycle'].map((tag) => (
                  <span key={tag} className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-border-subtle text-xs text-muted-fg">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ThumbsUp size={14} /> <span>24</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageSquare size={14} /> <span>18</span>
              </button>
              <span className="flex items-center gap-1.5 ml-auto">
                <Eye size={14} /> 156
              </span>
            </div>
          </div>

          {/* Post 2: Resource Post */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-xs shrink-0">
                  DN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Daniel N.</h4>
                  <p className="text-[10px] text-muted-fg mt-0.5">Advanced Level • Physics • 5h ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 rounded-lg">
                  Resource
                </span>
                <button className="p-1 text-muted-fg hover:text-foreground"><MoreHorizontal size={16} /></button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground leading-snug">
                Here's a short note on Newton's First Law
              </h3>
              <p className="text-xs text-muted-fg leading-relaxed">
                Hope this helps someone! Let me know if you'd like me to post more on the other laws.
              </p>

              {/* Attachment File Box */}
              <div className="p-3.5 rounded-xl border border-border-subtle bg-muted/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-foreground truncate">Newton's First Law - Quick Notes.pdf</h5>
                  <p className="text-[10px] text-muted-fg">PDF • 1.2 MB</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-0.5 rounded-md">
                  #NewtonLaws
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-border-subtle text-xs text-muted-fg">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ThumbsUp size={14} /> <span>32</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageSquare size={14} /> <span>12</span>
              </button>
              <span className="flex items-center gap-1.5 ml-auto">
                <Eye size={14} /> 210
              </span>
            </div>
          </div>

          {/* Post 3: Poll Post */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center text-xs shrink-0">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Sarah M.</h4>
                  <p className="text-[10px] text-muted-fg mt-0.5">Advanced Level • Chemistry • Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-[10px] font-semibold bg-purple-500/10 text-purple-600 rounded-lg">
                  Poll
                </span>
                <button className="p-1 text-muted-fg hover:text-foreground"><MoreHorizontal size={16} /></button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-foreground leading-snug">
                Which is harder: Organic or Physical Chemistry? ⚡
              </h3>
              <p className="text-xs text-muted-fg leading-relaxed">
                Just curious what everyone thinks and why. Drop your opinions!
              </p>

              {/* Poll Options */}
              <div className="space-y-2 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground">Organic Chemistry</span>
                    <span className="text-muted-fg">62% (68 votes)</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-foreground">Physical Chemistry</span>
                    <span className="text-muted-fg">38% (42 votes)</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div className="bg-primary/60 h-full rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-3 border-t border-border-subtle text-xs text-muted-fg">
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <ThumbsUp size={14} /> <span>28</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <MessageSquare size={14} /> <span>24</span>
              </button>
              <span className="flex items-center gap-1.5 ml-auto">
                <Eye size={14} /> 186
              </span>
            </div>
          </div>

          {/* Need Help Ask AI Banner */}
          <div className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Need help? Ask Ŋwà' AI</h4>
                <p className="text-[10px] text-muted-fg">Get instant answers or start a discussion with the community.</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/student/chat')}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              Ask AI Tutor <ChevronRight size={14} />
            </button>
          </div>

        </div>

        {/* ────── RIGHT COLUMN: SIDEBAR WIDGETS ────── */}
        <div className="space-y-6">

          {/* Leaderboard Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Leaderboard</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>

            {/* Time Toggle */}
            <div className="flex items-center gap-2 border-b border-border-subtle pb-2 text-xs">
              {(['Week', 'Month', 'All Time'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveLeaderboardPeriod(period)}
                  className={cn(
                    "text-[11px] font-medium transition-colors px-2 py-0.5 rounded-md",
                    activeLeaderboardPeriod === period ? "text-primary bg-primary/10 font-semibold" : "text-muted-fg hover:text-foreground"
                  )}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Rank Items */}
            <div className="space-y-3">
              {[
                { rank: '🥇', name: 'Amaka O.', xp: '2,540 XP', avatarBg: 'bg-amber-500/20 text-amber-700' },
                { rank: '🥈', name: 'Daniel N.', xp: '2,120 XP', avatarBg: 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200' },
                { rank: '🥉', name: 'Sarah M.', xp: '1,980 XP', avatarBg: 'bg-amber-700/20 text-amber-900 dark:text-amber-300' },
                { rank: '4', name: 'Chinedu K.', xp: '1,450 XP', avatarBg: 'bg-muted text-muted-fg' },
                { rank: '5', name: 'Peace A.', xp: '1,230 XP', avatarBg: 'bg-muted text-muted-fg' },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-xs font-bold shrink-0">{user.rank}</span>
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0", user.avatarBg)}>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-semibold text-foreground">{user.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-muted-fg">{user.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Upcoming Events</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>

            <div className="space-y-3">
              {[
                { month: 'MAY', day: '24', title: 'Biology Study Session', time: 'Saturday, 6:00 PM' },
                { month: 'MAY', day: '27', title: 'Chemistry Q&A Night', time: 'Tuesday, 7:00 PM' },
              ].map((event, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[8px] font-bold text-primary tracking-wider uppercase leading-none">{event.month}</span>
                      <span className="text-xs font-bold text-primary leading-tight">{event.day}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground leading-tight">{event.title}</h4>
                      <p className="text-[10px] text-muted-fg mt-0.5">{event.time}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-card-bg border border-primary/30 text-primary text-[11px] font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Study Rooms Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Active Study Rooms</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>

            <div className="space-y-3">
              {[
                { title: 'Biology – Photosynthesis', online: '12 students online', color: 'bg-emerald-500/10 text-emerald-600', extra: '+7' },
                { title: 'Physics Problem Solvers', online: '8 students online', color: 'bg-blue-500/10 text-blue-600', extra: '+3' },
                { title: 'Chemistry Revision Hub', online: '15 students online', color: 'bg-amber-500/10 text-amber-600', extra: '+10' },
              ].map((room, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs", room.color)}>
                      <FileText size={14} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-foreground truncate leading-tight">{room.title}</h4>
                      <p className="text-[10px] text-muted-fg mt-0.5">{room.online}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-card-bg border border-primary/30 text-primary text-[11px] font-semibold rounded-lg hover:bg-primary hover:text-white transition-all shrink-0">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines Card */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Community Guidelines</h4>
              <p className="text-[10px] text-muted-fg mt-0.5 leading-relaxed">
                Be respectful, helpful, and kind. Let's build a safe space to learn together.
              </p>
              <button className="mt-2 text-[11px] font-semibold text-primary hover:underline flex items-center gap-1">
                View Guidelines <ArrowRight size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
