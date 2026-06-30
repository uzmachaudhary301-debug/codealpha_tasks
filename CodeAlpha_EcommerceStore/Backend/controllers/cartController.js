const Cart = require('../models/Cart');

// @desc    Get logged in user's cart
// @route   GET /api/cart
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
        if (!cart) {
            cart = await Cart.create({ userId: req.user._id, items: [] });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart/add
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) {
            // Agar user ki cart nahi hai toh nayi banayein
            cart = await Cart.create({
                userId: req.user._id,
                items: [{ productId, quantity }]
            });
        } else {
            // Check if product already exists in cart
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                // If exists, update quantity
                cart.items[itemIndex].quantity = quantity;
            } else {
                // If not exists, push new item
                cart.items.push({ productId, quantity });
            }
            await cart.save();
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user._id });
        if (cart) {
            cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart };