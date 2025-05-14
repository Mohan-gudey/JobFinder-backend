const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db"); // MongoDB connection
const jobRoutes = require("./routes/jobs");

require("dotenv").config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
