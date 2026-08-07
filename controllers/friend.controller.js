const connection = require("../conf/db");

const sendFriendRequest = (req, res) => {

    const senderId = req.user.id;
    const receiverId = req.params.id;

    // Cannot send request to yourself
    if (senderId == receiverId) {
        return res.status(400).json({
            message: "You cannot send a friend request to yourself"
        });
    }

    // Check if receiver exists
    const checkUser = "SELECT * FROM users WHERE id = ?";

    connection.query(checkUser, [receiverId], (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if request already exists
        const checkRequest = `
            SELECT * FROM friend_requests
            WHERE sender_id = ? AND receiver_id = ?
        `;

        connection.query(
            checkRequest,
            [senderId, receiverId],
            (err, request) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                if (request.length > 0) {
                    return res.status(400).json({
                        message: "Friend request already sent"
                    });
                }

                // Insert friend request
                const insertSql = `
                    INSERT INTO friend_requests
                    (sender_id, receiver_id)
                    VALUES (?, ?)
                `;

                connection.query(
                    insertSql,
                    [senderId, receiverId],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json({
                                message: "Database Error"
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: "Friend request sent successfully"
                        });

                    }
                );

            }
        );

    });

};

module.exports = {
    sendFriendRequest
};