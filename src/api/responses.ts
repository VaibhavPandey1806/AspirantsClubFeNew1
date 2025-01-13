import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { ResponseSubmission } from '../types/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const submitResponse = (data: ResponseSubmission) => 
  api.get('/api/addResponse', { params: data });
export const getUserResponses = () => api.get('/api/getResponses');