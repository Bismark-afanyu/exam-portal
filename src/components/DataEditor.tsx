import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateFileData, ExamPaperData } from '@/lib/features/exam/examSlice';
import { AlertCircle, CheckCircle2, Copy, FileJson, Edit3, Code2 } from 'lucide-react';
import VisualEditor from './VisualEditor';
import { cn } from '@/lib/utils';

export default function DataEditor() {
    const { data } = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [mode, setMode] = useState<'visual' | 'json'>('visual');

    useEffect(() => {
        if (data) {
            setJsonText(JSON.stringify(data, null, 2));
        }
    }, [data, mode]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setJsonText(newText);

        try {
            const parsed = JSON.parse(newText) as ExamPaperData;
            setError(null);
            dispatch(updateFileData(parsed));
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 2000);
        } catch (err: any) {
            setError(err.message);
            setIsSuccess(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsonText);
    };

    return (
        <div className="flex flex-col h-full glass rounded-[2.5rem] border border-white/5 overflow-hidden animate-fade-in shadow-2xl relative">
            {/* Mode Switcher Header */}
            <div className="flex items-center justify-between p-2 bg-muted border-b border-border-subtle shrink-0">
                <div className="flex p-1 bg-muted/50 rounded-2xl w-fit">
                    <button
                        onClick={() => setMode('visual')}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all",
                            mode === 'visual' ? "bg-primary text-white shadow-lg" : "text-muted-fg hover:text-foreground"
                        )}
                    >
                        <Edit3 size={14} strokeWidth={3} /> Visual Editor
                    </button>
                    <button
                        onClick={() => setMode('json')}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all",
                            mode === 'json' ? "bg-primary text-white shadow-lg" : "text-muted-fg hover:text-foreground"
                        )}
                    >
                        <Code2 size={14} strokeWidth={3} /> Advanced (JSON)
                    </button>
                </div>

                <div className="flex items-center gap-3 px-4">
                    {mode === 'json' && (
                        <button
                            onClick={copyToClipboard}
                            className="p-2 text-muted-fg hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                            title="Copy JSON"
                        >
                            <Copy size={16} />
                        </button>
                    )}
                    {isSuccess && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full border border-green-500/20 animate-in fade-in slide-in-from-right-2">
                            <CheckCircle2 size={12} /> Sync On
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-muted">
                {mode === 'visual' ? (
                    <div className="p-8">
                        <VisualEditor />
                    </div>
                ) : (
                    <div className="h-full relative font-mono">
                        <textarea
                            value={jsonText}
                            onChange={handleTextChange}
                            className="absolute inset-0 w-full h-full p-8 bg-transparent text-foreground text-sm leading-relaxed focus:outline-none resize-none scroll-smooth selection:bg-green-500/30 selection:text-white"
                            spellCheck={false}
                            placeholder="Paste your JSON here..."
                        />
                    </div>
                )}
            </div>

            {mode === 'json' && error && (
                <div className="p-4 bg-red-500/10 border-t border-red-500/20 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 shrink-0">
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="text-[11px] font-medium text-red-400 leading-tight">
                        <span className="font-bold underline">Parser Error:</span> {error}
                    </div>
                </div>
            )}
        </div>
    );
}
