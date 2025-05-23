import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type ErrorDisplayProps = {
  message: string;
  onRetry: () => void;
};

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={styles.container}
    >
      <AlertCircle size={48} color={COLORS.error} />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity 
        style={styles.retryButton}
        onPress={onRetry}
        activeOpacity={0.8}
      >
        <RefreshCw size={18} color={COLORS.white} />
        <Text style={styles.retryText}>Try Again</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.text,
    marginVertical: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: COLORS.white,
    marginLeft: 8,
  },
});