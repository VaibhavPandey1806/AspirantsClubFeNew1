import { View, Text, StyleSheet } from 'react-native';
import { ForumPost } from '@/types/api';
import { COLORS } from '@/constants/colors';
import { User as UserIcon, CircleCheck } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type ForumPostCardProps = {
  post: ForumPost;
  index: number;
};

export default function ForumPostCard({ post, index }: ForumPostCardProps) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)}
      style={styles.container}
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
          {post.post.replies?.length || 0} replies
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
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
});