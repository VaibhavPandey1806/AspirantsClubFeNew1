import React from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="w-12 h-12 text-blue-900" />,
    title: "Comprehensive Question Bank",
    description: "Access thousands of carefully curated questions from previous year papers and expert sources"
  },
  {
    icon: <Users className="w-12 h-12 text-blue-900" />,
    title: "Community Learning",
    description: "Join a vibrant community of fellow aspirants to discuss, learn and grow together"
  },
  {
    icon: <Clock className="w-12 h-12 text-blue-900" />,
    title: "Smart Practice Tools",
    description: "Track your progress with intelligent timers and detailed performance analytics"
  },
  {
    icon: <Award className="w-12 h-12 text-blue-900" />,
    title: "Free Resources",
    description: "Get access to high-quality study materials and practice sets at no cost"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Why Choose Aspirants Club?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}