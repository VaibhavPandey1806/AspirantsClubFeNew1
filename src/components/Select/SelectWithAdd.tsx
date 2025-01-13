import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';

interface SelectWithAddProps {
  label: string;
  value: string;
  options: Array<{ id: string; name: string }>;
  onChange: (value: string) => void;
  onAddNew: (name: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  selectedName?: string;
}

export default function SelectWithAdd({
  label,
  value,
  options,
  onChange,
  onAddNew,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  selectedName = ''
}: SelectWithAddProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleAddNew = () => {
    if (newItemName.trim()) {
      onAddNew(newItemName.trim());
      setNewItemName('');
      setIsAddingNew(false);
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setNewItemName('');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        {isAddingNew ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Enter new ${label.toLowerCase()}`}
              autoFocus
              required={required}
            />
            <button
              type="button"
              onClick={handleAddNew}
              disabled={!newItemName.trim()}
              className="p-2 text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              title="Confirm"
            >
              <Check size={20} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="p-2 text-gray-500 hover:text-gray-700"
              title="Cancel"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isAddingNew || disabled}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                required={required && !isAddingNew && !selectedName}
              >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {selectedName && !value && (
                <div className="absolute inset-0 flex items-center px-2 pointer-events-none bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md">
                  {selectedName} (New)
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              disabled={disabled}
              className="p-2 text-indigo-600 hover:text-indigo-700 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
              title={`Add new ${label.toLowerCase()}`}
            >
              <Plus size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}