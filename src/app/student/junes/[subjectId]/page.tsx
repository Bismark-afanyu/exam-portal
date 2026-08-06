'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Calendar, FileText, ArrowRight, Star, Clock, Download, Share2, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

import { GCE_SUBJECTS } from '@/lib/constants/subjects';

const categoryStyles: Record<string, { icon: string; color: string }> = {
  'Arts': { icon: '🎨', color: 'from-purple-500 to-indigo-700' },
  'Science': { icon: '⚛️', color: 'from-cyan-500 to-blue-700' },
  'Commercial': { icon: '💼', color: 'from-rose-500 to-pink-600' },
};

const getSubjectMeta = (subjectId: string) => {
  const metadata = GCE_SUBJECTS.find(s => s.id === subjectId);
  const categoryStyle = metadata ? categoryStyles[metadata.category] : null;
  
  return categoryStyle || { icon: '📚', color: 'from-slate-500 to-slate-700' };
};

export default function SubjectDetailPage() {
  const { subjectId } = useParams();
  const router = useRouter();
  
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const subject = GCE_SUBJECTS.find(s => s.id === subjectId);
  const subjectName = subject?.name || (subjectId as string).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const meta = getSubjectMeta(subjectId as string);

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-muted-fg font-medium">Subject not found.</p>
        <button onClick={() => router.back()} className="mt-4 px-6 py-2 bg-card-bg text-foreground font-bold rounded-xl hover:opacity-90 transition border border-border-subtle">
          Go Back
        </button>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  // From 2000 to (currentYear - 1)
  const years = Array.from({ length: currentYear - 2000 }, (_, i) => currentYear - 1 - i);

  const toggleYear = (year: number) => {
    if (expandedYear === year) setExpandedYear(null);
    else setExpandedYear(year);
  };

  const startPractice = (year: number, paper: number) => {
    // Navigate with the correct path format: /student/junes/[subjectId]/papers/[year]-[paper]
    router.push(`/student/junes/${subjectId}/papers/${year}-${paper}`);
  };

  return (
    <div className="max-w-6xl space-y-12 animate-fade-in pb-20">
      {/* Header */}
      <div className="space-y-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-fg hover:text-green-500 font-bold transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Library
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className={cn(
              "w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gradient-to-br flex items-center justify-center text-4xl md:text-5xl font-bold shadow-2xl transition-all duration-500",
              meta.color
            )}>
              {meta.icon}
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-widest rounded-full border border-green-500/20">
                {subject.level}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
                {subject.name}
              </h1>
              <p className="text-lg text-muted-fg font-medium">Explore all past questions and marking schemes for {subject.name}.</p>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button className="p-4 bg-secondary/80 hover:bg-secondary rounded-2xl border border-border-subtle text-muted-fg hover:text-foreground transition-all">
                <Star size={20} />
             </button>
             <button className="p-4 bg-secondary/80 hover:bg-secondary rounded-2xl border border-border-subtle text-muted-fg hover:text-foreground transition-all">
                <Share2 size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Years', value: years.length, icon: Calendar, color: 'text-blue-500' },
           { label: 'Total Papers', value: subject.papers.length * years.length, icon: FileText, color: 'text-green-500' },
           { label: 'Avg. Score', value: '--', icon: Star, color: 'text-amber-500' },
           { label: 'Study Time', value: '0h', icon: Clock, color: 'text-purple-500' },
         ].map((stat, i) => (
           <div key={i} className="glass p-6 rounded-3xl border border-border-subtle">
             <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
             <div className="text-xs font-bold text-muted-fg uppercase tracking-widest">{stat.label}</div>
           </div>
         ))}
      </div>

      {/* Sessions Listing */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-black text-foreground">Past Sessions</h3>
          <div className="flex gap-4">
             <select className="bg-secondary/50 border border-border-subtle rounded-xl px-4 py-2 text-sm font-bold focus:outline-none focus:border-green-500">
                <option>Newest First</option>
                <option>Oldest First</option>
             </select>
          </div>
        </div>

        <div className="grid gap-4">
          {years.map((year, i) => (
            <div key={year} className="glass rounded-[2rem] border border-border-subtle overflow-hidden transition-all">
              <div 
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-secondary/20 transition-all group"
                onClick={() => toggleYear(year)}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex flex-col items-center justify-center text-green-500 border border-green-500/10 shadow-[inset_0_2px_10px_rgba(34,197,94,0.1)] group-hover:bg-green-500/20 transition-all">
                     <Calendar size={24} />
                  </div>
                  <div>
                     <h4 className="text-xl font-black text-foreground group-hover:text-green-500 transition-colors">
                       June {year} <span className="text-sm font-medium text-muted-fg ml-2">• Session</span>
                     </h4>
                     <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-fg">
                           <FileText size={12} /> {subject.papers.length} Papers
                        </div>
                     </div>
                  </div>
                </div>

                <div className="p-3 bg-secondary/80 rounded-xl text-muted-fg group-hover:text-foreground transition-colors border border-border-subtle">
                  {expandedYear === year ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              <AnimatePresence>
                {expandedYear === year && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border-subtle bg-secondary/10"
                  >
                    <div className="p-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {subject.papers.map((paper) => (
                        <div key={paper} className="glass-card p-5 rounded-2xl border border-border-subtle flex flex-col gap-4 hover:border-primary/30 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center font-bold border border-green-500/20">
                                {paper}
                              </span>
                              <span className="font-bold text-foreground">Paper {paper}</span>
                            </div>
                            <button className="text-muted-fg hover:text-green-500 transition-colors">
                              <Download size={18} />
                            </button>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              startPractice(year, paper);
                            }}
                            className="w-full py-2.5 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black font-bold rounded-xl border border-green-500/20 transition-all flex items-center justify-center gap-2"
                          >
                            Practice Now <ArrowRight size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
