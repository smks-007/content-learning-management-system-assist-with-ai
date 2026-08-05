import React from 'react';
const variants = {
  primary: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  danger: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  info: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  secondary: 'bg-gray-500/20 text-gray-300 border border-gray-500/30',
};
export default function Badge({ children, variant = 'primary', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
