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

export const deleteProducts = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { title, price, category, quantity } = req.body;
    const thumbnail = req.file?.filename;

    if (!title || !price || !thumbnail || !category || !quantity) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // const lastProduct = await Product.findOne().sort({ id: -1 });
    // const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      // id:newId,
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
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
    };

    // if new image uploaded
    if (req.file) {
      updateData.thumbnail = req.file.filename;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
};
