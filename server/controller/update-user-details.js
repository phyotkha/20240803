import getUserDetailsFromToken from "../helpers/getUserDetailsFromToken.js";
import UserModel from "../models/user-model.js";

async function updateUserDetails(req, res) {
    try {
        const token = req.cookies.token || "";

        const user = await getUserDetailsFromToken(token);

        const {username, email, profile_pic} = req.body;

        const updateUser = await UserModel.updateOne({ _id: user._id}, {
            username, 
            email,
            profile_pic
        })

        const userInfo = await UserModel.findById(user._id);

        return res.json({
            message: "User information updated successfully", 
            data: userInfo,
            success: true
        })

    } catch (error) {
        console.log("Error in updateUserDetails controller: ", error.message);
        return res.status(500).json({
            message: error.message || message, 
            error: true
        })
    }
}

export default updateUserDetails;