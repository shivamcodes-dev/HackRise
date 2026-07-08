const getLanguageById = require("../utils/problemUtility");

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
    }
  } catch {}
};
