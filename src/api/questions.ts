import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { QuestionSubmission } from '../types/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const submitQuestion = async (data: QuestionSubmission) => {
  return api.post('/api/addQuestion', data);
};

export const getSubmittedQuestions = () => 
  api.get('/api/getSubmittedQuestions');