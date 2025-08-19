import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminProductController.js";

const router = express.Router();

// Get all products
router.get("/", protect, admin, getAllProducts);

// Create new product
router.post("/", protect, admin, createProduct);

// Update product
router.put("/:id", protect, admin, updateProduct);

// Delete product
router.delete("/:id", protect, admin, deleteProduct);

export default router;
