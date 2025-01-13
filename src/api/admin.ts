import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { User } from '../types/user';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getUsers = () => 
  api.get<User[]>('/api/getUsers').then(response => ({
    ...response,
    data: response.data.map(user => ({
      id: user.id,
      username: user.username,
      name: user.Name,
      role: user.Role,
      emailId: user.EmailId,
      mobile: user.Mobile
    }))
  }));