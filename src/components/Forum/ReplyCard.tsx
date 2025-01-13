import React, { useState } from 'react';
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useForumInteractions } from '../../hooks/useForumInteractions';
import ReplyForm from './ReplyForm';
import type { Reply } from '../../types/forum';

interface ReplyCardProps {
  reply: Reply;
  postId: string;
  currentUserId: string;
  onUpdate: () => void;
  depth?: number;
}

export default function ReplyCard({ 
  reply, 
  postId, 
  currentUserId, 
  onUpdate,
  depth = 0 
}: ReplyCardProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const score = (reply.likedBy?.length || 0) - (reply.dislikedBy?.length || 0);
  const hasLiked = reply.likedBy?.includes(currentUserId);
  const hasDisliked = reply.dislikedBy?.includes(currentUserId);

  const { isSubmitting, handleAddReply } = useForumInteractions(setError);

  const formatDate = (date: string | Date) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Recently';
      }
      return formatDistanceToNow(dateObj, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Recently';
    }
  };

  const handleReplySubmit = async (text: string) => {
    if (!handleAddReply) return;
    
    try {
      await handleAddReply(
        postId,
        text,
        currentUserId,
        reply.author?.name || 'anonymous',
        (newReply) => {
          if (!newReply.remove) {
            setShowReplyForm(false);
            onUpdate();
          }
        }
      );
    } catch (error) {
      console.error('Error submitting reply:', error);
      setError('Failed to submit reply. Please try again.');
    }
  };

  return (
    <div className={`flex ${depth > 0 ? 'ml-8 mt-2' : 'mt-4'}`}>
      {/* Vote Column */}
      <div className="w-10 flex flex-col items-center pt-2">
        <button
          className={`p-1 rounded transition-colors ${
            hasLiked ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ArrowUp size={16} />
        </button>
        
        <span className={`text-xs font-bold my-1 ${
          score > 0 ? 'text-orange-500' : 
          score < 0 ? 'text-blue-500' : 
          'text-gray-500'
        }`}>
          {score}
        </span>
        
        <button
          className={`p-1 rounded transition-colors ${
            hasDisliked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          {/* Metadata */}
          <div className="text-xs text-gray-500 mb-2">
            {reply.author?.name || 'anonymous'} • 
            {formatDate(reply.createdAt)}
          </div>

          {/* Content */}
          <p className="text-gray-700 text-sm">{reply.content}</p>

          {/* Actions */}
          <div className="mt-2 flex items-center gap-4">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <MessageCircle size={14} />
              Reply
            </button>
          </div>

          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-2">
              <ReplyForm
                onSubmit={handleReplySubmit}
                isSubmitting={isSubmitting}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>

        {/* Nested Replies */}
        {reply.replies?.map(childId => (
          <ReplyCard
            key={childId}
            reply={reply.replies.find(r => r.id === childId) as Reply}
            postId={postId}
            currentUserId={currentUserId}
            onUpdate={onUpdate}
            depth={depth + 1}
          />
        ))}
      </div>
    </div>
  );
}