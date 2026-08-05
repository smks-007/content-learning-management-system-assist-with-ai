import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';

export default function InstructorDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Instructor Dashboard</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium">Create Course</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['My Courses', 'Total Students', 'Avg Rating', 'Total Earnings'].map((label, i) => (
          <Card key={i} className="p-6 text-center">
            <h3 className="text-gray-400 text-sm">{label}</h3>
            <p className="text-2xl font-bold text-white mt-2">{(i+1)*12}</p>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
