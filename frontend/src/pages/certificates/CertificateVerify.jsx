import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CertificateVerify() {
  const { code } = useParams();
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 p-4">
      <motion.div initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} className="max-w-lg w-full bg-dark-900 border border-emerald-500/30 rounded-2xl p-8 text-center shadow-2xl shadow-emerald-500/10">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Certificate Verified</h1>
        <p className="text-emerald-400 mb-8">This is a valid certificate issued by CLMS.</p>
        <div className="bg-dark-950 rounded-xl p-4 text-left space-y-3">
          <div><p className="text-xs text-gray-500 uppercase tracking-wider">Student</p><p className="font-medium text-white">John Doe</p></div>
          <div><p className="text-xs text-gray-500 uppercase tracking-wider">Course</p><p className="font-medium text-white">Advanced React Patterns</p></div>
          <div><p className="text-xs text-gray-500 uppercase tracking-wider">Verification Code</p><p className="font-mono text-white">{code}</p></div>
        </div>
      </motion.div>
    </div>
  );
}
