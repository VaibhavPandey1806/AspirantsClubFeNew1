import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from './AuthButtons';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
  isAdmin?: boolean;
  onLogout: () => void;
}

export default function Header({ isLoggedIn, userName, isAdmin, onLogout }: HeaderProps) {
  return (
    <header className="bg-blue-900 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation className="hidden md:flex" />
          <AuthButtons 
            isLoggedIn={isLoggedIn} 
            userName={userName} 
            isAdmin={isAdmin}
            onLogout={onLogout}
            className="hidden md:flex"
          />
          <MobileMenu 
            isLoggedIn={isLoggedIn} 
            userName={userName} 
            isAdmin={isAdmin}
            onLogout={onLogout} 
          />
        </div>
      </div>
    </header>
  );
}