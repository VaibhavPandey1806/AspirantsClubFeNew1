import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { User } from '../types/user';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    // Return a default user object if fetch fails
    return {
      id,
      username: 'Unknown User',
      name: 'Unknown User',
    };
  }
};