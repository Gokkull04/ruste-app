import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavBar from '../components/Navbar';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', { // Fetch URL with port number
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok) {
          setSuccess(data.message);
          setError('');
          navigate('/notes'); // Redirect to the notes page after successful signup
        } else {
          setError(data.message || 'Something went wrong');
          setSuccess('');
        }
      } else {
        setError('Invalid response format');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      setError('Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar signup />

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up for RustE</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none hover:bg-purple-700"
            >
              Submit
            </button>
          </form>

          {success && (
            <div className="mt-4 text-center text-green-600">
              {success}
            </div>
          )}

          {error && (
            <div className="mt-4 text-center text-red-600">
              {error}
            </div>
          )}

          <div className="mt-6 text-center flex justify-center">
            <a href="/login" className="text-sm text-purple-600 hover:underline">
              Already have an account? Login
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} RustE. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
