import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'; // Assuming you have a LoginPage component
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/Forgotpassword';
import NotesPage from './pages/NotesPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
