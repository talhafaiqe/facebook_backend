const User = require("./User");
const FriendRequest = require("./FriendRequest");
const Friend = require("./Friend");
const Post = require("./Post");
const Comment = require("./Comment");
const Like = require("./Like");


// ==========================
// FRIEND REQUESTS
// ==========================

User.hasMany(FriendRequest, {
    foreignKey: "sender_id",
    as: "sentRequests"
});

FriendRequest.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender"
});


User.hasMany(FriendRequest, {
    foreignKey: "receiver_id",
    as: "receivedRequests"
});

FriendRequest.belongsTo(User, {
    foreignKey: "receiver_id",
    as: "receiver"
});


// ==========================
// FRIENDS
// ==========================

User.hasMany(Friend, {
    foreignKey: "user_id",
    as: "friends"
});

Friend.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});


// ==========================
// POSTS
// ==========================

User.hasMany(Post, {
    foreignKey: "user_id",
    as: "posts"
});

Post.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});


// ==========================
// COMMENTS
// ==========================

Post.hasMany(Comment, {
    foreignKey: "post_id",
    as: "comments"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id",
    as: "post"
});


User.hasMany(Comment, {
    foreignKey: "user_id",
    as: "comments"
});

Comment.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});


// ==========================
// LIKES
// ==========================

Post.hasMany(Like, {
    foreignKey: "post_id",
    as: "likes"
});

Like.belongsTo(Post, {
    foreignKey: "post_id",
    as: "post"
});


User.hasMany(Like, {
    foreignKey: "user_id",
    as: "likes"
});

Like.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});


module.exports = {
    User,
    FriendRequest,
    Friend,
    Post,
    Comment,
    Like
};