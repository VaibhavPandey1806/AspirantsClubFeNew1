import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { LOGIN_URL } from '../../utils/constants';
import { Star } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Star className="w-8 h-8 text-blue-600" fill="currentColor" />
              <Star className="w-8 h-8 text-blue-600 absolute top-1 left-1 opacity-50" fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-blue-900">Aspirants Club</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <a href={LOGIN_URL} className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}