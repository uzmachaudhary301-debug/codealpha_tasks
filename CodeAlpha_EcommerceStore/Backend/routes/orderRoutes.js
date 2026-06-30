const express = require('express');
const router = express.Router();
const { placeOrder, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/order', protect, placeOrder);
router.get('/orders', protect, getMyOrders);

module.exports = router;