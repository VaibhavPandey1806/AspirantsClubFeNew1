import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function LoadingIndicator() {
  return (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={styles.container}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
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
});