import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ setIsAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement signup logic here
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        alert('Signup successful');
        navigate('/profile');
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      alert('Error signing up');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input type="text" className="w-full p-2 border" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input type="email" className="w-full p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input type="password" className="w-full p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
