import express from 'express';
import {
  register,
  login,
  getProfile,
  resetPassword 
} from '../Controllers/authController.js';

import authMiddleware from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile', authMiddleware(), getProfile);

router.post('/reset-password', authMiddleware(), resetPassword);

export default router;
