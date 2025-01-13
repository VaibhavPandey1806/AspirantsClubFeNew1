import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getTopics = () => api.get('/api/topics');
export const getTopicsByCategory = (categoryId: string) =>
  api.get(`/api/getTopicsByCategory?categoryId=${categoryId}`);