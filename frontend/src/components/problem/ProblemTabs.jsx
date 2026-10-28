const tabs = [
  { id: "description", label: "Description" },
  { id: "editorial", label: "Editorial" },
  { id: "solutions", label: "Solutions" },
  { id: "submissions", label: "Submissions" },
  { id: "chatAI", label: "ChatAI" },
];

const ProblemTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs tabs-bordered bg-base-200 px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ProblemTabs;
