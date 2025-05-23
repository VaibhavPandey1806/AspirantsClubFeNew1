import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { MessageCircle, Send, ThumbsUp, ThumbsDown, CircleCheck, User as UserIcon } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { Comment, User } from '@/types/api';
import { likeComment, dislikeComment } from '@/services/questions';

type CommentSectionProps = {
  comments: (Comment & { user?: User })[];
  commentsCount: number;
  showComments: boolean;
  loadingComments: boolean;
  newComment: string;
  submittingComment: boolean;
  onShowComments: () => void;
  onCommentChange: (text: string) => void;
  onSubmitComment: () => void;
  onCommentUpdate: () => void;
};

export default function CommentSection({
  comments,
  commentsCount,
  showComments,
  loadingComments,
  newComment,
  submittingComment,
  onShowComments,
  onCommentChange,
  onSubmitComment,
  onCommentUpdate,
}: CommentSectionProps) {
  const getInitials = (name?: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  const handleLike = async (commentId: string) => {
    try {
      await likeComment(commentId);
      onCommentUpdate();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId: string) => {
    try {
      await dislikeComment(commentId);
      onCommentUpdate();
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  if (!showComments) {
    return (
      <TouchableOpacity
        style={styles.showCommentsButton}
        onPress={onShowComments}
      >
        <MessageCircle size={20} color={COLORS.primary} />
        <Text style={styles.showCommentsText}>
          Show Comments ({commentsCount})
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.commentsSection}>
      <Text style={styles.commentsTitle}>Comments</Text>
      
      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={onCommentChange}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!newComment.trim() || submittingComment) && styles.sendButtonDisabled
          ]}
          onPress={onSubmitComment}
          disabled={!newComment.trim() || submittingComment}
        >
          <Send size={20} color={(!newComment.trim() || submittingComment) ? COLORS.gray[400] : COLORS.white} />
        </TouchableOpacity>
      </View>
      
      {loadingComments ? (
        <ActivityIndicator color={COLORS.primary} style={styles.loader} />
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <View style={styles.userInfo}>
                <View style={styles.avatarContainer}>
                  {comment.user?.name ? (
                    <Text style={styles.avatarText}>
                      {getInitials(comment.user.name)}
                    </Text>
                  ) : (
                    <UserIcon size={16} color={COLORS.white} />
                  )}
                  {comment.user?.userType === 'mentor' && (
                    <View style={styles.mentorBadge}>
                      <CircleCheck size={12} color={COLORS.white} />
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.userName}>
                    {comment.user?.name || 'Anonymous User'}
                  </Text>
                  <Text style={styles.userHandle}>
                    {comment.user?.username ? `@${comment.user.username}` : '@unknown'}
                  </Text>
                </View>
              </View>
              <Text style={styles.commentDate}>{comment.dateTimeSubmitted}</Text>
            </View>
            
            <Text style={styles.commentText}>{comment.text}</Text>
            
            <View style={styles.commentActions}>
              <TouchableOpacity 
                style={[
                  styles.actionButton,
                  comment.likedBy?.includes('0000') && styles.actionButtonActive
                ]}
                onPress={() => handleLike(comment.id)}
              >
                <ThumbsUp 
                  size={16} 
                  color={comment.likedBy?.includes('0000') ? COLORS.primary : COLORS.gray[500]} 
                />
                <Text style={[
                  styles.actionCount,
                  comment.likedBy?.includes('0000') && styles.actionCountActive
                ]}>
                  {comment.likes}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.actionButton,
                  comment.dislikedBy?.includes('0000') && styles.actionButtonActive
                ]}
                onPress={() => handleDislike(comment.id)}
              >
                <ThumbsDown 
                  size={16} 
                  color={comment.dislikedBy?.includes('0000') ? COLORS.primary : COLORS.gray[500]} 
                />
                <Text style={[
                  styles.actionCount,
                  comment.dislikedBy?.includes('0000') && styles.actionCountActive
                ]}>
                  {comment.dislikes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noComments}>No comments yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  showCommentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: `${COLORS.primary}10`,
    gap: 8,
  },
  showCommentsText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
  },
  commentsSection: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: 24,
  },
  commentsTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 16,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: COLORS.gray[100],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.gray[300],
  },
  loader: {
    marginVertical: 20,
  },
  commentCard: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  mentorBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.success,
    borderRadius: 10,
    padding: 2,
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  userHandle: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  commentDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 8,
  },
  actionButtonActive: {
    backgroundColor: `${COLORS.primary}15`,
  },
  actionCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  actionCountActive: {
    color: COLORS.primary,
  },
  noComments: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    textAlign: 'center',
    marginVertical: 20,
  },
});