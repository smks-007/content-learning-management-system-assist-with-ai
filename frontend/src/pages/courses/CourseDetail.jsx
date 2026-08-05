import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiClock, FiBookOpen, FiUsers, FiPlay, FiLock, FiCheck, FiHeart, FiShare2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../../components/common/Badge';
import Spinner from '../../components/common/Spinner';
import { formatPrice, formatDuration } from '../../utils/formatters';

const levelColors = { BEGINNER: 'success', INTERMEDIATE: 'warning', ADVANCED: 'danger' };

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      const mockTitles = {
        '1': 'Advanced React 19 & Next.js App Router',
        '2': 'Python Data Science & Machine Learning',
        '3': 'Spring Boot 3 & Spring AI Architecture',
        '4': 'UI/UX Design Systems & Micro-Interactions'
      };

      try {
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
        if (isUUID) {
          const res = await courseService.getCourseById(id);
          if (res?.data?.data || res?.data) {
            setCourse(res.data?.data || res.data);
            return;
          }
        }
        throw new Error('Fallback mock course');
      } catch (err) {
        setCourse({
          id: id,
          title: mockTitles[id] || 'Advanced Full-Stack Development & AI Integration',
          description: 'Master React 19, Spring Boot 3, Spring AI, and modern web application development with real-world hands-on projects.',
          shortDescription: 'Build scalable AI-powered web applications step-by-step.',
          level: 'INTERMEDIATE',
          language: 'English',
          rating: 4.9,
          totalRatings: 342,
          enrollmentCount: 1250,
          totalLessons: 16,
          totalDuration: 420,
          price: id === '1' ? 0 : 49.99,
          instructorName: 'Sarah Jenkins',
          isEnrolled: false,
          objectives: [
            'Understand React 19 & modern component architecture',
            'Integrate Spring Boot 3 REST APIs with JWT Security',
            'Implement Spring AI Chat & AI Features',
            'Deploy full-stack web applications seamlessly'
          ],
          requirements: [
            'Basic knowledge of JavaScript & HTML',
            'Foundational programming concepts'
          ],
          lessons: [
            { id: '1', title: '1. Introduction to CLMS Platform', lessonType: 'VIDEO', duration: 15, isPreview: true },
            { id: '2', title: '2. Setting up React & Vite', lessonType: 'VIDEO', duration: 25, isPreview: true },
            { id: '3', title: '3. Building Component Design System', lessonType: 'VIDEO', duration: 40, isPreview: false },
            { id: '4', title: '4. Spring Boot REST Architecture', lessonType: 'VIDEO', duration: 45, isPreview: false },
            { id: '5', title: '5. AI Service Integration with Spring AI', lessonType: 'QUIZ', duration: 30, isPreview: false }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) { navigate('/login'); return; }
    setEnrolling(true);
    try {
      await courseService.enrollInCourse(id);
      navigate(`/courses/${id}/learn`);
    } catch (err) {
      console.error('Enrollment failed', err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-96"><Spinner size="lg" /></div>;
  if (!course) return <div className="text-center text-gray-400 py-20">Course not found.</div>;

  const tabs = ['overview', 'curriculum', 'reviews', 'discussion'];

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-dark-900 via-indigo-950/30 to-dark-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={levelColors[course.level] || 'primary'}>{course.level}</Badge>
                {course.isFeatured && <Badge variant="warning">⭐ Featured</Badge>}
                <Badge variant="secondary">{course.language || 'English'}</Badge>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{course.title}</h1>
              <p className="text-gray-400 text-lg mb-6">{course.shortDescription || course.description?.slice(0, 200)}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <FiStar className="text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold">{course.rating?.toFixed(1) || '4.8'}</span>
                  <span>({course.totalRatings || 0} ratings)</span>
                </span>
                <span className="flex items-center gap-1"><FiUsers className="text-indigo-400" />{course.enrollmentCount || 0} students</span>
                <span className="flex items-center gap-1"><FiBookOpen className="text-cyan-400" />{course.totalLessons || 0} lessons</span>
                <span className="flex items-center gap-1"><FiClock className="text-purple-400" />{formatDuration(course.totalDuration || 0)}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                  {course.instructorName?.[0] || 'I'}
                </div>
                <div>
                  <div className="text-sm font-medium">{course.instructorName || 'Instructor'}</div>
                  <div className="text-xs text-gray-500">Course Instructor</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar price card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-fit sticky top-24">
            {course.thumbnail && (
              <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover rounded-xl mb-4" />
            )}
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold text-white">{formatPrice(course.discountPrice || course.price || 0)}</span>
              {course.discountPrice && course.price && (
                <span className="text-gray-500 line-through text-lg">{formatPrice(course.price)}</span>
              )}
            </div>
            {course.isEnrolled ? (
              <button onClick={() => navigate(`/courses/${id}/learn`)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold transition-all flex items-center justify-center gap-2">
                <FiPlay /> Continue Learning
              </button>
            ) : (
              <button onClick={handleEnroll} disabled={enrolling}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-60">
                {enrolling ? <Spinner size="sm" /> : <><FiPlay /> Enroll Now</>}
              </button>
            )}
            <div className="mt-4 space-y-2 text-sm text-gray-400">
              {[`${course.totalLessons || 0} lessons`, formatDuration(course.totalDuration || 0) + ' total', 'Certificate of completion', 'Lifetime access', 'AI-powered learning'].map(item => (
                <div key={item} className="flex items-center gap-2"><FiCheck className="text-emerald-400 flex-shrink-0" />{item}</div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm flex items-center justify-center gap-1 transition-colors"><FiHeart className="w-4 h-4" /> Wishlist</button>
              <button className="flex-1 py-2 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm flex items-center justify-center gap-1 transition-colors"><FiShare2 className="w-4 h-4" /> Share</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-1 mb-8 bg-white/5 rounded-xl p-1 w-fit">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize text-sm font-medium transition-all ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4">About This Course</h2>
                  <p className="text-gray-400 leading-relaxed">{course.description}</p>
                </div>
                {course.objectives?.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {course.objectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                          <FiCheck className="text-emerald-400 mt-0.5 flex-shrink-0" />{obj}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {course.requirements?.length > 0 && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                    <ul className="space-y-2">
                      {course.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm"><span className="text-indigo-400 mt-0.5">•</span>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'curriculum' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
                {(course.lessons || []).map((lesson, i) => (
                  <div key={lesson.id || i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                      {lesson.isCompleted ? <FiCheck className="text-emerald-400 w-4 h-4" /> :
                       lesson.isPreview ? <FiPlay className="text-indigo-400 w-4 h-4" /> : <FiLock className="text-gray-500 w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{lesson.title}</div>
                      <div className="text-xs text-gray-500">{lesson.lessonType} • {formatDuration(lesson.duration || 0)}</div>
                    </div>
                    {lesson.isPreview && <Badge variant="info" className="text-xs">Preview</Badge>}
                  </div>
                ))}
                {!course.lessons?.length && <div className="text-center text-gray-500 py-8">Curriculum will be available after enrollment.</div>}
              </motion.div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center text-gray-500 py-12">Reviews coming soon...</div>
            )}
            {activeTab === 'discussion' && (
              <div className="text-center text-gray-500 py-12">Discussion forum coming soon...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
