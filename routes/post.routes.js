const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
    createPost,
    getPosts,
    updatePost,
    getPostById,
    deletePost
} = require("../controllers/post.controller");

router.post(
    "/",
    auth,
    upload.single("image"),
    createPost
);

router.get(
    "/",
    auth,
    getPosts
);

router.put(
    "/:id",
    auth,
    upload.single("image"),
    updatePost
);

router.get(
    "/:id",
    auth,
    getPostById
);

router.delete(
    "/:id",
    auth,
    deletePost
);

module.exports = router;