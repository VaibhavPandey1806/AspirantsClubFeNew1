import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import QuestionListItem from '../components/QuestionBank/QuestionListItem';
import { Question } from '../types/question';
import { getQuestionsByFilters } from '../utils/api';

export default function QuestionListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const categoryParam = searchParams.get('category');
        const topicParam = searchParams.get('topic');
        const sourceParam = searchParams.get('source');

        if (!categoryParam) {
          throw new Error('Category is required');
        }

        const filters = {
          category: categoryParam.split(','),
          topic: topicParam ? topicParam.split(',') : undefined,
          source: sourceParam ? sourceParam.split(',') : undefined
        };

        const { data } = await getQuestionsByFilters(filters);
        setQuestions(data);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [searchParams]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/question-bank')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Return to Question Bank
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/question-bank')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Filters
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No questions found with the selected filters.</p>
          <button
            onClick={() => navigate('/question-bank')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Modify Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionListItem key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}