import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-section brand-info">
          <h3 className="footer-brand">TrendLoop</h3>
          <p className="footer-desc">
            Your ultimate destination for premium collection dresses and luxury stitched couture designed to elevate your everyday style.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Navigation</h4>
          <ul>
            <li onClick={() => navigate('/')}>Shop Home</li>
            <li onClick={() => navigate('/cart')}>View Cart</li>
            <li onClick={() => navigate('/orders')}>Track Orders</li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="footer-section">
          <h4>Customer Care</h4>
          <ul>
            <li>Secure Checkout</li>
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact/Support Section */}
        <div className="footer-section contact-details">
          <h4>Get In Touch</h4>
          <p>
            <FaMapMarkerAlt className="footer-icon" /> <span>Islamabad-Rawalpindi, PK</span>
          </p>
          <p>
            <FaEnvelope className="footer-icon" /> <span>support@trendloop.com</span>
          </p>
          <p>
            <FaPhoneAlt className="footer-icon" /> <span>+92 (51) 111-222</span>
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 TrendLoop Apparels. All Rights Reserved.</p>
        <p className="footer-tech-tag">Powered by Advanced MERN Architecture</p>
      </div>
    </footer>
  );
};

export default Footer;