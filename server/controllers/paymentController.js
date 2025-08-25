import axios from "axios";
import Order from "../models/orderModel.js";

// Chapa Payment
export const payWithChapa = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const chapaUrl = "https://api.chapa.co/v1/transaction/initialize";
    const chapaSecretKey = process.env.CHAPA_SECRET_KEY;

    const payload = {
      amount: order.totalPrice,
      currency: "ETB",
      email: req.user.email || "test@example.com", // fallback
      first_name: req.user.name || "Customer",
      last_name: req.user.name || "Customer",
      tx_ref: `txn_${Date.now()}`, // unique transaction reference
      callback_url: `${process.env.CLIENT_URL}/payment-success`,
      return_url: `${process.env.CLIENT_URL}/payment-success`,
      customization: {
        title: "My Shop",
        description: "Payment for order",
      },
    };

    const response = await axios.post(chapaUrl, payload, {
      headers: {
        Authorization: `Bearer ${chapaSecretKey}`,
        "Content-Type": "application/json",
      },
    });

    // Send Chapa checkout URL to frontend
    res.json({ checkoutUrl: response.data.data.checkout_url });
  } catch (error) {
    console.error("Chapa Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Chapa payment failed" });
  }
};

// Telebirr Payment (placeholder)
export const payWithTelebirr = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Example only (you must replace with official Telebirr API)
    res.json({ checkoutUrl: "https://telebirr-fake-checkout.com/12345" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Telebirr payment failed" });
  }
};
