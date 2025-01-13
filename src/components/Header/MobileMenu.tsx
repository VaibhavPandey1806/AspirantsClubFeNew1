import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MobileMenuProps {
  isLoggedIn: boolean;
  userName?: string;
  isAdmin?: boolean;
  onLogout: () => void;
}

export default function MobileMenu({ 
  isLoggedIn, 
  userName, 
  isAdmin,
  onLogout 
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT US', path: '/about' },
    { label: 'SUBMIT QUESTION', path: '/submit-question' },
    { label: 'QUESTION BANKS', path: '/question-bank' },
    { label: 'FREE RESOURCES', path: '/resources' },
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2 hover:bg-blue-800 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-900 shadow-lg z-50">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleClose}
                  className={`text-white hover:text-blue-100 transition-colors py-2 ${
                    location.pathname === item.path ? 'text-blue-100' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 text-white py-2">
                    <User size={20} />
                    <span>{userName}</span>
                  </div>
                  <Link to="/profile" onClick={handleClose} className="text-white hover:text-blue-100 py-2">
                    Profile
                  </Link>
                  <Link to="/responses" onClick={handleClose} className="text-white hover:text-blue-100 py-2">
                    My Responses
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={handleClose} className="text-white hover:text-blue-100 py-2">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      onLogout();
                      handleClose();
                    }}
                    className="flex items-center gap-2 text-white hover:text-blue-100 py-2 w-full text-left"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  onClick={handleClose}
                  className="bg-white text-blue-900 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors font-medium w-full text-center"
                >
                  LOGIN / REGISTER
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}