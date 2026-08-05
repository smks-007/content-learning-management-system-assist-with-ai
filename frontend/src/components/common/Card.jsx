import React from 'react';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div 
      className={`card ${hover ? 'hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-primary-500/10 transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
