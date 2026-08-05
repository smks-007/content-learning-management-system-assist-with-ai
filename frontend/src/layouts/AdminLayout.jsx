import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import TopNav from './TopNav';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBook, FiCheckSquare, FiPieChart, FiCpu } from 'react-icons/fi';

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Users', path: '/admin/users', icon: <FiUsers /> },
    { name: 'Courses', path: '/admin/courses', icon: <FiBook /> },
    { name: 'Quizzes', path: '/admin/quizzes', icon: <FiCheckSquare /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <FiPieChart /> },
    { name: 'AI Monitor', path: '/admin/ai', icon: <FiCpu /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-dark-900 border-r border-white/10 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="text-xl font-bold text-rose-500 flex items-center gap-2">
          ⚙️ Admin Panel
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === item.path || pathname.startsWith(item.path + '/')
                ? 'bg-rose-500/10 text-rose-400'
                : 'text-gray-400 hover:bg-dark-800 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default function AdminLayout() {
  const { user } = useAuth();
  if (!user?.roles?.includes('ADMIN') && user?.role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="flex h-screen bg-dark-950">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-dark-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

