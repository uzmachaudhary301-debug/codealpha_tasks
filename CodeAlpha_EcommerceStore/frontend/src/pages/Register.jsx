import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    // Strict client-side password strength validation block
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Backend Register API hit kar rahe hain (Sahi route /api/register match kar diya)
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        email,
        password
      });

      if (response.data) {
        setSuccess(true);
        // 2 seconds ke baad user ko automatically login page par shift kar dena
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Global layout wrapper main-content sync kar di taake footer niche stretch ho */
    <div className="register-page main-content">
      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us to explore the best e-commerce deals</p>

        {error && <div className="error-banner">{error}</div>}
        {success && <div className="success-banner">Account created successfully! Redirecting to login...</div>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <p className="loading-text">Creating your secure profile...</p>
          </div>
        ) : (
          !success && (
            /* autoComplete="off" signals the browser not to autofill this form */
            <form onSubmit={handleRegister} className="register-form" autoComplete="off">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="alphashop-register-fullname" /* Unique standard field name */
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="new-password" /* Stops browser from matching cached forms */
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="alphashop-register-useremail"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="alphashop-register-userpassword"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="register-submit-btn">Register</button>
            </form>
          )
        )}

        <div className="register-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;