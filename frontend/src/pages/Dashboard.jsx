import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: '#65a4e2ff', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h1>Welcome to Travel Buddy Dashboard!</h1>
        <p>Hello, {user.name || user.username || user.email}!</p>
        <button 
          onClick={handleLogout}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div style={{ 
        background: '#356596ff', 
        padding: '20px', 
        borderRadius: '8px' 
      }}>
        <h2>Your Travel Dashboard</h2>
        <p>Welcome to your travel planning center! Here you can:</p>
        <ul>
          <li>Plan new trips</li>
          <li>Find travel buddies</li>
          <li>Explore destinations</li>
          <li>Manage your travel preferences</li>
        </ul>
        
        <div style={{ marginTop: '20px' }}>
          <h3>User Information:</h3>
          <pre style={{ 
            background: '#65a4e2ff', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
