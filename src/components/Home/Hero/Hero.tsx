import React from 'react';
import { Bot } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-blue-900 py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Your MBA Preparation
            <span className="block text-yellow-400">Starts Here</span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the largest community of MBA aspirants. Practice questions, get AI-powered explanations, 
            and learn from peers - all in one place.
          </p>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-blue-900">
            <Bot className="w-6 h-6" />
            <span className="font-medium">Powered by Advanced AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}