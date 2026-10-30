const ProblemTabs = ({ side, activeTab, onTabChange }) => {
  const tabs =
    side === "left"
      ? [
          { label: "Description", value: "description" },
          { label: "Editorial", value: "editorial" },
          { label: "Solutions", value: "solutions" },
          { label: "Submissions", value: "submissions" },
          { label: "ChatAI", value: "chatAI" },
        ]
      : [
          { label: "Code", value: "code" },
          { label: "Testcase", value: "testcase" },
          { label: "Result", value: "result" },
        ];

  return (
    <div className="tabs tabs-bordered bg-base-200 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProblemTabs;
