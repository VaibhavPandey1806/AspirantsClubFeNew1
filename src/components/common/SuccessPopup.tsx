import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Question Submitted</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X size={20} />
          </button>
        </div>
        
        <p className="mt-4 text-gray-600">
          Your question has been submitted successfully and will be published after review by our moderators.
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/submitted-questions"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View your submitted questions
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}