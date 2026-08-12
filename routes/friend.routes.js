const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
} = require("../controllers/friend.controller");

router.post("/request/:id", auth, sendFriendRequest);

router.put("/accept/:id", auth, acceptFriendRequest);

router.put("/reject/:id", auth, rejectFriendRequest);

module.exports = router;