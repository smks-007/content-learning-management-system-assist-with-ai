import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 text-white relative overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-lighten animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-500 shadow-xl shadow-primary-500/20 mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to CLMS</h1>
          <p className="text-gray-600 dark:text-gray-400">The next-generation AI learning platform</p>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
