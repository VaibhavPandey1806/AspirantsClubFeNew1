import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Question } from '../../types/question';

interface QuestionListItemProps {
  question: Question;
}

export default function QuestionListItem({ question }: QuestionListItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/questions/${question.id}`)}
      className="w-full text-left bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <p className="text-gray-800 flex-1">{question.questionText}</p>
        <ChevronRight className="text-gray-400 flex-shrink-0" size={20} />
      </div>
      
      <div className="mt-4 flex gap-2">
        {question.topic && (
          <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
            {question.topic}
          </span>
        )}
        {question.source && (
          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
            {question.source}
          </span>
        )}
      </div>
    </button>
  );
}