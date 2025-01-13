import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

interface CommentActionsProps {
  likes: number;
  dislikes: number;
  hasLiked: boolean;
  onLike: () => void;
  onUnlike: () => void;
  onDislike: () => void;
  onReply: () => void;
}

export default function CommentActions({
  likes,
  dislikes,
  hasLiked,
  onLike,
  onUnlike,
  onDislike,
  onReply
}: CommentActionsProps) {
  return (
    <div className="flex items-center gap-4 mt-2">
      <button
        onClick={hasLiked ? onUnlike : onLike}
        className={`flex items-center gap-1 text-sm ${
          hasLiked ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
        }`}
      >
        <ThumbsUp size={16} />
        <span>{likes}</span>
      </button>
      
      <button
        onClick={onDislike}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
      >
        <ThumbsDown size={16} />
        <span>{dislikes}</span>
      </button>
      
      <button
        onClick={onReply}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600"
      >
        <MessageCircle size={16} />
        <span>Reply</span>
      </button>
    </div>
  );
}