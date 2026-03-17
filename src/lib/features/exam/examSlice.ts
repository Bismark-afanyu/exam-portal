import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SubQuestion {
    subquestion_identifier: string;
    text: string;
    marks: number;
}

export interface Question {
    question_number: string;
    question_text: string;
    topic: string;
    subtopic: string;
    marks_total: number;
    question_type: string;
    has_diagram: boolean;
    has_figure: boolean;
    has_subquestions: boolean;
    subquestions: SubQuestion[];
    diagrams: { description: string }[];
    figures: any[];
    image_url?: string;
}

export interface ExamPaperData {
    subject: string;
    level: string;
    year: number;
    paper: number;
    topics_covered: string[];
    questions: Question[];
}

interface ExamState {
    data: ExamPaperData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    uploadProgress: number;
    pdfFileUrl?: string; // URL to the uploaded PDF blob for extraction
    imageAssociations: Record<string, string>; // Maps question_number to image_url
}

const initialState: ExamState = {
    data: null,
    status: 'idle',
    error: null,
    uploadProgress: 0,
    imageAssociations: {},
};

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        uploadStart: (state) => {
            state.status = 'loading';
            state.error = null;
            state.uploadProgress = 0;
        },
        uploadProgress: (state, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },
        uploadSuccess: (state, action: PayloadAction<ExamPaperData>) => {
            state.status = 'succeeded';
            state.data = action.payload;
            state.uploadProgress = 100;
        },
        uploadFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
            state.uploadProgress = 0;
        },
        resetExam: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null;
            state.uploadProgress = 0;
        },
        updateFileData: (state, action: PayloadAction<ExamPaperData>) => {
            state.data = action.payload;
        },
        setPdfUrl: (state, action: PayloadAction<string>) => {
            state.pdfFileUrl = action.payload;
        },
        associateImage: (state, action: PayloadAction<{ questionNumber: string; imageUrl: string }>) => {
            state.imageAssociations[action.payload.questionNumber] = action.payload.imageUrl;
            if (state.data) {
                const question = state.data.questions.find(q => q.question_number === action.payload.questionNumber);
                if (question) {
                    question.image_url = action.payload.imageUrl;
                }
            }
        },
    },
});

export const { 
    uploadStart, 
    uploadProgress, 
    uploadSuccess, 
    uploadFailure, 
    resetExam, 
    updateFileData, 
    setPdfUrl, 
    associateImage 
} = examSlice.actions;
export default examSlice.reducer;
