import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username."]
    },
    email: {
        type: String,
        required: [true, "Please provide Email."]
    },
    password: {
        type: String,
        required: [true, "Please provide passsword."]
    },
    profile_pic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;