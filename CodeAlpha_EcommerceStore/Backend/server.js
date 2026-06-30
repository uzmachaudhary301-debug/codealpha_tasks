const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Database connection import kiya

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Taake hum JSON data receive kar sakein

// Routes Links
app.use('/api', require('./routes/authRoutes'));    // Register & Login APIs
app.use('/api', require('./routes/productRoutes')); // Product List & Details APIs
app.use('/api', require('./routes/cartRoutes'));    // Cart Add & Remove APIs
app.use('/api', require('./routes/orderRoutes'));   // Order Place & History APIs

// Test Route
app.get('/', (req, res) => {
    res.send("CodeAlpha Ecommerce Backend is running smoothly!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});