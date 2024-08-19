import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthProvider'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar'; // Adjust the path as needed

const ProfilePage = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Example user data
  const [events, setEvents] = useState(0); // Example events count

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Fetch user data and events count from API or context
      // Example data
      setUser({ name: 'John Doe' });
      setEvents(10);
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar /> {/* Pass relevant props if needed */}
      <div className="container mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Profile</h1>
          {user && (
            <div>
              <p className="text-xl mb-2">Name: {user.name}</p>
              <p className="text-lg mb-4">Total Events: {events}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
