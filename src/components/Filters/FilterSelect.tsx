import React from 'react';
import { BaseItem } from '../../types/common';

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: BaseItem[];
  disabled?: boolean;
  placeholder?: string;
}

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = 'All'
}: FilterSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}