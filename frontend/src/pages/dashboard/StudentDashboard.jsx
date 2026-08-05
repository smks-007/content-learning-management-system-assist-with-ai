import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ProgressBar from '../../components/common/ProgressBar';
import { useAuth } from '../../hooks/useAuth';
import { studentService } from '../../services/studentService';
import { FiBook, FiCheckCircle, FiAward, FiClock, FiPlay, FiArrowRight } from 'react-icons/fi';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await studentService.getDashboard();
        setDashboardData(res.data?.data || res.data);
      } catch (err) {
        console.warn('Using default dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const displayName = String(user?.name || user?.firstName || 'Student');

  const stats = [
    { label: 'Enrolled Courses', value: dashboardData?.enrolledCourses || '4', icon: <FiBook className="text-primary-500 text-xl" /> },
    { label: 'Completed Lessons', value: dashboardData?.completedLessons || '28', icon: <FiCheckCircle className="text-emerald-500 text-xl" /> },
    { label: 'Certificates Earned', value: dashboardData?.certificatesEarned || '2', icon: <FiAward className="text-amber-500 text-xl" /> },
    { label: 'Hours Spent', value: '24.5h', icon: <FiClock className="text-accent-500 text-xl" /> },
  ];

  const continueCourses = [
    { id: 1, title: 'Advanced React 19 & Next.js App Router', progress: 75, instructor: 'Sarah Jenkins', lessons: '12 / 16 Lessons' },
    { id: 2, title: 'Python Data Science & Machine Learning', progress: 42, instructor: 'Dr. Michael Chen', lessons: '8 / 20 Lessons' },
    { id: 3, title: 'Spring Boot 3 & Spring AI Architecture', progress: 90, instructor: 'Alex Rivera', lessons: '18 / 20 Lessons' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-900 to-dark-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden border border-white/10 shadow-xl">
        <div className="relative z-10 max-w-xl space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            You're making great progress! Continue your active learning journey right where you left off.
          </p>
          <div className="pt-2">
            <Button 
              onClick={() => navigate('/courses/1/learn')}
              className="bg-primary-600 hover:bg-primary-500 text-white font-medium"
            >
              Resume Learning
            </Button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5 bg-dark-900 border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-400">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Continue Learning</h2>
          <Link to="/courses" className="text-xs text-primary-400 hover:underline flex items-center gap-1">
            View All Courses <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {continueCourses.map((course) => (
            <Card key={course.id} className="p-5 bg-dark-900 border-white/10 hover:border-primary-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <Badge variant="primary">In Progress</Badge>
                  <span className="text-xs text-gray-400">{course.lessons}</span>
                </div>
                <h3 className="font-bold text-white text-base line-clamp-2">{course.title}</h3>
                <p className="text-xs text-gray-400">Instructor: {course.instructor}</p>
                <ProgressBar value={course.progress} label="Progress" size="sm" color="indigo" />
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex justify-end">
                <Button 
                  size="sm" 
                  onClick={() => navigate(`/courses/${course.id}/learn`)}
                  className="bg-primary-600 hover:bg-primary-500 text-white text-xs flex items-center gap-1"
                >
                  <FiPlay size={12} /> Continue
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


