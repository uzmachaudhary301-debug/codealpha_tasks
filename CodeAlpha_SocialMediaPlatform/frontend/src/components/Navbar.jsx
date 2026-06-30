import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Auth state access karne ke liye
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth(); // isAuthenticated status aur logout dono nikale

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">✨ AlphaConnect</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/create-post" className="nav-item btn-create">+ Post</Link>
        <Link to="/profile" className="nav-item">Profile</Link>
        
        {/* Dynamic Condition: Agar login hai to Logout dikhe, nahi to Login link */}
        {isAuthenticated ? (
          <button 
            onClick={logout} 
            className="nav-item btn-login" 
            style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-item btn-login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;