import React, { useState, useEffect } from 'react';
import { Reply } from '../../types/forum';
import ReplyCard from './ReplyCard';
import { getReply } from '../../api/forum';

interface ReplyListProps {
  replies: Reply[];
  postId: string;
  currentUserId: string;
  onUpdate: () => void;
}

export default function ReplyList({ replies, postId, currentUserId, onUpdate }: ReplyListProps) {
  const [replyMap, setReplyMap] = useState<Map<string, Reply>>(new Map());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all nested replies
  useEffect(() => {
    const fetchNestedReplies = async () => {
      const map = new Map<string, Reply>();
      const fetchQueue: string[] = [];

      // Add initial replies to map and queue their nested replies
      replies.forEach(reply => {
        map.set(reply.id, reply);
        if (reply.replies && reply.replies.length > 0) {
          fetchQueue.push(...reply.replies);
        }
      });

      // Fetch nested replies
      while (fetchQueue.length > 0) {
        setIsLoading(true);
        try {
          const replyId = fetchQueue.shift()!;
          if (!map.has(replyId)) {
            const reply = await getReply(replyId);
            if (reply) {
              map.set(reply.id, reply);
              // Add any nested replies to the queue
              if (reply.replies && reply.replies.length > 0) {
                fetchQueue.push(...reply.replies);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching nested reply:', error);
        }
      }
      setIsLoading(false);
      setReplyMap(map);
    };

    fetchNestedReplies();
  }, [replies]);

  const renderReplyThread = (reply: Reply, depth: number = 0) => {
    if (!reply) return null;

    return (
      <div key={reply.id} className={`${depth > 0 ? 'ml-6 border-l-2 border-gray-100 pl-4' : ''}`}>
        <ReplyCard
          reply={reply}
          postId={postId}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
        />
        {reply.replies && reply.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {reply.replies.map(childId => {
              const childReply = replyMap.get(childId);
              return childReply ? renderReplyThread(childReply, depth + 1) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-gray-500 text-center py-4">Loading replies...</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      {replies.map(reply => renderReplyThread(reply))}
    </div>
  );
}