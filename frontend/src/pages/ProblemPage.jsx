import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import axiosClient from "../utils/axiosClient";
// import SubmissionHistory from "../components/SubmissionHistory";
// import ChatAi from "../components/ChatAi";

import ProblemDescription from "../components/problem/ProblemDescription";
import ProblemTabs from "../components/problem/ProblemTabs";
import CodeEditor from "../components/problem/CodeEditor";
import LanguageSelector from "../components/problem/LanguageSelector";
import EditorActions from "../components/problem/EditorActions";
import TestResults from "../components/problem/TestResults";
import SubmissionResult from "../components/problem/SubmissionResult";
import ProblemEditorial from "../components/problem/ProblemEditorial";
import ProblemSolutions from "../components/problem/ProblemSolutions";

const langMap = {
  cpp: "c++",
  java: "java",
  javascript: "javascript",
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState("code");

  const editorRef = useRef(null);
  const { problemId } = useParams();
  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);

      try {
        const response = await axiosClient.get(
          `/problem/problemById/${problemId}`,
        );
        // console.log(response);
        const initialCode = response.data.startCode.find(
          (sc) => sc.language === langMap[selectedLanguage],
        ).initialCode;

        setProblem(response.data);
        // console.log(problem);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problem:", error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(
        (sc) => sc.language === langMap[selectedLanguage],
      ).initialCode;

      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);

    try {
      // console.log(selectedLanguage);
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage,
      });
      console.log(response);

      setRunResult(response.data);
      // console.log(response);
      setLoading(false);
      setActiveRightTab("testcase");
    } catch (error) {
      console.error("Error running code:", error);

      setRunResult({
        success: false,
        error: "Internal server error Shivam",
      });

      setLoading(false);
      setActiveRightTab("testcase");
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);

    try {
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code: code,
          language: selectedLanguage,
        },
      );

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab("result");
    } catch (error) {
      console.error("Error submitting code:", error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab("result");
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "cpp":
        return "cpp";
      default:
        return "javascript";
    }
  };

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

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-base-100">
      {/* Left Panel */}
      <div className="w-1/2 flex flex-col border-r border-base-300">
        <ProblemTabs
          side="left"
          activeTab={activeLeftTab}
          onTabChange={setActiveLeftTab}
        />

        <div className="flex-1 overflow-y-auto p-6">
          {problem && (
            <>
              {activeLeftTab === "description" && (
                <ProblemDescription
                  problem={problem}
                  getDifficultyColor={getDifficultyColor}
                />
              )}

              {activeLeftTab === "editorial" && (
                <ProblemEditorial problem={problem} />
              )}

              {activeLeftTab === "solutions" && (
                <ProblemSolutions problem={problem} />
              )}

              {activeLeftTab === "submissions" && (
                <div>
                  <h2 className="text-xl font-bold mb-4">My Submissions</h2>
                  <div className="text-gray-500">
                    <SubmissionHistory problemId={problemId} />
                  </div>
                </div>
              )}

              {activeLeftTab === "chatAI" && (
                <div className="prose max-w-none">
                  <h2 className="text-xl font-bold mb-4">CHAT with AI</h2>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    <ChatAi problem={problem}></ChatAi>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col">
        <ProblemTabs
          side="right"
          activeTab={activeRightTab}
          onTabChange={setActiveRightTab}
        />

        <div className="flex-1 flex flex-col">
          {activeRightTab === "code" && (
            <div className="flex-1 flex flex-col">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageChange}
              />

              <CodeEditor
                code={code}
                selectedLanguage={selectedLanguage}
                getLanguageForMonaco={getLanguageForMonaco}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
              />

              <EditorActions
                loading={loading}
                onRun={handleRun}
                onSubmit={handleSubmitCode}
                onConsole={() => setActiveRightTab("testcase")}
              />
            </div>
          )}

          {activeRightTab === "testcase" && (
            <TestResults runResult={runResult} />
          )}

          {activeRightTab === "result" && (
            <SubmissionResult submitResult={submitResult} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
