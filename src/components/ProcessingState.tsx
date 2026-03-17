'use client';

import { useAppSelector } from '@/lib/hooks';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, FileSearch } from 'lucide-react';

export default function ProcessingState() {
    const { uploadProgress } = useAppSelector((state) => state.exam);

    return (
        <div className="glass p-12 rounded-3xl flex flex-col items-center gap-8 animate-fade-in border border-green-500/10 transition-colors">
            <div className="relative w-32 h-44 p-4">
                <motion.div
                    className="absolute left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_2px_rgba(34,197,94,0.8)] z-10"
                    animate={{
                        top: ['0%', '100%', '0%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="w-full h-full rounded-lg bg-secondary/60 border border-border-subtle p-4 flex flex-col gap-3 relative overflow-hidden">
                    <div className="h-2 w-1/2 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-full bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-full bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-foreground/5 rounded-full"></div>

                    <motion.div
                        className="absolute inset-0 bg-green-500/5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                <div className="absolute -right-4 -top-4 w-12 h-12 bg-background rounded-full border border-green-500/20 flex items-center justify-center shadow-lg animate-pulse">
                    <BrainCircuit size={20} className="text-green-500" />
                </div>
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2 transition-colors">
                    {uploadProgress < 100 ? (
                        <>Uploading Exam... <Sparkles size={20} className="text-green-500" /></>
                    ) : (
                        <>AI Extraction in Progress <FileSearch size={20} className="text-green-500" /></>
                    )}
                </h3>
                <p className="text-muted-fg max-w-sm font-medium transition-colors">
                    {uploadProgress < 100
                        ? "Sending your paper to our processing engine."
                        : "Scanning text, diagrams and math formulas."}
                </p>
            </div>

            <div className="w-full space-y-3">
                <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden border border-border-subtle">
                    <motion.div
                        className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.5 }}
                    ></motion.div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-muted-fg">
                    <span>Processing Pipeline</span>
                    <span className="text-green-500">{uploadProgress}% Complete</span>
                </div>
            </div>
        </div>
    );
}
