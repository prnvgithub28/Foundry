import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo size="medium" />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/lost" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Lost Item
            </Link>
            <Link to="/found" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Found Item
            </Link>
            <Link to="/discover" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Discover
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </div>
          
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
