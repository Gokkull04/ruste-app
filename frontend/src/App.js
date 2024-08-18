import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage'
import LoginPage from './pages/LoginPage'; // Assuming you have a LoginPage component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Route for Login Page */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
