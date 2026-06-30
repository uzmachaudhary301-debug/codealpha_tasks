import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Header se token alag karenge ("Bearer TOKEN_STRING")
      token = req.headers.authorization.split(' ')[1];

      // Token verify karenge
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Database se user ka data nikal kar request object mein daal denge (password ke baghair)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Agle controller function par bhejo
    } catch (error) {
      return res.status(401).json({ message: "❌ Not authorized, token verification failed!" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied! No security token provided." });
  }
};

export default protect;