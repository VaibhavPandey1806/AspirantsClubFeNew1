import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'FORUM', path: '/forum' },
  { label: 'SUBMIT QUESTION', path: '/submit-question' },
  { label: 'QUESTION BANKS', path: '/question-bank' },
  { label: 'FREE RESOURCES', path: '/resources' },
];

export default function Navigation({ className = '' }: NavigationProps) {
  const location = useLocation();

  return (
    <nav className={`items-center space-x-8 ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`text-white hover:text-blue-100 transition-colors font-medium ${
            location.pathname === item.path ? 'text-blue-100' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}