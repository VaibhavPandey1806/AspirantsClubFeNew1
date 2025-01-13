// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  password: string;
  mobile: string;
  emailId: string;
}

// Question types
export interface QuestionSubmission {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  section?: string;
  sectionId?: string;
  topic?: string;
  topicId?: string;
  source?: string;
  sourceId?: string;
}

// Response types
export interface ResponseSubmission {
  userId: string;
  questionId: string;
  timer: number;
  response: boolean;
}

// Filter types
export interface QuestionFilters {
  category: string[];
  topic?: string[];
  source?: string[];
}