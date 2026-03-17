'use client';

import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { Sparkles, FileText, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.exam);

  const stats = [
    { label: 'Total Extractions', value: '12', icon: FileText, color: 'text-blue-500' },
    { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Time Saved', value: '4.5h', icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <div className="max-w-6xl space-y-12">
      {/* Welcome Section */}
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground transition-colors">
          Dashboard <span className="text-green-500">Overview.</span>
        </h1>
        <p className="text-xl text-muted-fg max-w-2xl font-medium leading-relaxed transition-colors">
          Welcome back to Ŋwà'. Monitor your extractions and manage your academic library in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border border-border-subtle hover:border-green-500/20 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-2xl bg-secondary/50", stat.color)}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-muted-fg uppercase tracking-widest">+12% vs last month</span>
            </div>
            <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-muted-fg uppercase tracking-tighter">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main CTA Section */}
      <div className="relative group overflow-hidden glass p-1 rounded-[2.5rem] border border-green-500/10 shadow-[0_20px_50px_-12px_rgba(34,197,94,0.15)]">
        <div className="bg-secondary/40 rounded-[2.2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
              <Sparkles size={12} /> Ready to Extract?
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
              Transform your paper into <br />
              <span className="text-green-500">Structured Data</span> instantly.
            </h2>
            <p className="text-muted-fg font-medium max-w-md">
              Our AI engine identifies questions, marks, and complex LaTeX formulas with unmatched precision.
            </p>
          </div>

          <button
            onClick={() => router.push('/new-extraction')}
            className="group relative flex items-center gap-3 px-8 py-5 bg-green-500 hover:bg-green-600 text-black font-black text-xl rounded-2xl transition-all shadow-xl shadow-green-500/20 hover:-translate-y-1 active:scale-95 shrink-0"
          >
            Start New Extraction
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 blur-3xl -z-10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-foreground px-4">Recent Activity</h3>
        <div className="glass rounded-[2rem] border border-border-subtle divide-y divide-border-subtle overflow-hidden">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 border border-green-500/10">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="font-bold text-foreground group-hover:text-green-500 transition-colors">Chemistry_Paper_1_2023.pdf</div>
                  <div className="text-xs font-medium text-muted-fg">Processed 2 hours ago • 25 Questions • 80 Marks</div>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-fg group-hover:text-foreground transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

