import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiMail, FiArrowLeft, FiSend, FiCheck } from 'react-icons/fi';
import { authService } from '../../services/authService';

const schema = z.object({ email: z.string().email('Enter a valid email address') });

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await authService.forgotPassword(data);
      setSent(true);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-gray-400 text-sm mb-2">
              We sent a password reset link to <span className="text-indigo-400 font-medium">{getValues('email')}</span>
            </p>
            <p className="text-gray-500 text-xs">Didn't receive it? Check your spam folder or wait a few minutes.</p>
            <button onClick={() => setSent(false)} className="mt-6 text-indigo-400 hover:text-indigo-300 text-sm transition-colors">
              Try another email
            </button>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Forgot Password?</h1>
              <p className="text-gray-400 text-sm mt-1">No worries! Enter your email and we'll send a reset link.</p>
            </div>

            {serverError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm mb-4">{serverError}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input {...register('email')} type="email" placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-colors" />
                </div>
                {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiSend className="w-4 h-4" /> Send Reset Link</>}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center justify-center gap-1 transition-colors">
                <FiArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
