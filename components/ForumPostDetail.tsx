import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ForumPost } from '@/types/api';
import { COLORS } from '@/constants/colors';
import { User as UserIcon, CircleCheck, MessageCircle } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type ForumPostDetailProps = {
  post: ForumPost;
};

type ReplyProps = {
  reply: any;
  level?: number;
};

function Reply({ reply, level = 0 }: ReplyProps) {
  if (!reply) return null;

  const getInitials = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasReplies = Array.isArray(reply.replies) && reply.replies.length > 0;

  return (
    <View style={[styles.replyContainer, { marginLeft: level * 16 }]}>
      <View style={styles.replyLine} />
      <View style={styles.replyContent}>
        <View style={styles.replyHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {reply.user?.name ? (
                <Text style={styles.avatarText}>
                  {getInitials(reply.user.name)}
                </Text>
              ) : (
                <UserIcon size={16} color={COLORS.white} />
              )}
              {reply.user?.userType === 'mentor' && (
                <View style={styles.mentorBadge}>
                  <CircleCheck size={12} color={COLORS.white} />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.userName}>
                {reply.user?.name || 'Anonymous User'}
              </Text>
              {reply.user?.username && (
                <Text style={styles.userHandle}>
                  @{reply.user.username}
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.date}>
            {formatDate(reply.createdAt)}
          </Text>
        </View>

        <Text style={styles.replyText}>{reply.content}</Text>

        <View style={styles.replyStats}>
          <Text style={styles.statsText}>
            {reply.likeCount || 0} likes
          </Text>
          <Text style={styles.statsText}>•</Text>
          <Text style={styles.statsText}>
            {reply.dislikeCount || 0} dislikes
          </Text>
          {hasReplies && (
            <>
              <Text style={styles.statsText}>•</Text>
              <Text style={styles.statsText}>
                {reply.replies.length} replies
              </Text>
            </>
          )}
        </View>

        {hasReplies && (
          <View style={styles.nestedReplies}>
            {reply.replies.map((nestedReply: any) => (
              <Reply 
                key={nestedReply.id} 
                reply={nestedReply} 
                level={level + 1} 
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

export default function ForumPostDetail({ post }: ForumPostDetailProps) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasReplies = Array.isArray(post.replies) && post.replies.length > 0;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.postCard}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              {post.author.name ? (
                <Text style={styles.avatarText}>
                  {getInitials(post.author.name)}
                </Text>
              ) : (
                <UserIcon size={16} color={COLORS.white} />
              )}
              {post.author.userType === 'mentor' && (
                <View style={styles.mentorBadge}>
                  <CircleCheck size={12} color={COLORS.white} />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.userName}>{post.author.name}</Text>
              <Text style={styles.userHandle}>@{post.author.username}</Text>
            </View>
          </View>
          <Text style={styles.date}>
            {formatDate(post.post.createdAt)}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{post.post.title}</Text>
          <Text style={styles.text}>{post.post.content}</Text>
        </View>

        <View style={styles.stats}>
          <Text style={styles.statsText}>
            {post.post.likedBy?.length || 0} likes
          </Text>
          <Text style={styles.statsText}>•</Text>
          <Text style={styles.statsText}>
            {hasReplies ? post.replies.length : 0} replies
          </Text>
        </View>
      </Animated.View>

      {hasReplies ? (
        <View style={styles.repliesSection}>
          <View style={styles.repliesHeader}>
            <MessageCircle size={20} color={COLORS.primary} />
            <Text style={styles.repliesTitle}>
              Replies ({post.replies.length})
            </Text>
          </View>
          {post.replies.map((reply) => (
            <Reply key={reply.id} reply={reply} />
          ))}
        </View>
      ) : (
        <Text style={styles.noReplies}>No replies yet</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
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
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  userHandle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  content: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    lineHeight: 24,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  repliesSection: {
    marginTop: 8,
  },
  repliesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  repliesTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  replyContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  replyLine: {
    position: 'absolute',
    left: -8,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: COLORS.gray[200],
  },
  replyContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  replyText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  replyStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  nestedReplies: {
    marginTop: 12,
  },
  noReplies: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: 32,
  },
});