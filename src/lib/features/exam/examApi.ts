import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ExamPaperData } from './examSlice';
import { authService, handleUnauthorized } from '@/services/authService';

export interface ExamSummary {
  subject: string;
  year: number;
  paper: number;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1`,
  prepareHeaders: (headers) => {
    const token = authService.getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    handleUnauthorized();
  }
  return result;
};

export const examApi = createApi({
  reducerPath: 'examApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    listExams: builder.query<ExamSummary[], void>({
      query: () => '/exams/',
    }),
    getExamDetails: builder.query<ExamPaperData, { subject: string; year: number; paper: number }>({
      query: ({ subject, year, paper }) => `/exams/${subject}/${year}/${paper}`,
    }),
  }),
});

export const { useListExamsQuery, useGetExamDetailsQuery } = examApi;
