import React from 'react';
import { Mail } from 'lucide-react';

export default function Contact() {
  const contacts = [
    {
      name: "Vaibhav Pandey",
      email: "vaibhavpandey@aspirantsclub.in"
    },
    {
      name: "Surabhi Pandey",
      email: "surabhipandey@aspirantsclub.in"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Us</h2>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="space-y-6">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contact.name}</p>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}