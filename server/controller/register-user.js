import UserModel from "../models/user-model.js";
import bcryptjs from "bcryptjs";

async function registerUser(req, res) {
    try {
        const { username, email, password, profile_pic } = req.body;

        const checkEmail = await UserModel.findOne({ email });

        if (checkEmail) {
            return res.status(400).json({
                message: "User already exists",
                error: true
            })
        }

        const saltRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, saltRound);

        const payload = {
            username,
            email,
            profile_pic,
            password: hashPassword
        }

        const user = new UserModel(payload);

        const userSave = await user.save();

        return res.status(201).json({
            message: "User successully created.",
            data: userSave,
            success: true
        })

    } catch (error) {
        console.log("Error in registerUser controller: ", error.message);
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export default registerUser;