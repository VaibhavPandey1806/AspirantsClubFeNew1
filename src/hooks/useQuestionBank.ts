import { useState, useEffect } from 'react';
import { 
  getCategories, 
  getSources, 
  getTopicsByCategory,
  getQuestionsByFilters
} from '../api';
import type { Category, Topic, Source } from '../types/question';

export function useQuestionBank() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data (categories and sources)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, sourcesRes] = await Promise.all([
          getCategories(),
          getSources()
        ]);
        
        setCategories(categoriesRes.data);
        setSources(sourcesRes.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to load initial data');
        setCategories([]);
        setSources([]);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch topics when categories change
  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCategories.length === 0) {
        setTopics([]);
        return;
      }

      try {
        const topicsPromises = selectedCategories.map(categoryId => 
          getTopicsByCategory(categoryId)
        );
        const responses = await Promise.all(topicsPromises);
        const allTopics = responses.flatMap(response => response.data);
        setTopics(allTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setError('Failed to load topics');
        setTopics([]);
      }
    };

    fetchTopics();
  }, [selectedCategories]);

  const handleSearch = async () => {
    if (selectedCategories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await getQuestionsByFilters({
        category: selectedCategories,
        topic: selectedTopics.length > 0 ? selectedTopics : undefined,
        source: selectedSources.length > 0 ? selectedSources : undefined
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleSearch
  };
}