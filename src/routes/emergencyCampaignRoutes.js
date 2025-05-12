import express from 'express';
import { 
  createCampaign, 
  getAllCampaigns, 
  donateToCampaign 
} from '../controllers/emergencyCampaignController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public access to view campaigns
router.get('/', getAllCampaigns);

// Admin-only for creating campaigns
router.post('/', authMiddleware(['admin']), createCampaign);

// Donors and admin can donate
router.post('/:id/donate', authMiddleware(['donor', 'admin']), donateToCampaign);

export default router;