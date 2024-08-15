import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenUser');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${url}/api/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
          console.log(data.user);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [url, token]);

  const handleLogout = () => {
    localStorage.removeItem('tokenUser');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Country:</strong> {user.country}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
