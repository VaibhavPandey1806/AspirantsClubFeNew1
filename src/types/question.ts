// Add to existing file
export interface QuestionPending {
  id: string;
  sectionId: string;
  section: string;
  topicId: string;
  topic: string;
  source: string;
  sourceId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  submittedBy: string;
  approved?: boolean;
  rejected?: boolean;
  comments?: string[];
  dateTimeSubmitted: string;
}