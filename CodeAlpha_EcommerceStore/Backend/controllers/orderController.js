const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create new order
// @route   POST /api/order
const placeOrder = async (req, res) => {
    try {
        const { products, totalPrice } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products in order' });
        }

        // 1. Create Order
        const order = await Order.create({
            userId: req.user._id,
            products,
            totalPrice
        });

        // 2. Order place hone ke baad user ki cart khali kar dein
        await Cart.findOneAndDelete({ userId: req.user._id });

        res.status(201).json({ message: 'Order placed successfully!', order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('products.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getMyOrders };