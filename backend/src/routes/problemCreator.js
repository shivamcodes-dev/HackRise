const express = require("express");
const Problem = require("../models/problem");
const adminMiddleware = require("../middleware/adminMiddleware");

const problemRouter = express.Router();

//Create
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.put("/:id", deleteProblem);

//fetch
problemRouter.get("/:id", getProblemById);
problemRouter.get("/", getAllProblem);
problemRouter.get("/user", solvedAllProblembyUser);

//update
