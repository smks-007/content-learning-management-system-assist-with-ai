import React, { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(({ label, error, icon, type = 'text', className = '', ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`
            block w-full rounded-lg bg-white dark:bg-dark-900 border 
            ${error ? 'border-rose-500 focus:ring-rose-500' : 'border-gray-300 dark:border-white/10 focus:border-primary-500 focus:ring-primary-500'}
            ${icon ? 'pl-10' : 'pl-3'}
            ${isPassword ? 'pr-10' : 'pr-3'}
            py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-rose-500">{error.message || error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
