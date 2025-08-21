import express from "express";
import {
  getProducts,
  getProductById,
  getProductReviews,
  addProductReview,
} from "../controllers/productController.js";

const router = express.Router();

// Products
router.get("/", getProducts);          // Fetch all products & seed DB
router.get("/:id", getProductById);   // Single product

// Reviews
router.get("/:id/reviews", getProductReviews);
router.post("/:id/reviews", addProductReview);

export default router;
