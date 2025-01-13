import { useMemo } from 'react';
import type { UserResponse } from '../types/response';

export function useResponseFilters(responses: UserResponse[]) {
  // Extract unique categories from user responses
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(
      responses.map(r => r.question.section)
    ));
    return uniqueCategories.map(name => ({ id: name, name }));
  }, [responses]);

  // Extract unique topics based on selected category
  const getTopicsForCategory = (category: string) => {
    const uniqueTopics = Array.from(new Set(
      responses
        .filter(r => r.question.section === category)
        .map(r => r.question.topic)
    ));
    return uniqueTopics.map(name => ({ id: name, name }));
  };

  // Calculate stats for the filtered responses
  const getStats = (filteredResponses: UserResponse[]) => {
    const totalQuestions = filteredResponses.length;
    const correctAnswers = filteredResponses.filter(r => r.response).length;
    const averageTime = totalQuestions > 0
      ? Math.round(filteredResponses.reduce((acc, r) => acc + r.time, 0) / totalQuestions)
      : 0;
    
    const categoryStats = categories.map(category => {
      const categoryResponses = filteredResponses.filter(r => r.question.section === category.name);
      const correct = categoryResponses.filter(r => r.response).length;
      const total = categoryResponses.length;
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
      
      return {
        name: category.name,
        total,
        correct,
        accuracy,
        averageTime: total > 0
          ? Math.round(categoryResponses.reduce((acc, r) => acc + r.time, 0) / total)
          : 0
      };
    }).filter(stat => stat.total > 0);

    return {
      totalQuestions,
      correctAnswers,
      accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
      averageTime,
      categoryStats
    };
  };

  return {
    categories,
    getTopicsForCategory,
    getStats
  };
}