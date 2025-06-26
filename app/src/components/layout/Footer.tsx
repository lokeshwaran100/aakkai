import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Aakkai
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Transforming brands through strategic design and innovative UI/UX solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/services/brand-strategy" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Brand Strategy
                </Link>
              </li>
              <li>
                <Link to="/services/ui-design" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  UI Design
                </Link>
              </li>
              <li>
                <Link to="/services/ux-design" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  UX Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  About
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Aakkai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};