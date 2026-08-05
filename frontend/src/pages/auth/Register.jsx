import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiChevronRight, FiCheck } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['STUDENT', 'INSTRUCTOR']),
});

const Register = () => {
  const [step, setStep] = useState(1);
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, trigger, watch, setValue } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { role: 'STUDENT' }
  });
  
  const selectedRole = watch('role');

  const onNextStep = async () => {
    const fieldsToValidate = step === 1 ? ['name', 'email'] : ['password'];
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep(prev => prev + 1);
  };

  const onSubmit = async (data) => {
    try {
      await registerAuth(data);
      showSuccess('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      showError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-dark p-8 rounded-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Create Account</h2>
        <div className="flex space-x-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2 w-8 rounded-full ${step >= i ? 'bg-primary-500' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <Input label="Full Name" icon={<FiUser />} placeholder="John Doe" {...register('name')} error={errors.name} />
              <Input label="Email Address" type="email" icon={<FiMail />} placeholder="you@example.com" {...register('email')} error={errors.email} />
              <Button type="button" onClick={onNextStep} className="w-full mt-4" icon={<FiChevronRight />}>Continue</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <Input label="Password" type="password" icon={<FiLock />} placeholder="••••••••" {...register('password')} error={errors.password} />
              <div className="text-xs text-gray-400 mt-2">Must be at least 8 characters.</div>
              <div className="flex gap-4 mt-6">
                <Button type="button" variant="ghost" onClick={() => setStep(1)} className="flex-1">Back</Button>
                <Button type="button" onClick={onNextStep} className="flex-1">Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">I want to:</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRole === 'STUDENT' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => setValue('role', 'STUDENT')}
                >
                  <div className="text-xl mb-2">📚</div>
                  <h3 className="font-semibold text-white">Learn</h3>
                  <p className="text-xs text-gray-400 mt-1">Enroll in courses and upskill</p>
                </div>
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRole === 'INSTRUCTOR' ? 'border-primary-500 bg-primary-500/10' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => setValue('role', 'INSTRUCTOR')}
                >
                  <div className="text-xl mb-2">🎓</div>
                  <h3 className="font-semibold text-white">Teach</h3>
                  <p className="text-xs text-gray-400 mt-1">Create courses and mentor</p>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button type="button" variant="ghost" onClick={() => setStep(2)} className="flex-1">Back</Button>
                <Button type="submit" isLoading={isSubmitting} className="flex-1" icon={<FiCheck />}>Complete</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
          Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;

