import React from 'react';

const Logo = ({ size = "medium", className = "" }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10", 
    large: "w-12 h-12"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        className={`${sizeClasses[size]} text-blue-600`}
        fill="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        <circle 
          cx="12" 
          cy="9" 
          r="2.5" 
          fill="white"
        />
        <circle 
          cx="12" 
          cy="9" 
          r="1.5" 
          fill="none"
          stroke="white"
          strokeWidth="1"
        />
        <line 
          x1="13" 
          y1="10" 
          x2="14.5" 
          y2="11.5" 
          stroke="white" 
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900">Foundry</span>
    </div>
  );
};

export default Logo;
