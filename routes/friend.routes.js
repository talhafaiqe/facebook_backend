const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    sendFriendRequest
} = require("../controllers/friend.controller");

router.post("/request/:id", auth, sendFriendRequest);

module.exports = router;