'use client';

import { useState, useCallback, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { associateImage } from '@/lib/features/exam/examSlice';
import dynamic from 'next/dynamic';

const PDFPageRenderer = dynamic(() => import('@/components/PDFPageRenderer'), { ssr: false });
const SelectionCanvas = dynamic(() => import('@/components/SelectionCanvas'), { ssr: false });
import { ChevronLeft, ChevronRight, Save, Link as LinkIcon, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { getPDFFromLocal } from '@/lib/pdfStorage';
import { setPdfUrl } from '@/lib/features/exam/examSlice';
import { useEffect } from 'react';

export default function ImageExtractionPage() {
    const { pdfFileUrl, data, imageAssociations } = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();
    const router = useRouter();
    
    const [pageImages, setPageImages] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSelection, setCurrentSelection] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [selectedQuestion, setSelectedQuestion] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    
    useEffect(() => {
        const attemptRecovery = async () => {
            if (data && !pdfFileUrl) {
                setIsRecovering(true);
                try {
                    const blob = await getPDFFromLocal();
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        dispatch(setPdfUrl(url));
                    }
                } catch (err) {
                    console.error('Failed to recover PDF:', err);
                } finally {
                    setIsRecovering(false);
                }
            }
        };
        attemptRecovery();
    }, [data, pdfFileUrl, dispatch]);
    
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const handlePagesRendered = useCallback((images: string[]) => {
        setPageImages(images);
    }, []);

    const handleSelectionComplete = (selection: { x: number; y: number; width: number; height: number }) => {
        setCurrentSelection(selection);
    };

    const handleSaveAssociation = async () => {
        if (!currentSelection || !selectedQuestion || !pageImages[currentPage]) return;
        
        setIsSaving(true);
        try {
            // Create a cropped image from the selection
            const img = new Image();
            img.src = pageImages[currentPage];
            await img.decode();

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Selection is relative to the rendered stage (800px width typically)
            // Image might have different intrinsic size
            const stageWidth = 800;
            const scale = img.width / stageWidth;

            canvas.width = currentSelection.width * scale;
            canvas.height = currentSelection.height * scale;

            ctx.drawImage(
                img,
                currentSelection.x * scale,
                currentSelection.y * scale,
                currentSelection.width * scale,
                currentSelection.height * scale,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const croppedImageData = canvas.toDataURL('image/png');
            
            // In a real app, you'd upload this to Firebase Storage here
            // For now, we'll store the data URL in Redux state
            dispatch(associateImage({ 
                questionNumber: selectedQuestion, 
                imageUrl: croppedImageData 
            }));

            // Reset selection and question
            setCurrentSelection(null);
            setSelectedQuestion('');
            
        } catch (error) {
            console.error('Error cropping image:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if ((!pdfFileUrl || !data) && !isRecovering) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/10">
                    <AlertCircle size={40} className="text-amber-500" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">No Active Session</h2>
                    <p className="text-muted-fg max-w-sm">
                        It looks like the PDF reference was lost. Please upload the examination paper again to continue image extraction.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/new-extraction')}
                    className="px-8 py-3 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-600 transition-colors"
                >
                    Return to Upload
                </button>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black flex items-center gap-3">
                        <span className="text-green-500">Image</span> Extraction Hub
                    </h1>
                    <p className="text-muted-fg font-medium">Extract diagrams and link them to questions</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-100 font-semibold rounded-2xl border border-white/10 transition-all active:scale-95"
                >
                    <ChevronLeft size={18} />
                    Back to Results
                </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left: PDF Viewer & Selection */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="glass p-6 rounded-[2rem] border border-white/5 space-y-6">
                        <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl">
                            <div className="font-bold text-sm uppercase tracking-widest text-muted-fg">
                                Page {currentPage + 1} of {pageImages.length}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    className="p-2 hover:bg-white/5 rounded-xl disabled:opacity-30"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(pageImages.length - 1, prev + 1))}
                                    disabled={currentPage === pageImages.length - 1}
                                    className="p-2 hover:bg-white/5 rounded-xl disabled:opacity-30"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {isRecovering ? (
                            <div className="flex flex-col items-center justify-center p-20 glass rounded-3xl animate-pulse w-full">
                                <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                                <p className="text-muted-fg font-medium">Recovering PDF session...</p>
                            </div>
                        ) : pageImages.length > 0 ? (
                            <div className="relative flex justify-center bg-black/40 rounded-2xl p-4 overflow-hidden min-h-[500px]">
                                <SelectionCanvas 
                                    imageSrc={pageImages[currentPage]} 
                                    onSelectionComplete={handleSelectionComplete}
                                />
                                <div className="absolute top-8 right-8 pointer-events-none">
                                    <div className="px-4 py-2 bg-green-500 text-black text-xs font-black uppercase tracking-tighter rounded-full shadow-xl shadow-green-500/20">
                                        Drag to select
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <PDFPageRenderer url={pdfFileUrl || ''} onPagesRendered={handlePagesRendered} />
                        )}
                    </div>
                </div>

                {/* Right: Linker Controls */}
                <div className="space-y-6">
                    <div className="glass p-8 rounded-[2rem] border border-white/5 sticky top-8 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <LinkIcon size={20} className="text-green-500" />
                                Image Linking
                            </h3>
                            <p className="text-sm text-muted-fg">Select a question to attach current selection</p>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-fg block">
                                Target Question
                            </label>
                            <select
                                value={selectedQuestion}
                                onChange={(e) => setSelectedQuestion(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-foreground focus:ring-2 focus:ring-green-500/50 transition-all appearance-none cursor-pointer"
                            >
                                <option value="">Select a question...</option>
                                {data?.questions.map((q) => (
                                    <option key={q.question_number} value={q.question_number}>
                                        Question {q.question_number} {imageAssociations[q.question_number] ? '✓' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <button
                                onClick={handleSaveAssociation}
                                disabled={!currentSelection || !selectedQuestion || isSaving}
                                className={cn(
                                    "w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]",
                                    (!currentSelection || !selectedQuestion)
                                        ? "bg-white/5 text-muted-fg border border-white/10 cursor-not-allowed"
                                        : "bg-green-500 text-black shadow-lg shadow-green-500/20 hover:bg-green-600"
                                )}
                            >
                                {isSaving ? (
                                    <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Association
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Summary of associations */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-fg">
                                Current Associations ({Object.keys(imageAssociations).length})
                            </h4>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {Object.entries(imageAssociations).map(([qNum, imgData]) => (
                                    <div key={qNum} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-white/10 group-hover:border-green-500/30 transition-colors">
                                            <img src={imgData as string} alt={`Q${qNum}`} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold truncate">Question {qNum}</div>
                                            <div className="text-[10px] text-green-500 font-black uppercase">Linked</div>
                                        </div>
                                        <button 
                                            onClick={() => window.open(imgData, '_blank')}
                                            className="p-2 hover:bg-white/10 rounded-lg text-muted-fg hover:text-foreground"
                                        >
                                            <CheckCircle2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {Object.keys(imageAssociations).length === 0 && (
                                    <div className="text-center py-8 text-muted-fg text-sm italic">
                                        No images linked yet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
