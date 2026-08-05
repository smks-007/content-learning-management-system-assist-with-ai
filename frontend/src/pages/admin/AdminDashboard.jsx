import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const data = [{name: 'Jan', users: 400}, {name: 'Feb', users: 300}, {name: 'Mar', users: 600}, {name: 'Apr', users: 800}, {name: 'May', users: 500}];

export default function AdminDashboard() {
  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', value: '12,345' },
          { label: 'Total Courses', value: '45' },
          { label: 'Total Revenue', value: '$12,450' },
          { label: 'AI Requests', value: '45,678' }
        ].map((stat, i) => (
          <Card key={i} className="p-6">
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 h-96">
          <h3 className="text-lg font-semibold text-white mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none'}} />
              <Area type="monotone" dataKey="users" stroke="#6366f1" fill="#6366f140" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="secondary">Add New User</Button>
            <Button className="w-full justify-start" variant="secondary">Create Course</Button>
            <Button className="w-full justify-start" variant="secondary">View Reports</Button>
            <Button className="w-full justify-start" variant="secondary">System Settings</Button>
          </div>
          
          <h3 className="text-lg font-semibold text-white mt-8 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center"><span className="text-gray-400">API Status</span><span className="text-emerald-500 font-medium">● Online</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400">Database</span><span className="text-emerald-500 font-medium">● Online</span></div>
            <div className="flex justify-between items-center"><span className="text-gray-400">AI Services</span><span className="text-amber-500 font-medium">● Degraded</span></div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
