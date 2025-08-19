import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser, updateUser } from "../controllers/adminController.js";

const router = express.Router();

// Admin-only routes
router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/:id", protect, admin, updateUser);

export default router;
