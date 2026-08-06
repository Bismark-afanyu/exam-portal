'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { updateOnboarding, StudentLevel, StudentDepartment } from '@/lib/features/user/userSlice';
import { GraduationCap, Microscope, Palette, Landmark, ChevronRight, ChevronLeft, Check, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { GCE_SUBJECTS } from '@/lib/constants/subjects';

const departments: { id: StudentDepartment; name: string; icon: any; color: string; accent: string; subjects: string[] }[] = [
  { id: 'Science', name: 'Science', icon: Microscope, color: 'text-blue-600 bg-blue-500/10', accent: 'border-blue-500', subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science'] },
  { id: 'Arts', name: 'Arts', icon: Palette, color: 'text-purple-600 bg-purple-500/10', accent: 'border-purple-500', subjects: ['English Literature', 'History', 'French', 'Religious Studies', 'Philosophy'] },
  { id: 'Commercial', name: 'Commercial', icon: Landmark, color: 'text-amber-600 bg-amber-500/10', accent: 'border-amber-500', subjects: ['Economics', 'Accounting', 'Commerce', 'Business Studies', 'Law'] },
];

export default function Onboarding() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel>(null);
  const [selectedDept, setSelectedDept] = useState<StudentDepartment>(null);

  const handleLevelSelect = (level: StudentLevel) => {
    setSelectedLevel(level);
    setStep(2);
  };

  const handleFinish = () => {
    if (selectedLevel && selectedDept) {
      dispatch(updateOnboarding({ level: selectedLevel, department: selectedDept }));
    }
  };

  const deptCount = selectedLevel === 'Advanced' ? 3 : 3;
  const filteredSubjects = selectedDept
    ? GCE_SUBJECTS.filter(s => s.category === selectedDept && s.level === (selectedLevel === 'Advanced' ? 'A-Level' : 'O-Level')).length
    : 0;

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center p-6 overflow-y-auto">
      <div className="max-w-2xl w-full space-y-10 py-12">
        {/* Progress Bar */}
        <div className="flex justify-center gap-2">
          {[1, 2].map(s => (
            <div key={s} className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              step >= s ? "w-12 bg-primary" : "w-12 bg-border-subtle"
            )} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-semibold">
                  <Sparkles size={11} /> Welcome to Ŋwà'
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Choose your <span className="text-primary">Level.</span>
                </h1>
                <p className="text-sm text-muted-fg font-medium max-w-md mx-auto">
                  This helps us tailor your GCE experience and recommend the right past papers for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {/* Ordinary Level */}
                <button
                  onClick={() => handleLevelSelect('Ordinary')}
                  className={cn(
                    "group relative p-7 rounded-2xl border-2 transition-all text-left hover:shadow-lg active:scale-[0.98]",
                    selectedLevel === 'Ordinary'
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border-subtle hover:border-primary/30 bg-card-bg"
                  )}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    <BookOpen size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Ordinary Level</h3>
                  <p className="text-primary text-xs font-semibold mb-2">GCE O-Level</p>
                  <p className="text-xs text-muted-fg leading-relaxed">
                    Focus on fundamental subjects and build a broad foundation across all areas.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Select <ArrowRight size={12} />
                  </div>
                </button>

                {/* Advanced Level */}
                <button
                  onClick={() => handleLevelSelect('Advanced')}
                  className={cn(
                    "group relative p-7 rounded-2xl border-2 transition-all text-left hover:shadow-lg active:scale-[0.98]",
                    selectedLevel === 'Advanced'
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border-subtle hover:border-primary/30 bg-card-bg"
                  )}
                >
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 mb-5 group-hover:scale-110 transition-transform">
                    <GraduationCap size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Advanced Level</h3>
                  <p className="text-purple-600 text-xs font-semibold mb-2">GCE A-Level</p>
                  <p className="text-xs text-muted-fg leading-relaxed">
                    Specialized deep-dive into your chosen department with advanced subject mastery.
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Select <ArrowRight size={12} />
                  </div>
                </button>
              </div>

              <p className="text-[11px] text-muted-fg">
                You can always change this later in{' '}
                <span className="font-semibold text-primary">Settings</span>.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-3">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-fg hover:text-foreground transition-colors mb-2"
                >
                  <ChevronLeft size={14} /> Back to Levels
                </button>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Select your <span className="text-primary">Department.</span>
                </h1>
                <p className="text-sm text-muted-fg font-medium max-w-md mx-auto">
                  We'll organize your study materials and past papers accordingly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {departments.map((dept) => {
                  const isSelected = selectedDept === dept.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDept(dept.id)}
                      className={cn(
                        "group relative p-5 rounded-2xl border-2 transition-all text-center hover:shadow-lg active:scale-[0.98]",
                        isSelected
                          ? cn("bg-primary/5 shadow-md shadow-primary/10", dept.accent)
                          : "border-border-subtle hover:border-primary/30 bg-card-bg"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check size={10} className="text-white" strokeWidth={3} />
                        </div>
                      )}
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform", dept.color)}>
                        <dept.icon size={22} />
                      </div>
                      <h3 className="text-sm font-bold text-foreground mb-2">{dept.name}</h3>
                      <div className="space-y-1">
                        {dept.subjects.map((subject) => (
                          <p key={subject} className="text-[10px] text-muted-fg">{subject}</p>
                        ))}
                        <p className="text-[10px] text-primary font-semibold pt-1">
                          +{filteredSubjects - dept.subjects.length} more
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-6 space-y-3">
                <button
                  disabled={!selectedDept}
                  onClick={handleFinish}
                  className="w-full md:w-auto px-10 py-3 bg-primary hover:opacity-90 disabled:opacity-30 disabled:hover:opacity-30 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
                >
                  Complete Setup <ChevronRight size={16} />
                </button>
                <p className="text-[11px] text-muted-fg">
                  You can always change this in <span className="font-semibold text-primary">Settings</span>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
