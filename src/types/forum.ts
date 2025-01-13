export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
  replies: string[]; // Array of reply IDs
  likedBy: string[] | null;
  dislikedBy: string[] | null;
}

export interface Reply {
  id: string;
  postId: string;
  parentReplyId?: string | null;
  content: string;
  authorId: string;
  author?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  replies: Reply[]; // Array of nested replies
  likedBy: string[] | null;
  dislikedBy: string[] | null;
  remove?: boolean; // Used for optimistic updates
}