import { logger } from '@/utils/logger';

const BASE_URL = 'https://stageapi.aspirantsclub.in/api';

export interface ResponseData {
  id: string;
  userid: string;
  user: {
    id: string;
    userType: string;
    username: string;
    name: string;
    role: string;
    mobile: string;
    emailId: string;
  };
  responses: {
    question: {
      id: string;
      section: string;
      topic: string;
      source: string;
      questionText: string;
      correctAnswer: string;
    };
    time: number;
    response: boolean;
  }[];
}

export async function fetchResponses(): Promise<ResponseData> {
  try {
    const url = `${BASE_URL}/getResponses`;
    logger.info(`Fetching responses from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const data = await response.json();
    logger.info('Responses fetched successfully');
    
    return data;
  } catch (error) {
    logger.error('Error fetching responses', error);
    throw error;
  }
}