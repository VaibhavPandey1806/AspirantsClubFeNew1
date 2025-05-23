import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { Forum, ForumPost } from '@/types/api';
import { fetchForums, fetchForumPosts, fetchPostById } from '@/services/forums';
import Header from '@/components/Header';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import { COLORS } from '@/constants/colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';
import ForumCard from '@/components/ForumCard';
import ForumPostCard from '@/components/ForumPost';
import ForumPostDetail from '@/components/ForumPostDetail';

export default function ForumsScreen() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForums();
  }, []);

  const loadForums = async () => {
    try {
      setLoading(true);
      setError(null);
      const forumsData = await fetchForums();
      setForums(forumsData);
    } catch (err) {
      setError('Failed to load forums. Please try again.');
      console.error('Error loading forums:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForumPress = async (forum: Forum) => {
    try {
      setLoading(true);
      setError(null);
      const postsData = await fetchForumPosts(forum.id);
      setPosts(postsData);
      setSelectedForum(forum);
    } catch (err) {
      setError('Failed to load forum posts. Please try again.');
      console.error('Error loading forum posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostPress = async (post: ForumPost) => {
    try {
      setLoading(true);
      setError(null);
      const postDetails = await fetchPostById(post.post.id);
      setSelectedPost(postDetails);
    } catch (err) {
      setError('Failed to load post details. Please try again.');
      console.error('Error loading post details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (selectedPost) {
      setSelectedPost(null);
    } else {
      setSelectedForum(null);
      setPosts([]);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (selectedPost) {
        const postDetails = await fetchPostById(selectedPost.post.id);
        setSelectedPost(postDetails);
      } else if (selectedForum) {
        const postsData = await fetchForumPosts(selectedForum.id);
        setPosts(postsData);
      } else {
        await loadForums();
      }
    } catch (err) {
      console.error('Error refreshing:', err);
    } finally {
      setRefreshing(false);
    }
  }, [selectedPost, selectedForum]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Forums" />
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Forums" />
        <ErrorDisplay 
          message={error} 
          onRetry={selectedForum ? () => handleForumPress(selectedForum) : loadForums} 
        />
      </View>
    );
  }

  if (selectedPost) {
    return (
      <View style={styles.container}>
        <Header title="Post Detail" />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={20} color={COLORS.primary} />
            <Text style={styles.backButtonText}>Back to Posts</Text>
          </TouchableOpacity>

          <ForumPostDetail post={selectedPost} />
        </View>
      </View>
    );
  }

  if (selectedForum) {
    return (
      <View style={styles.container}>
        <Header title="Forum Posts" />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={20} color={COLORS.primary} />
            <Text style={styles.backButtonText}>Back to Forums</Text>
          </TouchableOpacity>

          <View style={styles.forumHeader}>
            <Text style={styles.forumTitle}>{selectedForum.title}</Text>
            <Text style={styles.forumDescription}>{selectedForum.description}</Text>
          </View>

          <ScrollView
            style={styles.postsList}
            contentContainerStyle={styles.postsContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
          >
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <TouchableOpacity
                  key={post.post.id}
                  onPress={() => handlePostPress(post)}
                  activeOpacity={0.7}
                >
                  <ForumPostCard post={post} index={index} />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noPostsText}>No posts in this forum yet</Text>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Forums" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {forums.map((forum, index) => (
          <Animated.View
            key={forum.id}
            entering={FadeInDown.delay(index * 100)}
          >
            <ForumCard 
              forum={forum} 
              onPress={handleForumPress}
            />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
  },
  forumHeader: {
    padding: 16,
    backgroundColor: COLORS.white,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  forumTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  forumDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[600],
    lineHeight: 24,
  },
  postsList: {
    flex: 1,
  },
  postsContent: {
    padding: 16,
  },
  noPostsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: 32,
  },
});