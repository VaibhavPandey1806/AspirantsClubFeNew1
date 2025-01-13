import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Hero() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Your MBA Preparation</Text>
        <Text style={styles.highlight}>Starts Here</Text>
        <Text style={styles.subtitle}>
          Join the largest community of MBA aspirants. Practice questions, get AI-powered explanations, 
          and learn from peers - all in one place.
        </Text>
        <View style={styles.aiTag}>
          <Icon name="robot" size={24} color={theme.colors.primary} />
          <Text style={[styles.aiText, { color: theme.colors.primary }]}>
            Powered by Advanced AI
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  highlight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  aiTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    marginTop: 24,
  },
  aiText: {
    marginLeft: 8,
    fontWeight: '600',
  },
});