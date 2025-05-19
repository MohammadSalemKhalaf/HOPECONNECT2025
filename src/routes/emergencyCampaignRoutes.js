import express from 'express';
import { 
  createCampaign, 
  getAllCampaigns, 
  donateToCampaign 
} from '../Controllers/emergencyCampaignController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCampaigns);

router.post('/', authMiddleware(['admin']), createCampaign);

router.post('/:id/donate', authMiddleware(['donor', 'admin']), donateToCampaign);

export default router;