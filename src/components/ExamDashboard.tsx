import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { resetExam } from '@/lib/features/exam/examSlice';
import QuestionCard from './QuestionCard';
import DataEditor from './DataEditor';
import { BookOpen, Calendar, Layers, Hash, RefreshCcw, CheckCircle2, Edit3, ChevronRight, LayoutDashboard, Image as ImageIcon, Save, Check, AlertCircle, Copy } from 'lucide-react';
import { examService, DuplicateExamError } from '@/services/examService';
import { getPDFFromLocal } from '@/lib/pdfStorage';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ExamDashboard() {
    const { data } = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [showEditor, setShowEditor] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSaveToDatabase = async () => {
        setIsSaving(true);
        setSaveStatus('idle');
        try {
            if (!data) throw new Error("No exam data to save");
            await examService.saveExam(data);

            // Upload the PDF to storage in the background
            try {
                const pdfBlob = await getPDFFromLocal();
                if (pdfBlob) {
                    const pdfFile = new File([pdfBlob], `${data.subject}_${data.year}_paper${data.paper}.pdf`, { type: 'application/pdf' });
                    await examService.uploadPdf(data.subject, data.year, data.paper, pdfFile);
                }
            } catch (pdfErr) {
                console.warn('PDF upload failed (exam data was saved):', pdfErr);
            }

            setSaveStatus('success');
            setTimeout(() => setSaveStatus('idle'), 5000);
        } catch (error: any) {
            setSaveStatus('error');
            if (error instanceof DuplicateExamError) {
                setErrorMessage(error.message);
                setSaveStatus('duplicate');
            } else {
                setErrorMessage(error.message || 'Failed to save exam data');
            }
        } finally {
            setIsSaving(false);
        }
    };

    if (!data) return null;

    return (
        <div className="flex flex-col gap-12 h-full w-full animate-fade-in relative pb-20">
            {/* Top Section: Metadata & Editor Split */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className={cn(
                    "space-y-10 transition-all duration-500",
                    showEditor ? "lg:w-[45%]" : "w-full"
                )}>
                    <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>

                        <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/20">
                                    <CheckCircle2 size={14} /> Extraction Result
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
                                    {data.subject}
                                </h1>
                                <div className="flex flex-wrap gap-6 text-muted-fg font-medium pt-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} className="text-green-500" />
                                        <span>{data.year} Session</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Layers size={18} className="text-green-500" />
                                        <span>{data.level}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Hash size={18} className="text-green-500" />
                                        <span>Paper {data.paper}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowEditor(!showEditor)}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 font-semibold rounded-2xl border transition-all active:scale-95",
                                        showEditor
                                            ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                            : "bg-muted/50 hover:bg-muted text-foreground border-border-subtle"
                                    )}
                                >
                                    <Edit3 size={18} />
                                    {showEditor ? "Hide Editor" : "Edit Data"}
                                </button>
                                <button
                                    onClick={() => router.push('/image-extraction')}
                                    className="flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted text-foreground font-semibold rounded-2xl border border-border-subtle transition-all active:scale-95"
                                >
                                    <ImageIcon size={18} />
                                    Extract Images
                                </button>
                                <button
                                    onClick={handleSaveToDatabase}
                                    disabled={isSaving}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-3 font-semibold rounded-2xl border transition-all active:scale-95",
                                        saveStatus === 'success'
                                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                                            : saveStatus === 'duplicate'
                                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                                : saveStatus === 'error'
                                                    ? "bg-red-500/10 text-red-500 border-red-500/20"
                                                    : "bg-primary text-white border-primary shadow-lg shadow-primary/20 hover:opacity-90"
                                    )}
                                >
                                    {isSaving ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                    ) : saveStatus === 'success' ? (
                                        <Check size={18} />
                                    ) : saveStatus === 'duplicate' ? (
                                        <Copy size={18} />
                                    ) : saveStatus === 'error' ? (
                                        <AlertCircle size={18} />
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    {isSaving ? "Saving..." : saveStatus === 'success' ? "Saved" : saveStatus === 'duplicate' ? "Already Exists" : saveStatus === 'error' ? "Error" : "Save to DB"}
                                </button>
                                <button
                                    onClick={() => dispatch(resetExam())}
                                    className="flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted text-foreground font-semibold rounded-2xl border border-border-subtle transition-all active:scale-95"
                                >
                                    <RefreshCcw size={18} />
                                    New
                                </button>
                            </div>
                        </div>

                        {saveStatus === 'error' && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-2">
                                {errorMessage}
                            </div>
                        )}

                        {saveStatus === 'duplicate' && (
                            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 text-xs font-medium animate-in fade-in slide-in-from-top-2">
                                {errorMessage}
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-border-subtle">
                            <h3 className="text-sm font-bold text-muted-fg uppercase tracking-widest flex items-center gap-2 mb-6">
                                <BookOpen size={16} /> Knowledge Areas
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {data.topics_covered?.map((topic, i) => (
                                    <span key={i} className="px-4 py-2 bg-green-500/5 border border-green-500/10 text-green-400 text-sm font-semibold rounded-xl hover:bg-green-500/10 transition-colors">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Data Editor Panel */}
                {showEditor && (
                    <div className="lg:w-[55%] lg:sticky lg:top-8 h-[calc(100vh-10rem)] animate-in fade-in slide-in-from-right-4 duration-500">
                        <DataEditor />
                    </div>
                )}
            </div>

            {/* Bottom Section: Full-Width Blueprint */}
            <div className="space-y-8 w-full">
                <div className="flex justify-between items-end px-4">
                    <div>
                        <h2 className="text-3xl font-black text-foreground">Exam Blueprint</h2>
                        <p className="text-muted-fg font-medium">Mapped structure from source PDF</p>
                    </div>
                    <div className="px-5 py-2 glass rounded-2xl border border-green-500/20 text-green-400 font-bold text-sm">
                        {(data.questions || []).length} Items • {(data.questions || []).reduce((acc, q) => acc + (q.marks_total || 0), 0)} Total Marks
                    </div>
                </div>

                <div className="grid gap-6 w-full">
                    {data.questions?.map((question, index) => (
                        <QuestionCard key={index} question={question} />
                    ))}
                </div>
            </div>
        </div>
    );
}
