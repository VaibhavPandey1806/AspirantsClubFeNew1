import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex bg-white rounded-full shadow-lg p-2">
        <input
          type="text"
          placeholder="Search questions..."
          className="flex-1 px-6 py-3 text-gray-700 focus:outline-none rounded-full"
        />
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Search size={20} />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}