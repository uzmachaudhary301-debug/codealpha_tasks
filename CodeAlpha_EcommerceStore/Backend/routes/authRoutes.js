const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword } = require('../controllers/authController');

// Register & Login Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Frontend ke URL ke mutabiq exact matching route
router.post('/forgot-password', forgotPassword);

module.exports = router;