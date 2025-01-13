import React from 'react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-900 to-indigo-800 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Welcome to Aspirants Club, a space built by dreamers, for dreamers.
          </p>
        </div>
      </div>
    </div>
  );
}