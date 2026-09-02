const express = require("express");
const userMiddleware = require("../middleware/userMiddleware");
submitRouter = express.Router();
const submitCode = require("../controllers/userSubmission");

submitRouter.post("/submit/:id", userMiddleware, submitCode);
