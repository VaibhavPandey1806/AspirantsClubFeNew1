import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { Post, Reply } from '../types/forum';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Get all posts
export const getPosts = async () => {
  const response = await api.get('/api/posts');
  return response.data;
};

// Get post by ID
export const getPostById = async (id: string) => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

// Create new post
export const createPost = async (data: { title: string; content: string }) => {
  const response = await api.post('/api/posts', data);
  return response.data;
};

// Like a post
export const likePost = async (postId: string) => {
  const response = await api.post(`/api/posts/${postId}/like`);
  return response.data;
};

// Dislike a post
export const dislikePost = async (postId: string) => {
  const response = await api.post(`/api/posts/${postId}/dislike`);
  return response.data;
};

// Get reply by ID
export const getReply = async (id: string) => {
  const response = await api.get(`/api/replies/${id}`);
  return response.data;
};

// Add reply to post
export const addReply = async (postId: string, data: { content: string }) => {
  const response = await api.post(`/api/posts/${postId}/replies`, data);
  return response.data;
};

// Like/Unlike reply
export const likeReply = async (replyId: string) => {
  const response = await api.post(`/api/replies/${replyId}/like`);
  return response.data;
};

// Dislike/Undislike reply
export const dislikeReply = async (replyId: string) => {
  const response = await api.post(`/api/replies/${replyId}/dislike`);
  return response.data;
};