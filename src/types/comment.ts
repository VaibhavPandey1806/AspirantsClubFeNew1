export interface Comment {
  id: string;
  text: string;
  submittedBy?: string;
  likes: number;
  dislikes: number;
  likedBy: string[] | null;
  dislikedBy: string[] | null;
  dateTimeSubmitted: string;
  replies?: Comment[];
  user?: {
    name: string;
    username: string;
  };
}

export interface CommentFormProps {
  questionId: string;
  onCommentAdded: () => void;
}

export interface CommentItemProps {
  comment: Comment;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onUnlike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
}