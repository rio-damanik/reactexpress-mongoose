const express = require("express");
const router = express.Router();
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById } = require("../controllers/ProductController");
const { protect, admin } = require("../middleware/authMiddleware");

// Get all users (admin only)
// protect, admin,
router.get("/", getProducts);

// get detail users by id
router.get("/:id", getProductById);

// Get all users (admin only)
router.post("/", addProduct);
// Update user by ID (admin or self)
router.put("/:id", updateProduct);

// Delete user by ID (admin only)
router.delete("/:id", deleteProduct);

module.exports = router;
