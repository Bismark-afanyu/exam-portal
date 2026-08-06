export type GCELevel = 'O-Level' | 'A-Level';

export type SubjectCategory = 'Arts' | 'Science' | 'Commercial';

export interface SubjectMetadata {
  id: string; 
  name: string;
  level: GCELevel;
  category: SubjectCategory;
  papers: number[]; 
}

export const GCE_SUBJECTS: SubjectMetadata[] = [
  // --- Ordinary Level (O/L) ---
  { id: 'english-language-ol', name: 'English Language', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'french-ol', name: 'French', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'literature-in-english-ol', name: 'Literature in English', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'history-ol', name: 'History', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'geography-ol', name: 'Geography', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'religious-studies-ol', name: 'Religious Studies', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'citizenship-ol', name: 'Citizenship', level: 'O-Level', category: 'Arts', papers: [1, 2] },
  { id: 'philosophy-logic-ol', name: 'Philosophy (Logic)', level: 'O-Level', category: 'Arts', papers: [1, 2] },

  { id: 'mathematics-ol', name: 'Mathematics', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'additional-mathematics-ol', name: 'Additional Mathematics', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'biology-ol', name: 'Biology', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'physics-ol', name: 'Physics', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'chemistry-ol', name: 'Chemistry', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'computer-science-ol', name: 'Computer Science', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'ict-ol', name: 'ICT', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'geology-ol', name: 'Geology', level: 'O-Level', category: 'Science', papers: [1, 2] },
  { id: 'food-nutrition-ol', name: 'Food & Nutrition', level: 'O-Level', category: 'Science', papers: [1, 2] },

  { id: 'economics-ol', name: 'Economics', level: 'O-Level', category: 'Commercial', papers: [1, 2] },
  { id: 'commerce-ol', name: 'Commerce', level: 'O-Level', category: 'Commercial', papers: [1, 2] },
  { id: 'financial-accounting-ol', name: 'Financial Accounting', level: 'O-Level', category: 'Commercial', papers: [1, 2] },
  { id: 'office-practice-ol', name: 'Office Practice', level: 'O-Level', category: 'Commercial', papers: [1, 2] },

  // --- Advanced Level (A/L) ---
  { id: 'literature-in-english-al', name: 'Literature in English', level: 'A-Level', category: 'Arts', papers: [1, 2, 3] },
  { id: 'history-al', name: 'History', level: 'A-Level', category: 'Arts', papers: [1, 2, 3] },
  { id: 'french-al', name: 'French', level: 'A-Level', category: 'Arts', papers: [1, 2, 3] },
  { id: 'philosophy-al', name: 'Philosophy', level: 'A-Level', category: 'Arts', papers: [1, 2, 3] },
  { id: 'religious-studies-al', name: 'Religious Studies', level: 'A-Level', category: 'Arts', papers: [1, 2, 3] },

  { id: 'physics-al', name: 'Physics', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'chemistry-al', name: 'Chemistry', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'biology-al', name: 'Biology', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'pure-maths-with-mechanics-al', name: 'Pure Maths With Mechanics', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'pure-maths-with-statistics-al', name: 'Pure Maths With Statistics', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'further-mathematics-al', name: 'Further Mathematics', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'geology-al', name: 'Geology', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'computer-science-al', name: 'Computer Science', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'ict-al', name: 'ICT', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },
  { id: 'food-science-nutrition-al', name: 'Food Science and Nutrition', level: 'A-Level', category: 'Science', papers: [1, 2, 3] },

  { id: 'economics-al', name: 'Economics', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
  { id: 'geography-al', name: 'Geography', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
  { id: 'financial-accounting-al', name: 'Financial Accounting', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
  { id: 'business-management-al', name: 'Business Management', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
  { id: 'cost-management-accounting-al', name: 'Cost and Management Accounting', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
  { id: 'law-al', name: 'Law', level: 'A-Level', category: 'Commercial', papers: [1, 2, 3] },
];
