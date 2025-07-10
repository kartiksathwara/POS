import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, price, category, quantity } = req.body;
    const thumbnail = req.file?.filename;

    if (!title || !price || !thumbnail || !category || !quantity) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      id:newId,
      title,
      price,
      thumbnail,
      category,
      quantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
};
