const express = require("express");
const { register, login } = require("../controllers/userAuthent"); //

const authRouter = express.Router();

//register
authRouter.post("/register", register);

//login
authRouter.post("/login", login);

// //logout
// authRouter.post("/logout", logout);

// //getprofile
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
