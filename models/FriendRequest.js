const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const FriendRequest = sequelize.define(
    "FriendRequest",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        receiver_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "Pending",
                "Accepted",
                "Rejected"
            ),
            defaultValue: "Pending"
        }
    },
    {
        tableName: "friend_requests",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }
);

module.exports = FriendRequest;