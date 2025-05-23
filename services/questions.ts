import { Category, Source, Topic, Question, Comment, User } from '@/types/api';
import { logger } from '@/utils/logger';

const BASE_URL = 'https://stageapi.aspirantsclub.in/api';

export async function fetchCategories(): Promise<Category[]> {
  try {
    const url = `${BASE_URL}/categories`;
    logger.info(`Fetching categories from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Categories response:', data);
    
    // Handle array response
    const categories = Array.isArray(data) ? data : [data];
    
    // Filter enabled categories
    const enabledCategories = categories.filter(category => category.enabled === true);
    
    logger.info('Filtered enabled categories:', enabledCategories);
    return enabledCategories;
  } catch (error) {
    logger.error('Error fetching categories', error);
    throw error;
  }
}

export async function fetchSources(): Promise<Source[]> {
  try {
    const url = `${BASE_URL}/sources`;
    logger.info(`Fetching sources from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Sources response:', data);
    
    // Handle array response
    const sources = Array.isArray(data) ? data : [data];
    return sources.filter(source => source.enabled === true);
  } catch (error) {
    logger.error('Error fetching sources', error);
    throw error;
  }
}

export async function fetchTopicsByCategory(categoryId: string): Promise<Topic[]> {
  try {
    const url = `${BASE_URL}/getTopicsByCategory?categoryId=${categoryId}`;
    logger.info(`Fetching topics for category ${categoryId} from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Topics response:', data);
    
    // Handle array response
    const topics = Array.isArray(data) ? data : [data];
    return topics.filter(topic => topic.enabled === true);
  } catch (error) {
    logger.error('Error fetching topics', error);
    throw error;
  }
}

export async function fetchQuestionsByFilters(
  categories?: string[],
  topics?: string[],
  sources?: string[]
): Promise<Question[]> {
  try {
    const params = new URLSearchParams();
    if (categories?.length) params.append('category', categories.join(','));
    if (topics?.length) params.append('topic', topics.join(','));
    if (sources?.length) params.append('source', sources.join(','));

    const url = `${BASE_URL}/getQuestionsByFilters?${params.toString()}`;
    logger.info(`Fetching questions with filters from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Questions response:', data);
    
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    logger.error('Error fetching questions', error);
    throw error;
  }
}

export async function fetchQuestionById(id: string): Promise<Question> {
  try {
    const url = `${BASE_URL}/getQuestionsbyId?id=${id}`;
    logger.info(`Fetching question details from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Question details response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching question details', error);
    throw error;
  }
}

export async function submitAnswer(
  timer: number,
  questionId: string,
  response: boolean
): Promise<string> {
  try {
    const url = `${BASE_URL}/addResponse?userId=0000&timer=${timer}&questionId=${questionId}&response=${response}`;
    logger.info(`Submitting answer to ${url}`);
    
    const result = await fetch(url);
    if (!result.ok) {
      const error = `API request failed with status ${result.status}`;
      logger.error(error, { status: result.status });
      throw new Error(error);
    }
    
    const data = await result.text();
    logger.info('Answer submission response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error submitting answer', error);
    throw error;
  }
}

export async function fetchCommentById(id: string): Promise<Comment> {
  try {
    const url = `${BASE_URL}/getCommentsbyId?id=${id}`;
    logger.info(`Fetching comment details from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Comment details response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching comment details', error);
    throw error;
  }
}

export async function fetchUserById(id: string): Promise<User> {
  try {
    const url = `${BASE_URL}/getUserDetails?id=${id}`;
    logger.info(`Fetching user details from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('User details response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching user details', error);
    throw error;
  }
}

export async function likeComment(commentId: string): Promise<Comment> {
  try {
    const url = `${BASE_URL}/likeComment?id=${commentId}`;
    logger.info(`Liking comment at ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Like comment response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error liking comment', error);
    throw error;
  }
}

export async function dislikeComment(commentId: string): Promise<Comment> {
  try {
    const url = `${BASE_URL}/dislikeComment?id=${commentId}`;
    logger.info(`Disliking comment at ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Dislike comment response:', data);
    
    return data;
  } catch (error) {
    logger.error('Error disliking comment', error);
    throw error;
  }
}