import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getAIOpinion = (id: string) => 
  api.get(`/api/AiResponseQuestionsbyId?id=${id}`);