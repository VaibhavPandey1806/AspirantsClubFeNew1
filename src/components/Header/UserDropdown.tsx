import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut, ClipboardList, FileText } from 'lucide-react';

interface UserDropdownProps {
  userName: string;
  isAdmin?: boolean;
  onLogout: () => void;
}

export default function UserDropdown({ userName, isAdmin, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-blue-100"
      >
        <span>{userName}</span>
        <ChevronDown size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} className="mr-2" />
            Profile
          </Link>
          
          <Link
            to="/responses"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
            onClick={() => setIsOpen(false)}
          >
            <ClipboardList size={16} className="mr-2" />
            My Responses
          </Link>

          <Link
            to="/submitted-questions"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
            onClick={() => setIsOpen(false)}
          >
            <FileText size={16} className="mr-2" />
            Submitted Questions
          </Link>
          
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} className="mr-2" />
              Admin Dashboard
            </Link>
          )}
          
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-indigo-50"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}