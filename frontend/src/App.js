import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NotesPage from './components/NotesPage';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </div>
  );
};

export default App;
