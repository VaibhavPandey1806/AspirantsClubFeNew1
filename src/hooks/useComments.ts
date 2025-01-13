import { useState, useCallback } from 'react';
import { 
  getCommentById,
  getUserById,
  likeComment,
  unlikeComment,
  dislikeComment,
  addReply
} from '../api';
import type { Comment } from '../types/comment';

export function useComments(onCommentAdded: () => void) {
  const [isReplying, setIsReplying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleReply = useCallback((commentId: string | null) => {
    setIsReplying(commentId);
  }, []);

  const handleLike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await likeComment(commentId);
      // Don't trigger a full reload
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error; // Propagate error to handle UI revert
    }
  }, []);

  const handleUnlike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await unlikeComment(commentId);
      // Don't trigger a full reload
    } catch (error) {
      console.error('Error unliking comment:', error);
      throw error; // Propagate error to handle UI revert
    }
  }, []);

  const handleDislike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await dislikeComment(commentId);
      // Don't trigger a full reload
    } catch (error) {
      console.error('Error disliking comment:', error);
      throw error; // Propagate error to handle UI revert
    }
  }, []);

  const handleReplySubmit = useCallback(async (commentId: string, text: string) => {
    if (!commentId || !text.trim()) return;
    try {
      await addReply(commentId, text.trim());
      setIsReplying(null);
      onCommentAdded(); // Only reload on new replies
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  }, [onCommentAdded]);

  // ... rest of the code remains the same

  return {
    isReplying,
    isLoading,
    handleReply,
    handleLike,
    handleUnlike,
    handleDislike,
    handleReplySubmit
  };
}