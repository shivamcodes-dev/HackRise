import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";

import ProblemTabs from "../components/problem/ProblemTabs";
import ProblemDescription from "../components/problem/ProblemDescription";
import ProblemEditorial from "../components/problem/ProblemEditorial";
import ProblemSolutions from "../components/problem/ProblemSolutions";
import LanguageSelector from "../components/problem/LanguageSelector";
import CodeEditor from "../components/problem/CodeEditor";
import EditorActions from "../components/problem/EditorActions";
import TestResults from "../components/problem/TestResults";
import SubmissionResult from "../components/problem/SubmissionResult";

const langMap = {
  cpp: "c++",
  java: "java",
  javascript: "javascript",
};

const ProblemPage = () => {
  const { problemId } = useParams();

  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState("code");

  const editorRef = useRef(null);

  // Fetch problem from backend
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);

      try {
        const response = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );

        setProblem(response.data);
      } catch (error) {
        console.error(
          "Error fetching problem:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  // Set initial code whenever problem or language changes
  useEffect(() => {
    if (!problem) return;

    const languageCode = problem.startCode?.find(
      (item) => item.language?.toLowerCase() === langMap[selectedLanguage],
    );

    setCode(languageCode?.initialCode || "");

    if (!languageCode) {
      console.error("Initial code not found for:", selectedLanguage);
    }
  }, [problem, selectedLanguage]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  // Run code
  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage,
      });

      setRunResult(response.data);
    } catch (error) {
      console.error(
        "Error running code:",
        error.response?.data || error.message,
      );

      setRunResult({
        success: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to run code",
        testCases: [],
      });
    } finally {
      setLoading(false);
      setActiveRightTab("testcase");
    }
  };

  // Submit code
  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code,
          language: selectedLanguage,
        },
      );

      setSubmitResult(response.data);
    } catch (error) {
      console.error(
        "Error submitting code:",
        error.response?.data || error.message,
      );

      setSubmitResult({
        accepted: false,
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Submission failed",
      });
    } finally {
      setLoading(false);
      setActiveRightTab("result");
    }
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-6 text-center">
        Problem could not be loaded. Check the console and try again.
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-base-100">
      {/* Left panel */}
      <div className="w-1/2 flex flex-col border-r border-base-300">
        <ProblemTabs activeTab={activeLeftTab} onTabChange={setActiveLeftTab} />

        <div className="flex-1 overflow-y-auto p-6">
          {activeLeftTab === "description" && (
            <ProblemDescription problem={problem} />
          )}

          {activeLeftTab === "editorial" && <ProblemEditorial />}

          {activeLeftTab === "solutions" && (
            <ProblemSolutions problem={problem} />
          )}

          {activeLeftTab === "submissions" && (
            <div>
              <h2 className="text-xl font-bold mb-4">My Submissions</h2>
              {/* Add your existing SubmissionHistory component here */}
              <p className="text-gray-500">
                Connect your SubmissionHistory component here.
              </p>
            </div>
          )}

          {activeLeftTab === "chatAI" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Chat with AI</h2>
              {/* Add your existing ChatAi component here */}
              <p className="text-gray-500">
                Connect your ChatAi component here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 flex flex-col">
        <div className="tabs tabs-bordered bg-base-200 px-4">
          {[
            { id: "code", label: "Code" },
            { id: "testcase", label: "Testcase" },
            { id: "result", label: "Result" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeRightTab === tab.id ? "tab-active" : ""}`}
              onClick={() => setActiveRightTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {activeRightTab === "code" && (
            <>
              <div className="p-4 border-b border-base-300">
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={handleLanguageChange}
                />
              </div>

              <div className="flex-1 min-h-0">
                <CodeEditor
                  code={code}
                  selectedLanguage={selectedLanguage}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                />
              </div>

              <EditorActions
                loading={loading}
                onRun={handleRun}
                onSubmit={handleSubmitCode}
                onConsole={() => setActiveRightTab("testcase")}
              />
            </>
          )}

          {activeRightTab === "testcase" && (
            <div className="flex-1 p-4 overflow-y-auto">
              <TestResults runResult={runResult} />
            </div>
          )}

          {activeRightTab === "result" && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h3 className="font-semibold mb-4">Submission Result</h3>
              <SubmissionResult submitResult={submitResult} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
