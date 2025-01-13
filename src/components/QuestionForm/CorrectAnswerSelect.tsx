import React from 'react';

interface CorrectAnswerSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function CorrectAnswerSelect({ value, onChange, disabled }: CorrectAnswerSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Correct Answer
      </label>
      <div className="flex gap-6">
        {['A', 'B', 'C', 'D'].map((option) => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name="correctAnswer"
              value={option}
              checked={value === option}
              onChange={onChange}
              className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              required
              disabled={disabled}
            />
            <span className="text-gray-700">Option {option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}