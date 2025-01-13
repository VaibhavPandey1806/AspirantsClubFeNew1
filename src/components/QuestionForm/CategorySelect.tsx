import React from 'react';
import SelectWithAdd from '../Select/SelectWithAdd';
import type { Category, Topic, Source } from '../../types/question';

interface CategorySelectProps {
  categories: Category[];
  topics: Topic[];
  sources: Source[];
  selectedCategory: Category | null;
  selectedTopic: Topic | null;
  selectedSource: Source | null;
  newCategory: string;
  newTopic: string;
  newSource: string;
  onCategorySelect: (id: string) => void;
  onTopicSelect: (id: string) => void;
  onSourceSelect: (id: string) => void;
  onAddCategory: (name: string) => void;
  onAddTopic: (name: string) => void;
  onAddSource: (name: string) => void;
  disabled?: boolean;
}

export default function CategorySelect({
  categories,
  topics,
  sources,
  selectedCategory,
  selectedTopic,
  selectedSource,
  newCategory,
  newTopic,
  newSource,
  onCategorySelect,
  onTopicSelect,
  onSourceSelect,
  onAddCategory,
  onAddTopic,
  onAddSource,
  disabled
}: CategorySelectProps) {
  return (
    <div className="space-y-6">
      <SelectWithAdd
        label="Category"
        value={selectedCategory?.id || ''}
        options={categories}
        onChange={onCategorySelect}
        onAddNew={onAddCategory}
        placeholder="Select or add new category"
        required
        disabled={disabled}
        selectedName={newCategory}
      />

      <SelectWithAdd
        label="Topic"
        value={selectedTopic?.id || ''}
        options={topics}
        onChange={onTopicSelect}
        onAddNew={onAddTopic}
        placeholder="Select or add new topic"
        required
        disabled={disabled || (!selectedCategory && !newCategory)}
        selectedName={newTopic}
      />

      <SelectWithAdd
        label="Source"
        value={selectedSource?.id || ''}
        options={sources}
        onChange={onSourceSelect}
        onAddNew={onAddSource}
        placeholder="Select or add new source"
        required
        disabled={disabled}
        selectedName={newSource}
      />
    </div>
  );
}