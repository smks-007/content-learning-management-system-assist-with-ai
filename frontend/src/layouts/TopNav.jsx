import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiBell, FiSearch, FiLogOut, FiUser, FiCpu } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const TopNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 shrink-0 bg-dark-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 z-10">
      {/* Global Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search courses, AI topics, quizzes..." 
            onKeyDown={(e) => { if (e.key === 'Enter') navigate('/courses'); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500/60 transition-all"
          />
        </div>
      </div>
      
      {/* Right User Bar */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/ai/chat')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold hover:bg-purple-500/30 transition-all"
        >
          <FiCpu className="w-3.5 h-3.5" /> AI Companion
        </button>

        <button 
          onClick={() => navigate('/notifications')}
          className="p-2.5 text-gray-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors relative border border-white/5"
        >
          <FiBell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <Link to="/profile" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <span className="hidden md:inline text-xs font-bold text-gray-200 group-hover:text-white transition-colors">{user?.name || 'Student'}</span>
          </Link>

          <button 
            onClick={() => { logout(); navigate('/login'); }} 
            className="p-2 text-gray-400 hover:text-rose-400 rounded-xl hover:bg-white/5 transition-colors"
            title="Logout"
          >
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;


