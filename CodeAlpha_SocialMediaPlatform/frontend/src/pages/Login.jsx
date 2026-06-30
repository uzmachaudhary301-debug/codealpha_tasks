import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Auth hook import kiya
import './Login.css';

function Login() {
  const { login } = useAuth(); // 2. Context se login function nikala
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [isForgotView, setIsForgotView] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      formErrors.email = "❌ Email field cannot be left blank!";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "❌ Please provide a structurally valid email!";
    }

    if (!isForgotView) {
      if (!password) {
        formErrors.password = "❌ Security requirement: Password cannot be empty!";
      } else if (password.length < 6) {
        formErrors.password = "❌ Guard alert: Password length must be at least 6 characters!";
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isForgotView) {
        console.log("Transmission initialized with validated dataset:", { email, password });
        
        // 3. Ab validation pass hote hi yeh function user ko instantly authenticate kar dega
        login(); 
        
      } else {
        setSuccessMessage("📩 Token dispatched! Please verify your inbox for recovery link.");
        setEmail('');
      }
    }
  };

  return (
    <div className="auth-wrapper animated-fade-in">
      <div className="auth-card animated-slide-up">
        <h2>{isForgotView ? "Reset Credentials" : "Welcome Back"}</h2>
        <p className="auth-subtitle">
          {isForgotView 
            ? "Enter your account email to generate a secure temporal access link." 
            : "Log in to check your feed and connect with friends."}
        </p>
        
        {successMessage ? (
          <div className="success-container animated-fade-in">
            <p>{successMessage}</p>
            <button className="btn-auth" type="button" onClick={() => { setSuccessMessage(''); setIsForgotView(false); }}>
              Return to Login Panel
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
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
            
            {!isForgotView && (
              <div className="form-group">
                <div className="label-wrapper">
                  <label>Password</label>
                  <span className="forgot-link" onClick={() => { setIsForgotView(true); setErrors({}); }}>
                    Forgot Password?
                  </span>
                </div>
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
            )}
            
            <button type="submit" className="btn-auth">
              {isForgotView ? "Generate Recovery Link" : "Sign In Securely"}
            </button>
          </form>
        )}
        
        <p className="auth-redirect">
          {isForgotView ? (
            <span className="back-span" onClick={() => { setIsForgotView(false); setErrors({}); }}>
              ← Abort and back to Sign In
            </span>
          ) : (
            <>Don't have an account? <Link to="/register">Create one</Link></>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;