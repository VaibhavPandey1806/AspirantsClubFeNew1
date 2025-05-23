import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLast?: boolean;
};

export default function InfoItem({ icon, label, value, isLast = false }: InfoItemProps) {
  return (
    <View style={[styles.container, !isLast && styles.withBorder]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
});