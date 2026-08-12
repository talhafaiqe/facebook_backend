const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Friend = sequelize.define(
    "Friend",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        friend_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "friends",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }
);

module.exports = Friend;