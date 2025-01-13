import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import Avatar from '../Avatar';
import type { User } from '../../types/user';

interface UserDetailsProps {
  user: User;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-6">
        <Avatar name={user.name} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.emailId && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={18} />
            <span>{user.emailId}</span>
          </div>
        )}
        {user.mobile && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} />
            <span>{user.mobile}</span>
          </div>
        )}
      </div>
    </div>
  );
}