const Problem = require("../models/problem");
const Submission = require("../models/submisson");
const {
  getLanguageById,
  submitBatch,
  submitToken,
} = require("../utils/problemUtility");

const submitCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;

    if (!userId || !problemId || !code || !language)
      return res.status(400).send("Some field missing");

    const prob = await Problem.findById(problemId);

    //judge0 ko dene se phale hi db me store kiya

    const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      testCasesTotal: prob.hiddenTastCases.length,
    });
    // {hiddenTastCases} = prob;

    // judge0 code ko submit karna hai with hiddentestCases

    const languageId = getLanguageById;

    const submissions = prob.hiddenTastCases.map((testcase) => ({
      language_id: languageId,
      source_code: code,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);

    const resultToken = submitResult.map((value) => {
      return value.token;
    });

    const testResult = await submitToken(resultToken);

    for (const test of testResult) {
      if (test.status_id != 3) {
        return res.status(400).send("Error Occured");
      }
    }
  } catch (err) {}
};

module.exports = submitCode;
