import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Welcome Back</h2>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded-md transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <span className="h-px w-full bg-gray-700" />
          <span className="text-sm">or</span>
          <span className="h-px w-full bg-gray-700" />
        </div>

        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 py-2 rounded-md transition duration-300"
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>
          <button
            className="w-full flex items-center justify-center space-x-2 bg-black text-white hover:bg-gray-800 py-2 rounded-md transition duration-300"
          >
            <FaApple />
            <span>Continue with Apple</span>
          </button>
        </div>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
