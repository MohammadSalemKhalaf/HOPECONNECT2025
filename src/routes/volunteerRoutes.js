import express from 'express';
import { createTask, getOpenTasks, assignTask } from '../controllers/volunteerController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/add', authMiddleware(['orphanage_staff', 'admin']), createTask);


router.get('/open', getOpenTasks);


router.put('/assign', authMiddleware(['admin']), assignTask);

export default router;