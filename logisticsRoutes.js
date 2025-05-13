import express from "express";
import {createDelivery,createDonationItem,updateDeliveryStatus,trackDelivery} from "../Controllers/logisticsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/donation', authMiddleware(),createDonationItem);//done test with postman

router.post('/delivery', authMiddleware(['admin']),createDelivery);

router.put('/delivery/:id/status', authMiddleware(['admin']),updateDeliveryStatus);

router.get('/delivery/:id' ,authMiddleware(),trackDelivery);

export default router;
