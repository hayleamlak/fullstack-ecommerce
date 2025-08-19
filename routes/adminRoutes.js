import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser, updateUser } from "../controllers/adminController.js";

const router = express.Router();

// Get all users
router.get("/users", protect, admin, getAllUsers);

// Delete a user
router.delete("/users/:id", protect, admin, deleteUser);

// Update a user
router.put("/users/:id", protect, admin, updateUser);

export default router;
