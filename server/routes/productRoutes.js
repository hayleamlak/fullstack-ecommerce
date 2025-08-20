import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

// Fetch all products
router.get("/", getProducts);

// Fetch single product by ID
router.get("/:id", getProductById);

export default router;
