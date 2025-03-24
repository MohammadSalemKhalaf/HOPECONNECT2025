import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (roles = []) => {
    // If roles is a string, convert it to an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return async (req, res, next) => {
        // Retrieve token from the request header
        const token = req.header('authorization');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Check if the user exists in the database
            const [users] = await pool.query(
                'SELECT id, full_name, email, role FROM user WHERE id = ?',
                [decoded.id]
            );

            if (users.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const user = users[0];

            // If roles are provided, check if the user's role matches the required roles
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Unauthorized: Insufficient role' });
            }

            // Attach the user to the request object
            req.user = user;
            next();
        } catch (e) {
            return res.status(400).json({ message: 'Token is not valid' });
        }
    };
};

export default authMiddleware;
