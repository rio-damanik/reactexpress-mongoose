const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getUsers } = require("../controllers/UserController");
const { protect, admin } = require("../middleware/authMiddleware");

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get all users (admin only)
router.get("/", protect, admin, getUsers);

// Update user by ID (admin or self)
router.put("/:id", protect, admin, updateUser);

// Delete user by ID (admin only)
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
