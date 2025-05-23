import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Forum } from '@/types/api';
import { COLORS } from '@/constants/colors';
import { MessageSquare } from 'lucide-react-native';

type ForumCardProps = {
  forum: Forum;
  onPress: (forum: Forum) => void;
};

export default function ForumCard({ forum, onPress }: ForumCardProps) {
  return (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => onPress(forum)}
    >
      <View style={styles.iconContainer}>
        <MessageSquare size={24} color={COLORS.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{forum.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {forum.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[600],
    lineHeight: 20,
  },
});