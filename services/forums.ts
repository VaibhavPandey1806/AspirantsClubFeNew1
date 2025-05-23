import { Forum, ForumPost } from '@/types/api';
import { logger } from '@/utils/logger';

const BASE_URL = 'https://stageapi.aspirantsclub.in/api';

export async function fetchForums(): Promise<Forum[]> {
  try {
    const url = `${BASE_URL}/forum/getForums`;
    logger.info(`Fetching forums from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Forums fetched successfully', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching forums', error);
    throw error;
  }
}

export async function fetchForumPosts(forumId: string): Promise<ForumPost[]> {
  try {
    const url = `${BASE_URL}/forum/getPostsbyForumId/${forumId}`;
    logger.info(`Fetching forum posts from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Forum posts fetched successfully', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching forum posts', error);
    throw error;
  }
}

export async function fetchPostById(postId: string): Promise<ForumPost> {
  try {
    const url = `${BASE_URL}/forum/posts/${postId}`;
    logger.info(`Fetching post details from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Post details fetched successfully', data);
    
    return data;
  } catch (error) {
    logger.error('Error fetching post details', error);
    throw error;
  }
}