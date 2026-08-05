import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiCreditCard, FiTrendingUp } from 'react-icons/fi';
import { paymentService } from '../../services/paymentService';
import Badge from '../../components/common/Badge';
import EmptyState from '../../components/common/EmptyState';
import { formatDate, formatPrice } from '../../utils/formatters';

const statusVariant = { SUCCESS: 'success', PENDING: 'warning', FAILED: 'danger', REFUNDED: 'info' };

export default function BillingHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    paymentService.getHistory().then(res => {
      setPayments(res.data?.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const total = payments.filter(p => p.status === 'SUCCESS').reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">Billing History</h1>
        <p className="text-gray-400 text-sm mt-1">Your payment records and invoices</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Spent', value: formatPrice(total), icon: FiTrendingUp, color: 'text-emerald-400' },
          { label: 'Transactions', value: payments.length, icon: FiCreditCard, color: 'text-indigo-400' },
          { label: 'Successful', value: payments.filter(p => p.status === 'SUCCESS').length, icon: FiDownload, color: 'text-cyan-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Icon className={`w-5 h-5 ${color}`} /></div>
            <div><div className="text-lg font-bold text-white">{value}</div><div className="text-xs text-gray-400">{label}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-semibold text-white">Transactions</h2>
          <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"><FiDownload className="w-3 h-3" /> Export CSV</button>
        </div>
        {loading ? (
          <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto" /></div>
        ) : payments.length === 0 ? (
          <EmptyState icon={FiCreditCard} title="No payments yet" description="Enroll in a course to see your billing history here." />
        ) : (
          <div className="divide-y divide-white/5">
            {payments.map((p, i) => (
              <motion.div key={p.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <FiCreditCard className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{p.courseName || 'Course Purchase'}</div>
                  <div className="text-xs text-gray-500">{formatDate(p.paidAt || p.createdAt)}</div>
                </div>
                <Badge variant={statusVariant[p.status] || 'secondary'}>{p.status}</Badge>
                <div className="text-white font-semibold text-sm">{formatPrice(p.amount || 0, p.currency)}</div>
                <button className="text-gray-400 hover:text-white transition-colors"><FiDownload className="w-4 h-4" /></button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
