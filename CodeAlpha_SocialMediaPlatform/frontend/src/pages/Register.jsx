import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Auth context hook import kiya
import './Register.css';

function Register() {
  const { login } = useAuth(); // 2. Registration ke baad direct state pass karne ke liye login function nikala
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      formErrors.username = "❌ Username field cannot be left blank!";
    } else if (username.trim().length < 3) {
      formErrors.username = "❌ Username must be at least 3 characters long!";
    }

    if (!email) {
      formErrors.email = "❌ Email field cannot be left blank!";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "❌ Please provide a structurally valid email!";
    }

    if (!password) {
      formErrors.password = "❌ Security requirement: Password cannot be empty!";
    } else if (password.length < 6) {
      formErrors.password = "❌ Guard alert: Password length must be at least 6 characters!";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registration initialized with validated dataset:", { username, email, password });
      
      // 3. Validation pass hote hi user local authentication state mein save ho kar directly route bypass karega
      login(); 
      
      // Baad mein yahan backend API call (axios/fetch) aayegi user save karne ke liye
    }
  };

  return (
    <div className="auth-wrapper animated-fade-in">
      <div className="auth-card animated-slide-up">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join AlphaConnect to share moments and build your developer network.</p>
        
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="johndoe"
              value={username}
              autoComplete="off"
              onChange={(e) => {
                setUsername(e.target.value);
                if(errors.username) setErrors({...errors, username: ''});
              }}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
                if(errors.email) setErrors({...errors, email: ''});
              }}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                if(errors.password) setErrors({...errors, password: ''});
              }}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          <button type="submit" className="btn-auth">Sign Up Securely</button>
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;