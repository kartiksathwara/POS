import express from "express";
import { addProduct, deleteProducts, getProducts } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", upload.single("thumbnail"), addProduct);
router.delete("/:id", deleteProducts);

export default router;