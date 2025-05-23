import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { ResponseData, fetchResponses } from '@/services/responses';
import Header from '@/components/Header';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorDisplay from '@/components/ErrorDisplay';
import ResponseCard from '@/components/ResponseCard';
import QuestionDetailCard from '@/components/QuestionDetailCard';
import { COLORS } from '@/constants/colors';
import { CircleCheck, ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function ResponsesScreen() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<ResponseData['responses'][0] | null>(null);

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      setError(null);
      const responseData = await fetchResponses();
      setData(responseData);
    } catch (err) {
      setError('Failed to load responses. Please try again.');
      console.error('Error loading responses:', err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadResponses();
    } catch (err) {
      console.error('Error refreshing:', err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleResponsePress = (response: ResponseData['responses'][0]) => {
    setSelectedResponse(response);
  };

  const handleBack = () => {
    setSelectedResponse(null);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="My Responses" />
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="My Responses" />
        <ErrorDisplay message={error} onRetry={loadResponses} />
      </View>
    );
  }

  if (!data) {
    return null;
  }

  if (selectedResponse) {
    return (
      <View style={styles.container}>
        <Header title="Question Detail" />
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={20} color={COLORS.primary} />
          <Text style={styles.backButtonText}>Back to Responses</Text>
        </TouchableOpacity>
        <QuestionDetailCard
          question={selectedResponse.question}
          selectedAnswer={null}
          onSelectAnswer={() => {}}
        />
      </View>
    );
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Header title="My Responses" />
      
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
        <Animated.View 
          entering={FadeIn.duration(300)}
          style={styles.userCard}
        >
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {getInitials(data.user.name)}
              </Text>
              {data.user.userType === 'MENTOR' && (
                <View style={styles.mentorBadge}>
                  <CircleCheck size={12} color={COLORS.white} />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.userName}>{data.user.name}</Text>
              <Text style={styles.userRole}>{data.user.role}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {data.responses.length}
              </Text>
              <Text style={styles.statLabel}>Questions Attempted</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {data.responses.filter(r => r.response).length}
              </Text>
              <Text style={styles.statLabel}>Correct Answers</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.responsesSection}>
          <Text style={styles.sectionTitle}>Recent Responses</Text>
          {data.responses.map((response, index) => (
            <TouchableOpacity
              key={`${response.question.id}-${index}`}
              onPress={() => handleResponsePress(response)}
              activeOpacity={0.7}
            >
              <ResponseCard
                questionText={response.question.questionText}
                isCorrect={response.response}
                time={response.time}
                index={index}
              />
            </TouchableOpacity>
          ))}
        </View>
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
  },
  userCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 20,
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
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  responsesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 16,
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
});