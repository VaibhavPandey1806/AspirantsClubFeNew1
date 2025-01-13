import axios from 'axios';
import { API_BASE_URL } from './constants';
import type { LoginCredentials, AuthResponse } from '../types/auth';
import { checkLoginStatus } from './api';

export const performLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    // Perform login
    await axios.post(
      `${API_BASE_URL}/perform-login`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        },
        withCredentials: true
      }
    );

    // Check login status
    const { data: isLoggedIn } = await checkLoginStatus();
    
    if (!isLoggedIn) {
      throw new Error('Invalid credentials');
    }

    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.status === 401 
        ? 'Invalid username or password'
        : error.response?.data?.message || 'Login failed. Please try again.'
    };
  }
};