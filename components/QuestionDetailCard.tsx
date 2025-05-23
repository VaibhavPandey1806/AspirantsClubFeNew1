import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Question, Comment, User } from '@/types/api';
import { COLORS } from '@/constants/colors';
import Animated, { FadeIn } from 'react-native-reanimated';
import { submitAnswer, fetchCommentById, fetchUserById } from '@/services/questions';
import QuestionHeader from './QuestionHeader';
import AnswerOptions from './AnswerOptions';
import CommentSection from './CommentSection';

const BASE_URL = 'https://stageapi.aspirantsclub.in/api';

type QuestionDetailCardProps = {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
};

export default function QuestionDetailCard({ 
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuestionDetailCardProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState<(Comment & { user?: User })[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (showOptions && !isAnswered) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showOptions, isAnswered]);

  const loadComments = async () => {
    if (!question?.comments?.length) return;
    
    try {
      setLoadingComments(true);
      const commentsData = await Promise.all(
        question.comments.map(async (commentId) => {
          const comment = await fetchCommentById(commentId);
          try {
            const user = await fetchUserById(comment.submittedBy);
            return { ...comment, user };
          } catch (error) {
            console.error('Error fetching user:', error);
            return { ...comment };
          }
        })
      );
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleStartAnswer = () => {
    setShowOptions(true);
    setTimer(0);
  };

  const handleAnswerSelect = async (option: string) => {
    if (submitting) return;

    try {
      setSubmitting(true);
      const correct = option === question.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      onSelectAnswer(option);

      await submitAnswer(timer, question.id, correct);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShowComments = () => {
    setShowComments(true);
    loadComments();
  };

  const handleCommentUpdate = async () => {
    await loadComments();
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || submittingComment) return;

    try {
      setSubmittingComment(true);
      
      const formData = new URLSearchParams();
      formData.append('questionId', question.id);
      formData.append('text', newComment);

      const response = await fetch(`${BASE_URL}/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={styles.card}
      >
        <QuestionHeader question={question} />
        
        <AnswerOptions
          question={question}
          showOptions={showOptions}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          timer={timer}
          onStartAnswer={handleStartAnswer}
          onSelectAnswer={handleAnswerSelect}
        />

        <CommentSection
          comments={comments}
          commentsCount={question.comments?.length || 0}
          showComments={showComments}
          loadingComments={loadingComments}
          newComment={newComment}
          submittingComment={submittingComment}
          onShowComments={handleShowComments}
          onCommentChange={setNewComment}
          onSubmitComment={handleSubmitComment}
          onCommentUpdate={handleCommentUpdate}
        />
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});