import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("MERN Auth Backend is running 🚀");
});

// PORT from .env or default 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
