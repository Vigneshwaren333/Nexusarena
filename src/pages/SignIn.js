import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Real API call to login user
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Invalid credentials');
        }
        
        // Store token and user in localStorage if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          // Use sessionStorage if remember me is not checked
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        
        // Success! Redirect to dashboard or home
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ submit: error.message || 'Invalid email or password. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="relative h-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cyber-gray opacity-80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/400?random=21')] bg-cover bg-center opacity-30"></div>
        
        <div className="absolute inset-0">
          {/* Grid lines effect */}
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #00f2ff11 1px, transparent 1px), linear-gradient(to bottom, #00f2ff11 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="font-future text-4xl md:text-5xl font-bold mb-2">
            <span className="text-white">WELCOME</span> <span className="text-neon-pink">BACK</span>
          </h1>
        </div>
      </section>

      {/* Sign In Form */}
      <section className="flex-grow py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-cyber-gray rounded-lg shadow-lg p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-neon-pink"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-neon-blue"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-blue"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-neon-pink"></div>
            
            <h2 className="font-future text-2xl font-bold mb-6 text-center">ACCESS YOUR ACCOUNT</h2>
            
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm">
                  {errors.submit}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-cyber-black border ${errors.email ? 'border-red-500' : 'border-neon-pink/50'} text-white p-3 rounded focus:outline-none focus:border-neon-pink transition-colors`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-cyber-black border ${errors.password ? 'border-red-500' : 'border-neon-pink/50'} text-white p-3 rounded focus:outline-none focus:border-neon-pink transition-colors`}
                  placeholder="Enter your password"
                />
                {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                
                <a href="#" className="text-sm text-neon-pink hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-neon-pink text-cyber-black font-future font-bold rounded hover:shadow-neon-pink transition-all duration-300 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
              </motion.button>
            </form>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account? <Link to="/signup" className="text-neon-blue hover:underline">Sign Up</Link>
              </p>
            </div>
            
            <div className="flex items-center my-8">
              <div className="flex-grow h-px bg-gray-700"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-700"></div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full py-3 bg-cyber-black border border-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-900 transition-colors">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.552 21.128 10.252 21.928C10.882 22.030 11.166 21.659 11.166 21.335C11.166 21.044 11.157 20.328 11.151 19.435C7.903 20.070 7.143 18.022 7.143 18.022C6.549 16.863 5.703 16.495 5.703 16.495C4.535 15.862 5.784 15.877 5.784 15.877C7.069 15.962 7.753 17.001 7.753 17.001C8.893 18.581 10.689 18.077 11.190 17.764C11.291 17.120 11.581 16.678 11.900 16.443C9.427 16.202 6.834 15.360 6.834 11.363C6.834 10.276 7.347 9.384 8.776 8.689C8.660 8.380 8.209 7.360 9.073 5.891C9.073 5.891 10.146 5.716 11.197 6.884C11.754 6.686 12.406 6.586 13.004 6.586C13.604 6.586 14.256 6.686 14.803 6.884C15.874 5.701 16.927 5.891 16.927 5.891C17.791 7.360 17.340 8.380 17.223 8.689C18.653 9.384 19.165 10.276 19.165 11.363C19.165 15.374 16.568 16.198 14.090 16.432C14.485 16.724 14.870 17.318 14.870 18.236C14.870 19.538 14.856 20.936 14.856 21.310C14.856 21.630 15.136 22.006 15.776 21.899C20.444 21.090 24 16.957 24 12C24 6.477 19.522 2 14 2H12Z" />
                </svg>
                Sign in with Github
              </button>
              
              <button className="w-full py-3 bg-cyber-black border border-gray-600 text-white rounded flex items-center justify-center hover:bg-gray-900 transition-colors">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 