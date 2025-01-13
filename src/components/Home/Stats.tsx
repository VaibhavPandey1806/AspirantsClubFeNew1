import React from 'react';
import { Users, BookOpen, Clock } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-8 h-8 text-blue-900" />,
    value: "10,000+",
    label: "Active Users"
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue-900" />,
    value: "50,000+",
    label: "Practice Questions"
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-900" />,
    value: "24/7",
    label: "Support Available"
  }
];

export default function Stats() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-blue-900">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 mt-1">{stat.label}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}