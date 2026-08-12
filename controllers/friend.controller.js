const FriendRequest = require("../models/FriendRequest");
const Friend = require("../models/Friend");
const User = require("../models/User");

// ==============================
// SEND FRIEND REQUEST
// ==============================

const sendFriendRequest = async (req, res) => {

    try {

        const senderId = req.user.id;
        const receiverId = req.params.id;


        // Cannot send request to yourself
        if (senderId == receiverId) {

            return res.status(400).json({
                message: "You cannot send a friend request to yourself"
            });

        }


        // Check receiver exists
        const receiver = await User.findByPk(receiverId);

        if (!receiver) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        // Check existing request
        const existingRequest = await FriendRequest.findOne({

            where: {
                sender_id: senderId,
                receiver_id: receiverId
            }

        });


        if (existingRequest) {

            return res.status(400).json({
                message: "Friend request already sent"
            });

        }


        // Create request
        await FriendRequest.create({

            sender_id: senderId,
            receiver_id: receiverId,
            status: "Pending"

        });


        return res.status(201).json({

            success: true,
            message: "Friend request sent successfully"

        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message: "Database Error"

        });

    }

};

// ==============================
//     ACCEPT FRIEND REQUEST
// ==============================

const acceptFriendRequest = async (req, res) => {

    try {

        const requestId = req.params.id;
        const userId = req.user.id;

        // Find the request
        const request = await FriendRequest.findByPk(requestId);

        if (!request) {
            return res.status(404).json({
                message: "Friend request not found"
            });
        }

        // Make sure current user is the receiver
        if (request.receiver_id != userId) {
            return res.status(403).json({
                message: "You cannot accept this friend request"
            });
        }

        // Make sure request is still pending
        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Friend request is already processed"
            });
        }

        // Update request
        await request.update({
            status: "Accepted"
        });

        // Create friendship
        await Friend.create({
            user_id: request.sender_id,
            friend_id: request.receiver_id
        });

        return res.json({
            success: true,
            message: "Friend request accepted successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });

    }
};

// ==============================
// REJECT FRIEND REQUEST
// ==============================

const rejectFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const userId = req.user.id;

        const request = await FriendRequest.findByPk(requestId);

        if (!request) {
            return res.status(404).json({
                message: "Friend request not found"
            });
        }

        if (request.receiver_id != userId) {
            return res.status(403).json({
                message: "You cannot reject this friend request"
            });
        }

        if (request.status !== "Pending") {
            return res.status(400).json({
                message: "Friend request is already processed"
            });
        }

        await request.update({
            status: "Rejected"
        });

        return res.json({
            success: true,
            message: "Friend request rejected successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Database Error"
        });
    }
};


module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
};