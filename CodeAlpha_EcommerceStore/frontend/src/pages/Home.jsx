import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Make sure your backend server is active.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Loading catalog, please wait...</p>
      </div>
    );
  }

  return (
    /* Yahan humne main-content class add ki hai taake styling index.css se sync ho jaye */
    <div className="home-page main-content">
      <header className="home-hero">
        <h1>Welcome to AlphaShop</h1>
        <p>Explore exclusive, premium collections managed entirely via MERN Stack</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      {!error && products.length === 0 && (
        <div className="empty-catalog">
          <h3>No Products Found</h3>
          <p>Please add products directly into your MongoDB Atlas collection to view them here.</p>
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;