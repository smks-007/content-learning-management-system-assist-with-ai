import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [{name: 'Jan', users: 400}, {name: 'Feb', users: 300}, {name: 'Mar', users: 600}, {name: 'Apr', users: 800}, {name: 'May', users: 1200}];

export default function AnalyticsPage() {
  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">System Analytics</h1>
        <select className="bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 outline-none">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 h-96 flex flex-col shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6">User Registrations</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff'}} />
              <Area type="monotone" dataKey="users" stroke="#10b981" fill="#10b98140" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-900 border border-white/10 rounded-2xl p-6 h-96 flex flex-col shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff'}} cursor={{fill: '#ffffff10'}} />
              <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
