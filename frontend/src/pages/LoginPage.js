import React from 'react';
import NavBar from '../components/Navbar';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Login Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to RustE</h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Mail ID
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-purple-700"
            >
              Submit
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/signup" className="text-sm text-purple-600 hover:underline">
              Create an account?
            </a>
            <br />
            <a href="/forgot-password" className="text-sm text-purple-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} RustE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
