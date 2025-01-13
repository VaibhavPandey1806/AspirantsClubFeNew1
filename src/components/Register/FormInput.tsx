import React from 'react';
import { User, AtSign, Lock, LockKeyhole, Phone, Mail } from 'lucide-react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  icon?: 'user' | 'atSign' | 'lock' | 'lockKeyhole' | 'phone' | 'mail';
}

const icons = {
  user: User,
  atSign: AtSign,
  lock: Lock,
  lockKeyhole: LockKeyhole,
  phone: Phone,
  mail: Mail,
};

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  placeholder,
  icon
}: FormInputProps) {
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md shadow-sm ${
            IconComponent ? 'pl-10' : 'pl-3'
          } pr-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          required={required}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}