import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getCategories = () => api.get('/api/categories');
export const getCategoryDetail = (categoryId: string) => 
  api.get(`/api/categoryDetail?categoryId=${categoryId}`);