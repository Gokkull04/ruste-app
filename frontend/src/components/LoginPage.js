import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement authentication logic here
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        alert('Login successful');
        navigate('/profile');
      } else {
        alert('Incorrect email or password');
      }
    } catch (error) {
      alert('Error logging in');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" className="w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Login</button>
      </form>
      <div className="flex justify-between mt-4">
        <button onClick={() => navigate('/signup')} className="text-blue-600">Create an account?</button>
        <button className="text-blue-600">Forgot password?</button>
      </div>
    </div>
  );
};

export default LoginPage;
