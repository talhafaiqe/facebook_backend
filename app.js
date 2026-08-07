const express = require("express");
require("dotenv").config();

const app = express();

// Database Connection
require("./conf/db");
// Routes
const friendRoutes = require("./routes/friend.routes");

const auth = require("./middleware/auth");

// Import Routes
const authRoutes = require("./routes/auth.routes");

// Middleware
app.use(express.json());

// Test Route
app.use("/api/auth", authRoutes);

// Friend Routes
app.use("/api/friends", friendRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Facebook API is Running"
    });
});


app.get("/api/test", auth, (req, res) => {

    res.json({
        success: true,
        message: "Protected Route",
        user: req.user
    });

});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});