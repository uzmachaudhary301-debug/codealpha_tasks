import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('Please login to view your order history.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data || []);
      } catch (err) {
        setError('Failed to fetch your order logs.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Loading your order history...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>Your Order Logs</h2>

      {error && <div className="error-banner">{error}</div>}

      {!token && (
        <div className="auth-alert-box">
          <p>You must be signed in to review personal invoices.</p>
          <button className="auth-redirect-btn" onClick={() => navigate('/login')}>Go to Login Page</button>
        </div>
      )}

      {token && orders.length === 0 && (
        <div className="empty-orders-box">
          <span className="empty-icon">📋</span>
          <h3>No Orders Placed Yet</h3>
          <p>You haven't bought anything from AlphaShop so far.</p>
          <button className="shop-now-btn" onClick={() => navigate('/')}>Browse Products</button>
        </div>
      )}

      {token && orders.length > 0 && (
        <div className="orders-list-wrapper">
          {orders.map((order) => (
            <div key={order._id} className="order-main-card">
              <div className="order-card-header">
                <div>
                  <span className="label-text">ORDER ID:</span>
                  <span className="value-text hash-id"> #{order._id}</span>
                </div>
                <div>
                  <span className="label-text">DATE:</span>
                  <span className="value-text"> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}</span>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items-summary">
                  {/* FIXED: 'items' array ko badal kar 'products' kiya backend schema ke mutabiq */}
                  {order.products?.map((item, index) => (
                    <div key={index} className="order-item-mini-row">
                      <span>📦 {item.productId?.name || 'Product'}</span>
                      <span className="qty-tag">x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="order-financials">
                  <div className="status-badge-container">
                    <span className={`status-badge ${order.status || 'pending'}`}>
                      {order.status || 'Processing'}
                    </span>
                  </div>
                  <div className="total-bill-box">
                    <span className="bill-label">Total Paid:</span>
                    {/* FIXED: 'totalAmount' ko badal kar 'totalPrice' kiya backend schema ke mutabiq */}
                    <span className="bill-amount">Rs. {order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;