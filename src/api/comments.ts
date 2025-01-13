import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getCommentById = (id: string) => api.get(`/api/getCommentsbyId?id=${id}`);
export const addComment = (questionId: string, text: string) => 
  api.post('/api/addComment', null, { params: { questionId, text } });
export const addReply = (commentId: string, text: string) => 
  api.post('/api/addReply', null, { params: { commentId, text } });
export const likeComment = (id: string) => api.post('/api/likeComment', null, { params: { id } });
export const unlikeComment = (id: string) => api.post('/api/unlikeComment', null, { params: { id } });
export const dislikeComment = (id: string) => api.post('/api/dislikeComment', null, { params: { id } });