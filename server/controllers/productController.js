import axios from "axios";
import Product from "../models/product.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    // Force fetch from DummyJSON to seed database
    const response = await axios.get("https://dummyjson.com/products");
    const productsData = response.data.products;

    // Remove existing collection to prevent duplicates
    await Product.deleteMany();

    const productsToSave = productsData.map(p => ({
      name: p.title,
      description: p.description,
      price: p.price,
      originalPrice: +(p.price / (1 - (p.discountPercentage || 0)/100)).toFixed(2),
      discountPercentage: p.discountPercentage,
      images: p.images,
      thumbnail: p.thumbnail,
      image: p.thumbnail,
      category: p.category,
      brand: p.brand,
      sku: p.sku,
      stock: p.stock,
      weight: p.weight,
      dimensions: p.dimensions,
      shippingInformation: p.shippingInformation,
      returnPolicy: p.returnPolicy,
      availabilityStatus: p.availabilityStatus,
      minimumOrderQuantity: p.minimumOrderQuantity,
      reviews: p.reviews,
      meta: p.meta,
    }));

    const savedProducts = await Product.insertMany(productsToSave);
    res.json(savedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching and seeding products" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a review to a product
export const addProductReview = async (req, res) => {
  try {
    const { reviewerName, reviewerEmail, rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = { reviewerName, reviewerEmail, rating, comment, date: new Date() };
    product.reviews.push(review);
    await product.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
