import React from 'react';

interface FeatureIconProps {
  icon: React.ReactNode;
  label: string;
}

export default function FeatureIcon({ icon, label }: FeatureIconProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center justify-center w-24 h-24">
      <div className="text-blue-600">{icon}</div>
      <span className="text-xs text-gray-600 mt-2 text-center font-medium">
        {label}
      </span>
    </div>
  );
}