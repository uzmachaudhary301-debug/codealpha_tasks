import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [cartCount, setCartCount] = useState(0);

  // Cart item count fetch karne ke liye function
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!token) {
        setCartCount(0);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Cart items array se total items calculate karte hain
        const cartData = response.data;
        const totalItems = cartData.items ? cartData.items.reduce((total, item) => total + item.quantity, 0) : 0;
        setCartCount(totalItems);
      } catch (err) {
        console.error('Failed to load cart count into navbar');
      }
    };

    fetchCartCount();
    
    // Har 2 seconds baad automatically count update karne ke liye (Poll interval)
    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">AlphaShop</Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {/* FIXED: "Cart" text dropped, strictly icon and dynamic badge */}
          <Link to="/cart" className="nav-link cart-nav-link" title="Shopping Cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          
          {token ? (
            <>
              <Link to="/orders" className="nav-link">Orders</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;