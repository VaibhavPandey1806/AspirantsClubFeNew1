import { useState, useEffect, useCallback } from 'react';
import { submitResponse } from '../utils/api';

export function useQuestionTimer(questionId: string, userId?: string) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset timer when question changes
  useEffect(() => {
    setIsActive(false);
    setTime(0);
    setSelectedAnswer('');
    setShowResult(false);
    setIsSubmitting(false);
  }, [questionId]);

  // Timer interval
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    
    if (isActive && !showResult) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, showResult]);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setShowResult(false);
    setSelectedAnswer('');
    setTime(0);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsActive(false);
    setSelectedAnswer('');
    setShowResult(false);
    setIsSubmitting(false);
  }, []);

  const submitAnswer = useCallback(async (isCorrect: boolean) => {
    if (!userId || !questionId || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await submitResponse({
        userId,
        questionId,
        timer: time,
        response: isCorrect
      });
      
      // Stop timer and show result immediately after submission
      setIsActive(false);
      setShowResult(true);
      
      // Don't reset time here to show the final time to the user
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [userId, questionId, time, isSubmitting]);

  const handleAnswerSelect = useCallback((answer: string, correctAnswer: string) => {
    if (showResult || !isActive) return;
    
    setSelectedAnswer(answer);
    submitAnswer(answer === correctAnswer);
  }, [showResult, isActive, submitAnswer]);

  return {
    time,
    isActive,
    selectedAnswer,
    showResult,
    isSubmitting,
    startTimer,
    pauseTimer,
    resetTimer,
    handleAnswerSelect
  };
}