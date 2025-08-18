import axios from "axios";
import Product from "../models/product.js";

// @desc    Fetch products from DummyJSON and store in DB if not exist
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    // Check if products already exist in DB
    const existingProducts = await Product.find();
    if (existingProducts.length > 0) {
      return res.json(existingProducts);
    }

    // Fetch from DummyJSON API
    const response = await axios.get("https://dummyjson.com/products");
    const productsData = response.data.products;

    // Map API data to our Product model
    const productsToSave = productsData.map((p) => ({
      name: p.title,
      description: p.description,
      price: p.price,
      image: p.thumbnail, // main image
      category: p.category,
    }));

    // Save to MongoDB
    const savedProducts = await Product.insertMany(productsToSave);

    res.json(savedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
