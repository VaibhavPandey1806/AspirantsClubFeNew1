import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-blue-900 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Welcome to Aspirants Club!
            </h2>
            <div className="bg-white rounded-3xl p-6 md:p-8 mt-6">
              <p className="text-lg md:text-xl text-blue-900">
                Make your entrance exam prep more effective with free resources,
                smart tools like timers and error logs, and a community of learners
                just like you - all in one place.
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl text-orange-500 font-semibold">
                community of learners
              </div>
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Students studying together"
                  className="rounded-lg w-full"
                />
                <div className="absolute top-1/2 right-4 transform translate-y-[-50%]">
                  <div className="bg-white p-4 rounded-full shadow-lg">
                    <svg
                      className="w-8 h-8 text-blue-900"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}