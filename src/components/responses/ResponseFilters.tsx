import React from 'react';
import { Filter } from 'lucide-react';
import FilterSelect from '../Filters/FilterSelect';
import { Category, Topic, Source } from '../../types/question';

interface ResponseFiltersProps {
  categories: Category[];
  topics: Topic[];
  sources: Source[];
  selectedCategory: string;
  selectedTopic: string;
  selectedSource: string;
  onCategoryChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function ResponseFilters({
  categories,
  topics,
  sources,
  selectedCategory,
  selectedTopic,
  selectedSource,
  onCategoryChange,
  onTopicChange,
  onSourceChange,
  showFilters,
  onToggleFilters
}: ResponseFiltersProps) {
  return (
    <>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <Filter size={20} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterSelect
              label="Category"
              value={selectedCategory}
              onChange={(value) => {
                onCategoryChange(value);
                onTopicChange('');
              }}
              options={categories}
            />
            <FilterSelect
              label="Topic"
              value={selectedTopic}
              onChange={onTopicChange}
              options={topics}
              disabled={!selectedCategory}
              placeholder={selectedCategory ? 'All Topics' : 'Select a Category first'}
            />
            <FilterSelect
              label="Source"
              value={selectedSource}
              onChange={onSourceChange}
              options={sources}
            />
          </div>
        </div>
      )}
    </>
  );
}