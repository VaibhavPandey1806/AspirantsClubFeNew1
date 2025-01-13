import React from 'react';
import { Calculator, BookOpen, Brain, PieChart, Database, Lightbulb } from 'lucide-react';
import CategoryCard from './CategoryCard';

const categories = [
  {
    icon: <Calculator className="w-6 h-6 text-white" />,
    title: "Quantitative Aptitude",
    questionCount: 2500,
    color: "bg-blue-600"
  },
  {
    icon: <Brain className="w-6 h-6 text-white" />,
    title: "Logical Reasoning",
    questionCount: 1800,
    color: "bg-purple-600"
  },
  {
    icon: <BookOpen className="w-6 h-6 text-white" />,
    title: "Verbal Ability",
    questionCount: 2000,
    color: "bg-green-600"
  },
  {
    icon: <PieChart className="w-6 h-6 text-white" />,
    title: "Data Interpretation",
    questionCount: 1500,
    color: "bg-orange-600"
  },
  {
    icon: <Database className="w-6 h-6 text-white" />,
    title: "General Knowledge",
    questionCount: 1200,
    color: "bg-red-600"
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    title: "Current Affairs",
    questionCount: 800,
    color: "bg-yellow-600"
  }
];

export default function Categories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-gray-600">
            Choose from our comprehensive collection of questions across various MBA entrance exam topics
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}