import React, { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, User as UserIcon, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOGOUT_URL } from '../utils/constants';

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

export default function Header({ isLoggedIn, userName, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      window.location.href = '/register';
    }
  };

  return (
    <header className="bg-white shadow-md relative z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Aspirants Club
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/submit-question" className="text-gray-600 hover:text-indigo-600">
              Submit Question
            </Link>
            <Link to="/question-bank" className="text-gray-600 hover:text-indigo-600">
              Question Bank
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">
              About Us
            </Link>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                >
                  <span>{userName}</span>
                  <ChevronDown size={20} />
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      <UserIcon size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/responses"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      <ClipboardList size={16} className="mr-2" />
                      My Responses
                    </Link>
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-indigo-50"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleAuthClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-white">
            <Link
              to="/submit-question"
              className="block text-gray-600 hover:text-indigo-600"
            >
              Submit Question
            </Link>
            <Link
              to="/question-bank"
              className="block text-gray-600 hover:text-indigo-600"
            >
              Question Bank
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 hover:text-indigo-600"
            >
              About Us
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-600 hover:text-indigo-600"
                >
                  Profile
                </Link>
                <Link
                  to="/responses"
                  className="block text-gray-600 hover:text-indigo-600"
                >
                  My Responses
                </Link>
                <button
                  onClick={onLogout}
                  className="block text-gray-600 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleAuthClick}
                className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
              >
                Login / Register
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}