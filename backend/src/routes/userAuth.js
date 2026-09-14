const express = require("express");

const authRouter = express.Router();
const {
  register,
  login,
  logout,
  adminRegister,
  deleteProfile,
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

authRouter.delete("/profile", userMiddleware, deleteProfile);

authRouter.get("/check", userMiddleware, (req, res) => {
  const user = req.result;
  const reply = {
    firstName: user.firstName,
    emailId: user.emailId,
    _id: user._id,
  };
  res.status(200).josn({
    user: reply,
    massage: "Valid User",
  });
});
// //getprofile
// authRouter.get("/getProfile", getProfile);

module.exports = authRouter;
