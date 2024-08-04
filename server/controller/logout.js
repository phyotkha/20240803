async function logout(req, res) {
    try {
        const cookieOptions = {
            http: true, 
            secure: true
        }

        return res.cookie('token', '', cookieOptions).status(200).json({
            message: "Session out", 
            success: true
        })

    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        return res.status(500).json({
            message: error.message || error, 
            error: true
        })
    }
}

export default logout;