import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateFileData, ExamPaperData, Question, SubQuestion } from '@/lib/features/exam/examSlice';
import { Plus, Trash2, ChevronDown, ChevronRight, Hash, Book, Calendar, Layers, FileText, LayoutList, BookOpen, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function VisualEditor() {
    const { data } = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);
    const [newTopic, setNewTopic] = useState('');

    if (!data) return null;

    const updateData = (newData: Partial<ExamPaperData>) => {
        dispatch(updateFileData({ ...data, ...newData } as ExamPaperData));
    };

    const handleTopicAdd = () => {
        if (!newTopic.trim()) return;
        const currentTopics = data.topics_covered || [];
        if (!currentTopics.includes(newTopic.trim())) {
            updateData({ topics_covered: [...currentTopics, newTopic.trim()] });
        }
        setNewTopic('');
    };

    const handleTopicRemove = (topic: string) => {
        updateData({ topics_covered: (data.topics_covered || []).filter(t => t !== topic) });
    };

    const handleQuestionUpdate = (index: number, updates: Partial<Question>) => {
        const newQuestions = [...(data.questions || [])];
        newQuestions[index] = { ...newQuestions[index], ...updates };
        updateData({ questions: newQuestions });
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            question_number: (data.questions?.length + 1).toString(),
            question_text: '',
            topic: '',
            subtopic: '',
            marks_total: 0,
            question_type: 'Calculation',
            has_diagram: false,
            has_figure: false,
            has_subquestions: false,
            subquestions: [],
            diagrams: [],
            figures: []
        };
        updateData({ questions: [...(data.questions || []), newQuestion] });
        setExpandedQuestion(data.questions?.length || 0);
    };

    const removeQuestion = (index: number) => {
        const newQuestions = data.questions?.filter((_, i) => i !== index);
        updateData({ questions: newQuestions });
    };

    return (
        <div className="flex flex-col gap-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Metadata Section */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest px-1">
                    <FileText size={14} /> Basic Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-fg uppercase ml-4">Subject Name</label>
                        <input
                            type="text"
                            value={data.subject}
                            onChange={(e) => updateData({ subject: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-fg uppercase ml-4">Education Level</label>
                        <input
                            type="text"
                            value={data.level}
                            onChange={(e) => updateData({ level: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-fg uppercase ml-4">Exam Year</label>
                        <input
                            type="number"
                            value={data.year}
                            onChange={(e) => updateData({ year: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-fg uppercase ml-4">Paper Number</label>
                        <input
                            type="number"
                            value={data.paper}
                            onChange={(e) => updateData({ paper: parseInt(e.target.value) || 0 })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-foreground focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>
                </div>
            </section>

            {/* Knowledge Areas Section */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest px-1">
                    <BookOpen size={14} /> Knowledge Areas
                </div>
                <div className="glass p-6 rounded-[2rem] border border-white/5 space-y-4 bg-black/20">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTopic}
                            onChange={(e) => setNewTopic(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleTopicAdd()}
                            placeholder="Add a new topic..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-green-500/50"
                        />
                        <button
                            onClick={handleTopicAdd}
                            className="px-4 py-2 bg-green-500 text-black text-xs font-black uppercase rounded-xl hover:bg-green-600 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {data.topics_covered?.map((topic, i) => (
                            <div key={i} className="group flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-xs font-bold">
                                {topic}
                                <button
                                    onClick={() => handleTopicRemove(topic)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Questions Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-widest">
                        <LayoutList size={14} /> Exam Paper Blueprint
                    </div>
                    <button
                        onClick={addQuestion}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-black text-[10px] font-black uppercase rounded-lg hover:bg-green-600 transition-colors"
                    >
                        <Plus size={12} strokeWidth={3} /> Add Question
                    </button>
                </div>

                <div className="space-y-3">
                    {data.questions?.map((q, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "glass border transition-all duration-300 overflow-hidden rounded-[1.5rem]",
                                expandedQuestion === idx ? "border-green-500/30 scale-[1.01]" : "border-white/5 hover:border-white/10"
                            )}
                        >
                            {/* Summary / Header */}
                            <div
                                onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                                className="p-4 flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs">
                                        {q.question_number}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-foreground">
                                            {q.topic || "Untitled Topic"}
                                        </div>
                                        <div className="text-[10px] text-muted-fg font-medium">
                                            {q.marks_total} Marks • {q.question_type}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeQuestion(idx); }}
                                        className="p-2 text-muted-fg hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="text-muted-fg">
                                        {expandedQuestion === idx ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                    </div>
                                </div>
                            </div>

                            {/* Details / Form */}
                            {expandedQuestion === idx && (
                                <div className="px-6 pb-6 pt-2 space-y-6 animate-in slide-in-from-top-2 duration-300">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-muted-fg uppercase ml-2">Number</label>
                                            <input
                                                type="text"
                                                value={q.question_number}
                                                onChange={(e) => handleQuestionUpdate(idx, { question_number: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-muted-fg uppercase ml-2">Total Marks</label>
                                            <input
                                                type="number"
                                                value={q.marks_total}
                                                onChange={(e) => handleQuestionUpdate(idx, { marks_total: parseInt(e.target.value) || 0 })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-muted-fg uppercase ml-2">Main Topic</label>
                                            <input
                                                type="text"
                                                value={q.topic}
                                                onChange={(e) => handleQuestionUpdate(idx, { topic: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-muted-fg uppercase ml-2">Subtopic</label>
                                            <input
                                                type="text"
                                                value={q.subtopic}
                                                onChange={(e) => handleQuestionUpdate(idx, { subtopic: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-muted-fg uppercase ml-2">Question Content (LaTeX supported)</label>
                                        <textarea
                                            value={q.question_text}
                                            onChange={(e) => handleQuestionUpdate(idx, { question_text: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground h-32 focus:outline-none resize-none"
                                            placeholder="Enter question text here..."
                                        />
                                    </div>

                                    {/* Subquestions Management */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="text-[10px] font-bold text-muted-fg uppercase ml-2">Sub-sections</div>
                                            <button
                                                onClick={() => {
                                                    const sub = [...(q.subquestions || []), { subquestion_identifier: '', text: '', marks: 0 }];
                                                    handleQuestionUpdate(idx, { subquestions: sub, has_subquestions: true });
                                                }}
                                                className="text-[10px] font-bold text-green-500 hover:text-green-400 flex items-center gap-1"
                                            >
                                                <Plus size={10} /> Add Part
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {q.subquestions?.map((sq, sidx) => (
                                                <div key={sidx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex gap-3 items-start group/sub">
                                                    <input
                                                        type="text"
                                                        value={sq.subquestion_identifier}
                                                        onChange={(e) => {
                                                            const news = [...q.subquestions];
                                                            news[sidx] = { ...sq, subquestion_identifier: e.target.value };
                                                            handleQuestionUpdate(idx, { subquestions: news });
                                                        }}
                                                        placeholder="id"
                                                        className="w-12 bg-black/20 border border-white/5 rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none"
                                                    />
                                                    <textarea
                                                        value={sq.text}
                                                        onChange={(e) => {
                                                            const news = [...q.subquestions];
                                                            news[sidx] = { ...sq, text: e.target.value };
                                                            handleQuestionUpdate(idx, { subquestions: news });
                                                        }}
                                                        placeholder="Part text..."
                                                        className="flex-1 bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 text-xs h-16 focus:outline-none resize-none"
                                                    />
                                                    <div className="flex flex-col gap-2">
                                                        <input
                                                            type="number"
                                                            value={sq.marks}
                                                            onChange={(e) => {
                                                                const news = [...q.subquestions];
                                                                news[sidx] = { ...sq, marks: parseInt(e.target.value) || 0 };
                                                                handleQuestionUpdate(idx, { subquestions: news });
                                                            }}
                                                            placeholder="Mks"
                                                            className="w-16 bg-black/20 border border-white/5 rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                const news = q.subquestions.filter((_, i) => i !== sidx);
                                                                handleQuestionUpdate(idx, { subquestions: news, has_subquestions: news.length > 0 });
                                                            }}
                                                            className="p-1.5 text-muted-fg hover:text-red-500"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
