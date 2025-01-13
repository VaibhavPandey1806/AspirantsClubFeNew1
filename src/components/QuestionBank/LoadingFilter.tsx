import React from 'react';

export default function LoadingFilter() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-[500px] animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-10 bg-gray-100 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}