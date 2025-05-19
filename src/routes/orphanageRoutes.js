import express from 'express';
import { 
  getAllOrphanages,
  getOrphanageById,
  createOrphanage,
  updateOrphanage,
  deleteOrphanage
} from '../controllers/orphanageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/', getAllOrphanages);

router.get('/:id', getOrphanageById);


router.post('/', authMiddleware(['admin']), createOrphanage);

router.put('/:id', authMiddleware(['admin']), updateOrphanage);

router.delete('/:id', authMiddleware(['admin']), deleteOrphanage);

export default router;