import React from 'react';

interface OptionsInputProps {
  options: {
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function OptionsInput({ options, onChange, disabled }: OptionsInputProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {['A', 'B', 'C', 'D'].map((option) => (
        <div key={option}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Option {option}
          </label>
          <input
            type="text"
            name={`option${option}`}
            value={options[`option${option}` as keyof typeof options]}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500"
            required
            disabled={disabled}
            placeholder={`Enter option ${option}`}
          />
        </div>
      ))}
    </div>
  );
}