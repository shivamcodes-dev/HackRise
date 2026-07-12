const { getLanguageById, submitBatch } = require("../utils/problemUtility");

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

      const resultToken = submitResult.map((value) => {
        return value.token;
      });

      const testResult = submitToken(resultToken);
    }
  } catch {}
};
