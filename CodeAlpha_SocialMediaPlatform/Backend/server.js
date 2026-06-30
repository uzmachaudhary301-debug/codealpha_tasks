import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; // Route import kiya

dotenv.config();

// Connect Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Main Auth Route Point Middleware
app.use('/api/auth', authRoutes);

// Base Check
app.get('/', (req, res) => {
  res.status(200).json({ message: "AlphaConnect Secure API Gateway Node running smoothly." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Operational Server actively listening on secure port: ${PORT}`);
});