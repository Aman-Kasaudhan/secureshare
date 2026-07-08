const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.register = async (req, res) => {

    try {

        const {

            firstName,

            lastName,

            email,

            password,

            confirmPassword

        } = req.body;

        if (

            !firstName ||

            !email ||

            !password ||

            !confirmPassword

        ) {

            return res.status(400).json({

                success: false,

                message: "All required fields are mandatory."

            });

        }

        if (!validator.isEmail(email)) {

            return res.status(400).json({

                success: false,

                message: "Invalid email."

            });

        }

        if (password !== confirmPassword) {

            return res.status(400).json({

                success: false,

                message: "Passwords do not match."

            });

        }

        const existingUser = await User.findOne({

            email

        });

        if (existingUser) {

            return res.status(409).json({

                success: false,

                message: "User already exists."

            });

        }

        const hashedPassword = await bcrypt.hash(

            password,

            10

        );

        const user = await User.create({

            firstName,

            lastName,

            email,

            password: hashedPassword

        });

        return res.status(201).json({

            success: true,

            message: "Registration successful.",

            user

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required."
            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found."
            });

        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {

            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES
            }

        );

        const safeUser = {

            id: user._id,

            firstName: user.firstName,

            lastName: user.lastName,

            email: user.email,

            image: user.image

        };

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: safeUser

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};