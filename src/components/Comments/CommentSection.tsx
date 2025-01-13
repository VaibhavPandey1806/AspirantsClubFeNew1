import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Comment } from '../../types/comment';
import { useComments } from '../../hooks/useComments';

interface CommentSectionProps {
  questionId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

function CommentThread({ 
  comment, 
  level = 0,
  onReply,
  onLike,
  onUnlike,
  onDislike,
  isReplying,
  onReplySubmit
}: {
  comment: Comment;
  level?: number;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onUnlike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  isReplying: string | null;
  onReplySubmit: (commentId: string, text: string) => void;
}) {
  return (
    <div className="space-y-4">
      <CommentItem
        comment={comment}
        onReply={onReply}
        onLike={onLike}
        onUnlike={onUnlike}
        onDislike={onDislike}
        isNested={level > 0}
      />
      
      {isReplying === comment.id && (
        <div className={`ml-${Math.min(level + 1, 4) * 8}`}>
          <ReplyForm
            commentId={comment.id}
            onSubmit={(text) => onReplySubmit(comment.id, text)}
            onCancel={() => onReply(null)}
          />
        </div>
      )}
      
      {comment.replies && comment.replies.length > 0 && (
        <div className={`ml-${Math.min(level + 1, 4) * 8} space-y-4 border-l-2 border-gray-100 pl-4`}>
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              level={level + 1}
              onReply={onReply}
              onLike={onLike}
              onUnlike={onUnlike}
              onDislike={onDislike}
              isReplying={isReplying}
              onReplySubmit={onReplySubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ 
  questionId, 
  comments,
  onCommentAdded 
}: CommentSectionProps) {
  const {
    isReplying,
    handleReply,
    handleLike,
    handleUnlike,
    handleDislike,
    handleReplySubmit
  } = useComments(onCommentAdded);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Comments ({comments.length})
      </h2>
      
      <CommentForm questionId={questionId} onCommentAdded={onCommentAdded} />
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onDislike={handleDislike}
            isReplying={isReplying}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
}

interface ReplyFormProps {
  commentId: string;
  onSubmit: (text: string) => void;
  onCancel: () => void;
}

function ReplyForm({ commentId, onSubmit, onCancel }: ReplyFormProps) {
  const [text, setText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await onSubmit(text.trim());
      setText('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        rows={2}
        disabled={isSubmitting}
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Reply'}
        </button>
      </div>
    </form>
  );
}