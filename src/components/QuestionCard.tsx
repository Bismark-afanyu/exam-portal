import { Question } from '@/lib/features/exam/examSlice';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { HelpCircle, Info, Image as ImageIcon, MessageSquare, Target, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JSX } from 'react';

interface QuestionCardProps {
    question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
    const renderText = (text: string, isSubQuestion = false) => {
        if (!text) return null;

        // Function to process text with LaTeX delimiters
        const processLatexContent = (content: string) => {
            const parts: JSX.Element[] = [];
            let currentIndex = 0;
            
            // Pattern to match \( ... \) and \[ ... \] delimiters
            // Using [\s\S] instead of . with s flag for compatibility
            const inlinePattern = /\\\(([\s\S]*?)\\\)/g;
            const displayPattern = /\\\[([\s\S]*?)\\\]/g;
            
            // Combine patterns to find all LaTeX segments
            const allMatches: { index: number; match: string; content: string; type: 'inline' | 'display' }[] = [];
            
            // Find inline math \( ... \)
            let match;
            while ((match = inlinePattern.exec(content)) !== null) {
                allMatches.push({
                    index: match.index,
                    match: match[0],
                    content: match[1],
                    type: 'inline'
                });
            }
            
            // Find display math \[ ... \]
            while ((match = displayPattern.exec(content)) !== null) {
                allMatches.push({
                    index: match.index,
                    match: match[0],
                    content: match[1],
                    type: 'display'
                });
            }
            
            // Sort matches by index
            allMatches.sort((a, b) => a.index - b.index);
            
            // Process the content by splitting at LaTeX delimiters
            for (const match of allMatches) {
                // Add text before the LaTeX
                if (match.index > currentIndex) {
                    const textBefore = content.substring(currentIndex, match.index);
                    if (textBefore) {
                        parts.push(<span key={`text-${currentIndex}`}>{textBefore}</span>);
                    }
                }
                
                // Add the LaTeX content
                if (match.type === 'inline') {
                    parts.push(
                        <InlineMath key={`math-${match.index}`} math={match.content} />
                    );
                } else {
                    parts.push(
                        <BlockMath key={`math-${match.index}`} math={match.content} />
                    );
                }
                
                currentIndex = match.index + match.match.length;
            }
            
            // Add remaining text after last LaTeX
            if (currentIndex < content.length) {
                const remainingText = content.substring(currentIndex);
                if (remainingText) {
                    parts.push(<span key={`text-end`}>{remainingText}</span>);
                }
            }
            
            // If no LaTeX was found, check if the content itself might be LaTeX
            if (parts.length === 0) {
                // Check if the entire content is LaTeX (starts with common LaTeX commands)
                const latexPatterns = [
                    /^\\[a-zA-Z]+{/, // Starts with \command{
                    /^[a-zA-Z]\^[{0-9]/, // Starts with variable and exponent
                    /^[a-zA-Z]_[{0-9]/, // Starts with variable and subscript
                    /^\\[()\[\]{}]/, // Starts with \(, \[, etc.
                ];
                
                if (latexPatterns.some(pattern => pattern.test(content))) {
                    return <InlineMath math={content} />;
                }
                
                // Otherwise, return as plain text
                return <span>{content}</span>;
            }
            
            return <>{parts}</>;
        };

        return (
            <div className={cn("leading-relaxed", isSubQuestion ? "text-muted-fg" : "text-foreground/90")}>
                {processLatexContent(text)}
            </div>
        );
    };

    return (
        <div className="w-full min-w-0 glass p-6 md:p-8 rounded-3xl border border-border-subtle hover:border-green-500/30 transition-all duration-300 group animate-fade-in">
            <div className="flex justify-between items-start gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold border border-green-500/20 group-hover:scale-110 transition-transform">
                        {question.question_number}
                    </div>
                    <div>
                        {/* <div className="text-xs font-bold text-muted-fg uppercase tracking-widest">Question Segment</div> */}
                        {/* <div className="flex gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase rounded border border-green-500/20">
                                {question.question_type}
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-xl border border-amber-500/20 transform group-hover:rotate-2 transition-transform">
                    <Award size={14} />
                    <span className="text-xs font-bold">{question.marks_total} Marks</span>
                </div>
            </div>

            <div className="space-y-6">
                <div className="text-lg font-medium text-foreground">
                    {renderText(question.question_text)}
                </div>

                {question.image_url && (
                    <div className="my-6 rounded-2xl overflow-hidden border border-border-subtle bg-muted">
                        <img 
                            src={question.image_url} 
                            alt={`Image for Question ${question.question_number}`} 
                            className="max-w-full h-auto mx-auto"
                        />
                    </div>
                )}

                {question.has_diagram && question.diagrams?.length > 0 && !question.image_url && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/5 border border-green-500/10 rounded-2xl text-muted-fg italic text-sm">
                        <ImageIcon size={18} className="text-green-500 shrink-0" />
                        <span>AI Suggestion: {question.diagrams[0]?.description}</span>
                    </div>
                )}

                {question.has_subquestions && (
                    <div className="mt-8 space-y-4 pl-4 border-l-2 border-green-500/30">
                        {question.subquestions?.map((sq, i) => (
                            <div key={i} className="bg-muted/50 p-4 rounded-2xl border border-border-subtle hover:bg-muted transition-colors">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-black text-green-500">Part ({sq.subquestion_identifier})</span>
                                    <span className="text-[10px] font-bold text-muted-fg bg-secondary px-2 py-0.5 rounded-full border border-border-subtle">
                                        {sq.marks || 0} Marks
                                    </span>
                                </div>
                                <div className="text-muted-fg">
                                    {renderText(sq.text, true)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-fg uppercase tracking-tighter">
                    <Target size={12} className="text-green-500" />
                    {/* <span>{question.topic}</span> */}
                    <span className="text-muted-fg opacity-30">•</span>
                    {/* <span>{question.subtopic}</span> */}
                </div>
                <div className="text-[10px] items-center gap-1 hidden md:flex text-muted-fg opacity-60">
                    <Info size={12} />
                    {/* <span>Source verification: AI confident</span> */}
                </div>
            </div>
        </div>
    );
}