import mongoose from "mongoose";

// Review sub-schema
const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date },
  reviewerName: { type: String },
  reviewerEmail: { type: String },
});

// Product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },           // for discount
    discountPercentage: { type: Number },
    category: { type: String },
    image: { type: String },                   // main thumbnail
    images: [{ type: String }],                // additional images
    thumbnail: { type: String },
    brand: { type: String },
    sku: { type: String },
    stock: { type: Number },
    weight: { type: Number },
    dimensions: { type: Object },
    shippingInformation: { type: String },
    returnPolicy: { type: String },
    availabilityStatus: { type: String },
    minimumOrderQuantity: { type: Number },
    reviews: [reviewSchema],
    meta: { type: Object },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
