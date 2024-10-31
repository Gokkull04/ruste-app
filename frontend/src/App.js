import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/Forgotpassword";
import NotesPage from "./pages/NotesPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(() => {
     const token = localStorage.getItem("token");
     if (token) {
       setIsLoggedIn(true);
     }
   }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/signup"
              element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
