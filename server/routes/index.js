import express from "express";

import registerUser from "../controller/register-user.js";
import checkEmail from "../controller/check-email.js";
import checkPassword from "../controller/check-password.js";
import userDetails from "../controller/user-details.js";
import logout from "../controller/logout.js";
import updateUserDetails from "../controller/update-user-details.js";
import searchUser from "../controller/search-user.js";

const router = express.Router();

router.post('/register-user', registerUser);

router.post('/verify-email', checkEmail);

router.post('/verify-password', checkPassword);

router.post('/user-details', userDetails);

router.get('/logout', logout);

router.post('/update-user', updateUserDetails);

router.post("/search-user", searchUser);

export default router;