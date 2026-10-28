const ProblemSolutions = ({ problem }) => {
  const solutions = problem.referenceSolution || [];

  if (solutions.length === 0) {
    return (
      <p className="text-gray-500">
        Solutions are not available for this problem.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Solutions</h2>

      <div className="space-y-6">
        {solutions.map((solution, index) => (
          <div key={index} className="border border-base-300 rounded-lg">
            <div className="bg-base-200 px-4 py-2 rounded-t-lg">
              <h3 className="font-semibold">
                {problem.title} - {solution.language}
              </h3>
            </div>

            <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
              <code>{solution.completeCode}</code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemSolutions;
