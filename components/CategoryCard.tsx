import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from '@/types/api';
import { COLORS } from '@/constants/colors';
import { BookOpen } from 'lucide-react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';

type CategoryCardProps = {
  category: Category;
  index: number;
  onPress: (category: Category) => void;
  isSelected?: boolean;
};

export default function CategoryCard({ category, index, onPress, isSelected }: CategoryCardProps) {
  return (
    <Animated.View 
      entering={FadeInRight.delay(index * 100)}
      style={styles.container}
    >
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => onPress(category)}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
          <BookOpen size={24} color={isSelected ? COLORS.white : COLORS.primary} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.name, isSelected && styles.selectedText]}>
            {category.name}
          </Text>
          {category.details && (
            <Text 
              style={[styles.details, isSelected && styles.selectedText]} 
              numberOfLines={2}
            >
              {category.details}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    width: 200,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedIconContainer: {
    backgroundColor: `${COLORS.white}20`,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  selectedText: {
    color: COLORS.white,
  },
});