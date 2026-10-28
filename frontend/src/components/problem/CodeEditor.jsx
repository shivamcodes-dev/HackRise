import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, selectedLanguage, onChange, onMount }) => {
  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      default:
        return "javascript";
    }
  };

  return (
    <Editor
      height="100%"
      language={getLanguageForMonaco(selectedLanguage)}
      value={code}
      onChange={onChange}
      onMount={onMount}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: "on",
        lineNumbers: "on",
        folding: true,
        readOnly: false,
        mouseWheelZoom: true,
      }}
    />
  );
};

export default CodeEditor;
