'use client';

import { useAppSelector } from '@/lib/hooks';
import UploadZone from '@/components/UploadZone';
import ExamDashboard from '@/components/ExamDashboard';
import ProcessingState from '@/components/ProcessingState';

export default function NewExtractionPage() {
    const { status, data } = useAppSelector((state) => state.exam);

    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    New AI Extraction
                </h1>
                <p className="text-xs md:text-sm text-muted-fg mt-1">
                    Upload your PDF paper below and let our engine transform it into a structured, LaTeX-enabled digital format.
                </p>
            </div>

            <div className="w-full">
                {status === 'idle' && <UploadZone />}
                {status === 'loading' && <ProcessingState />}
                {status === 'succeeded' && data && <ExamDashboard />}
                {status === 'failed' && (
                    <div className="p-8 text-center rounded-2xl bg-card-bg border border-red-500/20 card-shadow animate-fade-in">
                        <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </div>
                        <h2 className="text-base font-bold text-foreground mb-1">Processing Failed</h2>
                        <p className="text-xs text-muted-fg mb-6 max-w-sm mx-auto">We couldn't parse this exam paper. Please ensure it's a valid PDF and try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-xl transition-all shadow-sm"
                        >
                            Retry Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
