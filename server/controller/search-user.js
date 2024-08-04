import UserModel from "../models/user-model.js";

async function searchUser(req, res) {
    try {
        const { search } = req.body;

        const query = new RegExp(search, "i", "g");

        const user = await UserModel.find({
            "$or": [
                { name: query },
                { email: query }
            ]
        }).select("-password")

        return res.json({
            message: "All user", 
            data: user, 
            sucess: true
        })

    } catch (error) {
        console.log("Error in searchUser controller: ", error.message);
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export default searchUser;