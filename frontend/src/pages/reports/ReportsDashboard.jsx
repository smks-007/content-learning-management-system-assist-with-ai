import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../../components/common/Card';

const lineData = [{name: 'Mon', hours: 2}, {name: 'Tue', hours: 4}, {name: 'Wed', hours: 3}, {name: 'Thu', hours: 5}, {name: 'Fri', hours: 2}];
const pieData = [{name: 'React', value: 40}, {name: 'Python', value: 30}, {name: 'Design', value: 20}];
const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

export default function ReportsDashboard() {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Course Reports', 'Quiz Reports', 'AI Usage'];

  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Reports & Insights</h1>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors">Download PDF</button>
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-2">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {t}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'Overview' && (
          <motion.div key="overview" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Courses Enrolled', value: '12' },
                { label: 'Lessons Completed', value: '145' },
                { label: 'Avg Quiz Score', value: '88%' },
                { label: 'Study Hours', value: '42h' }
              ].map((stat, i) => (
                <Card key={i} className="p-6 bg-dark-900 text-center border-white/5 shadow-2xl">
                  <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </Card>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
              <Card className="p-6 col-span-2 bg-dark-900 border-white/5 shadow-2xl flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6">Study Activity (Hours)</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <RechartsTooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px'}} />
                    <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="#6366f140" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-dark-900 border-white/5 shadow-2xl flex flex-col">
                <h3 className="text-lg font-bold text-white mb-6">Time by Category</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {pieData.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} /> {entry.name}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
