export interface UserResponse {
  id?: string;
  question: {
    id: string;
    questionText: string;
    section: string;
    topic: string;
    source: string;
    correctAnswer: string;
  };
  time: number;
  response: boolean;
}

export interface UserResponses {
  id: string;
  userid: string;
  user: {
    id: string;
    username: string;
    name: string;
    emailId: string;
    mobile: string;
  };
  responses: UserResponse[];
}