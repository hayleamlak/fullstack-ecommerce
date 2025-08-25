import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { payWithChapa, payWithTelebirr } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/chapa/:orderId", protect, payWithChapa);
router.post("/telebirr/:orderId", protect, payWithTelebirr);

export default router;
