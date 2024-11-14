const express = require("express");
const router = express.Router();
const Order = require("../Model/productOrdermodel");

// POST /api/orders - Create a new order
router.post("/", async (req, res) => {
  try {
    const { items, totalAmount, totalItems } = req.body;

    const newOrder = new Order({
      items,
      totalAmount,
      totalItems,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

module.exports = router;
