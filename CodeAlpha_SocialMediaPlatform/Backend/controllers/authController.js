import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// User Registration Handler
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "❌ Account with this email or username already exists!" });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User in MongoDB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Generate Secure JWT Token
    const token = jwt.sign({ id: newUser._index }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: "🎉 User registered successfully!",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// User Login Handler
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "❌ Invalid credentials provided!" });
    }

    // Compare decrypted password strings
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "❌ Invalid credentials provided!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: "✅ Authentication successful!",
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};