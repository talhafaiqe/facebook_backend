const express = require("express");
require("dotenv").config();

const app = express();


const { connectDB, sequelize } = require("./config/database");

const {
    User,
    FriendRequest,
    Friend,
    Post,
    Comment,
    Like
} = require("./models");


// Import Routes
const auth = require("./middleware/auth");
const friendRoutes = require("./routes/friend.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const commentRoutes = require("./routes/comment.routes");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/comments", commentRoutes);



// Test Route
app.use("/api/auth", authRoutes);

// Friend Routes
app.use("/api/friends", friendRoutes);

// Post Routes
app.use("/api/posts", postRoutes);

app.use("/uploads", express.static("uploads"));


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

connectDB();

sequelize.sync()
    .then(() => {
        console.log("Database tables synced successfully");
    })
    .catch((err) => {
        console.log("Database sync failed");
        console.log(err);
    });
    

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});