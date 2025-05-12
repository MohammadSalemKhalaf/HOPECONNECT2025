import express from 'express';
import { 
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
  updateSponsorship,
  deleteSponsorship
} from '../controllers/donationController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Donor and admin can create
router.post('/', authMiddleware(['donor', 'admin']), createSponsorship);

// Public read access
router.get('/', getAllSponsorships);
router.get('/:id', getSponsorshipById);

// Admin-only modifications
router.put('/:id', authMiddleware(['admin']), updateSponsorship);
router.delete('/:id', authMiddleware(['admin']), deleteSponsorship);

export default router;