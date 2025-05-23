import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { fetchUserDetails } from '@/services/api';
import { UserDto } from '@/types/user';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import Header from '@/components/Header';
import UserProfileCard from '@/components/UserProfileCard';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';

export default function HomeScreen() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await fetchUserDetails();
      setUser(userData);
    } catch (err) {
      setError('Failed to load user details. Please try again later.');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadUserData();
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        ) : user ? (
          <Animated.View 
            entering={FadeInDown.duration(500).springify()}
            style={styles.profileContainer}
          >
            <UserProfileCard user={user} />
          </Animated.View>
        ) : null}
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
    paddingHorizontal: 16,
    paddingBottom: 24,
    minHeight: '100%',
  },
  profileContainer: {
    marginTop: 16,
    flex: 1,
  }
});