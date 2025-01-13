import React from 'react';
import { Star } from 'lucide-react';

export default function TrustBadge() {
  return (
    <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
      ))}
      <span className="text-gray-800 font-semibold ml-2">20,000+ TRUST CUSTOMER</span>
    </div>
  );
}