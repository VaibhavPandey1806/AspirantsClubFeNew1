import { UserDto } from '@/types/user';
import { logger } from '@/utils/logger';

const API_URL = 'https://stageapi.aspirantsclub.in/api/userDetails';

export async function fetchUserDetails(): Promise<UserDto> {
  try {
    logger.info(`Fetching user details from ${API_URL}`);
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      const error = `API request failed with status ${response.status}`;
      logger.error(error, { status: response.status });
      throw new Error(error);
    }
    
    const jsonData = await response.json();
    logger.info('User details fetched successfully', jsonData);
    
    return jsonData as UserDto;
  } catch (error) {
    logger.error('Error fetching user details', error);
    throw error;
  }
}