// import { addCustomer, getCustomers } from "../controllers/customerController.js";
// import express from "express";

// const router = express.Router();

// router.get("/", getCustomers);
// router.post("/", addCustomer);

// export default router;



// import express from "express";
// import Customer from "../models/Customer.js";

// const router = express.Router();

// // GET ALL CUSTOMERS
// router.get("/", async (req, res) => {
//   const customers = await Customer.find().sort({ createdAt: -1 });
//   res.json(customers);
// });

// // ADD CUSTOMER
// router.post("/", async (req, res) => {
//   try {
//     const newCustomer = new Customer(req.body);
//     const saved = await newCustomer.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// export default router;


import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// GET ALL CUSTOMERS
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
});

// ADD CUSTOMER
router.post("/", async (req, res) => {
  try {

    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    const existing = await Customer.findOne({ phone });

    if (existing) {
      return res.status(400).json({ message: "Phone already exists" });
    }

    const newCustomer = new Customer(req.body);
    const saved = await newCustomer.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE CUSTOMER
router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;