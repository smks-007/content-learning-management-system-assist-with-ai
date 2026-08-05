import React from 'react';
import { motion } from 'framer-motion';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';

export default function UserManagement() {
  const users = Array.from({length: 6}).map((_, i) => ({
    id: i, name: `User ${i}`, email: `user${i}@example.com`, role: i===0?'ADMIN':'STUDENT', status: i===2?'INACTIVE':'ACTIVE'
  }));

  return (
    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg transition-colors">Add User</button>
      </div>

      <div className="bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex gap-4 bg-dark-950">
          <input placeholder="Search users..." className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 w-64 outline-none focus:border-indigo-500 transition-colors" />
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg transition-colors">Bulk Actions</button>
        </div>
        
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-white/5 text-gray-300 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-600 bg-dark-800" /></th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">User Details</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Role</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-600 bg-dark-800" /></td>
                <td className="px-6 py-4 flex items-center gap-4">
                  <Avatar name={u.name} size="md" />
                  <div>
                    <p className="font-bold text-white mb-0.5">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select className="bg-dark-950 border border-white/10 text-xs text-white rounded px-2 py-1 outline-none">
                    <option selected={u.role==='STUDENT'}>STUDENT</option>
                    <option selected={u.role==='INSTRUCTOR'}>INSTRUCTOR</option>
                    <option selected={u.role==='ADMIN'}>ADMIN</option>
                  </select>
                </td>
                <td className="px-6 py-4"><Badge variant={u.status === 'ACTIVE' ? 'success' : 'secondary'}>{u.status}</Badge></td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-400 hover:text-indigo-300 font-medium mr-4">Edit</button>
                  <button className="text-rose-400 hover:text-rose-300 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
