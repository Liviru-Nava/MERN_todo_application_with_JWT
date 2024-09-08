// src/pages/HomePage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleTasksClick = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/task');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h1>Welcome to the To-Do List Application</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><button onClick={handleTasksClick}>Go to Tasks</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
