const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Like = sequelize.define(
    "Like",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "likes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false,

        indexes: [
            {
                unique: true,
                fields: ["post_id", "user_id"]
            }
        ]
    }
);

module.exports = Like;