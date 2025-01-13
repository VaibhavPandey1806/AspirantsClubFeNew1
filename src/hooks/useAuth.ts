import { useState } from 'react';
import { Alert } from 'react-native';
import { performLogin } from '../services/auth';

export function useAuth() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await performLogin(credentials);
      
      if (response.success) {
        // Handle successful login
        // You might want to store the auth token and navigate to the home screen
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (error: any) {
      setError('An unexpected error occurred');
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    credentials,
    isLoading,
    error,
    handleInputChange,
    handleSubmit
  };
}