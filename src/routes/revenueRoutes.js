import express from "express";
import {
  recordRevenue,
  getAllPartners,
  addPartner,
  getRevenueSummary,
  deletePartner
} from "../Controllers/revenueController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/revenue', authMiddleware(['admin']), recordRevenue);

router.get('/revenue/summary', authMiddleware(['admin']), getRevenueSummary);

router.get('/partners', getAllPartners);

router.post('/partners', authMiddleware(['admin']), addPartner);

router.delete('/partners/:id', authMiddleware(['admin']), deletePartner);

export default router;
