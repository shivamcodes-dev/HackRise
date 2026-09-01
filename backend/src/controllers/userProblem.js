const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTastCases,
    hiddenTastCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    for (const { language, completeCode } of referenceSolution) {
      //source_Code
      //language_id
      //stdin:
      //expected_Output

      const languageId = getLanguageById(language);

      const submissions = visibleTastCases.map((testcase) => ({
        language_id: languageId,
        source_code: completeCode,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => {
        return value.token;
      });

      const testResult = await submitToken(resultToken);
      console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }

    // store in db

    const userProblem = await Problem.create({
      ...req.body,
      problemCreator: req.result._id,
    });

    res.status(201).send("Problem Saved Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
};

const updateProblem = async (req, res) => {
  //findind id of problem which is to update
  const { id } = req.params;

  const {
    title,
    description,
    difficulty,
    tags,
    visibleTastCases,
    hiddenTastCases,
    startCode,
    referenceSolution,
    problemCreator,
  } = req.body;

  try {
    if (!id) {
      res.status(400).send("Missing ID Field");
    }

    const DsaProblem = await Problem.findById(id);
    if (!DsaProblem) {
      return res.status(404).send("ID is not present in server");
    }
    for (const { language, completeCode } of referenceSolution) {
      //source_Code
      //language_id
      //stdin:
      //expected_Output

      const languageId = getLanguageById(language);

      const submissions = visibleTastCases.map((testcase) => ({
        language_id: languageId,
        source_code: completeCode,
        stdin: testcase.input,
        expected_output: testcase.output,
      }));

      const submitResult = await submitBatch(submissions);
      // console.log(submitResult);

      const resultToken = submitResult.map((value) => {
        return value.token;
      });

      const testResult = await submitToken(resultToken);
      console.log(testResult);

      for (const test of testResult) {
        if (test.status_id != 3) {
          return res.status(400).send("Error Occured");
        }
      }
    }

    const newProblem = await Problem.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true },
    );
    res.status(200).send(newProblem);
  } catch (err) {
    res.send(404).sen("Error: " + err);
  }
};

const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.send(400).send("ID is missing");

    const deletedProblem = await Problem.findByIdAndDelete(id);

    if (!deletedProblem) return res.status(404).send("Problem not found:)");

    return res.status(200).send("Successfully Deleted");
  } catch (err) {
    res.status(500).send("Error " + err);
  }
};

const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) return res.send(400).send("ID is missing");

    const getProblem = await Problem.findById(id);

    if (!getProblem) return res.status(404).send("Problem not found:)");

    return res.status(200).send(getProblem);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
};

const getAllProblem = async (req, res) => {
  try {
    const getProblem = await Problem.find({});

    if (getProblem.length == 0)
      return res.status(404).send("Problem not found:)");

    return res.status(200).send(getProblem);
  } catch (err) {
    res.status(500).send("Error " + err);
  }
};
module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblem,
};
