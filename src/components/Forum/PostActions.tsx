import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

interface PostActionsProps {
  likes: number;
  dislikes: number;
  replies: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  isSubmitting: boolean;
  onLike: () => void;
  onDislike: () => void;
  onReply: () => void;
}

export default function PostActions({
  likes,
  dislikes,
  replies,
  hasLiked,
  hasDisliked,
  isSubmitting,
  onLike,
  onDislike,
  onReply
}: PostActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onLike}
        disabled={isSubmitting}
        className={`flex items-center gap-1 transition-colors ${
          hasLiked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ThumbsUp size={20} />
        <span>{likes}</span>
      </button>

      <button
        onClick={onDislike}
        disabled={isSubmitting}
        className={`flex items-center gap-1 transition-colors ${
          hasDisliked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ThumbsDown size={20} />
        <span>{dislikes}</span>
      </button>

      <button
        onClick={onReply}
        className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
      >
        <MessageCircle size={20} />
        <span>Reply ({replies})</span>
      </button>
    </div>
  );
}