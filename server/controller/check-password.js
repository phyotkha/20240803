import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user-model.js";


async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body;

        const user = await UserModel.findById(userId);

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                message: "Invalid password.",
                error: true
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

        const cookieOptions = {
            http: true, 
            secure: true
        }

        return res.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully", 
            token: token, 
            success: true
        })

    } catch (error) {
        console.log("Error in checkPassword controller: ", error.message);
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export default checkPassword;