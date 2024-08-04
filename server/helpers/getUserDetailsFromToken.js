import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";


const getUserDetailsFromToken = async(token) => {
    if (!token) {
        return {
            message: "Session Invalid.", 
            logout: true
        }
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findById(decode.id).select("-password");

    return user
}

export default getUserDetailsFromToken;