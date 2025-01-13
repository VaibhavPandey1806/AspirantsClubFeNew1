import React from 'react';
import { Question } from '../../types/question';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900 flex-grow">{question.questionText}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {['A', 'B', 'C', 'D'].map((option) => (
          <div key={option} className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700">Option {option}:</span>
            <span className="ml-2 text-gray-600">
              {question[`option${option}` as keyof Question]}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500 pt-4 border-t">
        <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
          {question.topic}
        </span>
        <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
          {question.source}
        </span>
      </div>
    </div>
  );
}