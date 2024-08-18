import React from 'react';

const NavBar = ({ signup }) => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          RustE
        </div>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href={signup ? "/signup" : "/login"} className="text-white hover:text-gray-200">
            {signup ? "Signup" : "Login"}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
