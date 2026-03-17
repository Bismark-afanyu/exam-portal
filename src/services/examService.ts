import axios from 'axios';
import { ExamPaperData } from '@/lib/features/exam/examSlice';

const API_BASE_URL = 'http://localhost:8000/api/v1/exams';

export const examService = {
    /**
     * Saves the full exam data including associations and images to the database
     */
    saveExam: async (examData: ExamPaperData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/save`, examData);
            return response.data;
        } catch (error: any) {
            console.error('Error saving exam data:', error);
            throw new Error(error.response?.data?.message || 'Failed to save exam to database');
        }
    }
};
