import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import UserPosts from './UserPosts';
import UserComments from './UserComments';
import type { Post } from '../../types/forum';
import type { Comment } from '../../types/comment';

interface UserActivityProps {
  userId: string;
  posts: Post[];
  comments: Comment[];
  isLoading: boolean;
}

export default function UserActivity({ userId, posts, comments, isLoading }: UserActivityProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">
            Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="comments">
            Comments ({comments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <UserPosts posts={posts} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="comments">
          <UserComments comments={comments} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}