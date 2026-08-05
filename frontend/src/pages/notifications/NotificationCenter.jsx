import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiTrash2, FiInfo, FiAlertTriangle, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { notificationService } from '../../services/notificationService';
import EmptyState from '../../components/common/EmptyState';
import { timeAgo } from '../../utils/formatters';

const typeIcon = { INFO: FiInfo, SUCCESS: FiCheckCircle, WARNING: FiAlertTriangle, ERROR: FiAlertCircle };
const typeColor = { INFO: 'text-cyan-400 bg-cyan-400/10', SUCCESS: 'text-emerald-400 bg-emerald-400/10', WARNING: 'text-amber-400 bg-amber-400/10', ERROR: 'text-rose-400 bg-rose-400/10' };
const filters = ['All', 'Unread', 'Courses', 'Quizzes', 'System'];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchNotifications = async () => {
    try {
      const res = await notificationService.getNotifications({ size: 50 });
      setNotifications(res.data?.data?.content || res.data?.data || []);
    } catch { setNotifications([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (err) { console.error(err); }
  };

  const markAllRead = async () => {
    try {
      await notificationService.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) { console.error(err); }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error(err); }
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === 'Unread') return !n.isRead;
    if (activeFilter === 'Courses') return n.title?.toLowerCase().includes('course') || n.type === 'INFO';
    if (activeFilter === 'Quizzes') return n.title?.toLowerCase().includes('quiz');
    if (activeFilter === 'System') return n.type === 'WARNING' || n.type === 'ERROR';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FiBell className="text-indigo-400" /> Notifications
            {unreadCount > 0 && <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs font-bold">{unreadCount}</span>}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            <FiCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </motion.div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === f ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-12"><div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={FiBell} title="No notifications" description="You're all caught up! Check back later." />
        ) : (
          filtered.map((n, i) => {
            const Icon = typeIcon[n.type] || FiInfo;
            const colors = typeColor[n.type] || typeColor.INFO;
            return (
              <motion.div key={n.id || i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => !n.isRead && markAsRead(n.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${n.isRead ? 'bg-white/3 border-white/5' : 'bg-white/8 border-indigo-500/20 hover:border-indigo-500/40'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold text-sm ${n.isRead ? 'text-gray-300' : 'text-white'}`}>{n.title}</span>
                    {!n.isRead && <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />}
                  </div>
                  {n.message && <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{n.message}</p>}
                  <span className="text-gray-600 text-xs mt-1 block">{timeAgo(n.createdAt)}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                  className="text-gray-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100 p-1">
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
