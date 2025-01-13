import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CountryCodeSelectorProps {
  disabled?: boolean;
}

export default function CountryCodeSelector({ disabled }: CountryCodeSelectorProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setShowTooltip(true)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 bg-gray-50 rounded-l-md text-sm text-gray-700"
      >
        +91
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {showTooltip && (
        <div className="absolute left-0 top-full mt-1 p-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 w-64">
          <p className="text-sm text-gray-600">
            Currently, we only support Indian phone numbers (+91).
          </p>
        </div>
      )}
    </div>
  );
}