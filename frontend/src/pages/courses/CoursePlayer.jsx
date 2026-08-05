import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiVideo, FiFileText, FiArrowLeft, FiPlay, FiPause, FiCpu, FiBookOpen } from 'react-icons/fi';
import Button from '../../components/common/Button';

const courseTitles = {
  '1': 'Advanced React 19 & Next.js App Router',
  '2': 'Python Data Science & Machine Learning',
  '3': 'Spring Boot 3 & Spring AI Architecture',
  '4': 'UI/UX Design Systems & Micro-Interactions'
};

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLesson, setActiveLesson] = useState(2);
  const [activeTab, setActiveTab] = useState('Overview');

  const courseTitle = courseTitles[id] || 'Advanced Full-Stack Development';

  const modules = [
    {
      id: 1,
      title: 'Module 1: Core Fundamentals & Patterns',
      lessons: [
        { id: 1, title: '1. Course Overview & Ecosystem Setup', duration: '08:30', isCompleted: true },
        { id: 2, title: '2. Higher Order Components & Custom Hooks', duration: '14:45', isCompleted: false },
        { id: 3, title: '3. Context API & State Management', duration: '18:20', isCompleted: false },
      ]
    },
    {
      id: 2,
      title: 'Module 2: Server Components & REST Integration',
      lessons: [
        { id: 4, title: '4. React Server Components (RSC)', duration: '22:15', isCompleted: false },
        { id: 5, title: '5. Spring Boot 3 REST API Integration', duration: '25:40', isCompleted: false },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-4 md:-m-6 lg:-m-8 bg-dark-950 text-white">
      {/* Player Header Bar */}
      <div className="h-14 bg-dark-900 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
          <span className="text-gray-500">|</span>
          <h2 className="font-bold text-sm text-white truncate max-w-md">{courseTitle}</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            size="sm"
            onClick={() => navigate('/ai/chat')}
            className="bg-purple-600/80 hover:bg-purple-600 text-white text-xs flex items-center gap-1.5"
          >
            <FiCpu className="w-3.5 h-3.5" /> Ask AI Assistant
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Course Curriculum Sidebar */}
        <div className="w-80 border-r border-white/10 flex flex-col bg-dark-900 shrink-0">
          <div className="p-4 border-b border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Course Progress</span>
              <span className="text-indigo-400 font-bold">40% Complete</span>
            </div>
            <div className="w-full h-2 bg-dark-950 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[40%]"></div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {modules.map(module => (
              <div key={module.id} className="border-b border-white/5">
                <div className="p-3.5 bg-white/5 flex justify-between items-center font-semibold text-xs text-gray-300">
                  <span>{module.title}</span>
                </div>
                <div className="flex flex-col">
                  {module.lessons.map(lesson => (
                    <button 
                      key={lesson.id} 
                      onClick={() => setActiveLesson(lesson.id)}
                      className={`p-3.5 flex items-start gap-3 text-left hover:bg-white/5 transition-colors ${activeLesson === lesson.id ? 'bg-indigo-600/20 border-l-4 border-indigo-500' : ''}`}
                    >
                      {lesson.isCompleted ? (
                        <FiCheckCircle className="text-emerald-400 mt-0.5 shrink-0 w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-500 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${activeLesson === lesson.id ? 'text-indigo-300' : 'text-gray-300'}`}>
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500">
                          <FiVideo className="w-3 h-3" /> {lesson.duration}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player & Tab Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden group">
            {/* Interactive Video Player Container */}
            <div className="text-center p-8">
              <div 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-indigo-600/30 border border-indigo-400/40 text-indigo-300 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl"
              >
                {isPlaying ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {modules.flatMap(m => m.lessons).find(l => l.id === activeLesson)?.title || 'Lesson Video'}
              </h3>
              <p className="text-xs text-gray-400">Click to {isPlaying ? 'pause' : 'play'} video stream</p>
            </div>
          </div>
          
          {/* Bottom Lesson Information Tabs */}
          <div className="h-60 border-t border-white/10 bg-dark-900 flex flex-col">
            <div className="flex border-b border-white/10 px-6">
              {['Overview', 'Q&A', 'Notes', 'Transcripts'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all ${activeTab === tab ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-2">
              <h3 className="text-base font-bold text-white">Higher Order Components & Custom Hooks</h3>
              <p className="text-gray-300 text-xs leading-relaxed max-w-3xl">
                In this lesson, we explore Higher Order Components (HOCs) and custom React Hooks. HOCs enable advanced component logic reuse by taking a component as an argument and returning a new enhanced component.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
