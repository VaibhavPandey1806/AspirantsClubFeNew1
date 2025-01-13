import React from 'react';
import Hero from '../components/AboutUs/Hero';
import Mission from '../components/AboutUs/Mission';
import Story from '../components/AboutUs/Story';
import Contact from '../components/AboutUs/Contact';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Mission />
      <Story />
      <Contact />
    </div>
  );
}