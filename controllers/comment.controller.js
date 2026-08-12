const Comment = require("../models/Comment");
const User = require("../models/User");
const createComment = async (req, res) => {
    try {
        console.log("BODY:", req.body);

        const userId = req.user.id;

        const post_id = req.body?.post_id;
        const commentText = req.body?.comment;

        console.log("POST ID:", post_id);
        console.log("COMMENT:", commentText);

        if (!post_id || !commentText) {
            return res.status(400).json({
                message: "post_id and comment are required",
                received: req.body
            });
        }

        const newComment = await Comment.create({
            post_id: post_id,
            user_id: userId,
            comment: commentText
        });

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        });

    } catch (error) {
        console.log("COMMENT ERROR:", error);

        return res.status(500).json({
            message: "Database Error",
            error: error.message
        });
    }
};

const getComments = async (req, res) => {
    try {
        const postId = req.params.postId;

        const comments = await Comment.findAll({
            where: {
                post_id: postId
            },
            include: [
                {
                    model: User,
                    attributes: ["id", "first_name", "profile_picture"],
                    as: "user"
                }
            ],
            order: [["created_at", "DESC"]]
        });

        return res.json({
            success: true,
            comments
        });

    } catch (error) {
    console.log("GET COMMENTS ERROR:", error);

    return res.status(500).json({
        message: "Database Error",
        error: error.message
    });
}
};


const updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user_id != userId) {
            return res.status(403).json({
                message: "You can only update your own comment"
            });
        }

        const newComment = req.body?.comment;

        await comment.update({
            comment: newComment
        });

        return res.json({
            success: true,
            message: "Comment updated successfully",
            comment
        });

    } catch (error) {
    console.log("UPDATE COMMENT ERROR:", error);

    return res.status(500).json({
        message: "Database Error",
        error: error.message
    });
}
};


const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const userId = req.user.id;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.user_id != userId) {
            return res.status(403).json({
                message: "You can only delete your own comment"
            });
        }

        await comment.destroy();

        return res.json({
            success: true,
            message: "Comment deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


module.exports = {
    createComment,
    getComments,
    updateComment,
    deleteComment
};