import express from "express";
import {
  addReview,
  getReviewsForOrphanage,
  verifyOrphanage,
  createImpactReport,
  getMyImpactReports
} from "../Controllers/trustController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/review", authMiddleware(['donor']), addReview);

router.get("/reviews/:orphanageId", getReviewsForOrphanage);

router.put("/orphanage/:id/verify", authMiddleware(['admin']), verifyOrphanage);

router.post("/impact", authMiddleware(['donor']), createImpactReport);

router.get("/impact", authMiddleware(['donor']), getMyImpactReports);

export default router;
