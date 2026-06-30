import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        {/* Agar backend se image URL aaye toh wo use karein, warna placeholder layout */}
        <span className="image-icon">📦</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description || 'No description available.'}</p>
        <div className="product-footer">
          <span className="product-price">Rs. {product.price}</span>
          <Link to={`/product/${product._id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;