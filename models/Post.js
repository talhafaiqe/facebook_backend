const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Post = sequelize.define(
    "Post",
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

        caption: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        location: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        privacy: {
            type: DataTypes.ENUM(
                "Public",
                "Friends",
                "Private"
            ),
            defaultValue: "Public"
        }
    },
    {
        tableName: "posts",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = Post;