const express = require("express");

const authRouter = express.Router();
const {
  register,
  login,
  logout,
  adminRegister,
} = require("../controllers/userAuthent"); //
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

//register
authRouter.post("/register", register);

//login
authRouter.post("/login", login);

//logout
authRouter.post("/logout", userMiddleware, logout);

//admin rigister
authRouter.post("/admin/register", adminMiddleware, adminRegister);

//admin login
authRouter.post("/admin/login", adminMiddleware, adminRegister);

// //getprofile
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
