'use client';

import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, BookOpen, Layers, Hash, AlertCircle, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useGetExamDetailsQuery, useListExamsQuery } from '@/lib/features/exam/examApi';
import PaperViewSkeleton from '@/components/skeletons/PaperViewSkeleton';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function PaperPracticePage() {
  const { subjectId, paperId } = useParams();
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);

  // Parse year and paper from paperId (format: year-paper)
  const [yearStr, paperStr] = (paperId as string).split('-');
  const year = parseInt(yearStr);
  const paperNum = parseInt(paperStr);

  const { data: exams, isLoading: isExamsLoading } = useListExamsQuery();

  // Find the actual subject name from the exams list using the slug
  const matchingExam = exams?.find(e =>
    e.subject.toLowerCase().replace(/\s+/g, '-') === subjectId
  );

  const subjectName = matchingExam?.subject || (subjectId as string).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const { data: exam, isLoading, isError } = useGetExamDetailsQuery({
    subject: subjectName,
    year: year,
    paper: paperNum
  }, { skip: isExamsLoading || !matchingExam && !exams }); // Only skip if list is still loading or we have data but no match

  const questions = [...(exam?.questions || [])].sort((a, b) => {
    const numA = parseInt(a.question_number, 10);
    const numB = parseInt(b.question_number, 10);
    // If both parse to valid numbers, sort numerically
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    // Fallback to string comparison for non-numeric question numbers
    return a.question_number.localeCompare(b.question_number, undefined, { numeric: true });
  });
  const isALevel = exam?.level?.toLowerCase().includes('a');

  // Track scroll position for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <PaperViewSkeleton />;
  }

  if (isError || !exam) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6 text-center max-w-lg mx-auto">
        <div className="p-6 bg-red-500/10 rounded-full text-red-500 border border-red-500/20">
          <AlertCircle size={48} />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif text-foreground font-black">Examination Unavailable</h2>
          <p className="text-muted-fg font-medium leading-relaxed">
            The requested paper (Paper {paperNum}, {year}) for {subjectName} could not be retrieved from the server. It may still be undergoing digitization.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 bg-muted/50 hover:bg-muted text-foreground font-bold rounded-2xl border border-border-subtle transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-primary hover:opacity-90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Total marks across all questions
  const totalMarks = questions.reduce((sum, q) => sum + (q.marks_total || 0), 0);

  return (
    <div className="animate-fade-in pb-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-fg hover:text-green-500 font-bold transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Exit Paper
        </button>
      </div>

      {/* Paper Container — the "physical paper" look */}
      <div
        ref={paperRef}
        className={cn(
          "max-w-4xl mx-auto mt-8 rounded-3xl shadow-2xl overflow-hidden border",
          isALevel
            ? "bg-[#e8f5e9] border-green-200/60"
            : "bg-white border-gray-200/60"
        )}
      >
        {/* Paper Header — mimics the GCE header block */}
        <div
          className={cn(
            "px-8 md:px-16 py-10 md:py-14 text-center border-b-2",
            isALevel
              ? "bg-[#c8e6c9] border-green-300/60"
              : "bg-gray-50 border-gray-200/60"
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className={cn(
              "text-xs font-bold uppercase tracking-[0.3em]",
              isALevel ? "text-green-800/60" : "text-gray-400"
            )}>
              General Certificate of Education
            </div>

            <div className={cn(
              "inline-block px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] border",
              isALevel
                ? "bg-green-600 text-white border-green-700"
                : "bg-gray-800 text-white border-gray-900"
            )}>
              {exam.level}
            </div>

            <h1 className={cn(
              "text-3xl md:text-5xl font-black tracking-tight",
              isALevel ? "text-green-900" : "text-gray-900"
            )}>
              {exam.subject}
            </h1>

            <div className={cn(
              "flex items-center justify-center gap-6 text-sm font-bold",
              isALevel ? "text-green-700/80" : "text-gray-500"
            )}>
              <span className="flex items-center gap-1.5">
                <Layers size={14} />
                Paper {exam.paper}
              </span>
              <span className="opacity-30">|</span>
              <span className="flex items-center gap-1.5">
                <Hash size={14} />
                {exam.year} Session
              </span>
            </div>

            <div className={cn(
              "w-24 h-0.5 mx-auto rounded-full",
              isALevel ? "bg-green-400/40" : "bg-gray-300/60"
            )} />

            <div className={cn(
              "max-w-md mx-auto text-sm font-medium leading-relaxed",
              isALevel ? "text-green-800/70" : "text-gray-500"
            )}>
              {questions.length} Questions • {totalMarks} Marks Total
            </div>
          </motion.div>
        </div>

        {/* Questions — all displayed sequentially */}
        <div className={cn(
          "px-6 md:px-12 lg:px-16 py-10 space-y-0",
          isALevel ? "text-green-900" : "text-gray-900"
        )}>
          {questions.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className={cn(
                "mx-auto mb-4",
                isALevel ? "text-green-300" : "text-gray-300"
              )} size={48} />
              <p className={cn(
                "font-medium italic",
                isALevel ? "text-green-700/60" : "text-gray-400"
              )}>
                No questions found in this paper.
              </p>
            </div>
          ) : (
            questions.map((question, index) => (
              <motion.div
                key={question.question_number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "py-8",
                  index < questions.length - 1 && (
                    isALevel ? "border-b border-green-300/40" : "border-b border-gray-200/60"
                  )
                )}
              >
                {/* Question Number & Marks */}
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "flex items-center gap-3 text-lg font-black",
                    isALevel ? "text-green-800" : "text-gray-800"
                  )}>
                    <span className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black border",
                      isALevel
                        ? "bg-green-600 text-white border-green-700"
                        : "bg-gray-800 text-white border-gray-900"
                    )}>
                      {question.question_number}
                    </span>
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-3 py-1.5 rounded-full border",
                    isALevel
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-600 border-gray-200"
                  )}>
                    [{question.marks_total} marks]
                  </span>
                </div>

                {/* Question Text */}
                <div className={cn(
                  "text-[15px] md:text-base leading-[1.8] font-medium",
                  isALevel ? "text-green-900/90" : "text-gray-800"
                )}>
                  <PaperQuestionText text={question.question_text} isALevel={!!isALevel} />
                </div>

                {/* Image if present */}
                {question.image_url && (
                  <div className={cn(
                    "my-6 rounded-2xl overflow-hidden border",
                    isALevel ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                  )}>
                    <img
                      src={question.image_url}
                      alt={`Diagram for Question ${question.question_number}`}
                      className="max-w-full h-auto mx-auto"
                    />
                  </div>
                )}

                {/* Diagram placeholder */}
                {question.has_diagram && question.diagrams?.length > 0 && !question.image_url && (
                  <div className={cn(
                    "flex items-center gap-3 p-4 rounded-xl text-sm italic my-4 border",
                    isALevel
                      ? "bg-green-100/60 border-green-200 text-green-700"
                      : "bg-gray-50 border-gray-200 text-gray-500"
                  )}>
                    <BookOpen size={16} className="shrink-0" />
                    <span>[Diagram: {question.diagrams[0]?.description}]</span>
                  </div>
                )}

                {/* Sub-questions */}
                {question.has_subquestions && question.subquestions?.length > 0 && (
                  <div className="mt-5 space-y-4 pl-6 md:pl-10">
                    {question.subquestions.map((sq, i) => (
                      <div key={i}>
                        <div className="flex gap-3">
                          <span className={cn(
                            "font-bold text-sm shrink-0 mt-0.5",
                            isALevel ? "text-green-700" : "text-gray-600"
                          )}>
                            ({sq.subquestion_identifier})
                          </span>
                          <div className="flex-1">
                            <div className={cn(
                              "text-[15px] md:text-base leading-[1.8]",
                              isALevel ? "text-green-900/80" : "text-gray-700"
                            )}>
                              <PaperQuestionText text={sq.text} isALevel={!!isALevel} />
                            </div>
                            <span className={cn(
                              "text-xs font-bold mt-1 inline-block",
                              isALevel ? "text-green-600/60" : "text-gray-400"
                            )}>
                              [{sq.marks || 0} marks]
                            </span>

                            {/* Image that belongs to this sub-question */}
                            {sq.image_url && (
                              <div className={cn(
                                "my-4 rounded-2xl overflow-hidden border",
                                isALevel ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                              )}>
                                <img
                                  src={sq.image_url}
                                  alt={`Figure for part (${sq.subquestion_identifier})`}
                                  className="max-w-full h-auto mx-auto"
                                />
                              </div>
                            )}

                            {/* Deeper sub-sub-questions (e.g., 1(a)(iii)) */}
                            {sq.sub_subquestions && sq.sub_subquestions.length > 0 && (
                              <div className="mt-4 space-y-4 pl-5 md:pl-8 border-l-2 border-dashed">
                                {sq.sub_subquestions.map((ssq, j) => (
                                  <div key={j} className="flex gap-3">
                                    <span className={cn(
                                      "font-bold text-sm shrink-0 mt-0.5",
                                      isALevel ? "text-green-700" : "text-gray-600"
                                    )}>
                                      ({ssq.sub_subquestion_identifier})
                                    </span>
                                    <div className="flex-1">
                                      <div className={cn(
                                        "text-[15px] md:text-base leading-[1.8]",
                                        isALevel ? "text-green-900/80" : "text-gray-700"
                                      )}>
                                        <PaperQuestionText text={ssq.text} isALevel={!!isALevel} />
                                      </div>
                                      <span className={cn(
                                        "text-xs font-bold mt-1 inline-block",
                                        isALevel ? "text-green-600/60" : "text-gray-400"
                                      )}>
                                        [{ssq.marks || 0} marks]
                                      </span>

                                      {/* Image that belongs to this sub-sub-question */}
                                      {ssq.image_url && (
                                        <div className={cn(
                                          "my-4 rounded-2xl overflow-hidden border",
                                          isALevel ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                                        )}>
                                          <img
                                            src={ssq.image_url}
                                            alt={`Figure for part (${sq.subquestion_identifier})(${ssq.sub_subquestion_identifier})`}
                                            className="max-w-full h-auto mx-auto"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Paper Footer */}
        <div className={cn(
          "px-8 md:px-16 py-8 text-center border-t-2",
          isALevel
            ? "bg-[#c8e6c9] border-green-300/60"
            : "bg-gray-50 border-gray-200/60"
        )}>
          <p className={cn(
            "text-sm font-bold uppercase tracking-[0.15em]",
            isALevel ? "text-green-700/50" : "text-gray-400"
          )}>
            — End of Paper —
          </p>
        </div>
      </div>

      {/* Scroll to top FAB */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:scale-110",
            isALevel
              ? "bg-green-600 text-white shadow-green-500/30"
              : "bg-gray-800 text-white shadow-gray-500/30"
          )}
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </div>
  );
}

/**
 * Renders question text with LaTeX support, styled for the paper look.
 */
function PaperQuestionText({ text, isALevel }: { text: string; isALevel: boolean }) {
  if (!text) return null;

  const processLatexContent = (content: string) => {
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;

    const allMatches: { index: number; match: string; content: string; type: 'inline' | 'display' }[] = [];

    // Find inline math \( ... \)
    const inlinePattern = /\\\(([\s\S]*?)\\\)/g;
    let match;
    while ((match = inlinePattern.exec(content)) !== null) {
      allMatches.push({ index: match.index, match: match[0], content: match[1], type: 'inline' });
    }

    // Find display math \[ ... \]
    const displayPattern = /\\\[([\s\S]*?)\\\]/g;
    while ((match = displayPattern.exec(content)) !== null) {
      allMatches.push({ index: match.index, match: match[0], content: match[1], type: 'display' });
    }

    allMatches.sort((a, b) => a.index - b.index);

    for (const m of allMatches) {
      if (m.index > currentIndex) {
        const textBefore = content.substring(currentIndex, m.index);
        if (textBefore) parts.push(<span key={`t-${currentIndex}`}>{textBefore}</span>);
      }
      if (m.type === 'inline') {
        parts.push(<InlineMath key={`m-${m.index}`} math={m.content} />);
      } else {
        parts.push(<BlockMath key={`m-${m.index}`} math={m.content} />);
      }
      currentIndex = m.index + m.match.length;
    }

    if (currentIndex < content.length) {
      parts.push(<span key="t-end">{content.substring(currentIndex)}</span>);
    }

    if (parts.length === 0) {
      return <span>{content}</span>;
    }

    return <>{parts}</>;
  };

  return <>{processLatexContent(text)}</>;
}
