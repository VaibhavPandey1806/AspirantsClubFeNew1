import React, { useEffect, useState } from 'react';
import { getUserResponses } from '../utils/api';
import type { UserResponses as UserResponsesType } from '../types/response';
import { Loader2 } from 'lucide-react';
import ResponseStats from '../components/responses/ResponseStats';
import ResponseFilters from '../components/responses/ResponseFilters';
import ResponseTable from '../components/responses/ResponseTable';
import { useResponseFilters } from '../hooks/useResponseFilters';

export default function UserResponsesPage() {
  const [responses, setResponses] = useState<UserResponsesType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await getUserResponses();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setError('Failed to load responses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const { categories, getTopicsForCategory, getStats } = useResponseFilters(responses?.responses || []);
  const topics = selectedCategory ? getTopicsForCategory(selectedCategory) : [];

  const filteredResponses = (responses?.responses || []).filter(response => {
    const matchesCategory = !selectedCategory || response.question.section === selectedCategory;
    const matchesTopic = !selectedTopic || response.question.topic === selectedTopic;
    const matchesSource = !selectedSource || response.question.source === selectedSource;
    return matchesCategory && matchesTopic && matchesSource;
  });

  const stats = getStats(filteredResponses);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!responses || responses.responses.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">You haven't attempted any questions yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Responses</h1>
      </div>

      <ResponseFilters
        categories={categories}
        topics={topics}
        sources={[]} // Add sources if needed
        selectedCategory={selectedCategory}
        selectedTopic={selectedTopic}
        selectedSource={selectedSource}
        onCategoryChange={setSelectedCategory}
        onTopicChange={setSelectedTopic}
        onSourceChange={setSelectedSource}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <ResponseStats
        totalQuestions={stats.totalQuestions}
        correctAnswers={stats.correctAnswers}
        accuracy={stats.accuracy}
        averageTime={stats.averageTime}
        categoryStats={stats.categoryStats}
        formatTime={formatTime}
      />

      <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredResponses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No responses match the selected filters
          </div>
        ) : (
          <ResponseTable 
            responses={filteredResponses} 
            formatTime={formatTime} 
          />
        )}
      </div>
    </div>
  );
}