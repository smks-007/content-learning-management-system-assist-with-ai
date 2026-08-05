import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCheck, FiArrowLeft, FiLock } from 'react-icons/fi';
import { paymentService } from '../../services/paymentService';
import { formatPrice } from '../../utils/formatters';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course || { title: 'Premium Course', price: 29, id: null };
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', cardNumber: '', expiry: '', cvc: '' });

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (course.id) await paymentService.createPayment({ courseId: course.id });
      setTimeout(() => { setLoading(false); setStep('success'); }, 1500);
    } catch {
      setLoading(false);
    }
  };

  const formatCard = (val) => val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = (val) => val.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})(\d)/, '$1/$2');

  if (step === 'success') return (
    <div className="max-w-md mx-auto py-20 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6">
        <FiCheck className="w-10 h-10 text-emerald-400" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-400 mb-6">You're enrolled in <span className="text-indigo-400">{course.title}</span>. Start learning now!</p>
        <button onClick={() => navigate(course.id ? `/courses/${course.id}/learn` : '/courses')}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all">
          Start Learning →
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
        <FiArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Payment form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiCreditCard className="text-indigo-400" /> Payment Details
            </h2>
            <form onSubmit={handlePay} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} required type="email" placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1.5 block">Card Number</label>
                <input value={form.cardNumber} onChange={e => setForm({...form, cardNumber: formatCard(e.target.value)})} required placeholder="4242 4242 4242 4242" maxLength={19}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">Expiry Date</label>
                  <input value={form.expiry} onChange={e => setForm({...form, expiry: formatExpiry(e.target.value)})} required placeholder="MM/YY" maxLength={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono text-sm" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">CVC</label>
                  <input value={form.cvc} onChange={e => setForm({...form, cvc: e.target.value.replace(/\D/g,'').slice(0,3)})} required placeholder="123" maxLength={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <FiLock className="w-3 h-3" /> Secured by 256-bit SSL encryption
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : `Pay ${formatPrice(course.price || 0)}`}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Order summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
            <div className="flex gap-3 mb-4">
              <div className="w-16 h-16 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0 text-2xl">🎓</div>
              <div>
                <div className="font-medium text-white text-sm">{course.title}</div>
                <div className="text-gray-500 text-xs mt-1">Lifetime access</div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-400"><span>Subtotal</span><span>{formatPrice(course.price || 0)}</span></div>
              <div className="flex justify-between text-sm text-emerald-400"><span>Discount</span><span>-$0</span></div>
              <div className="flex justify-between font-bold text-white text-base pt-2 border-t border-white/10 mt-2">
                <span>Total</span><span>{formatPrice(course.price || 0)}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {['Full course access', 'Certificate of completion', 'AI learning assistant', '30-day money-back guarantee'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <FiCheck className="w-3 h-3 text-emerald-400 flex-shrink-0" />{f}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
