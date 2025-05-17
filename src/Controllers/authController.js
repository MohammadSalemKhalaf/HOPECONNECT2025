import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;


    const [existingUser] = await pool.query('SELECT id FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    await pool.query(
      'INSERT INTO user (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'user registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const [users] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

    if (users.length === 0) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'user not found' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    

    if (!match) {
      console.log('Password mismatch for:', email);
      return res.status(401).json({ message: 'invalid credential' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: 'failed to fetch profile' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    const [users] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'user not found' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'old password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE user SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ message: 'password change successfully' });
  } catch (error) {
    console.error('Password reset error:', error.message);
    res.status(500).json({ message: 'password reset fail' });
  }
};
