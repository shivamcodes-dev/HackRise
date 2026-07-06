const { JSONCookie } = require("cookie-parser");
const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

const register = async (req, res) => {
  try {
    //validate the data
    validate(req.body);

    const { firstName, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);

    // role defult user
    req.body.role = "user";

    //to save the user in Db
    const user = await User.create(req.body);

    //jwt cookies for security
    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: "user" },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("user Register successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId) throw new Error("Invalid Credentials");
    if (!password) throw new Error("Invalid Credentials");

    //ab db me find krega email hi ya nhi
    const user = await User.findOne({ emailId });

    const match = bcrypt.compare(password, user.password);

    if (!match) throw new Error("Invalid Credentials");

    //vrify by token
    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Logged In Successfully");
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
};

const logout = async (req, res) => {
  try {
    //validate the request token
    //middleware se ho gya

    // then token add kar dunga Radis ke blockList

    const { token } = req.cookies;

    const payload = jwt.decode(token);

    await redisClient.set(`token:${token}`, "Blocked");
    await redisClient.expireAt(`token:${token}`, payload.exp);
    //cookies ko clear kar dege jab expire ho jayegi

    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.send("Logged out Succesfully");
  } catch (err) {
    res.status(503).send("Error: " + err);
  }
};

const adminRegister = async (req, res) => {
  try {
    //validate the data
    validate(req.body);

    const { firstName, emailId, password } = req.body;

    req.body.password = await bcrypt.hash(password, 10);

    // role defult user
    req.body.role = "admin";

    //to save the user in Db
    const user = await User.create(req.body);

    //jwt cookies for security
    const token = jwt.sign(
      { _id: user._id, emailId: emailId, role: "admin" },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 },
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).send("user Register successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

module.exports = { register, login, logout, adminRegister }; //Shivam
