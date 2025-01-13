import React from 'react';
import { Calendar } from 'lucide-react';
import Avatar from '../Avatar';
import type { User } from '../../types/user';

interface AuthorCardProps {
  author: User | null;
  date: string;
  className?: string;
}

export default function AuthorCard({ author, date, className = '' }: AuthorCardProps) {
  if (!author) return null;

  const formatDate = (dateString: string) => {
    try {
      // Handle the specific date format from the API (2024-12-26T08:22:41.623)
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error('Invalid date string:', dateString);
        return 'Date unavailable';
      }

      // Format the date
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };

      return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Avatar name={author.name} size="sm" />
      <div>
        <p className="font-medium text-gray-900">{author.name}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={14} />
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
  );
}