import express from 'express';
import { 
  createCampaign, 
  getAllCampaigns, 
  donateToCampaign 
} from '../Controllers/emergencyCampaignController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public access to view campaigns
router.get('/', getAllCampaigns);

// Admin only for creating campaigns
router.post('/', authMiddleware(['admin']), createCampaign);

// donor and admin 
router.post('/:id/donate', authMiddleware(['donor', 'admin']), donateToCampaign);

export default router;