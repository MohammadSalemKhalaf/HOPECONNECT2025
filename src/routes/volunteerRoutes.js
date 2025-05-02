import express from 'express';
import { createTask, getOpenTasks, assignTask } from '../Controllers/volunteerController.js';
const router = express.Router();

router.post('/add', createTask);
router.get('/open', getOpenTasks);
router.put('/assign', assignTask);

export default router;