'use client';

import { useAppSelector } from '@/lib/hooks';
import UploadZone from '@/components/UploadZone';
import ExamDashboard from '@/components/ExamDashboard';
import ProcessingState from '@/components/ProcessingState';

export default function NewExtractionPage() {
    const { status, data } = useAppSelector((state) => state.exam);

    return (
        <div className="w-full">
            <div className="mt-4 mb-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground transition-colors">
                    New AI <span className="text-green-500">Extraction.</span>
                </h1>
                <p className="text-lg text-muted-fg max-w-2xl font-medium leading-relaxed transition-colors">
                    Upload your PDF paper below and let our engine transform it into a structured, LaTeX-enabled digital format.
                </p>
            </div>

            <div className="w-full">
                {status === 'idle' && <UploadZone />}
                {status === 'loading' && <ProcessingState />}
                {status === 'succeeded' && data && <ExamDashboard />}
                {status === 'failed' && (
                    <div className="glass p-12 text-center rounded-3xl border border-red-500/20 animate-fade-in transition-colors">
                        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Processing Failed</h2>
                        <p className="text-muted-fg mb-8">We couldn't parse this exam paper. Please ensure it's a valid PDF and try again.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95"
                        >
                            Retry Upload
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
