// Auth URLs
export const LOGIN_URL = 'http://localhost:8086/login';
export const LOGOUT_URL = 'http://localhost:8086/logout';

// API Base URL
export const API_BASE_URL = 'http://localhost:8086';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORUM: '/forum',
  QUESTION_BANK: '/question-bank',
  SUBMIT_QUESTION: '/submit-question',
  PROFILE: '/profile'
} as const;