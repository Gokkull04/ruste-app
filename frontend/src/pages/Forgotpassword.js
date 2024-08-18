import React from 'react';
import NavBar from '../components/Navbar';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Forgot Password Form */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white bg-opacity-10 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">
            Forgot Password
          </h2>

          <form>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Mail ID
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-purple-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} RustE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
