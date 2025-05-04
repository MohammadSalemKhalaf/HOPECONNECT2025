import express from 'express';
import { createCampaign, getAllCampaigns, donateToCampaign } from '../controllers/emergencyCampaignController.js';
const router = express.Router();

router.get('/', getAllCampaigns); 

router.post('/',createCampaign); // create campaign
router.post('/:id/donate', donateToCampaign); // donate to campaign

export default router;