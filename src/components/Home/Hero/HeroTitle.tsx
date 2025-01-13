import React from 'react';

export default function HeroTitle() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
        Have your <span className="bg-blue-600 text-white px-2">dream</span>
        <br />
        <span className="bg-blue-600 text-white px-2">preparation path</span> for
        <br />
        MBA Entrance
      </h1>
      <p className="text-sm md:text-base bg-blue-100 text-blue-900 py-1 px-3 rounded-full inline-block">
        The most <span className="font-bold">powerful</span> yet the <span className="font-bold">easiest</span> platform ever.
      </p>
    </div>
  );
}