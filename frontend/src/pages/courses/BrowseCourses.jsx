import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiChevronDown } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import CourseCard from '../../components/course/CourseCard';

const mockCourses = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: ['Advanced React Patterns', 'Python for Data Science', 'UI/UX Design Masterclass', 'Machine Learning Basics'][i % 4] + ` - Part ${Math.floor(i/4) + 1}`,
  instructor: 'Sarah Jenkins',
  rating: 4.8,
  reviews: 1240,
  duration: '12h 30m',
  level: 'Intermediate',
  price: i % 3 === 0 ? 0 : 49.99,
  category: 'Development'
}));

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-white">Find Your Next Skill</h1>
          <p className="text-primary-100 text-lg">Explore thousands of AI-curated courses in programming, design, business, and more.</p>
          
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="flex-1">
              <Input 
                icon={<FiSearch />} 
                placeholder="Search for courses, skills, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white/50"
              />
            </div>
            <Button className="shrink-0 bg-white text-primary-900 hover:bg-gray-100 border-transparent">Search</Button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="glass-dark p-5 rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FiFilter /> Filters
              </h3>
              <button className="text-xs text-primary-500 hover:text-primary-600">Clear</button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</h4>
                <div className="space-y-2">
                  {['Development', 'Design', 'Business', 'Marketing'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500 bg-transparent border-gray-300 dark:border-white/20" />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-white/10 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Level</h4>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                    <label key={lvl} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500 bg-transparent border-gray-300 dark:border-white/20" />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Courses</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              Sort by: 
              <select className="bg-transparent border-none font-semibold text-gray-900 dark:text-white focus:ring-0 cursor-pointer outline-none">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {mockCourses.map(course => (
              <motion.div key={course.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 }}}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCourses;
