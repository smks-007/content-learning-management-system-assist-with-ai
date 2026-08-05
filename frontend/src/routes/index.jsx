import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import StudentDashboard from '../pages/dashboard/StudentDashboard';
import AiChat from '../pages/ai/AiChat';
import CodePlayground from '../pages/code/CodePlayground';
import BrowseCourses from '../pages/courses/BrowseCourses';
import CoursePlayer from '../pages/courses/CoursePlayer';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/ai/chat" element={<AiChat />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/courses" element={<BrowseCourses />} />
          <Route path="/courses/:id/learn" element={<CoursePlayer />} />
          <Route path="/certificates" element={<div className="p-4 text-white">Certificates Page Placeholder</div>} />
          <Route path="/profile" element={<div className="p-4 text-white">Profile Page Placeholder</div>} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRouter;
