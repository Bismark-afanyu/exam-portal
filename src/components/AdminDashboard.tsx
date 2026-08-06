'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, FileText, Clock, TrendingUp, ChevronRight, AlertCircle, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useListExamsQuery } from '@/lib/features/exam/examApi';
import { GCE_SUBJECTS } from '@/lib/constants/subjects';
import AdminDashboardSkeleton from '@/components/skeletons/AdminDashboardSkeleton';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: exams, isLoading, isError } = useListExamsQuery();

  const stats = [
    { label: 'Total Extractions', value: exams?.length || 0, icon: FileText, color: 'text-blue-500', iconBg: 'bg-blue-500/10' },
    { label: 'System Health', value: 'Active', icon: TrendingUp, color: 'text-emerald-600', iconBg: 'bg-emerald-500/10' },
    { label: 'Database Sync', value: 'Live', icon: Database, color: 'text-amber-500', iconBg: 'bg-amber-500/10' },
  ];

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Admin Workspace
        </h1>
        <p className="text-xs md:text-sm text-muted-fg mt-1">
          Manage your academic library and monitor digital extractions in real-time.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-2xl bg-card-bg border border-border-subtle card-shadow-hover flex items-center justify-between">
            <div>
              <span className="text-[10px] font-semibold text-muted-fg uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <div className="text-xl font-bold text-foreground leading-tight">{stat.value}</div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 block">● Live Status</span>
            </div>
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.iconBg)}>
              <stat.icon size={20} className={stat.color} />
            </div>
          </div>
        ))}
      </div>

      {/* Main CTA Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-card-bg border border-border-subtle card-shadow relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full border border-primary/20">
              <Sparkles size={12} /> Digital Archivist
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
              Extract Context from any PDF source
            </h2>
            <p className="text-xs text-muted-fg leading-relaxed">
              Our AI parser handles complex formulas, diagrams, and multi-part questions with absolute precision.
            </p>
          </div>

          <button
            onClick={() => router.push('/new-extraction')}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shrink-0"
          >
            Start Extraction <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Recent Syncs */}
      <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="text-primary" size={18} />
          <h3 className="text-xs font-bold text-foreground">Recent Syncs</h3>
        </div>

        <div className="divide-y divide-border-subtle">
          {exams && exams.length > 0 ? [...exams].reverse().slice(0, 5).map((exam, i) => (
            <div
              key={i}
              className="py-3 flex items-center justify-between hover:bg-muted/40 transition-colors cursor-pointer group px-2 rounded-lg"
              onClick={() => router.push(`/student/junes/${exam.subject.toLowerCase().replace(/\s+/g, '-')}/papers/${exam.year}-${exam.paper}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                    {exam.subject} ({exam.year})
                  </h4>
                  <p className="text-[10px] text-muted-fg mt-0.5">
                    Paper {exam.paper} • {GCE_SUBJECTS.find(s => s.name === exam.subject)?.level || 'A-Level'} • Live on Portal
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-fg group-hover:text-foreground transition-all shrink-0" />
            </div>
          )) : (
            <div className="py-8 text-center text-xs text-muted-fg italic">
              No extractions found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
