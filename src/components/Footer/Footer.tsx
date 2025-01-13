import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { CONTACT_EMAIL } from '../../config/metadata';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-blue-100">
              Aspirants Club is your one-stop platform for MBA entrance exam preparation. 
              Join our community of learners and achieve your dreams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/question-bank" className="text-blue-100 hover:text-white transition-colors">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link to="/submit-question" className="text-blue-100 hover:text-white transition-colors">
                  Submit Question
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${CONTACT_EMAIL.vaibhav}`} className="text-blue-100 hover:text-white transition-colors">
                  {CONTACT_EMAIL.vaibhav}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${CONTACT_EMAIL.surabhi}`} className="text-blue-100 hover:text-white transition-colors">
                  {CONTACT_EMAIL.surabhi}
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Aspirants Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}