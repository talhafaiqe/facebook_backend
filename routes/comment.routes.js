const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    createComment,
    getComments,
    updateComment,
    deleteComment
} = require("../controllers/comment.controller");


// Create a comment
router.post("/", auth, createComment);

// Get all comments of a post
router.get("/:postId", auth, getComments);

// Update a comment
router.put("/:id", auth, updateComment);

// Delete a comment
router.delete("/:id", auth, deleteComment);


module.exports = router;