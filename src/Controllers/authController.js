import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO user (full_name, email, password) VALUES (?, ?, ?)', [
      full_name,
      email,
      hashedPassword
    ]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
