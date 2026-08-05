import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { FiClock, FiList } from 'react-icons/fi';

export default function QuizList() {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} hover className="p-6 flex flex-col cursor-pointer">
            <Badge variant="primary" className="self-start mb-4">React Course</Badge>
            <h3 className="text-xl font-bold text-white mb-2">Hooks Mastery</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400 mt-auto">
              <span className="flex items-center gap-1"><FiClock /> 15 mins</span>
              <span className="flex items-center gap-1"><FiList /> 10 Qs</span>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
