import React from 'react';
import { Mail } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Welcome to Aspirants Club, a space built by dreamers, for dreamers.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none space-y-6 text-gray-600">
          <p>
            We understand the sleepless nights, the endless revisions, and the sheer determination 
            it takes to chase your academic and career goals. If you're preparing for Indian MBA 
            competitive exams, we're here to make your journey a little easier—and a lot more meaningful.
          </p>

          <p>
            Aspirants Club was created with one simple mission: to empower students who dare to dream big. 
            Education shouldn't be a privilege; it should be an opportunity available to everyone. 
            That's why we're committed to providing free resources, effective tools and a supportive 
            community to help you succeed.
          </p>

          <p>
            This isn't just a website—it's a movement. Aspirants Club thrives on collaboration, 
            where peers help peers, and your insights could inspire someone else to overcome their 
            own hurdles. Together, we aim to break barriers, share knowledge, and redefine what 
            success looks like.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600" size={20} />
              <div>
                <p className="font-medium">Vaibhav Pandey</p>
                <a href="mailto:vaibhavpandey@aspirantsclub.in" 
                   className="text-indigo-600 hover:text-indigo-700">
                  vaibhavpandey@aspirantsclub.in
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-indigo-600" size={20} />
              <div>
                <p className="font-medium">Surabhi Pandey</p>
                <a href="mailto:surabhipandey@aspirantsclub.in"
                   className="text-indigo-600 hover:text-indigo-700">
                  surabhipandey@aspirantsclub.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}