const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Saare routes protected hain kyunki cart login ke baad access hoti hai
router.get('/cart', protect, getCart);
router.post('/cart/add', protect, addToCart);
router.delete('/cart/remove/:productId', protect, removeFromCart);

module.exports = router;