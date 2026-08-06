'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, ExternalLink, Download, AlertCircle, Search } from 'lucide-react';
import { examService } from '@/services/examService';
import { GCE_SUBJECTS } from '@/lib/constants/subjects';
import { cn } from '@/lib/utils';
import MyFilesSkeleton from '@/components/skeletons/MyFilesSkeleton';

interface ExamFile {
    subject: string;
    year: number;
    paper: number;
    pdf_url: string | null;
}

export default function MyFilesPage() {
    const router = useRouter();
    const [exams, setExams] = useState<ExamFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const data = await examService.listExams();
                setExams(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load files');
            } finally {
                setIsLoading(false);
            }
        };
        fetchExams();
    }, []);

    const filteredExams = exams.filter((exam) => {
        const query = searchQuery.toLowerCase();
        return (
            exam.subject.toLowerCase().includes(query) ||
            exam.year.toString().includes(query) ||
            exam.paper.toString().includes(query)
        );
    });

    if (isLoading) {
        return <MyFilesSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                    <AlertCircle size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Failed to Load</h2>
                <p className="text-muted-fg">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary hover:opacity-90 text-white font-bold rounded-xl transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6 animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    My Files
                </h1>
                <p className="text-xs md:text-sm text-muted-fg mt-1">
                    All your extracted exam papers in one place. Download PDFs or view parsed questions.
                </p>
            </div>

            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-fg" size={16} />
                <input
                    type="text"
                    placeholder="Search by subject, year, or paper..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-card-bg border border-border-subtle rounded-xl text-xs text-foreground placeholder:text-muted-fg card-shadow outline-none focus:border-primary/40 transition-all"
                />
            </div>

            <div className="p-5 rounded-2xl bg-card-bg border border-border-subtle card-shadow space-y-3">
                {filteredExams.length > 0 ? (
                    <div className="divide-y divide-border-subtle">
                        {filteredExams.map((exam, i) => {
                            const meta = GCE_SUBJECTS.find((s) => s.name === exam.subject);
                            const level = meta?.level || 'Unknown';
                            return (
                                <div
                                    key={i}
                                    className="py-3 flex items-center justify-between hover:bg-muted/40 transition-colors cursor-pointer group px-2 rounded-lg"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shrink-0">
                                            <FileText size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                                                {exam.subject}
                                            </div>
                                            <div className="text-[10px] text-muted-fg mt-0.5">
                                                {exam.year} &bull; Paper {exam.paper} &bull; {level}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    `/student/junes/${exam.subject.toLowerCase().replace(/\s+/g, '-')}/papers/${exam.year}-${exam.paper}`
                                                )
                                            }
                                            className="px-3 py-1.5 bg-muted/60 hover:bg-muted text-foreground text-xs font-semibold rounded-xl border border-border-subtle transition-all"
                                        >
                                            View Questions
                                        </button>
                                        {exam.pdf_url && (
                                            <a
                                                href={exam.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold rounded-xl border border-primary/20 transition-all"
                                            >
                                                <Download size={14} />
                                                <span className="hidden sm:inline">PDF</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <FileText className="mx-auto text-muted-fg/30 mb-3" size={36} />
                        <p className="text-xs text-muted-fg font-medium">
                            {searchQuery ? 'No files match your search.' : 'No extracted files yet. Start by uploading a PDF.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
