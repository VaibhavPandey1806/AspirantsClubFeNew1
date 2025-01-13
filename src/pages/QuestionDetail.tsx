import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById, getUserDetails } from '../utils/api';
import { Question } from '../types/question';
import { Comment } from '../types/comment';
import CommentSection from '../components/Comments/CommentSection';
import { useComments } from '../hooks/useComments';
import { useQuestionTimer } from '../hooks/useQuestionTimer';
import QuestionHeader from '../components/Question/QuestionHeader';
import QuestionOptions from '../components/Question/QuestionOptions';
import QuestionMeta from '../components/Question/QuestionMeta';
import AIOpinion from '../components/Question/AIOpinion';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');
  const { fetchComments } = useComments(() => fetchQuestionAndComments());
  
  const {
    time,
    isActive,
    selectedAnswer,
    showResult,
    startTimer,
    pauseTimer,
    handleAnswerSelect
  } = useQuestionTimer(id || '', userId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: user } = await getUserDetails();
        setUserId(user.id);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, []);

  const fetchQuestionAndComments = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const { data: questionData } = await getQuestionById(id);
      setQuestion(questionData);

      if (questionData.comments && Array.isArray(questionData.comments)) {
        const fetchedComments = await fetchComments(questionData.comments);
        setComments(fetchedComments.filter(Boolean));
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionAndComments();
  }, [id]);

  const handleTimerTick = (seconds: number) => {
    // Optional: Add any additional timer tick handling logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Question not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <QuestionHeader
            onTimerStart={startTimer}
            onTimerPause={pauseTimer}
            onTimerTick={handleTimerTick}
            isTimerActive={isActive}
            time={time}
          />

          <h1 className="text-xl font-medium text-gray-900 mb-8">
            {question.questionText}
          </h1>
          
          <QuestionOptions
            options={{
              'A': question.optionA,
              'B': question.optionB,
              'C': question.optionC,
              'D': question.optionD
            }}
            selectedAnswer={selectedAnswer}
            correctAnswer={question.correctAnswer}
            showResult={showResult}
            isTimerActive={isActive}
            onSelectAnswer={(answer) => handleAnswerSelect(answer, question.correctAnswer || '')}
          />

          <AIOpinion 
            questionId={question.id} 
            isTimerActive={isActive}
            showResult={showResult}
          />

          <QuestionMeta
            topic={question.topic}
            source={question.source}
            submittedBy={question.submittedBy}
            dateSubmitted={question.dateTimeSubmitted}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <CommentSection
            questionId={question.id}
            comments={comments}
            onCommentAdded={fetchQuestionAndComments}
          />
        </div>
      </div>
    </div>
  );
}