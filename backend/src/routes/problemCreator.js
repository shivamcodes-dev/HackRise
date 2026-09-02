const express = require("express");
const Problem = require("../models/problem");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
} = require("../controllers/userProblem");
const userMiddleware = require("../middleware/userMiddleware");

const problemRouter = express.Router();

//Create
problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

//fetch
problemRouter.get("/problemById/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);
// problemRouter.get(
//   "/problemSolveByuser",
//   userMiddleware,
//   solvedAllProblembyUser,
// );

//update

module.exports = problemRouter;
