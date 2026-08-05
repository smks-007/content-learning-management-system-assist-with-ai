import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/common/Button';
import { FiFlag, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function QuizAttempt() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = 10;
  
  const handleSelect = (idx) => setAnswers(prev => ({ ...prev, [current]: idx }));
  const toggleFlag = () => setFlagged(prev => ({ ...prev, [current]: !prev[current] }));

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-dark-950 border-b border-white/10">
        <h1 className="text-xl font-bold text-white">React Fundamentals Quiz</h1>
        <div className="flex items-center gap-2 bg-rose-500/10 text-rose-400 px-4 py-1.5 rounded-full font-mono font-bold text-lg border border-rose-500/20">
          ⏳ 14:59
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Question Area */}
        <div className="flex-1 flex flex-col relative bg-dark-900">
          <div className="flex-1 overflow-y-auto p-8 relative">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -20}} transition={{duration: 0.2}} className="max-w-3xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Question {current + 1} of {total}</span>
                  <button onClick={toggleFlag} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${flagged[current] ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'}`}>
                    <FiFlag className={flagged[current] ? 'fill-current' : ''} /> {flagged[current] ? 'Flagged' : 'Flag Question'}
                  </button>
                </div>
                
                <h2 className="text-2xl font-medium text-white mb-8 leading-relaxed">Which hook is used to perform side effects in a functional component?</h2>
                
                <div className="space-y-4">
                  {['useState', 'useEffect', 'useContext', 'useReducer'].map((opt, i) => {
                    const isSelected = answers[current] === i;
                    return (
                      <div key={i} onClick={() => handleSelect(i)} className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-indigo-500' : 'border-gray-500'}`}>
                            {isSelected && <div className="w-3 h-3 bg-indigo-500 rounded-full" />}
                          </div>
                          <span className={`text-lg ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>{opt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Bottom Nav */}
          <div className="p-4 bg-dark-950 border-t border-white/10 flex justify-between items-center">
            <Button variant="secondary" onClick={() => setCurrent(c => Math.max(0, c-1))} disabled={current === 0} icon={<FiChevronLeft/>}>Previous</Button>
            <ProgressBar value={current + 1} max={total} showPercentage={false} size="sm" className="w-64 hidden md:block" />
            <Button variant="secondary" onClick={() => setCurrent(c => Math.min(total-1, c+1))} disabled={current === total-1}>Next <FiChevronRight className="ml-2"/></Button>
          </div>
        </div>
        
        {/* Sidebar Nav */}
        <div className="w-72 bg-dark-950 border-l border-white/10 flex flex-col">
          <div className="p-6">
            <h3 className="font-bold text-white mb-6">Question Map</h3>
            <div className="grid grid-cols-5 gap-3">
              {Array.from({length: total}).map((_, i) => {
                const isAns = answers[i] !== undefined;
                const isFlag = flagged[i];
                return (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center border-2 transition-all ${
                    current === i ? 'border-white text-white' : 
                    isFlag ? 'border-amber-500 text-amber-500 bg-amber-500/10' : 
                    isAns ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 
                    'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                  }`}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-auto p-6 border-t border-white/10">
            <Button className="w-full shadow-indigo-500/20" onClick={() => setIsSubmitting(true)}>Submit Quiz</Button>
          </div>
        </div>
      </div>
      <ConfirmDialog isOpen={isSubmitting} onClose={() => setIsSubmitting(false)} onConfirm={() => window.location.href='/quiz/1/result'} title="Submit Quiz?" message="Are you sure you want to submit your answers? You cannot change them after submission." confirmText="Yes, Submit" confirmVariant="primary" />
    </div>
  );
}
