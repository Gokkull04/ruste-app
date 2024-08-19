import React from 'react';
import { useAuth } from '../components/AuthProvider'; // Adjust the path as needed

const NavBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          RustE
        </div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          {isLoggedIn ? (
            <a href="/profile" className="text-white hover:text-gray-200">Profile</a>
          ) : (
            <a href="/login" className="text-white hover:text-gray-200">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
