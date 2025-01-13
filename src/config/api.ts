// Update API base URL to match your Spring Boot server
export const API_BASE_URL = 'http://localhost:8086';

export const API_CONFIG = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
};