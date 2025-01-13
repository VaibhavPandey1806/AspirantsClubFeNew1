import React from 'react';
import LoginHeader from '../components/Login/LoginHeader';
import LoginForm from '../components/Login/LoginForm';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { 
    credentials, 
    error, 
    isLoading, 
    handleSubmit, 
    handleInputChange 
  } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <LoginHeader />
        <LoginForm
          credentials={credentials}
          error={error}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}