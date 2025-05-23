export interface Category {
  id: string;
  name: string;
  details?: string;
  enabled: boolean;
}

export interface Source {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Topic {
  id: string;
  name: string;
  details?: string;
  sectionId: string;
  enabled: boolean;
}

export interface Question {
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
  comments: string[];
  dateTimeSubmitted: string;
}

export interface Comment {
  id: string;
  text: string;
  submittedBy: string;
  likes: number;
  dislikes: number;
  likedBy: string[];
  dislikedBy: string[];
  dateTimeSubmitted: string;
  replies: string[];
}

export interface User {
  id: string;
  name: string;
  role: string;
  userType: string;
  username: string;
  mobile: string;
  emailId: string;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  author: string;
}

export interface ForumPost {
  post: {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    forumId: string;
    replies: string[] | null;
    likedBy: string[] | null;
    dislikedBy: string[] | null;
  };
  author: User;
  replies: any[] | null;
}