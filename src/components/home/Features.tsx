import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const features = [
  {
    icon: 'brain',
    title: 'Smart Practice',
    description: 'Time-based practice with detailed analytics to track your progress',
  },
  {
    icon: 'robot',
    title: 'AI-Powered Analysis',
    description: 'Get detailed explanations and insights from our AI for every question',
  },
  {
    icon: 'account-group',
    title: 'Active Community',
    description: 'Learn from peers and discuss questions with fellow aspirants',
  },
  {
    icon: 'clock-outline',
    title: 'Updated Content',
    description: 'Regular updates with latest exam patterns and questions',
  },
];

export default function Features() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Why Choose Aspirants Club?</Text>
      <Text style={styles.subtitle}>
        We provide everything you need to ace your MBA entrance exams
      </Text>

      <View style={styles.grid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.card}>
            <Icon name={feature.icon} size={32} color="#4F46E5" />
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.description}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  card: {
    width: '50%',
    padding: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});