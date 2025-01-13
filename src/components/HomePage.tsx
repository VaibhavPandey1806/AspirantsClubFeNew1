import React from 'react';
import Hero from './Home/Hero/Hero';
import Categories from './Home/Categories/Categories';
import Features from './Home/Features/Features';
import CallToAction from './Home/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Categories />
      <Features />
      <CallToAction />
    </div>
  );
}