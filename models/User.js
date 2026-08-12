const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },

        phone: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: true
        },

        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        profile_picture: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        gender: {
            type: DataTypes.ENUM("Male", "Female", "Other"),
            allowNull: true
        }
    },
    {
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

module.exports = User;