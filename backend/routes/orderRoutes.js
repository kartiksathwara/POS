// import express from "express";
// import Order from "../models/Order.js";
// import Customer from "../models/Customer.js";

// const router = express.Router();

// // CREATE ORDER
// router.post("/", async (req, res) => {
//   try {
//     const { customer, cartItems, totalAmount, paymentMethod, status } = req.body;

//     const order = new Order({
//       customer,
//       cartItems,
//       totalAmount,
//       paymentMethod,
//       status,
//     });

//     const savedOrder = await order.save();

//     // update loyalty points
//     await Customer.findByIdAndUpdate(customer, {
//       $inc: { loyaltyPoints: Math.floor(totalAmount / 100) },
//     });

//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // GET ALL ORDERS WITH CUSTOMER
// router.get("/", async (req, res) => {
//   const orders = await Order.find().populate("customer");
//   res.json(orders);
// });

// export default router;


import express from "express";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const { customer, cartItems, totalAmount, paymentMethod, status } = req.body;

    if (!customer) {
      return res.status(400).json({ error: "Customer required" });
    }

    const order = new Order({
      customer,
      cartItems: cartItems || [],
      totalAmount: totalAmount || 0,
      paymentMethod,
      status,
    });

    const savedOrder = await order.save();

    if (totalAmount) {
      await Customer.findByIdAndUpdate(customer, {
        $inc: { loyaltyPoints: Math.floor(totalAmount / 100) },
      });
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("customer");
  res.json(orders);
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;