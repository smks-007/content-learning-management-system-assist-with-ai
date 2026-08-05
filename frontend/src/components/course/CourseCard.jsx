import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiStar, FiBook, FiHeart } from 'react-icons/fi';
import Button from '../common/Button';
import Badge from '../common/Badge';
import ProgressBar from '../common/ProgressBar';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const targetPath = course.progress !== undefined ? `/courses/${course.id}/learn` : `/courses/${course.id}`;

  const handleCardClick = () => {
    navigate(targetPath);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    // Wishlist toggle logic
  };

  return (
    <div onClick={handleCardClick} className="block h-full cursor-pointer group">
      <motion.div whileHover={{ y: -5 }} className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-indigo-500/20 transition-all flex flex-col h-full">
        <div className="relative aspect-video overflow-hidden">
          <img src={course.thumbnail || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop`} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-xl">
              {course.progress !== undefined ? 'Continue' : 'View Course'}
            </Button>
          </div>
          <button onClick={handleWishlist} className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/70 hover:text-rose-500 hover:bg-white transition-colors z-10">
            <FiHeart />
          </button>
          {course.price === 0 && <Badge variant="success" className="absolute top-3 left-3 bg-emerald-500 text-white border-none shadow-lg">FREE</Badge>}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{course.level || 'Intermediate'}</Badge>
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              <FiStar className="fill-current" /> {course.rating || '4.8'} <span className="text-gray-500 font-normal">({course.reviews || 120})</span>
            </div>
          </div>
          <h3 className="font-bold text-white text-lg leading-tight mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-1">by {course.instructor || 'Instructor Name'}</p>
          
          <div className="mt-auto">
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 border-b border-white/10 pb-4">
              <span className="flex items-center gap-1"><FiClock /> {course.duration || '2h 30m'}</span>
              <span className="flex items-center gap-1"><FiBook /> {course.lessons || 12} Lessons</span>
            </div>
            
            {course.progress !== undefined ? (
              <ProgressBar value={course.progress} label="Course Progress" size="sm" color="indigo" />
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-white">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                {course.originalPrice && <span className="text-sm text-gray-500 line-through mb-0.5">${course.originalPrice}</span>}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
