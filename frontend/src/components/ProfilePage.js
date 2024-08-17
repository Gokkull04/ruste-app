import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user, setUser, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          navigate('/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [navigate, setIsAuthenticated, setUser]);

  const handleLogout = async () => {
    // Implement logout logic here
    try {
      const response = await fetch('/api/logout', {
        method: 'POST'
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(false);
        setUser({});
        navigate('/');
      } else {
        alert('Failed to logout');
      }
    } catch (error) {
      alert('Error logging out');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p className="mb-4">Name: {user.name}</p>
      <p className="mb-4">Email: {user.email}</p>
      <button onClick={handleLogout} className="w-full bg-red-600 text-white p-2">Logout</button>
    </div>
  );
};

export default ProfilePage;
