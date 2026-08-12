const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =======================
// REGISTER
// =======================

const register = async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            email,
            phone,
            password
        } = req.body;


        // Check if email already exists
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user using Sequelize
        const user = await User.create({

            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: hashedPassword

        });


        return res.status(201).json({

            success: true,
            message: "User Registered Successfully",
            userId: user.id

        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message: "Database Error"

        });

    }

};


// =======================
// LOGIN
// =======================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Find user
        const user = await User.findOne({

            where: {
                email: email
            }

        });


        // User doesn't exist
        if (!user) {

            return res.status(400).json({

                message: "Invalid Email"

            });

        }


        // Compare password
        const match = await bcrypt.compare(
            password,
            user.password
        );


        if (!match) {

            return res.status(400).json({

                message: "Invalid Password"

            });

        }


        // Create JWT
        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "24h"
            }

        );


        return res.json({

            success: true,
            message: "Login Successful",
            token

        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({

            message: "Database Error"

        });

    }

};


module.exports = {

    register,
    login

};