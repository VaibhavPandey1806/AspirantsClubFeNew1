import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';

const categories = [
  {
    icon: 'calculator',
    title: 'Quantitative Aptitude',
    questionCount: 2500,
    color: '#4F46E5',
  },
  {
    icon: 'brain',
    title: 'Logical Reasoning',
    questionCount: 1800,
    color: '#7C3AED',
  },
  {
    icon: 'book-open-page-variant',
    title: 'Verbal Ability',
    questionCount: 2000,
    color: '#059669',
  },
  {
    icon: 'chart-pie',
    title: 'Data Interpretation',
    questionCount: 1500,
    color: '#EA580C',
  },
  {
    icon: 'database',
    title: 'General Knowledge',
    questionCount: 1200,
    color: '#DC2626',
  },
  {
    icon: 'lightbulb-on',
    title: 'Current Affairs',
    questionCount: 800,
    color: '#CA8A04',
  },
];

export default function Categories() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore by Category</Text>
      <Text style={styles.subtitle}>
        Choose from our comprehensive collection of questions across various MBA entrance exam topics
      </Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.card}
            onPress={() => {/* Navigate to category */}}
          >
            <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
              <Icon name={category.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.questionCount}>
              {category.questionCount.toLocaleString()} questions
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  scrollContent: {
    paddingRight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
    color: '#6B7280',
  },
});