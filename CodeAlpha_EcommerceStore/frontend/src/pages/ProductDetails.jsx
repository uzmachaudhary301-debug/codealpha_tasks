import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from 'axios'; 
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams(); // URL se product id get karne ke liye
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartLoading, setCartLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login first to add items to your cart.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setCartLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // FIXED URL: 'http://localhost:5000/api/cart' ko badal kar '/cart/add' kiya hai backend routes ke mutabiq
      await axiosInstance.post(
        'http://localhost:5000/api/cart/add',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage('Product successfully added to your cart!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product to cart.');
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Fetching product details...</p>
      </div>
    );
  }

  if (error && !product) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="product-details-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Products</button>
      
      {error && <div className="error-banner">{error}</div>}
      {successMessage && <div className="success-banner">{successMessage}</div>}

      <div className="details-wrapper">
        {/* FIXED IMAGE CAPTURE: Placeholder box ki jagah database ki product image render karwa di */}
        <div className="details-image-placeholder" style={{ background: 'none' }}>
          <img 
            src={product?.image || 'https://via.placeholder.com/400'} 
            alt={product?.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
        
        <div className="details-info">
          <h1 className="details-title">{product?.name}</h1>
          <div className="details-price">Rs. {product?.price}</div>
          
          <div className="details-section">
            <h3>Description</h3>
            <p>{product?.description || 'No description provided for this premium item.'}</p>
          </div>

          <div className="details-section">
            <h3>Availability</h3>
            <p className="stock-status">In Stock (Ready to Ship)</p>
          </div>

          <button 
            className="add-to-cart-action-btn" 
            onClick={handleAddToCart}
            disabled={cartLoading}
          >
            {cartLoading ? 'Adding to Cart...' : 'Add to Shopping Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;