import React from 'react';
import { GraduationCap, Book, Video, Users, Award, BookOpen } from 'lucide-react';
import FeatureIcon from './FeatureIcon';

export default function FeatureNetwork() {
  const features = [
    { icon: <GraduationCap size={32} />, label: 'UNIVERSITY' },
    { icon: <Book size={32} />, label: 'SCHOOL' },
    { icon: <Video size={32} />, label: 'ONLINE COURSES' },
    { icon: <Users size={32} />, label: 'COMMUNITY' },
    { icon: <Award size={32} />, label: 'AWWWARDS' },
    { icon: <BookOpen size={32} />, label: 'RESOURCES' },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl" />
      <div className="relative grid grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {features.map((feature, index) => (
          <FeatureIcon key={index} {...feature} />
        ))}
      </div>
      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-100 rounded-full" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-100 rounded-full" />
    </div>
  );
}