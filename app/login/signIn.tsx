"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token } = response.data;
      // Save the token to local storage
      localStorage.setItem('token', token);
      // Redirect to the dashboard after successful login
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error logging in:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'An error occurred while logging in');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="text-center">
          <h2 className="text-3xl text-gray-700 font-bold">Record Management System</h2>
          <p className="mt-2 text-lg text-gray-700">Please log in to continue</p>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-gray-900 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-900">
            Don't have an account?{' '}
            <Link href="/signUp" className='font-medium text-blue-600 hover:text-blue-500'>Sign Up</Link>
          </p>
          <p className='text-gray-800'>
            Experience the dashboard{' '}
            <Link href="https://rmy.vercel.app/dash" className='text-blue-600 hover:text-blue-500'>
              Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
