const TestResults = ({ runResult }) => {
  if (!runResult) {
    return (
      <p className="text-gray-500">
        Click "Run" to test your code with the example test cases.
      </p>
    );
  }

  const testCases = runResult.testCases || [];

  return (
    <div>
      <h3 className="font-semibold mb-4">Test Results</h3>

      <div
        className={`alert ${
          runResult.success ? "alert-success" : "alert-error"
        } mb-4`}
      >
        <div className="w-full">
          <h4 className="font-bold">
            {runResult.success
              ? "✅ All test cases passed!"
              : `❌ ${runResult.error || "Some test cases failed"}`}
          </h4>

          {runResult.runtime != null && (
            <p className="text-sm mt-2">Runtime: {runResult.runtime} sec</p>
          )}

          {runResult.memory != null && (
            <p className="text-sm">Memory: {runResult.memory} KB</p>
          )}

          <div className="mt-4 space-y-2">
            {testCases.map((tc, index) => {
              const passed = Number(tc.status_id) === 3;

              return (
                <div
                  key={index}
                  className="bg-base-100 p-3 rounded text-xs font-mono"
                >
                  <div>
                    <strong>Input:</strong> {tc.stdin}
                  </div>
                  <div>
                    <strong>Expected:</strong> {tc.expected_output}
                  </div>
                  <div>
                    <strong>Output:</strong>{" "}
                    {tc.stdout ?? tc.compile_output ?? tc.stderr ?? "No output"}
                  </div>

                  <div className={passed ? "text-green-600" : "text-red-600"}>
                    {passed ? "✓ Passed" : "✗ Failed"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
