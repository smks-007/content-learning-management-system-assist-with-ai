import React from 'react';
const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base', xl: 'h-16 w-16 text-lg' };
export default function Avatar({ src, name, size = 'md', className = '' }) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  return src ? (
    <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white/10 ${className}`} />
  ) : (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold ring-2 ring-white/10 ${className}`}>
      {initials}
    </div>
  );
}
