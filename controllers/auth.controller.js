const connection = require("../conf/db");
const bcrypt = require("bcrypt");

const register = (req, res) => {

    const {
        first_name,
        last_name,
        email,
        phone,
        password
    } = req.body;

    // Check if email already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";

    connection.query(checkSql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertSql = `
            INSERT INTO users
            (first_name, last_name, email, phone, password)
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(
            insertSql,
            [
                first_name,
                last_name,
                email,
                phone,
                hashedPassword
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: "Database Error"
                    });
                }

                return res.status(201).json({
                    success: true,
                    message: "User Registered Successfully",
                    userId: result.insertId
                });

            }
        );

    });

};

const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (results.length === 0) {
            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

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

    });

};
module.exports = {
    register,
    login
};