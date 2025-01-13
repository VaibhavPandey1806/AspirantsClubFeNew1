import React from 'react';
import { Star } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Star className="w-8 h-8 text-orange-500" fill="currentColor" />
        <Star className="w-8 h-8 text-orange-500 absolute top-1 left-1 opacity-50" fill="currentColor" />
      </div>
      <span className="text-2xl font-bold text-white">Aspirants Club</span>
    </div>
  );
}