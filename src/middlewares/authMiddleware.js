import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    const token = req.header('authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const [users] = await pool.query(
        'SELECT id, full_name, email, role FROM user WHERE id = ?',
        [decoded.id]
      );

      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = users[0];

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
      }

      req.user = user;
      next();
    } catch (e) {
      return res.status(400).json({ message: 'Token is not valid' });
    }
  };
};

export default authMiddleware;
