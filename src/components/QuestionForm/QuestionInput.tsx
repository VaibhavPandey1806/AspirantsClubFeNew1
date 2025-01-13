import React from 'react';

interface QuestionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export default function QuestionInput({ value, onChange, disabled }: QuestionInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Question Text
      </label>
      <textarea
        name="questionText"
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
        required
        disabled={disabled}
        placeholder="Enter your question here..."
      />
    </div>
  );
}