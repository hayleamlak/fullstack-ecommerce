import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser, updateUser, getAllOrders } from "../controllers/adminController.js";

const router = express.Router();

// Admin-only routes for Users
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id", protect, admin, updateUser);

// Admin-only routes for Orders
router.get("/orders", protect, admin, getAllOrders);

export default router;
