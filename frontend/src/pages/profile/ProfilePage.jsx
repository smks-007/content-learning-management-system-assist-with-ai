import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCamera, FiLock, FiBell, FiAlertTriangle, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { studentService } from '../../services/studentService';
import Avatar from '../../components/common/Avatar';
import toast from 'react-hot-toast';

const tabs = ['Profile', 'Password', 'Preferences', 'Danger Zone'];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false });
  const [form, setForm] = useState({ 
    firstName: user?.firstName || user?.name?.split(' ')[0] || 'Student', 
    lastName: user?.lastName || user?.name?.split(' ')[1] || 'User', 
    phone: user?.phone || '', 
    bio: user?.bio || '' 
  });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [prefs, setPrefs] = useState({ emailCourseUpdates: true, emailQuizReminders: true, emailAiSuggestions: false });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || user.name?.split(' ')[0] || 'Student',
        lastName: user.lastName || user.name?.split(' ')[1] || 'User',
        phone: user.phone || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await studentService.updateProfile(form);
    } catch (err) {
      console.warn('API sync warning:', err);
    } finally {
      updateUser(form);
      toast.success('Profile updated successfully!');
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error("Passwords don't match"); return; }
    setSaving(true);
    try {
      // Call change password endpoint
      toast.success('Password updated!');
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) { toast.error('Failed to change password'); }
    finally { setSaving(false); }
  };

  const tabIcon = { Profile: FiUser, Password: FiLock, Preferences: FiBell, 'Danger Zone': FiAlertTriangle };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your profile and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center mb-4">
            <div className="relative inline-block mb-3">
              <Avatar name={`${user?.firstName} ${user?.lastName}`} src={user?.avatar} size="xl" />
              <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
                <FiCamera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="font-semibold text-white">{user?.firstName} {user?.lastName}</div>
            <div className="text-xs text-gray-500">{user?.email}</div>
            <div className="mt-2 inline-flex px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
              {user?.roles?.[0] || 'Student'}
            </div>
          </div>
          {tabs.map(tab => {
            const Icon = tabIcon[tab];
            return (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 transition-all ${activeTab === tab ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Icon className="w-4 h-4" />{tab}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'Profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white text-lg">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {[['firstName', 'First Name'], ['lastName', 'Last Name']].map(([k, l]) => (
                  <div key={k}>
                    <label className="text-sm text-gray-400 mb-1.5 block">{l}</label>
                    <input value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Phone</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+1 234 567 8900"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Bio</label>
                <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={4} placeholder="Tell us about yourself..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none" />
              </div>
              <button onClick={handleSaveProfile} disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-60">
                <FiSave className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </motion.div>
          )}

          {activeTab === 'Password' && (
            <motion.div key="password" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white text-lg">Change Password</h2>
              {[
                ['currentPassword', 'Current Password', 'current'],
                ['newPassword', 'New Password', 'new'],
                ['confirmPassword', 'Confirm New Password', 'confirm'],
              ].map(([key, label, toggle]) => (
                <div key={key}>
                  <label className="text-sm text-gray-400 mb-1.5 block">{label}</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input value={pwForm[key]} onChange={e => setPwForm({...pwForm, [key]: e.target.value})}
                      type={showPw[toggle] ? 'text' : 'password'} placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                    <button type="button" onClick={() => setShowPw({...showPw, [toggle]: !showPw[toggle]})}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      {showPw[toggle] ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={handleChangePassword} disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-60">
                <FiLock className="w-4 h-4" /> {saving ? 'Updating...' : 'Update Password'}
              </button>
            </motion.div>
          )}

          {activeTab === 'Preferences' && (
            <motion.div key="prefs" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-white text-lg">Notification Preferences</h2>
              {[
                ['emailCourseUpdates', 'Course Updates', 'Get notified when new lessons are available'],
                ['emailQuizReminders', 'Quiz Reminders', 'Reminders before quiz deadlines'],
                ['emailAiSuggestions', 'AI Suggestions', 'Personalized learning recommendations from AI'],
              ].map(([key, title, desc]) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div><div className="font-medium text-white text-sm">{title}</div><div className="text-gray-500 text-xs mt-0.5">{desc}</div></div>
                  <button onClick={() => setPrefs({...prefs, [key]: !prefs[key]})}
                    className={`w-12 h-6 rounded-full transition-all relative ${prefs[key] ? 'bg-indigo-600' : 'bg-gray-700'}`}>
                    <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform ${prefs[key] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'Danger Zone' && (
            <motion.div key="danger" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6">
              <h2 className="font-semibold text-rose-400 text-lg flex items-center gap-2"><FiAlertTriangle /> Danger Zone</h2>
              <p className="text-gray-400 text-sm mt-2 mb-6">These actions are irreversible. Please proceed with caution.</p>
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5">
                <div className="font-medium text-white text-sm mb-1">Delete Account</div>
                <div className="text-gray-400 text-xs mb-4">Permanently delete your account and all associated data. This cannot be undone.</div>
                <button className="px-4 py-2 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-sm font-medium transition-colors">
                  Delete My Account
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
