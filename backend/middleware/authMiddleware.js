import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';

export const authMiddleware = async (req, res, next) => {
  let token;

  // if authorization header exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
};