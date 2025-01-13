import React from 'react';
import { X } from 'lucide-react';
import { BaseItem } from '../../types/common';

interface MultiSelectFilterProps {
  title: string;
  options: BaseItem[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  isDisabled?: boolean;
}

export default function MultiSelectFilter({
  title,
  options = [],
  selectedIds = [],
  onSelect,
  onRemove,
  isDisabled = false
}: MultiSelectFilterProps) {
  const handleSelect = (id: string) => {
    if (!isDisabled && !selectedIds.includes(id)) {
      onSelect(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 h-[500px] flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      
      {/* Selected Items */}
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedIds.map((id) => {
            const option = options.find(opt => opt.id === id);
            if (!option) return null;
            
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
              >
                {option.name}
                <button
                  onClick={() => onRemove(id)}
                  className="hover:text-indigo-900 focus:outline-none"
                  type="button"
                >
                  <X size={14} />
                </button>
              </span>
            );
          })}
        </div>
      )}
      
      {/* Options List */}
      <div className="flex-1 overflow-y-auto">
        {(!options || options.length === 0) ? (
          <p className="text-gray-500 text-center py-4">
            {isDisabled ? 'Select a category first' : 'No options available'}
          </p>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                disabled={isDisabled || selectedIds.includes(option.id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 
                  ${selectedIds.includes(option.id)
                    ? 'bg-indigo-50 text-indigo-700 cursor-default'
                    : 'hover:bg-gray-50 text-gray-700'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="button"
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}