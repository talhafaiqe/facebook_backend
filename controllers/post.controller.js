const Post = require("../models/Post");

const createPost = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            caption,
            location,
            privacy
        } = req.body;

        const image = req.file
            ? req.file.filename
            : null;

        const post = await Post.create({
            user_id: userId,
            caption,
            image,
            location,
            privacy: privacy || "Public"
        });

        return res.status(201).json({
    success: true,
    message: "Post created successfully",

    post: {
        ...post.toJSON(),

        image: post.image
            ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
            : null
    }
});

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });

    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {

        const posts = await Post.findAll({
            order: [["created_at", "DESC"]]
        });

        const formattedPosts = posts.map(post => ({
            ...post.toJSON(),

            image: post.image
                ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
                : null
        }));

        return res.json({
            success: true,
            posts: formattedPosts
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });

    }
};

const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const postData = {
            ...post.toJSON(),

            image: post.image
                ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
                : null
        };

        return res.json({
            success: true,
            post: postData
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};

// Update a post
const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Only the owner can update the post
        if (post.user_id != userId) {
            return res.status(403).json({
                message: "You can only update your own post"
            });
        }

        const {
            caption,
            location,
            privacy
        } = req.body;

        // Keep old image unless a new image is uploaded
        let image = post.image;

        if (req.file) {
            image = req.file.filename;
        }

        await post.update({
            caption: caption !== undefined ? caption : post.caption,
            location: location !== undefined ? location : post.location,
            privacy: privacy !== undefined ? privacy : post.privacy,
            image: image
        });

        return res.json({
            success: true,
            message: "Post updated successfully",

            post: {
                ...post.toJSON(),

                image: post.image
                    ? `${req.protocol}://${req.get("host")}/uploads/${post.image}`
                    : null
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};

// Delete a post
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        // Only the owner can delete the post
        if (post.user_id != userId) {
            return res.status(403).json({
                message: "You can only delete your own post"
            });
        }

        await post.destroy();

        return res.json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};



// Export the controller functions
module.exports = {
    createPost,
    getPosts,
    updatePost,
    getPostById,
    deletePost
};