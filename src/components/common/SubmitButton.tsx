import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText: string;
}

export default function SubmitButton({ isSubmitting, text, loadingText }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isSubmitting ? loadingText : text}
    </button>
  );
}