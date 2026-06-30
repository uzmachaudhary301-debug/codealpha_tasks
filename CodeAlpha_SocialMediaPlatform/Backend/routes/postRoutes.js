import express from 'express';
import { createPost, getAllPosts, toggleLikePost } from '../controllers/postController.js';
import protect from '../middleware/authMiddleware.js'; // Security middleware check

const router = express.Router();

// Routes definitions
router.post('/create', protect, createPost); // Secure route
router.get('/feed', getAllPosts);           // Public feed route
router.put('/:id/like', protect, toggleLikePost); // Secure toggle route

export default router;