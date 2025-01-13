import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface ProfileStats {
  submittedQuestions: number;
  answeredQuestions: number;
  isLoading: boolean;
  error: string | null;
}

export function useProfileStats() {
  const [stats, setStats] = useState<ProfileStats>({
    submittedQuestions: 0,
    answeredQuestions: 0,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [submittedRes, answeredRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/getSubmittedBy`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/api/getAnswered`, { withCredentials: true })
        ]);

        setStats({
          submittedQuestions: submittedRes.data,
          answeredQuestions: answeredRes.data,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching profile stats:', error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load activity statistics'
        }));
      }
    };

    fetchStats();
  }, []);

  return stats;
}