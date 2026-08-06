'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Send, Mic, Paperclip, ThumbsUp, ThumbsDown,
  HelpCircle, ChevronRight, Edit2, PlayCircle, FileText,
  MessageSquare, ChevronDown, Check, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppSelector } from '@/lib/hooks';

export default function ChatPage() {
  const router = useRouter();
  const { level } = useAppSelector((state) => state.user);

  const [inputMessage, setInputMessage] = useState('');
  const [levelValue, setLevelValue] = useState('Advanced Level');
  const [paperType, setPaperType] = useState('Theory');
  const [focusArea, setFocusArea] = useState('Cell Biology');

  return (
    <div className="w-full flex flex-col h-[calc(100vh-6.5rem)] animate-fade-in">
      {/* ═══════════════ HEADER TITLE SECTION (FIXED AT TOP) ═══════════════ */}
      <div className="pb-4 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/50 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">AI Tutor</h1>
            <Sparkles className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs md:text-sm text-muted-fg">
              Your intelligent study companion. Ask anything, learn better.
            </p>
            <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              Powered by Ŋwà' AI
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN FLEX CONTENT AREA ═══════════════ */}
      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        
        {/* ────── LEFT COLUMN: CHAT INTERFACE & FIXED BOTTOM INPUT ────── */}
        <div className="flex flex-col h-full min-h-0 relative">
          
          {/* Scrollable Conversation Stream */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4">
            
            {/* User Question Bubble */}
            <div className="flex justify-end">
              <div className="max-w-lg bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 rounded-2xl p-4 text-xs font-medium text-foreground space-y-1">
                <p>Explain the process of photosynthesis in detail and include the balanced equation.</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-muted-fg mt-1">
                  <span>10:24 AM</span>
                  <Check size={12} className="text-primary" />
                </div>
              </div>
            </div>

            {/* AI Response Card */}
            <div className="flex items-start gap-4">
              {/* Robot Avatar */}
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-sm">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <rect x="4" y="8" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="9" cy="14" r="1.5" fill="currentColor" />
                  <circle cx="15" cy="14" r="1.5" fill="currentColor" />
                  <path d="M12 4V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 13H4M20 13H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* AI Answer Content Box */}
              <div className="flex-1 bg-card-bg border border-border-subtle card-shadow rounded-2xl p-6 space-y-4 text-xs text-foreground leading-relaxed">
                <p>
                  <strong>Photosynthesis</strong> is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It occurs in chloroplasts and involves two main stages: the light-dependent reactions and the Calvin cycle (light-independent reactions).
                </p>

                <div>
                  <h4 className="font-bold text-foreground flex items-center gap-1.5 mb-2">
                    <span className="text-emerald-600">🍃</span> Overview of the Process
                  </h4>
                  <ol className="list-decimal pl-4 space-y-2 text-muted-fg">
                    <li>
                      <strong className="text-foreground">Light-dependent Reactions</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li>Occur in the thylakoid membranes.</li>
                        <li>Chlorophyll absorbs sunlight.</li>
                        <li>Water is split (photolysis) to release oxygen.</li>
                        <li>ATP and NADPH are produced.</li>
                      </ul>
                    </li>
                    <li>
                      <strong className="text-foreground">Calvin Cycle (Light-independent Reactions)</strong>
                      <ul className="list-disc pl-4 mt-1 space-y-1">
                        <li>Occurs in the stroma of the chloroplast.</li>
                        <li>Carbon dioxide is fixed and converted into glucose.</li>
                        <li>Uses ATP and NADPH from the light reactions.</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                {/* Balanced Equation Highlight Box */}
                <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <h5 className="font-bold text-foreground flex items-center gap-1.5 text-xs">
                    🧪 Balanced Equation
                  </h5>
                  <div className="flex items-center justify-between text-xs md:text-sm font-semibold font-mono text-foreground px-2 py-1">
                    <span>6CO₂</span>
                    <span>+</span>
                    <span>6H₂O</span>
                    <div className="flex flex-col items-center text-[9px] font-sans text-muted-fg px-2">
                      <span>Light</span>
                      <span className="w-12 h-0.5 bg-foreground/40 my-0.5"></span>
                      <span>Chlorophyll</span>
                    </div>
                    <span>C₆H₁₂O₆</span>
                    <span>+</span>
                    <span>6O₂</span>
                  </div>
                  <div className="flex justify-between text-[9px] text-muted-fg font-sans px-2">
                    <span>Carbon dioxide</span>
                    <span>Water</span>
                    <span>Glucose</span>
                    <span>Oxygen</span>
                  </div>
                </div>

                <p className="text-muted-fg pt-1">
                  Let me know if you'd like a diagram or a simplified version!
                </p>

                {/* Action Reactions Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle text-[11px] text-muted-fg">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:text-foreground rounded-lg hover:bg-muted transition-all">
                      <ThumbsUp size={14} />
                    </button>
                    <button className="p-1.5 hover:text-foreground rounded-lg hover:bg-muted transition-all">
                      <ThumbsDown size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Was this helpful?</span>
                    <button className="p-1 hover:text-foreground"><ThumbsUp size={12} /></button>
                    <button className="p-1 hover:text-foreground"><ThumbsDown size={12} /></button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ────── PINNED / STICKY BOTTOM INPUT SECTION (GEMINI STYLE) ────── */}
          <div className="shrink-0 pt-2 bg-background/80 backdrop-blur-md border-t border-border-subtle/40 space-y-2">
            
            {/* Quick Suggestion Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { icon: '🎨', label: 'Draw a diagram' },
                { icon: '📝', label: 'Give me exam questions' },
                { icon: '⚡', label: 'Simplify this' },
                { icon: '💬', label: 'How does this relate to respiration?' },
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => setInputMessage(pill.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-card-bg border border-emerald-500/20 hover:border-emerald-500/40 rounded-xl text-xs font-medium text-emerald-600 dark:text-emerald-400 card-shadow hover:bg-emerald-500/5 transition-all whitespace-nowrap shrink-0"
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>

            {/* Floating Gemini-style Input Box */}
            <div className="p-3 bg-card-bg border border-border-subtle card-shadow rounded-2xl flex items-center gap-3">
              <button className="p-2 text-muted-fg hover:text-foreground transition-colors">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question or explain what you need help with..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-fg outline-none"
              />
              <button className="p-2 text-muted-fg hover:text-foreground transition-colors">
                <Mic size={18} />
              </button>
              <button className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-all shadow-sm shrink-0">
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-center text-muted-fg">
              Ŋwà' AI can make mistakes. Always verify important information.
            </p>
          </div>

        </div>

        {/* ────── RIGHT COLUMN: SCROLLABLE SIDEBAR WIDGETS ────── */}
        <div className="overflow-y-auto pr-1 space-y-6">
          
          {/* Study Context Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Study Context</h3>
              <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                Edit
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-600 rounded-lg">
                Biology
              </span>
              <span className="text-xs text-muted-fg font-medium">Photosynthesis in Plants</span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-fg font-medium block mb-1">Level</label>
                  <div className="relative">
                    <select
                      value={levelValue}
                      onChange={(e) => setLevelValue(e.target.value)}
                      className="w-full appearance-none bg-muted border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                    >
                      <option>Advanced Level</option>
                      <option>Ordinary Level</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-muted-fg font-medium block mb-1">Paper Type</label>
                  <div className="relative">
                    <select
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value)}
                      className="w-full appearance-none bg-muted border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                    >
                      <option>Theory</option>
                      <option>MCQ</option>
                      <option>Practical</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-muted-fg font-medium block mb-1">Focus Area</label>
                <div className="relative">
                  <select
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full appearance-none bg-muted border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                  >
                    <option>Cell Biology</option>
                    <option>Plant Physiology</option>
                    <option>Genetics</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-muted-fg">This helps me give you personalized answers.</p>
          </div>

          {/* Quick Actions Grid */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <h3 className="text-xs font-bold text-foreground">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { label: 'Explain Concept', icon: '🟢', iconBg: 'bg-emerald-500/10' },
                { label: 'Solve Question', icon: '🔵', iconBg: 'bg-blue-500/10' },
                { label: 'Generate Notes', icon: '🟣', iconBg: 'bg-purple-500/10' },
                { label: 'Create Flashcards', icon: '🟠', iconBg: 'bg-amber-500/10' },
                { label: 'Quiz Me', icon: '🔴', iconBg: 'bg-rose-500/10' },
                { label: 'Summarize Topic', icon: '🔷', iconBg: 'bg-cyan-500/10' },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-border-subtle hover:border-primary/30 hover:bg-primary/5 transition-all text-left group"
                >
                  <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0", action.iconBg)}>
                    {action.icon}
                  </span>
                  <span className="text-[11px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Resources Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Recommended Resources</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-2.5">
              {[
                {
                  icon: PlayCircle,
                  iconColor: 'text-blue-500',
                  title: 'Photosynthesis - Full Explanation',
                  desc: 'Video • 12:45 min',
                },
                {
                  icon: FileText,
                  iconColor: 'text-amber-500',
                  title: 'Photosynthesis Notes (PDF)',
                  desc: 'PDF • 1.2 MB',
                },
                {
                  icon: HelpCircle,
                  iconColor: 'text-emerald-500',
                  title: 'Past Questions on Photosynthesis',
                  desc: '10 Questions',
                },
              ].map((res, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-border-subtle hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <res.icon size={18} className={cn("shrink-0", res.iconColor)} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {res.title}
                    </h4>
                    <p className="text-[10px] text-muted-fg mt-0.5">{res.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-muted-fg group-hover:text-foreground shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Chat History Widget */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-foreground">Chat History</h3>
              <button className="text-[11px] text-primary font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Explain photosynthesis', date: 'Today, 10:24 AM', active: true },
                { title: 'Differences between plant and animal cells', date: 'Yesterday, 6:45 PM' },
                { title: 'How does osmosis work?', date: 'May 18, 2025' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between text-xs",
                    item.active
                      ? "bg-emerald-500/10 border border-emerald-500/20 font-semibold text-foreground"
                      : "hover:bg-muted text-muted-fg hover:text-foreground"
                  )}
                >
                  <span className="truncate flex-1">{item.title}</span>
                  <span className="text-[10px] text-muted-fg shrink-0 ml-2">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
