import React, { useState, useEffect } from 'react';
import { getSubmittedQuestions } from '../api/questions';
import { QuestionPending } from '../types/question';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function SubmittedQuestions() {
  const [questions, setQuestions] = useState<QuestionPending[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmittedQuestions();
  }, []);

  const fetchSubmittedQuestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getSubmittedQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching submitted questions:', error);
      setError('Failed to load submitted questions');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (question: QuestionPending) => {
    if (question.approved) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle size={14} />
          Approved
        </span>
      );
    }
    if (question.rejected) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <XCircle size={14} />
          Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <Clock size={14} />
        Pending Approval
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submitted Questions</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category:</span>
                    <span className="ml-2 text-gray-900">{question.section}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Topic:</span>
                    <span className="ml-2 text-gray-900">{question.topic}</span>
                  </div>
                </div>
                {getStatusBadge(question)}
              </div>

              <p className="text-gray-900 font-medium mb-4">{question.questionText}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {['A', 'B', 'C', 'D'].map((option) => (
                  <div 
                    key={option} 
                    className={`p-3 rounded-md ${
                      question.correctAnswer === option 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-700">Option {option}:</span>
                    <span className="ml-2 text-gray-600">
                      {question[`option${option}` as keyof QuestionPending]}
                    </span>
                    {question.correctAnswer === option && (
                      <span className="ml-2 text-green-600 text-sm">(Correct Answer)</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <div>Submitted on: {question.dateTimeSubmitted}</div>
                <div>Source: {question.source}</div>
              </div>
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">You haven't submitted any questions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}