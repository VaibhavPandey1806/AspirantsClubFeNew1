import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { Check, X, Clock } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type ResponseCardProps = {
  questionText: string;
  isCorrect: boolean;
  time: number;
  index: number;
};

export default function ResponseCard({ questionText, isCorrect, time, index }: ResponseCardProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)}
      style={styles.container}
    >
      <View style={[styles.statusBadge, isCorrect ? styles.correctBadge : styles.incorrectBadge]}>
        {isCorrect ? (
          <Check size={16} color={COLORS.success} />
        ) : (
          <X size={16} color={COLORS.error} />
        )}
        <Text style={[styles.statusText, isCorrect ? styles.correctText : styles.incorrectText]}>
          {isCorrect ? 'Correct' : 'Incorrect'}
        </Text>
      </View>

      <Text style={styles.questionText} numberOfLines={3}>
        {questionText}
      </Text>

      <View style={styles.timeContainer}>
        <Clock size={16} color={COLORS.gray[500]} />
        <Text style={styles.timeText}>
          Time taken: {formatTime(time)}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 4,
  },
  correctBadge: {
    backgroundColor: `${COLORS.success}15`,
  },
  incorrectBadge: {
    backgroundColor: `${COLORS.error}15`,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  correctText: {
    color: COLORS.success,
  },
  incorrectText: {
    color: COLORS.error,
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
});