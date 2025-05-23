import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Category, Topic, Source, Question } from '@/types/api';
import { 
  fetchCategories, 
  fetchTopicsByCategory, 
  fetchSources, 
  fetchQuestionsByFilters,
  fetchQuestionById
} from '@/services/questions';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import ErrorDisplay from '@/components/ErrorDisplay';
import LoadingIndicator from '@/components/LoadingIndicator';
import QuestionDetailCard from '@/components/QuestionDetailCard';
import { COLORS } from '@/constants/colors';
import { BookOpen, Library, ListTodo, Search } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function QuestionsScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSources, setSelectedSources] = useState<Source[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [categoriesData, sourcesData] = await Promise.all([
        fetchCategories(),
        fetchSources()
      ]);
      setCategories(categoriesData);
      setSources(sourcesData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = async (category: Category) => {
    try {
      const isSelected = selectedCategories.some(c => c.id === category.id);
      if (isSelected) {
        setSelectedCategories(prev => prev.filter(c => c.id !== category.id));
      } else {
        setSelectedCategories(prev => [...prev, category]);
      }
      
      setLoading(true);
      setError(null);
      const topicsData = await fetchTopicsByCategory(category.id);
      setTopics(prev => [...prev, ...topicsData]);
    } catch (err) {
      setError('Failed to load topics. Please try again.');
      console.error('Error loading topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSourcePress = (source: Source) => {
    const isSelected = selectedSources.some(s => s.id === source.id);
    if (isSelected) {
      setSelectedSources(prev => prev.filter(s => s.id !== source.id));
    } else {
      setSelectedSources(prev => [...prev, source]);
    }
  };

  const handleTopicPress = (topic: Topic) => {
    const isSelected = selectedTopics.some(t => t.id === topic.id);
    if (isSelected) {
      setSelectedTopics(prev => prev.filter(t => t.id !== topic.id));
    } else {
      setSelectedTopics(prev => [...prev, topic]);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const questions = await fetchQuestionsByFilters(
        selectedCategories.map(c => c.id),
        selectedTopics.map(t => t.id),
        selectedSources.map(s => s.id)
      );
      setQuestions(questions);
      setShowQuestions(true);
    } catch (err) {
      setError('Failed to fetch questions. Please try again.');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionPress = async (question: Question) => {
    try {
      setLoading(true);
      setError(null);
      const questionDetails = await fetchQuestionById(question.id);
      setSelectedQuestion(questionDetails);
      setSelectedAnswer(null);
    } catch (err) {
      setError('Failed to load question details. Please try again.');
      console.error('Error loading question details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const renderCategory = ({ item, index }: { item: Category; index: number }) => (
    <CategoryCard
      category={item}
      index={index}
      onPress={handleCategoryPress}
      isSelected={selectedCategories.some(c => c.id === item.id)}
    />
  );

  const renderSource = ({ item, index }: { item: Source; index: number }) => {
    const isSelected = selectedSources.some(s => s.id === item.id);
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 100)}
        style={styles.sourceCard}
      >
        <TouchableOpacity
          style={[styles.sourceContent, isSelected && styles.selectedCard]}
          activeOpacity={0.7}
          onPress={() => handleSourcePress(item)}
        >
          <View style={[styles.sourceIconContainer, isSelected && styles.selectedIconContainer]}>
            <Library size={24} color={isSelected ? COLORS.white : COLORS.primary} />
          </View>
          <Text style={[styles.sourceName, isSelected && styles.selectedText]}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderTopic = ({ item, index }: { item: Topic; index: number }) => {
    const isSelected = selectedTopics.some(t => t.id === item.id);
    return (
      <Animated.View 
        entering={FadeInDown.delay(index * 100)}
        style={styles.topicCard}
      >
        <TouchableOpacity
          style={[styles.topicContent, isSelected && styles.selectedCard]}
          activeOpacity={0.7}
          onPress={() => handleTopicPress(item)}
        >
          <View style={[styles.topicIconContainer, isSelected && styles.selectedIconContainer]}>
            <ListTodo size={24} color={isSelected ? COLORS.white : COLORS.primary} />
          </View>
          <View style={styles.topicTextContainer}>
            <Text style={[styles.topicName, isSelected && styles.selectedText]}>{item.name}</Text>
            {item.details && (
              <Text style={[styles.topicDetails, isSelected && styles.selectedText]} numberOfLines={2}>
                {item.details}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)}
      style={styles.questionCard}
    >
      <TouchableOpacity
        style={styles.questionContent}
        onPress={() => handleQuestionPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.tags}>
          <View style={[styles.tag, { backgroundColor: `${COLORS.primary}15` }]}>
            <BookOpen size={16} color={COLORS.primary} />
            <Text style={[styles.tagText, { color: COLORS.primary }]}>{item.section}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${COLORS.secondary}15` }]}>
            <ListTodo size={16} color={COLORS.secondary} />
            <Text style={[styles.tagText, { color: COLORS.secondary }]}>{item.topic}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: `${COLORS.accent}15` }]}>
            <Library size={16} color={COLORS.accent} />
            <Text style={[styles.tagText, { color: COLORS.accent }]}>{item.source}</Text>
          </View>
        </View>
        <Text style={styles.questionText} numberOfLines={3}>
          {item.questionText}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Questions" />
        <LoadingIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Questions" />
        <ErrorDisplay message={error} onRetry={loadInitialData} />
      </View>
    );
  }

  if (selectedQuestion) {
    return (
      <View style={styles.container}>
        <Header title="Question Detail" />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedQuestion(null)}
        >
          <Text style={styles.backButtonText}>← Back to Questions</Text>
        </TouchableOpacity>
        <QuestionDetailCard
          question={selectedQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={handleAnswerSelect}
        />
      </View>
    );
  }

  if (showQuestions) {
    return (
      <View style={styles.container}>
        <Header title="Questions" />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowQuestions(false)}
          >
            <Text style={styles.backButtonText}>← Back to Filters</Text>
          </TouchableOpacity>
          
          {questions.length === 0 ? (
            <Text style={styles.noDataText}>No questions found for the selected filters</Text>
          ) : (
            <FlatList
              data={questions}
              renderItem={renderQuestion}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.questionsList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Questions" />
      
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          {categories.length === 0 ? (
            <Text style={styles.noDataText}>No categories available</Text>
          ) : (
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Library size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Sources</Text>
          </View>
          {sources.length === 0 ? (
            <Text style={styles.noDataText}>No sources available</Text>
          ) : (
            <FlatList
              data={sources}
              renderItem={renderSource}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sourcesList}
            />
          )}
        </View>

        {topics.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ListTodo size={24} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>Topics</Text>
            </View>
            <View style={styles.topicsList}>
              {topics.map((topic, index) => (
                <View key={topic.id}>
                  {renderTopic({ item: topic, index })}
                </View>
              ))}
            </View>
          </View>
        )}

        {(selectedCategories.length > 0 || selectedSources.length > 0 || selectedTopics.length > 0) && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Search size={20} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Search Questions</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: COLORS.text,
    marginLeft: 8,
  },
  categoriesList: {
    paddingRight: 16,
  },
  sourcesList: {
    paddingRight: 16,
  },
  topicsList: {
    gap: 12,
  },
  sourceCard: {
    marginRight: 12,
  },
  sourceContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 120,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sourceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    textAlign: 'center',
  },
  topicCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${COLORS.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicTextContainer: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
    marginBottom: 4,
  },
  topicDetails: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
  },
  selectedCard: {
    backgroundColor: COLORS.primary,
  },
  selectedIconContainer: {
    backgroundColor: `${COLORS.white}20`,
  },
  selectedText: {
    color: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  questionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionContent: {
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.text,
  },
  questionsList: {
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: 8,
  },
  backButton: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: COLORS.primary,
  },
});