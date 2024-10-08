const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Product = require("../models/ProductModel");

// Add Product
const addProduct = async (req, res) => {
  const { name, price } = req.body;

  try {
    const productExists = await Product.findOne({ name });

    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = await Product.create({
      name,
      price,
    });

    res.status(201).json({
      _id: product._id,
      name: product.name,
      price: product.price,
    });
  } catch (error) {
    res.status(500).json({ message: "Error add product", error });
  }
};

// Update product by ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const products = await Product.findById(id);

    if (!products) {
      return res.status(404).json({ message: "product not found" });
    }

    if (name) products.name = name;
    if (price) products.price = price;

    const updatedProduct = await products.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete user by ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findById(id);

    if (!products) {
      return res.status(404).json({ message: "product not found" });
    }
    console.log(products);

    await products.deleteOne();
    res.status(200).json({ message: "product deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error deleting product", error });
  }
};

// Get all users (admin only)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product detail", error });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
