import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export type SortOption = 'newest' | 'oldest' | 'most-replies' | 'most-liked';

interface SortControlsProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortControls({ currentSort, onSortChange }: SortControlsProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-replies', label: 'Most Replies' },
    { value: 'most-liked', label: 'Most Liked' }
  ];

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2">
      <ArrowUpDown size={18} className="text-gray-500" />
      <select
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-transparent border-none text-gray-700 text-sm focus:ring-0 cursor-pointer"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}