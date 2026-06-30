import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCart = async () => {
    if (!token) {
      setError('Please login to view your shopping cart.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.items || response.data || []);
    } catch (err) {
      setError('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.productId?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  };

  const handlePlaceOrder = async () => {
    setCheckoutLoading(true);
    setError('');

    try {
      // Backend controller ke mutabiq cart items ko products ke structure mein map kar rahe hain
      const formattedProducts = cartItems.map(item => ({
        productId: item.productId?._id || item.productId,
        quantity: item.quantity
      }));

      // FIXED PAYLOAD: Ab data keys bilkul match karengi orderController ke variable ke sath
      await axios.post(
        'http://localhost:5000/api/order',
        { 
          products: formattedProducts, 
          totalPrice: calculateTotal() 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Loading your shopping cart...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>

      {error && <div className="error-banner">{error}</div>}

      {!token && (
        <div className="auth-alert-box">
          <p>You must be authenticated to check out products.</p>
          <button className="auth-redirect-btn" onClick={() => navigate('/login')}>Go to Login Page</button>
        </div>
      )}

      {token && cartItems.length === 0 && (
        <div className="empty-cart-box">
          <span className="empty-icon">🛒</span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>Shop Now</button>
        </div>
      )}

      {token && cartItems.length > 0 && (
        <div className="cart-content-wrapper">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item._id || item.productId?._id} className="cart-item-row">
                <div className="item-thumbnail" style={{ background: 'none', display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={item.productId?.image || 'https://via.placeholder.com/60'} 
                    alt={item.productId?.name} 
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.productId?.name || 'Premium Product'}</h4>
                  <p className="item-qty">Quantity: {item.quantity}</p>
                </div>
                <div className="item-price-section">
                  <span>Rs. {(item.productId?.price || 0) * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal:</span>
              <strong>Rs. {calculateTotal()}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free-tag">FREE</span>
            </div>
            <hr className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>Rs. {calculateTotal()}</span>
            </div>

            <button 
              className="checkout-btn" 
              onClick={handlePlaceOrder}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Processing Order...' : 'Place Secure Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;