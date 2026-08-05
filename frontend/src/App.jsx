import React, { Component, Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import Spinner from './components/common/Spinner';

// Direct static imports for instant loading & zero chunk failures
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import BrowseCourses from './pages/courses/BrowseCourses';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';
import AiChat from './pages/ai/AiChat';
import ProfilePage from './pages/profile/ProfilePage';

// Lazy load secondary pages
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const InstructorDashboard = lazy(() => import('./pages/dashboard/InstructorDashboard'));
const QuizList = lazy(() => import('./pages/quiz/QuizList'));
const QuizAttempt = lazy(() => import('./pages/quiz/QuizAttempt'));
const QuizResult = lazy(() => import('./pages/quiz/QuizResult'));
const CodePlayground = lazy(() => import('./pages/code/CodePlayground'));
const ReportsDashboard = lazy(() => import('./pages/reports/ReportsDashboard'));
const CertificatesPage = lazy(() => import('./pages/certificates/CertificatesPage'));
const CertificateVerify = lazy(() => import('./pages/certificates/CertificateVerify'));
const NotificationCenter = lazy(() => import('./pages/notifications/NotificationCenter'));
const PricingPage = lazy(() => import('./pages/payment/PricingPage'));
const CheckoutPage = lazy(() => import('./pages/payment/CheckoutPage'));
const BillingHistory = lazy(() => import('./pages/payment/BillingHistory'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
const CourseManagement = lazy(() => import('./pages/admin/CourseManagement'));
const QuizManagement = lazy(() => import('./pages/admin/QuizManagement'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const AiMonitoring = lazy(() => import('./pages/admin/AiMonitoring'));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen items-center justify-center bg-dark-950 text-white p-6 text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-sm text-gray-400 max-w-md">{this.state.error?.toString()}</p>
          <button 
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/dashboard'; }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg"
          >
            Reload Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center bg-dark-950">
    <Spinner size="lg" />
  </div>
);

export default function App() {
  const { user } = useAuth();
  
  const getDashboard = () => {
    return <StudentDashboard />;
  };

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          
          {/* Public certificate verification */}
          <Route path="/verify/:code" element={<CertificateVerify />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Protected main app routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/" element={getDashboard()} />
            <Route path="/dashboard" element={getDashboard()} />
            <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/courses" element={<BrowseCourses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/learn" element={<CoursePlayer />} />
            <Route path="/ai/chat" element={<AiChat />} />
            <Route path="/quiz" element={<QuizList />} />
            <Route path="/quiz/:id" element={<QuizAttempt />} />
            <Route path="/quiz/:id/result" element={<QuizResult />} />
            <Route path="/playground" element={<CodePlayground />} />
            <Route path="/reports" element={<ReportsDashboard />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/notifications" element={<NotificationCenter />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/billing" element={<BillingHistory />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          {/* Admin routes */}
          <Route element={<RoleRoute role="ADMIN"><AdminLayout /></RoleRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/courses" element={<CourseManagement />} />
            <Route path="/admin/quizzes" element={<QuizManagement />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/ai" element={<AiMonitoring />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
