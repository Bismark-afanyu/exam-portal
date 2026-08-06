'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateOnboarding } from '@/lib/features/user/userSlice';
import {
  User, BookOpen, Sun, Moon, Laptop, Globe, Sparkles, Camera,
  ChevronDown, Check, ShieldAlert, ArrowRight, X, Edit2
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { name, level, department } = useAppSelector((state) => state.user);
  const { theme, setTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'Profile' | 'Preferences' | 'Account & Security' | 'Notifications' | 'Privacy' | 'Subscription'>('Profile');

  // Form states
  const [fullName, setFullName] = useState(name || 'Bismark Bantar');
  const [username, setUsername] = useState('@bismark_b');
  const [email, setEmail] = useState('bismark@example.com');
  const [classLevel, setClassLevel] = useState(level || 'Advanced Level');
  const [bio, setBio] = useState('Passionate about Biology and helping others learn. 🧬');

  // Preferences states
  const [preferredSubjects, setPreferredSubjects] = useState(['Biology', 'Chemistry', 'Physics']);
  const [studyGoal, setStudyGoal] = useState('Ace my GCE Exams');
  const [dailyStudyGoal, setDailyStudyGoal] = useState('2 hours');
  const [difficultyLevel, setDifficultyLevel] = useState('Advanced');
  const [preferredContent, setPreferredContent] = useState({
    videos: true,
    practicePapers: true,
    aiExplanations: true,
    flashcards: true,
    studyNotes: false,
  });

  // Appearance states
  const [accentColor, setAccentColor] = useState('teal');

  // Language & Region
  const [language, setLanguage] = useState('English');
  const [region, setRegion] = useState('Cameroon');
  const [timeZone, setTimeZone] = useState('(GMT+1) West Central Africa');

  // Reminders toggles
  const [dailyReminder, setDailyReminder] = useState(true);
  const [reminderTime, setReminderTime] = useState('07:00 PM');
  const [streakReminder, setStreakReminder] = useState(true);

  const removeSubject = (subj: string) => {
    setPreferredSubjects(preferredSubjects.filter((s) => s !== subj));
  };

  return (
    <div className="w-full animate-fade-in pb-12">
      {/* ═══════════════ HEADER TITLE SECTION ═══════════════ */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-xs md:text-sm text-muted-fg mt-1">
          Manage your account, preferences, and learning experience.
        </p>
      </div>

      {/* ═══════════════ NAVIGATION TABS ═══════════════ */}
      <div className="flex items-center gap-6 border-b border-border-subtle mb-6 overflow-x-auto pb-1">
        {(['Profile', 'Preferences', 'Account & Security', 'Notifications', 'Privacy', 'Subscription'] as const).map((tab) => (
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

        {/* ────── LEFT COLUMN: SETTINGS FORM PANELS ────── */}
        <div className="space-y-6">

          {/* Panel 1: Profile Information */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <User size={14} />
                </div>
                <h3 className="text-xs font-bold text-foreground">Profile Information</h3>
              </div>
              <button className="px-3 py-1.5 border border-border-subtle bg-muted/40 hover:bg-muted text-foreground text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5">
                <Edit2 size={12} /> Edit Profile
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar Box with Camera Icon */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-2xl border-2 border-primary/30 overflow-hidden">
                  <span>{fullName.charAt(0)}</span>
                </div>
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-card-bg border border-border-subtle shadow-sm flex items-center justify-center text-muted-fg hover:text-foreground">
                  <Camera size={14} />
                </button>
              </div>

              {/* Form Grid */}
              <div className="flex-1 w-full space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold text-muted-fg block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/40"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-muted-fg block mb-1">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/40"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold text-muted-fg block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold text-muted-fg block mb-1">Class / Level</label>
                    <div className="relative">
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                      >
                        <option>Advanced Level</option>
                        <option>Ordinary Level</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[10px] font-semibold text-muted-fg block mb-1">Bio</label>
                    <input
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/40"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Learning Preferences */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <BookOpen size={14} />
              </div>
              <h3 className="text-xs font-bold text-foreground">Learning Preferences</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Preferred Subjects */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-fg block mb-1">Preferred Subjects</label>
                  <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-muted/30 border border-border-subtle rounded-xl min-h-[36px]">
                    {preferredSubjects.map((subj) => (
                      <span key={subj} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-card-bg border border-border-subtle rounded-lg text-foreground shadow-xs">
                        {subj}
                        <button onClick={() => removeSubject(subj)} className="text-muted-fg hover:text-foreground">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                    <button className="text-[10px] text-muted-fg hover:text-foreground font-semibold px-1.5">
                      + Add
                    </button>
                  </div>
                </div>

                {/* Study Goal */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-fg block mb-1">Study Goal</label>
                  <div className="relative">
                    <select
                      value={studyGoal}
                      onChange={(e) => setStudyGoal(e.target.value)}
                      className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                    >
                      <option>Ace my GCE Exams</option>
                      <option>Improve Weak Subjects</option>
                      <option>Daily Practice Routine</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                  </div>
                </div>

                {/* Daily Study Goal */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-fg block mb-1">Daily Study Goal</label>
                  <div className="relative">
                    <select
                      value={dailyStudyGoal}
                      onChange={(e) => setDailyStudyGoal(e.target.value)}
                      className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                    >
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>3 hours</option>
                      <option>4 hours</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Preferred Content Checkboxes & Difficulty Level */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-semibold text-muted-fg block">Preferred Content</label>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-foreground pt-1">
                    {[
                      { key: 'videos', label: 'Videos' },
                      { key: 'practicePapers', label: 'Practice Papers' },
                      { key: 'aiExplanations', label: 'AI Explanations' },
                      { key: 'flashcards', label: 'Flashcards' },
                      { key: 'studyNotes', label: 'Study Notes' },
                    ].map((item) => (
                      <label key={item.key} className="inline-flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferredContent[item.key as keyof typeof preferredContent]}
                          onChange={(e) =>
                            setPreferredContent({ ...preferredContent, [item.key]: e.target.checked })
                          }
                          className="w-3.5 h-3.5 rounded border-border-subtle text-primary focus:ring-primary/20 accent-emerald-600"
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-muted-fg block mb-1">Difficulty Level</label>
                  <div className="relative">
                    <select
                      value={difficultyLevel}
                      onChange={(e) => setDifficultyLevel(e.target.value)}
                      className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                    >
                      <option>Advanced</option>
                      <option>Intermediate</option>
                      <option>Beginner</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Appearance Settings */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Sun size={14} />
              </div>
              <h3 className="text-xs font-bold text-foreground">Appearance</h3>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* Theme Mode Switcher */}
              <div>
                <label className="text-[10px] font-semibold text-muted-fg block mb-2">Theme</label>
                <div className="inline-flex items-center gap-1 p-1 bg-muted/50 border border-border-subtle rounded-xl">
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      theme === 'light' ? "bg-card-bg text-foreground shadow-xs" : "text-muted-fg hover:text-foreground"
                    )}
                  >
                    <Sun size={14} /> Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      theme === 'dark' ? "bg-card-bg text-foreground shadow-xs" : "text-muted-fg hover:text-foreground"
                    )}
                  >
                    <Moon size={14} /> Dark
                  </button>
                  <button
                    onClick={() => setTheme('system')}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      theme === 'system' ? "bg-card-bg text-foreground shadow-xs" : "text-muted-fg hover:text-foreground"
                    )}
                  >
                    <Laptop size={14} /> System
                  </button>
                </div>
              </div>

              {/* Accent Colors */}
              <div>
                <label className="text-[10px] font-semibold text-muted-fg block mb-2">Accent Color</label>
                <div className="flex items-center gap-2.5">
                  {[
                    { id: 'teal', bg: 'bg-emerald-600' },
                    { id: 'blue', bg: 'bg-blue-600' },
                    { id: 'purple', bg: 'bg-purple-600' },
                    { id: 'amber', bg: 'bg-amber-500' },
                    { id: 'rose', bg: 'bg-rose-500' },
                  ].map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setAccentColor(color.id)}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-white transition-all",
                        color.bg,
                        accentColor === color.id && "ring-2 ring-offset-2 ring-primary"
                      )}
                    >
                      {accentColor === color.id && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel 4: Language & Region */}
          <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Globe size={14} />
              </div>
              <h3 className="text-xs font-bold text-foreground">Language & Region</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-muted-fg block mb-1">Language</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                  >
                    <option>English</option>
                    <option>French</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-muted-fg block mb-1">Region</label>
                <div className="relative">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                  >
                    <option>Cameroon</option>
                    <option>Nigeria</option>
                    <option>Ghana</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-muted-fg block mb-1">Time Zone</label>
                <div className="relative">
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-2 text-xs font-medium text-foreground outline-none pr-7"
                  >
                    <option>(GMT+1) West Central Africa</option>
                    <option>(GMT+0) UTC</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                </div>
              </div>
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
                <p className="text-[10px] text-muted-fg">I can help you manage your settings or personalize your learning experience.</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/student/chat')}
              className="px-4 py-2 border border-primary/30 text-primary hover:bg-primary hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              Ask AI Tutor <ArrowRight size={12} />
            </button>
          </div>

        </div>

        {/* ────── RIGHT COLUMN: ACCOUNT SUMMARY & CONTROLS ────── */}
        <div className="space-y-6">

          {/* Account Summary Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <h3 className="text-xs font-bold text-foreground">Account Summary</h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-muted-fg">Member Since</span>
                <span className="font-semibold text-foreground">May 12, 2024</span>
              </div>

              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-muted-fg">Current Plan</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">Free Plan</span>
                  <button className="px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 rounded-lg hover:bg-primary hover:text-white transition-all">
                    Upgrade
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-muted-fg">Total XP</span>
                <span className="font-semibold text-foreground">2,450 XP</span>
              </div>

              <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                <span className="text-muted-fg">Badges Earned</span>
                <span className="font-semibold text-foreground">32</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-fg">Milestones</span>
                <span className="font-semibold text-foreground">8</span>
              </div>
            </div>
          </div>

          {/* Study Reminders Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-4">
            <div>
              <h3 className="text-xs font-bold text-foreground">Study Reminders</h3>
              <p className="text-[10px] text-muted-fg mt-0.5">Stay consistent and achieve more.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Daily Reminder</span>
                <button
                  onClick={() => setDailyReminder(!dailyReminder)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative flex items-center px-0.5",
                    dailyReminder ? "bg-emerald-600" : "bg-muted-fg/30"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-transform shadow-xs", dailyReminder ? "translate-x-5" : "translate-x-0")} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-fg">Reminder Time</span>
                <div className="relative">
                  <select
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="appearance-none bg-muted/50 border border-border-subtle rounded-xl px-3 py-1 pr-6 text-xs font-medium text-foreground outline-none cursor-pointer"
                  >
                    <option>07:00 PM</option>
                    <option>08:00 PM</option>
                    <option>09:00 PM</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-fg pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-semibold text-foreground">Study Streak Reminder</span>
                <button
                  onClick={() => setStreakReminder(!streakReminder)}
                  className={cn(
                    "w-10 h-5 rounded-full transition-colors relative flex items-center px-0.5",
                    streakReminder ? "bg-emerald-600" : "bg-muted-fg/30"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-transform shadow-xs", streakReminder ? "translate-x-5" : "translate-x-0")} />
                </button>
              </div>
            </div>
          </div>

          {/* Data & Storage Card */}
          <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
            <div>
              <h3 className="text-xs font-bold text-foreground">Data & Storage</h3>
              <p className="text-[10px] text-muted-fg mt-0.5">Manage your downloaded content.</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-fg">Offline Downloads</span>
                <span className="font-semibold text-foreground">1.2 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-fg">Documents</span>
                <span className="font-semibold text-foreground">340 MB</span>
              </div>
            </div>

            <button className="w-full mt-2 py-2 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-xl hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-1">
              Manage Downloads <ArrowRight size={14} />
            </button>
          </div>

          {/* Danger Zone */}
          <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
            <div>
              <h3 className="text-xs font-bold text-red-500">Danger Zone</h3>
              <p className="text-[10px] text-muted-fg mt-0.5">Irreversible and sensitive actions.</p>
            </div>

            <button className="w-full py-2 bg-card-bg border border-red-500/30 text-red-500 text-xs font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all">
              Delete Account
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
