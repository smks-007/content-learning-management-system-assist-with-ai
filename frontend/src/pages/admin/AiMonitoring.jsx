import React from 'react';
import { motion } from 'framer-motion';

export default function AiMonitoring() {
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">AI Monitoring</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        {['Requests', 'Success Rate', 'Latency', 'Tokens'].map(label => (
          <div key={label} className="bg-dark-900 border border-white/10 p-6 rounded-2xl">
            <p className="text-sm text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold text-white">---</p>
          </div>
        ))}
      </div>
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-8 text-center text-gray-400 h-64 flex flex-col justify-center">
        AI Logs table placeholder
      </div>
    </motion.div>
  );
}
