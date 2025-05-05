import express from 'express';
import {
  getAllOrphanages,getOrphanageById, createOrphanage,updateOrphanage,deleteOrphanage} from '../Controllers/orphanageController.js'

const router = express.Router();

router.get('/', getAllOrphanages);

router.get('/:id', getOrphanageById);

router.post('/', createOrphanage);

router.put('/:id', updateOrphanage);

router.delete('/:id', deleteOrphanage);

export default router;