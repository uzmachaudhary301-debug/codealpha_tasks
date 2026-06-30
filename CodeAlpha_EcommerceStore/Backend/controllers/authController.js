const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register new user (Plain Text Password)
// @route   POST /api/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        const user = await User.create({
            name, 
            email,
            password: password 
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: 'User registered successfully!'
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data received.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token (Supports Name OR Email)
// @route   POST /api/login
const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [
                { email: identifier },
                { name: identifier }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: 'No account found with this username or email.' });
        }

        if (password === user.password) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            });

            return res.json({
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            return res.status(401).json({ message: 'Invalid password. Please try again.' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot/Reset Password Verification & Actual Saving Flow
// @route   POST /api/forgot-password
const forgotPassword = async (req, res) => {
    try {
        const { identifier, newPassword } = req.body; // Frontend se donon cheezien li hain

        // 1. Account dhoondo (by Email OR Name)
        const user = await User.findOne({
            $or: [
                { email: identifier },
                { name: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'No account associated with this identifier.' });
        }

        // STAGE 2: Agar user ne naya password set kar ke submit kiya hai
        if (newPassword) {
            user.password = newPassword; // Plain-text password directly modify kiya
            await user.save();           // Database mein save kar diya

            return res.status(200).json({ 
                message: 'Password updated successfully! Redirecting to login...' 
            });
        }

        // STAGE 1: Agar user ne abhi naya password nahi bheja (Sirf account verify kar raha hai)
        return res.status(200).json({ 
            message: 'Account verified successfully! Please enter your new password.',
            userVerified: true // Yeh state frontend par forms open karegi
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, forgotPassword };