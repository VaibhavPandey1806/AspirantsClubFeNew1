import React from 'react';
import { ChevronRight } from 'lucide-react';
import { BaseItem } from '../../types/common';

interface FilterSectionProps {
  title: string;
  options: BaseItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  isDisabled?: boolean;
}

export default function FilterSection({
  title,
  options = [],
  selectedId,
  onSelect,
  isDisabled = false
}: FilterSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-[500px] overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {(!options || options.length === 0) ? (
        <p className="text-gray-500 text-center py-4">
          {isDisabled ? 'Select a category first' : 'No options available'}
        </p>
      ) : (
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              disabled={isDisabled}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                selectedId === option.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'hover:bg-gray-50 text-gray-700'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option.name}</span>
                {selectedId === option.id && <ChevronRight size={16} />}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}