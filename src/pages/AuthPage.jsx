import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { Mail, Lock, UserPlus } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Logged in successfully!');
        const redirectTo = localStorage.getItem('redirectTo') || '/';
        localStorage.removeItem('redirectTo');
        navigate(redirectTo);
      }
    } else {
      // Sign up
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Check your email for the confirmation link!');
        // Optionally redirect to a pending confirmation page
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/50 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{message}</span>
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                isLogin ? 'Login' : <><UserPlus size={20} /> Sign Up</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-800 font-semibold transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
