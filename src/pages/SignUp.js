import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Real API call to register user
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }
        
        // Store token in localStorage for authentication
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Success! Redirect to dashboard or home
        navigate('/');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({ submit: error.message || 'Registration failed. Please try again.' });
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
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/400?random=20')] bg-cover bg-center opacity-30"></div>
        
        <div className="absolute inset-0">
          {/* Grid lines effect */}
          <div className="h-full w-full" style={{
            backgroundImage: 'linear-gradient(to right, #7122fa11 1px, transparent 1px), linear-gradient(to bottom, #7122fa11 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="font-future text-4xl md:text-5xl font-bold mb-2">
            <span className="text-white">JOIN</span> <span className="text-neon-blue">NEXUS ARENA</span>
          </h1>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="flex-grow py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-cyber-gray rounded-lg shadow-lg p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-neon-blue"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-neon-pink"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-pink"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-neon-blue"></div>
            
            <h2 className="font-future text-2xl font-bold mb-6 text-center">CREATE YOUR ACCOUNT</h2>
            
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm">
                  {errors.submit}
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-cyber-black border ${errors.username ? 'border-red-500' : 'border-neon-blue/50'} text-white p-3 rounded focus:outline-none focus:border-neon-blue transition-colors`}
                  placeholder="Enter your username"
                />
                {errors.username && <p className="mt-1 text-red-400 text-xs">{errors.username}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-cyber-black border ${errors.email ? 'border-red-500' : 'border-neon-blue/50'} text-white p-3 rounded focus:outline-none focus:border-neon-blue transition-colors`}
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
                  className={`w-full bg-cyber-black border ${errors.password ? 'border-red-500' : 'border-neon-blue/50'} text-white p-3 rounded focus:outline-none focus:border-neon-blue transition-colors`}
                  placeholder="Create a password"
                />
                {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password}</p>}
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-cyber-black border ${errors.confirmPassword ? 'border-red-500' : 'border-neon-blue/50'} text-white p-3 rounded focus:outline-none focus:border-neon-blue transition-colors`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && <p className="mt-1 text-red-400 text-xs">{errors.confirmPassword}</p>}
              </div>
              
              <div className="mb-6">
                <label className={`flex items-start ${errors.agreeToTerms ? 'text-red-400' : 'text-gray-300'}`}>
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm">
                    I agree to the <a href="#" className="text-neon-blue hover:underline">Terms of Service</a> and <a href="#" className="text-neon-blue hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeToTerms && <p className="mt-1 text-red-400 text-xs">{errors.agreeToTerms}</p>}
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-neon-blue text-cyber-black font-future font-bold rounded hover:shadow-neon transition-all duration-300 mb-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </motion.button>
            </form>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account? <Link to="/signin" className="text-neon-pink hover:underline">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 