import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchUserDetails } from '@/services/api';
import { UserDto } from '@/types/user';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import Header from '@/components/Header';
import InfoItem from '@/components/InfoItem';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { AtSign, Briefcase, Phone, Shield, User as UserIcon } from 'lucide-react-native';

export default function ProfileScreen() {
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
      setError('Failed to load profile details. Please try again later.');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadUserData();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <ErrorDisplay message={error} onRetry={handleRetry} />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeIn.duration(500)}
          style={styles.profileHeader}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
          </View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.usernameText}>@{user.username}</Text>
          <View style={styles.userTypeContainer}>
            <Text style={styles.userTypeText}>{user.userType}</Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.duration(500).delay(200)}
          style={styles.infoSection}
        >
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <InfoItem 
              icon={<UserIcon size={20} color={COLORS.primary} />}
              label="Full Name"
              value={user.name}
            />
            <InfoItem 
              icon={<AtSign size={20} color={COLORS.primary} />}
              label="Email"
              value={user.emailId}
            />
            <InfoItem 
              icon={<Phone size={20} color={COLORS.primary} />}
              label="Mobile"
              value={user.mobile}
            />
            <InfoItem 
              icon={<Briefcase size={20} color={COLORS.primary} />}
              label="User Type"
              value={user.userType}
            />
            <InfoItem 
              icon={<Shield size={20} color={COLORS.primary} />}
              label="Role"
              value={user.role}
              isLast
            />
          </View>
        </Animated.View>
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
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 36,
    fontFamily: 'Inter-Bold',
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    marginBottom: 12,
  },
  userTypeContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  userTypeText: {
    color: COLORS.white,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});