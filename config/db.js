const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

const connectDB = async () => {
  try {
    // Connecting to MongoDB
    await mongoose.connect(process.env.MONGO_URI); // No need for useNewUrlParser or useUnifiedTopology
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
