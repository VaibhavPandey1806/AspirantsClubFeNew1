import { View, Text, StyleSheet } from 'react-native';
import { BookOpen, ListTodo, Library, User as UserIcon, CircleCheck } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import { Question, User } from '@/types/api';
import { useState, useEffect } from 'react';
import { fetchUserById } from '@/services/questions';

type QuestionHeaderProps = {
  question: Question;
};

export default function QuestionHeader({ question }: QuestionHeaderProps) {
  const [submitter, setSubmitter] = useState<User | null>(null);

  useEffect(() => {
    loadSubmitterDetails();
  }, [question.submittedBy]);

  const loadSubmitterDetails = async () => {
    try {
      const userData = await fetchUserById(question.submittedBy);
      setSubmitter(userData);
    } catch (error) {
      console.error('Error loading submitter details:', error);
    }
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <View style={styles.tags}>
        <View style={[styles.tag, { backgroundColor: `${COLORS.primary}15` }]}>
          <BookOpen size={16} color={COLORS.primary} />
          <Text style={[styles.tagText, { color: COLORS.primary }]}>{question.section}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: `${COLORS.secondary}15` }]}>
          <ListTodo size={16} color={COLORS.secondary} />
          <Text style={[styles.tagText, { color: COLORS.secondary }]}>{question.topic}</Text>
        </View>
        <View style={[styles.tag, { backgroundColor: `${COLORS.accent}15` }]}>
          <Library size={16} color={COLORS.accent} />
          <Text style={[styles.tagText, { color: COLORS.accent }]}>{question.source}</Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question.questionText}</Text>

      {submitter && (
        <View style={styles.submitterContainer}>
          <View style={styles.submitterInfo}>
            <View style={styles.avatarContainer}>
              {submitter.name ? (
                <Text style={styles.avatarText}>
                  {getInitials(submitter.name)}
                </Text>
              ) : (
                <UserIcon size={16} color={COLORS.white} />
              )}
              {submitter.userType === 'mentor' && (
                <View style={styles.mentorBadge}>
                  <CircleCheck size={12} color={COLORS.white} />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.submitterName}>
                {submitter.name}
              </Text>
              <Text style={styles.submitterRole}>
                {submitter.role}
              </Text>
            </View>
          </View>
          <Text style={styles.submissionDate}>
            Submitted on {question.dateTimeSubmitted}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  questionText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 24,
    lineHeight: 26,
  },
  submitterContainer: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  submitterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  mentorBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.success,
    borderRadius: 10,
    padding: 2,
  },
  submitterName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  submitterRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  submissionDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
});