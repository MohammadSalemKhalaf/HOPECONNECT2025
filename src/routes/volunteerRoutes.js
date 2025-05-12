import express from 'express';
import { 
  createTask, 
  getOpenTasks, 
  assignTask 
} from '../controllers/volunteerController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Orphanage staff and admin can create tasks
router.post('/add', authMiddleware(['orphanage_staff', 'admin']), createTask);

// Public access to open tasks
router.get('/open', getOpenTasks);

// Only admin can assign tasks
router.put('/assign', authMiddleware(['admin']), assignTask);

export default router;