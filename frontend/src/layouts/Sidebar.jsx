import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiCpu, FiAward, FiUser, FiZap, FiCode } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Browse Courses', path: '/courses', icon: <FiBook /> },
    { name: 'AI Assistant', path: '/ai/chat', icon: <FiCpu /> },
    { name: 'Code Lab', path: '/playground', icon: <FiCode /> },
    { name: 'Certificates', path: '/certificates', icon: <FiAward /> },
    { name: 'My Profile', path: '/profile', icon: <FiUser /> },
  ];

  return (
    <aside className="w-64 shrink-0 bg-dark-900 border-r border-white/10 flex flex-col h-full select-none z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-indigo-500/30">
            🚀
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">CLMS<span className="text-indigo-400">.ai</span></span>
            <span className="block text-[10px] text-gray-400 font-medium">Smart AI Platform</span>
          </div>
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Navigation</div>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`
                flex items-center px-3.5 py-3 rounded-xl text-xs font-semibold transition-all relative group
                ${isActive 
                  ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/20 text-white border border-indigo-500/40 shadow-md' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-lg shadow-indigo-500" />
              )}
              <span className={`mr-3 text-base ${isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Footer Profile Banner */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
            {user?.name?.charAt(0) || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Student User'}</p>
            <p className="text-[10px] text-indigo-400 font-medium truncate">Pro Member • Level 4</p>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;


