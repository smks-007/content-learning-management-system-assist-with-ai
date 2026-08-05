import React from 'react';
import { motion } from 'framer-motion';
import Badge from '../../components/common/Badge';

export default function QuizResult() {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="max-w-4xl mx-auto space-y-8 text-center py-12">
      <h1 className="text-3xl font-bold text-white">Quiz Results</h1>
      <div className="relative w-48 h-48 mx-auto rounded-full border-8 border-indigo-500 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold text-white">85%</span>
      </div>
      <Badge variant="success" className="text-lg px-4 py-1">PASSED</Badge>
      <div className="grid grid-cols-4 gap-4 p-6 bg-dark-900 rounded-2xl border border-white/10">
        <div><p className="text-gray-400 text-sm">Time Taken</p><p className="text-xl font-bold text-white">12:34</p></div>
        <div><p className="text-gray-400 text-sm">Total</p><p className="text-xl font-bold text-white">10</p></div>
        <div><p className="text-gray-400 text-sm">Correct</p><p className="text-xl font-bold text-emerald-400">8</p></div>
        <div><p className="text-gray-400 text-sm">Earned</p><p className="text-xl font-bold text-indigo-400">85 pts</p></div>
      </div>
    </motion.div>
  );
}
