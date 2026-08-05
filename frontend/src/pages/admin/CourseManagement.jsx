import React from 'react';
import { motion } from 'framer-motion';

export default function CourseManagement() {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Course Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Create Course</button>
      </div>
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-8 text-center text-gray-400">
        Course table placeholder
      </div>
    </motion.div>
  );
}
