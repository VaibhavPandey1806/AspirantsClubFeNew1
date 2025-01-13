import React from 'react';

export default function HeroContent() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
        Welcome to Aspirants Club!
      </h1>
      
      <div className="bg-white rounded-3xl p-6 md:p-8 mt-6">
        <p className="text-lg md:text-xl text-blue-900">
          Make your entrance exam prep more effective with free resources,
          smart tools like timers and error logs, and a community of learners
          just like you - all in one place.
        </p>
      </div>
    </div>
  );
}