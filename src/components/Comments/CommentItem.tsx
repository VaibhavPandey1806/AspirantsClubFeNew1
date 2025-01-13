import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { CommentItemProps } from '../../types/comment';

export default function CommentItem({
  comment,
  onReply,
  onLike,
  onUnlike,
  onDislike,
  isNested = false
}: CommentItemProps & { isNested?: boolean }) {
  const [localLikes, setLocalLikes] = useState(comment.likes);
  const [localDislikes, setLocalDislikes] = useState(comment.dislikes);
  const [hasLiked, setHasLiked] = useState(comment.likedBy?.includes(comment.submittedBy || '') || false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      if (hasLiked) {
        // Optimistically update UI
        setLocalLikes(prev => prev - 1);
        setHasLiked(false);
        await onUnlike(comment.id);
      } else {
        // Optimistically update UI
        setLocalLikes(prev => prev + 1);
        setHasLiked(true);
        await onLike(comment.id);
      }
    } catch (error) {
      // Revert optimistic updates on error
      if (hasLiked) {
        setLocalLikes(prev => prev + 1);
        setHasLiked(true);
      } else {
        setLocalLikes(prev => prev - 1);
        setHasLiked(false);
      }
      console.error('Error handling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    try {
      setLocalDislikes(prev => prev + 1);
      await onDislike(comment.id);
    } catch (error) {
      setLocalDislikes(prev => prev - 1);
      console.error('Error handling dislike:', error);
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 ${!isNested ? 'shadow-sm' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{comment.dateTimeSubmitted}</span>
          </div>
          <p className="text-gray-700">{comment.text}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1 text-sm transition-colors ${
                hasLiked ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'
              } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp size={16} />
              <span>{localLikes}</span>
            </button>
            
            <button
              onClick={handleDislike}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <ThumbsDown size={16} />
              <span>{localDislikes}</span>
            </button>
            
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <MessageCircle size={16} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}