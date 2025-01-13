import { useState } from 'react';
import { likePost, unlikePost, dislikePost, addReply } from '../api/forum';
import type { Post, Reply } from '../types/forum';

export function useForumInteractions(onError?: (error: string) => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = async (
    post: Post, 
    userId: string,
    updatePost: (post: Post) => void
  ) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const hasLiked = post.likedBy?.includes(userId);

      // Optimistically update UI
      const optimisticPost = {
        ...post,
        likedBy: hasLiked 
          ? post.likedBy?.filter(id => id !== userId)
          : [...(post.likedBy || []), userId],
        dislikedBy: post.dislikedBy?.filter(id => id !== userId)
      };
      updatePost(optimisticPost);

      // Make API call
      const { data } = await (hasLiked ? unlikePost(post.id) : likePost(post.id));
      updatePost(data);
    } catch (error) {
      // Revert on error
      updatePost(post);
      onError?.('Failed to update like status');
      console.error('Error updating like:', error);
      window.location.reload(); // Only reload on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDislike = async (
    post: Post,
    userId: string,
    updatePost: (post: Post) => void
  ) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const hasDisliked = post.dislikedBy?.includes(userId);

      // Optimistically update UI
      const optimisticPost = {
        ...post,
        dislikedBy: hasDisliked
          ? post.dislikedBy?.filter(id => id !== userId)
          : [...(post.dislikedBy || []), userId],
        likedBy: post.likedBy?.filter(id => id !== userId)
      };
      updatePost(optimisticPost);

      // Make API call
      const { data } = await dislikePost(post.id);
      updatePost(data);
    } catch (error) {
      // Revert on error
      updatePost(post);
      onError?.('Failed to update dislike status');
      console.error('Error updating dislike:', error);
      window.location.reload(); // Only reload on error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddReply = async (
    postId: string,
    text: string,
    userId: string,
    userName: string,
    updateReplies: (newReply: Reply) => void
  ) => {
    if (isSubmitting || !text.trim()) return;

    try {
      setIsSubmitting(true);

      // Create optimistic reply
      const optimisticReply: Reply = {
        id: 'temp-' + Date.now(),
        postId,
        content: text.trim(),
        authorId: userId,
        author: { name: userName },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
        likedBy: [],
        dislikedBy: []
      };

      // Optimistically add reply
      updateReplies(optimisticReply);

      // Make API call
      const { data: actualReply } = await addReply(postId, { content: text.trim() });
      
      // Update with actual reply data
      updateReplies(actualReply);
    } catch (error) {
      // Remove optimistic reply on error
      updateReplies({ id: 'temp-' + Date.now(), remove: true } as any);
      onError?.('Failed to add reply');
      console.error('Error adding reply:', error);
      window.location.reload(); // Only reload on error
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleLike,
    handleDislike,
    handleAddReply
  };
}