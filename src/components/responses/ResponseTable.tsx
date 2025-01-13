import React from 'react';
import { UserResponse } from '../../types/response';
import ResponseTableRow from './ResponseTableRow';

interface ResponseTableProps {
  responses: UserResponse[];
  formatTime: (seconds: number) => string;
}

export default function ResponseTable({ responses, formatTime }: ResponseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Question
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Taken
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {responses.map((response, index) => (
            <ResponseTableRow 
              key={response.id || index} 
              response={response} 
              formatTime={formatTime} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}