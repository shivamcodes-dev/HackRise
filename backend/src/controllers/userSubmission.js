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
    // console.log(prob);

    //judge0 ko dene se phale hi db me store kiya

    let submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: "pending",
      testCasesTotal: prob.hiddenTastCases.length,
    });

    // judge0 code ko submit karna hai with hiddentestCases

    const languageId = getLanguageById(language);
    // console.log(languageId);

    const submissions = prob.hiddenTastCases.map((testcase) => ({
      language_id: languageId,
      source_code: code,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    // console.log(submitResult);

    const resultToken = submitResult.map((value) => {
      return value.token;
    });

    //update in db submittedResult after geting all info ------ submittedResult ko update kar

    const testResult = await submitToken(resultToken);
    let status = "accepted";
    let testCasesPass = 0;
    let runTime = 0;
    let memory = 0;
    let errorMassage = "";

    for (const test of testResult) {
      if (test.status_id == 3) {
        status = "accepted";
        testCasesPass++;
        runTime = runTime + parseFloat(test.time);
        memory = Math.max(memory, test.memory);
      } else {
        if (test.status_id == 4) {
          status = "error";
          errorMassage = test.stderr;
        } else {
          status = "wrong";
          errorMassage = test.stderr;
        }
      }
    }

    //store in db
    submittedResult.status = status;
    submittedResult.runtime = runTime;
    submittedResult.memory = memory;
    submittedResult.errorMassage = errorMassage;
    submittedResult.tastCasesPassed = testCasesPass;

    await submittedResult.save();

    //yha unique problem ko user(user model) ke db me store kiya
    //req.result = user
    if (!req.result.problemSolved.includes(problemId)) {
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }

    res.status(201).send(submittedResult);
  } catch (err) {
    res.status(500).send("internal server error " + err);
  }
};

const runCode = async (req, res) => {
  try {
    const userId = req.result._id;
    const problemId = req.params.id;

    const { code, language } = req.body;

    if (!userId || !problemId || !code || !language)
      return res.status(400).send("Some field missing");

    const prob = await Problem.findById(problemId);
    // console.log(prob);

    // judge0 code ko submit karna hai with hiddentestCases

    const languageId = getLanguageById(language);
    // console.log(languageId);

    const submissions = prob.visibleTastCases.map((testcase) => ({
      language_id: languageId,
      source_code: code,
      stdin: testcase.input,
      expected_output: testcase.output,
    }));

    const submitResult = await submitBatch(submissions);
    // console.log(submitResult);

    const resultToken = submitResult.map((value) => {
      return value.token;
    });
    const testResult = await submitToken(resultToken);

    res.status(201).send(testResult);
  } catch (err) {
    res.status(500).send("internal server error " + err);
  }
};

module.exports = { submitCode, runCode };
