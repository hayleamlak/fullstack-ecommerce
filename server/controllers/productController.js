import axios from "axios";
import Product from "../models/product.js";

// @desc    Fetch all products (DB or DummyJSON)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const existingProducts = await Product.find();
    if (existingProducts.length > 0) {
      return res.json(existingProducts);
    }

    // Fetch from DummyJSON if DB empty
    const response = await axios.get("https://dummyjson.com/products");
    const productsData = response.data.products;

    const productsToSave = productsData.map((p) => ({
      name: p.title,
      description: p.description,
      price: p.price,
      image: p.thumbnail,
      category: p.category,
    }));

    const savedProducts = await Product.insertMany(productsToSave);
    res.json(savedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
