import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { getPendingQuestions, approveQuestion, rejectQuestion, getUserById } from '../../api/admin';
import type { PendingQuestion } from '../../types/question';
import type { User } from '../../types/user';

export default function PendingQuestions() {
  const [questions, setQuestions] = useState<PendingQuestion[]>([]);
  const [submitters, setSubmitters] = useState<Record<string, User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingQuestions();
  }, []);

  const fetchPendingQuestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await getPendingQuestions();
      setQuestions(data);
      
      // Fetch submitter details for each question
      const submitterIds = [...new Set(data.map(q => q.submittedBy))];
      const submitterDetails = await Promise.all(
        submitterIds.map(async id => {
          const { data: user } = await getUserById(id);
          return [id, user] as [string, User];
        })
      );
      setSubmitters(Object.fromEntries(submitterDetails));
    } catch (error) {
      console.error('Error fetching pending questions:', error);
      setError('Failed to load pending questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (questionId: string) => {
    try {
      await approveQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (error) {
      console.error('Error approving question:', error);
      setError('Failed to approve question');
    }
  };

  const handleReject = async (questionId: string) => {
    try {
      await rejectQuestion(questionId);
      setQuestions(questions.filter(q => q.id !== questionId));
    } catch (error) {
      console.error('Error rejecting question:', error);
      setError('Failed to reject question');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Pending Questions ({questions.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {questions.map((question) => (
            <div key={question.id} className="p-6 hover:bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Submitted by:</span>
                    <span className="ml-2 text-gray-900">
                      {submitters[question.submittedBy]?.name || 'Unknown'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {question.dateTimeSubmitted}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900">{question.section}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-medium text-gray-500">Topic:</span>
                  <span className="ml-2 text-gray-900">{question.topic}</span>
                </div>

                <p className="text-gray-900 font-medium">{question.questionText}</p>

                <div className="grid grid-cols-2 gap-4">
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
                        {question[`option${option}` as keyof PendingQuestion]}
                      </span>
                      {question.correctAnswer === option && (
                        <span className="ml-2 text-green-600 text-sm">(Correct Answer)</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleReject(question.id)}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <XCircle size={20} />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleApprove(question.id)}
                    className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <CheckCircle size={20} />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {questions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending questions to review
            </div>
          )}
        </div>
      </div>
    </div>
  );
}