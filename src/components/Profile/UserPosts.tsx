import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import type { Post } from '../../types/forum';
import Avatar from '../Avatar';

interface UserPostsProps {
  posts: Post[];
  isLoading: boolean;
}

export default function UserPosts({ posts, isLoading }: UserPostsProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No posts yet
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {posts.map((post) => (
        <div 
          key={post.id}
          onClick={() => navigate(`/forum/post/${post.id}`)}
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
        >
          <h3 className="font-medium text-gray-900 mb-2 truncate">{post.title}</h3>
          <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ThumbsUp size={16} />
                {post.likedBy?.length || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} />
                {post.replies?.length || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}