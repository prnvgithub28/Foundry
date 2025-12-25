import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Foundry</h3>
            <p className="text-gray-600 text-sm">
              Campus lost and found system helping students reconnect with their belongings.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/lost" className="text-gray-600 hover:text-gray-900 text-sm">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link to="/found" className="text-gray-600 hover:text-gray-900 text-sm">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/discover" className="text-gray-600 hover:text-gray-900 text-sm">
                  Browse Items
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Foundry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
