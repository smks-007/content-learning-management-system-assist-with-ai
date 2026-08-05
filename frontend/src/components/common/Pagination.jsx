import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <FiChevronLeft className="w-5 h-5" />
      </button>
      {pages.map(page => (
        <button key={page} onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
