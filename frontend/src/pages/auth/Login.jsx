import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      showSuccess('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-dark p-8 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign In</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Email Address"
          type="email"
          icon={<FiMail />}
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email}
        />
        
        <div>
          <Input
            label="Password"
            type="password"
            icon={<FiLock />}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password}
          />
          <div className="flex justify-end mt-1">
            <Link to="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300">
              Forgot password?
            </Link>
          </div>
        </div>
        
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium">
          Create one
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;

