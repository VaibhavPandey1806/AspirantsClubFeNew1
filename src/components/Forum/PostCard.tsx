import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { useForumInteractions } from '../../hooks/useForumInteractions';
import ReplyForm from './ReplyForm';
import type { Post } from '../../types/forum';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  currentUser: {
    id: string;
    name: string;
  };
}

export default function PostCard({ post, currentUser }: PostCardProps) {
  const navigate = useNavigate();
  const [currentPost, setCurrentPost] = useState(post);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isSubmitting,
    handleLike,
    handleDislike,
    handleAddReply
  } = useForumInteractions(setError);

  const hasLiked = currentPost.likedBy?.includes(currentUser.id) || false;
  const hasDisliked = currentPost.dislikedBy?.includes(currentUser.id) || false;
  const score = (currentPost.likedBy?.length || 0) - (currentPost.dislikedBy?.length || 0);

  const handlePostClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation();
      return;
    }
    navigate(`/forum/post/${currentPost.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      {/* Vote Column */}
      <div className="flex">
        <div className="w-12 bg-gray-50 rounded-l-lg p-2 flex flex-col items-center">
          <button
            onClick={() => handleLike(currentPost, currentUser.id, setCurrentPost)}
            disabled={isSubmitting}
            className={`p-1 rounded transition-colors ${
              hasLiked ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowUp size={20} />
          </button>
          
          <span className={`text-sm font-bold my-1 ${
            score > 0 ? 'text-orange-500' : 
            score < 0 ? 'text-blue-500' : 
            'text-gray-500'
          }`}>
            {score}
          </span>
          
          <button
            onClick={() => handleDislike(currentPost, currentUser.id, setCurrentPost)}
            disabled={isSubmitting}
            className={`p-1 rounded transition-colors ${
              hasDisliked ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <ArrowDown size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4" onClick={handlePostClick}>
          {/* Post Metadata */}
          <div className="text-xs text-gray-500 mb-2">
            Posted by u/{currentPost.authorName || 'anonymous'} • 
            {formatDistanceToNow(new Date(currentPost.createdAt), { addSuffix: true })}
          </div>

          {/* Title */}
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            {currentPost.title}
          </h2>

          {/* Content Preview */}
          <p className="text-gray-600 line-clamp-3 mb-4">
            {currentPost.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReplyForm(!showReplyForm);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={18} />
              <span className="text-sm">
                {currentPost.replies?.length || 0} Comments
              </span>
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4" onClick={e => e.stopPropagation()}>
              <ReplyForm
                onSubmit={text => handleAddReply(
                  currentPost.id,
                  text,
                  currentUser.id,
                  currentUser.name,
                  newReply => {
                    if (newReply.remove) {
                      setCurrentPost(prev => ({
                        ...prev,
                        replies: prev.replies?.filter(r => r.id !== newReply.id)
                      }));
                    } else {
                      setCurrentPost(prev => ({
                        ...prev,
                        replies: [...(prev.replies || []), newReply]
                      }));
                    }
                    setShowReplyForm(false);
                  }
                )}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}