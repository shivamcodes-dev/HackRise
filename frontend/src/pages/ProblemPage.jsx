import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";

function ProblemPage() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}

export default ProblemPage;
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
