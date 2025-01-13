import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import { User } from '../types/user';
import Avatar from '../components/Avatar';
import { useProfileStats } from '../hooks/useProfileStats';
import { MessageSquare, PenSquare, CheckCircle } from 'lucide-react';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { submittedQuestions, answeredQuestions, isLoading: isLoadingStats, error: statsError } = useProfileStats();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await getUserDetails();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Unable to load user profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar name={user.name} size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            {user.emailId && (
              <p className="text-gray-600 mt-1">{user.emailId}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>
              
              {user.mobile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <p className="mt-1 text-lg text-gray-900">{user.mobile}</p>
                </div>
              )}
              
              {user.emailId && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user.emailId}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h2>
            {statsError ? (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                {statsError}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-indigo-600">
                        {isLoadingStats ? '-' : submittedQuestions}
                      </p>
                      <p className="text-sm text-indigo-700 mt-1">Questions Submitted</p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <PenSquare className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {isLoadingStats ? '-' : answeredQuestions}
                      </p>
                      <p className="text-sm text-green-700 mt-1">Questions Answered</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">0</p>
                      <p className="text-sm text-purple-700 mt-1">Comments Made</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <MessageSquare className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}