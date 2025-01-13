import React from 'react';
import { CheckCircle, XCircle, Play } from 'lucide-react';

interface QuestionOptionsProps {
  options: { [key: string]: string };
  selectedAnswer: string;
  correctAnswer?: string;
  showResult: boolean;
  isTimerActive: boolean;
  onSelectAnswer: (answer: string) => void;
}

export default function QuestionOptions({
  options,
  selectedAnswer,
  correctAnswer,
  showResult,
  isTimerActive,
  onSelectAnswer
}: QuestionOptionsProps) {
  if (!isTimerActive && !showResult) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <Play size={32} className="mb-3 animate-pulse text-indigo-500" />
        <p className="text-lg font-medium">Click the timer icon above to start answering</p>
        <p className="text-sm mt-2 text-gray-400">Options will be revealed when the timer starts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(options).map(([key, value]) => {
        const isCorrect = showResult && correctAnswer === key;
        const isWrong = showResult && selectedAnswer === key && !isCorrect;
        const isSelected = selectedAnswer === key;

        return (
          <button
            key={key}
            onClick={() => !showResult && isTimerActive && onSelectAnswer(key)}
            disabled={showResult || !isTimerActive}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200
              ${showResult && isCorrect ? 'bg-green-50 border-green-200' : ''}
              ${showResult && isWrong ? 'bg-red-50 border-red-200' : ''}
              ${!showResult && isSelected ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200'}
              ${!showResult && isTimerActive ? 'hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm' : ''}
              ${!isTimerActive && !showResult ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium mr-2">Option {key}:</span>
                <span>{value}</span>
              </div>
              {showResult && (isCorrect ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : isWrong ? (
                <XCircle className="text-red-500" size={20} />
              ) : null)}
            </div>
          </button>
        );
      })}
    </div>
  );
}