const express = require("express");
require("dotenv").config();

const app = express();

// Database Connection
require("./conf/db");

// Import Routes
const authRoutes = require("./routes/auth.routes");

// Middleware
app.use(express.json());

// Test Route
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Facebook API is Running"
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});