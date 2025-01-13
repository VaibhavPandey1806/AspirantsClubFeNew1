import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import MultiSelectFilter from '../components/QuestionBank/MultiSelectFilter';
import LoadingFilter from '../components/QuestionBank/LoadingFilter';
import LoadingSpinner from '../components/QuestionBank/LoadingSpinner';
import { useQuestionBank } from '../hooks/useQuestionBank';

export default function QuestionBank() {
  const navigate = useNavigate();
  const {
    categories,
    topics,
    sources,
    selectedCategories,
    selectedTopics,
    selectedSources,
    isLoading,
    error,
    setSelectedCategories,
    setSelectedTopics,
    setSelectedSources,
    handleSearch: performSearch
  } = useQuestionBank();

  const handleCategorySelect = (id: string) => {
    setSelectedCategories(prev => [...prev, id]);
    setSelectedTopics([]);
  };

  const handleCategoryRemove = (id: string) => {
    setSelectedCategories(prev => prev.filter(categoryId => categoryId !== id));
    setSelectedTopics([]);
  };

  const handleSearchClick = async () => {
    await performSearch();
    const params = new URLSearchParams();
    if (selectedCategories.length) {
      params.append('category', selectedCategories.join(','));
    }
    if (selectedTopics.length) {
      params.append('topic', selectedTopics.join(','));
    }
    if (selectedSources.length) {
      params.append('source', selectedSources.join(','));
    }
    navigate(`/questions?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Question Bank</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {isLoading ? (
          <>
            <LoadingFilter />
            <LoadingFilter />
            <LoadingFilter />
          </>
        ) : (
          <>
            <MultiSelectFilter
              title="Categories"
              options={categories}
              selectedIds={selectedCategories}
              onSelect={handleCategorySelect}
              onRemove={handleCategoryRemove}
            />
            
            <MultiSelectFilter
              title="Topics"
              options={topics}
              selectedIds={selectedTopics}
              onSelect={(id) => setSelectedTopics(prev => [...prev, id])}
              onRemove={(id) => setSelectedTopics(prev => prev.filter(topicId => topicId !== id))}
              isDisabled={selectedCategories.length === 0}
            />
            
            <MultiSelectFilter
              title="Sources"
              options={sources}
              selectedIds={selectedSources}
              onSelect={(id) => setSelectedSources(prev => [...prev, id])}
              onRemove={(id) => setSelectedSources(prev => prev.filter(sourceId => sourceId !== id))}
            />
          </>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearchClick}
          disabled={selectedCategories.length === 0 || isLoading}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white transition-colors ${
            selectedCategories.length > 0 && !isLoading
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Search size={20} />
              <span>Search Questions</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}