import React from 'react';
import { Brain, Users, Clock, Award, Bot, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Smart Practice",
    description: "Time-based practice with detailed analytics to track your progress"
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI-Powered Analysis",
    description: "Get detailed explanations and insights from our AI for every question"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Active Community",
    description: "Learn from peers and discuss questions with fellow aspirants"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Updated Content",
    description: "Regular updates with latest exam patterns and questions"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Expert Verified",
    description: "All questions verified by MBA entrance exam experts"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Free Forever",
    description: "Access all basic features without any cost"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Aspirants Club?
          </h2>
          <p className="text-gray-600">
            We provide everything you need to ace your MBA entrance exams
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}