import express from 'express';
import { createSponsorship, getAllSponsorships, getSponsorshipById, updateSponsorship, deleteSponsorship } from '../controllers/donationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware(['donor', 'admin']), createSponsorship);

router.get('/', getAllSponsorships);

router.get('/:id', getSponsorshipById);

router.put('/:id', authMiddleware(['admin']), updateSponsorship);

router.delete('/:id', authMiddleware(['admin']), deleteSponsorship);

export default router;
