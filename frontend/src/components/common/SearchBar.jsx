import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../../hooks/useDebounce';
export default function SearchBar({ placeholder = 'Search...', onSearch, className = '' }) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 400);
  useEffect(() => { onSearch(debouncedValue); }, [debouncedValue]);
  return (
    <div className={`relative ${className}`}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-sm transition-colors" />
      {value && <button onClick={() => setValue('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"><FiX className="w-4 h-4"/></button>}
    </div>
  );
}
