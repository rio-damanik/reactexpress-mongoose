const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// User routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
