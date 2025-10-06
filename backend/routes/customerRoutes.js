import { addCustomer, getCustomers } from "../controllers/customerController.js";
import express from "express";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomer);

export default router;
