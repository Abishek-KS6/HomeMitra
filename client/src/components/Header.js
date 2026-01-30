import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">HomeMitra</Link>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <li><Link to="/admin">Admin Panel</Link></li>
                ) : (
                  <li><Link to="/dashboard">Dashboard</Link></li>
                )}
                <li>
                  <span>Welcome, {user?.name}</span>
                  <button onClick={handleLogout} className="btn" style={{marginLeft: '10px'}}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;