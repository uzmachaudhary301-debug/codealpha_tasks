import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Handles username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [forgotError, setForgotError] = useState('');

  // Naye States Password Reset Flow ke liye
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/login', {
        identifier,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');

    if (!forgotIdentifier.trim()) {
      setForgotError('Please enter your Registered Username or Email.');
      return;
    }

    // STAGE 2: Agar account verify ho chuka hai, toh naya password submit hoga
    if (isVerified) {
      if (newPassword !== confirmPassword) {
        setForgotError('Passwords do not match.');
        return;
      }
      if (newPassword.length < 6) {
        setForgotError('Password must be at least 6 characters long.');
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/forgot-password', {
          identifier: forgotIdentifier,
          newPassword: newPassword // Naya password backend par ja raha hai update hone
        });
        
        setForgotMessage(response.data.message || 'Password updated successfully!');
        
        // Success ke baad thori der ruk kar wapis login screen par bhej dega
        setTimeout(() => {
          setShowForgotModal(false);
          setIsVerified(false);
          setForgotIdentifier('');
          setNewPassword('');
          setConfirmPassword('');
          setForgotMessage('');
        }, 2000);
      } catch (err) {
        setForgotError(err.response?.data?.message || 'Failed to update password.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // STAGE 1: Pehle check karo ke user database mein exist karta hai ya nahi
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/forgot-password', {
        identifier: forgotIdentifier
      });
      
      if (response.data.userVerified) {
        setIsVerified(true);
        setForgotMessage(response.data.message || 'Account verified! Please enter your new password.');
      }
    } catch (err) {
      setForgotError(err.response?.data?.message || 'No account associated with this identifier.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page main-content">
      {!showForgotModal ? (
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Login to access your dashboard and cart</p>

          {error && <div className="auth-error-alert">{error}</div>}

          <form onSubmit={handleLoginSubmit} autoComplete="off">
            <div className="form-group">
              <label htmlFor="identifier">Username or Email</label>
              <input
                type="text"
                id="identifier"
                name="alphashop-username-email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter username or email"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="alphashop-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="forgot-link-wrapper">
              <button 
                type="button" 
                className="forgot-trigger-btn"
                onClick={() => { setShowForgotModal(true); setError(''); }}
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
          </form>

          <p className="auth-redirect-text">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      ) : (
        <div className="auth-card">
          <h2>Reset Password</h2>
          <p className="auth-subtitle">Recover your account access securely</p>

          {forgotError && <div className="auth-error-alert">{forgotError}</div>}
          {forgotMessage && <div className="auth-success-alert">{forgotMessage}</div>}

          <form onSubmit={handleForgotPasswordSubmit} autoComplete="off">
            {/* Input 1: Identifier - Ek dafa verify ho jaye toh isay disable kar dete hain */}
            <div className="form-group">
              <label htmlFor="forgotIdentifier">Registered Username or Email</label>
              <input
                type="text"
                id="forgotIdentifier"
                value={forgotIdentifier}
                onChange={(e) => setForgotIdentifier(e.target.value)}
                placeholder="Enter username or email"
                required
                disabled={isVerified}
              />
            </div>

            {/* Conditionally showing Password & Confirm Password inputs upon verification */}
            {isVerified && (
              <>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? 'Processing...' : isVerified ? 'Update Password' : 'Find Account & Reset'}
            </button>

            <button 
              type="button" 
              className="back-login-btn"
              onClick={() => { 
                setShowForgotModal(false); 
                setIsVerified(false);
                setForgotError(''); 
                setForgotMessage(''); 
              }}
            >
              Back to Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;