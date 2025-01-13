import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MessageCircle, Clock, ThumbsUp } from 'lucide-react';
import { getPosts } from '../../api/forum';
import { getUserById } from '../../api/auth';
import type { Post } from '../../types/forum';
import type { User } from '../../types/user';
import Avatar from '../Avatar';
import SortControls, { SortOption } from './SortControls';

export default function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const fetchUserDetails = async (userIds: string[]) => {
    const uniqueIds = Array.from(new Set(userIds));
    const userDetails = await Promise.all(
      uniqueIds.map(async (id) => {
        try {
          const user = await getUserById(id);
          return [id, user] as [string, User];
        } catch (error) {
          console.error(`Error fetching user ${id}:`, error);
          return null;
        }
      })
    );

    const validUsers = userDetails.filter((item): item is [string, User] => item !== null);
    setUsers(Object.fromEntries(validUsers));
  };

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPosts();
      setPosts(data);
      
      // Fetch user details for all post authors
      const authorIds = data.map(post => post.authorId);
      await fetchUserDetails(authorIds);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortPosts = (posts: Post[]): Post[] => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'most-replies':
          return (b.replies?.length || 0) - (a.replies?.length || 0);
        case 'most-liked':
          return (b.likedBy?.length || 0) - (a.likedBy?.length || 0);
        default:
          return 0;
      }
    });
  };

  const sortedPosts = sortPosts(posts);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
        <SortControls currentSort={sortBy} onSortChange={setSortBy} />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {sortedPosts.map((post) => {
          const author = users[post.authorId];
          return (
            <div
              key={post.id}
              onClick={() => navigate(`/forum/post/${post.id}`)}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                {author && (
                  <>
                    <Avatar name={author.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900">{author.name}</p>
                      <p className="text-sm text-gray-500">@{author.username}</p>
                    </div>
                  </>
                )}
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 line-clamp-2 mb-4">{post.content}</p>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MessageCircle size={16} />
                  {post.replies?.length || 0} replies
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={16} />
                  {post.likedBy?.length || 0} likes
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 group">
        <button
          onClick={() => navigate('/forum/new')}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          aria-label="Start new discussion"
        >
          <Plus 
            size={24} 
            className="transform group-hover:scale-110 transition-transform duration-200" 
          />
        </button>
        <div className="absolute bottom-full right-0 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-gray-900 text-white text-sm py-1 px-3 rounded-md shadow-lg whitespace-nowrap">
            Start new discussion
          </div>
          <div className="absolute top-full right-6 w-2 h-2 -mt-1">
            <div className="bg-gray-900 w-2 h-2 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
}