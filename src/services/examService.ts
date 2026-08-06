import { ExamPaperData } from '@/lib/features/exam/examSlice';
import { apiClient } from '@/services/authService';

export class DuplicateExamError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateExamError';
    }
}

export const examService = {
    saveExam: async (examData: ExamPaperData) => {
        try {
            const response = await apiClient.post('/exams/save', examData);
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 409) {
                const detail = error.response?.data?.detail || 'This exam already exists in the database.';
                throw new DuplicateExamError(detail);
            }
            const detail = error.response?.data?.detail || error.message;
            throw new Error(detail || 'Failed to save exam to database');
        }
    },

    uploadPdf: async (subject: string, year: number, paper: number, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const safeSubject = subject.toLowerCase().replace(/\s+/g, '_');
        const response = await apiClient.post(
            `/exams/${safeSubject}/${year}/${paper}/pdf`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data.pdf_url as string;
    },

    listExams: async () => {
        const response = await apiClient.get('/exams/');
        return response.data as { subject: string; year: number; paper: number; pdf_url: string | null }[];
    },
};
