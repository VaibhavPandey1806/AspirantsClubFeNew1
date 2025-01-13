import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { UserResponse } from '../../types/response';

interface ResponseTableRowProps {
  response: UserResponse;
  formatTime: (seconds: number) => string;
}

export default function ResponseTableRow({ response, formatTime }: ResponseTableRowProps) {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/questions/${response.question.id}`);
  };

  return (
    <tr 
      onClick={handleRowClick} 
      className="hover:bg-gray-50 cursor-pointer"
    >
      <td className="px-6 py-4 whitespace-normal">
        <div className="text-sm text-gray-900 max-w-xl">
          {response.question.questionText}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{response.question.section}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{response.question.topic}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatTime(response.time)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {response.response ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Correct
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Incorrect
          </span>
        )}
      </td>
    </tr>
  );
}