import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/" className="text-2xl font-bold">Reste</Link>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="mx-2">Profile</Link>
            <Link to="/notes" className="mx-2">Notes</Link>
          </>
        ) : (
          <Link to="/login" className="mx-2">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
