import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  questionCount: number;
  color: string;
}

export default function CategoryCard({ icon, title, questionCount, color }: CategoryCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer`}>
      <div className="p-6">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{questionCount} questions</p>
      </div>
      <div className="border-t px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">View Questions</span>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
    </div>
  );
}