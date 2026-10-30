const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

const ProblemDescription = ({ problem }) => {
  // console.log(problem);
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{problem.title}</h1>

        <div
          className={`badge badge-outline ${getDifficultyColor(
            problem.difficulty,
          )}`}
        >
          {problem.difficulty?.charAt(0).toUpperCase() +
            problem.difficulty?.slice(1)}
        </div>

        <div className="badge badge-primary">
          {problem.tags?.charAt(0).toUpperCase() + problem.tags?.slice(1)}
        </div>
      </div>

      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {problem.description}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Examples:</h3>

        <div className="space-y-4">
          {(problem.visibleTastCases || []).map((example, index) => (
            <div key={index} className="bg-base-200 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Example {index + 1}:</h4>

              <div className="space-y-2 text-sm font-mono">
                <div>
                  <strong>Input:</strong> {example.input}
                </div>
                <div>
                  <strong>Output:</strong> {example.output}
                </div>
                <div>
                  <strong>Explanation:</strong>{" "}
                  {example.explantion ?? example.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
