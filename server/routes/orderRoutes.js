import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, addOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Payment & delivery
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

// Admin route
router.get("/", protect, admin, getOrders);

export default router;
