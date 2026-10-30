const SubmissionResult = ({ submitResult }) => {
  // console.log(submitResult);
  if (!submitResult) {
    return (
      <p className="text-gray-500">Click "Submit" to evaluate your solution.</p>
    );
  }

  return (
    <div
      className={`alert ${
        submitResult.accepted ? "alert-success" : "alert-error"
      }`}
    >
      <div>
        <h4 className="font-bold text-lg">
          {submitResult.accepted
            ? "🎉 Accepted"
            : `❌ ${submitResult.error || "Submission failed"}`}
        </h4>

        <p className="mt-4">
          Test Cases Passed: {submitResult.passedTestCases ?? 0}/
          {submitResult.totalTestCases ?? 0}
        </p>

        {submitResult.runtime != null && (
          <p>Runtime: {submitResult.runtime} sec</p>
        )}

        {submitResult.memory != null && <p>Memory: {submitResult.memory} KB</p>}
      </div>
    </div>
  );
};

export default SubmissionResult;
