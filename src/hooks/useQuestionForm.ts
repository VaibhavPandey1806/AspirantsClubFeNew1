import { useState, useEffect } from 'react';
import { getCategories, getSources, getTopics } from '../api';
import { submitQuestion } from '../api/questions';
import type { Category, Topic, Source } from '../types/question';
import type { QuestionSubmission } from '../types/api';

interface FormData {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  section?: string;
  sectionId?: string;
  topic?: string;
  topicId?: string;
  source?: string;
  sourceId?: string;
}

export function useQuestionForm() {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  });

  // Metadata state
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);

  // Selection state
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);

  // New item state
  const [newCategory, setNewCategory] = useState<string>('');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newSource, setNewSource] = useState<string>('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, sourcesRes, topicsRes] = await Promise.all([
          getCategories(),
          getSources(),
          getTopics()
        ]);

        setCategories(categoriesRes.data);
        setSources(sourcesRes.data);
        setTopics(topicsRes.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setError('Failed to load form data');
      }
    };

    fetchData();
  }, []);

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!categoryId) {
      setSelectedCategory(null);
      setFormData(prev => ({
        ...prev,
        sectionId: undefined,
        section: newCategory || undefined
      }));
      return;
    }

    const category = categories.find(c => c.id === categoryId);
    setSelectedCategory(category || null);
    setNewCategory('');
    setFormData(prev => ({
      ...prev,
      sectionId: categoryId,
      section: category?.name
    }));
  };

  const handleTopicSelect = (topicId: string) => {
    if (!topicId) {
      setSelectedTopic(null);
      setFormData(prev => ({
        ...prev,
        topicId: undefined,
        topic: newTopic || undefined
      }));
      return;
    }

    const topic = topics.find(t => t.id === topicId);
    setSelectedTopic(topic || null);
    setNewTopic('');
    setFormData(prev => ({
      ...prev,
      topicId,
      topic: topic?.name
    }));
  };

  const handleSourceSelect = (sourceId: string) => {
    if (!sourceId) {
      setSelectedSource(null);
      setFormData(prev => ({
        ...prev,
        sourceId: undefined,
        source: newSource || undefined
      }));
      return;
    }

    const source = sources.find(s => s.id === sourceId);
    setSelectedSource(source || null);
    setNewSource('');
    setFormData(prev => ({
      ...prev,
      sourceId,
      source: source?.name
    }));
  };

  // New item handlers
  const handleAddNewCategory = (name: string) => {
    setNewCategory(name);
    setSelectedCategory(null);
    setFormData(prev => ({
      ...prev,
      section: name,
      sectionId: undefined
    }));
  };

  const handleAddNewTopic = (name: string) => {
    setNewTopic(name);
    setSelectedTopic(null);
    setFormData(prev => ({
      ...prev,
      topic: name,
      topicId: undefined
    }));
  };

  const handleAddNewSource = (name: string) => {
    setNewSource(name);
    setSelectedSource(null);
    setFormData(prev => ({
      ...prev,
      source: name,
      sourceId: undefined
    }));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate selections
    if (!selectedCategory?.id && !newCategory) {
      setError('Please select or add a category');
      return false;
    }
    if (!selectedTopic?.id && !newTopic) {
      setError('Please select or add a topic');
      return false;
    }
    if (!selectedSource?.id && !newSource) {
      setError('Please select or add a source');
      return false;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const submissionData: QuestionSubmission = {
        ...formData,
        section: selectedCategory?.name || newCategory,
        sectionId: selectedCategory?.id,
        topic: selectedTopic?.name || newTopic,
        topicId: selectedTopic?.id,
        source: selectedSource?.name || newSource,
        sourceId: selectedSource?.id
      };

      await submitQuestion(submissionData);
      resetForm();
      return true;
    } catch (error: any) {
      console.error('Error submitting question:', error);
      setError('Failed to submit question. Please try again.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    });
    setSelectedCategory(null);
    setSelectedTopic(null);
    setSelectedSource(null);
    setNewCategory('');
    setNewTopic('');
    setNewSource('');
  };

  return {
    // Form state
    formData,
    categories,
    topics,
    sources,
    selectedCategory,
    selectedTopic,
    selectedSource,
    newCategory,
    newTopic,
    newSource,
    isSubmitting,
    error,
    // Handlers
    handleInputChange,
    handleCategorySelect,
    handleTopicSelect,
    handleSourceSelect,
    handleAddNewCategory,
    handleAddNewTopic,
    handleAddNewSource,
    handleSubmit,
    // Actions
    setIsSubmitting,
    setError,
    resetForm
  };
}