const EditorActions = ({ loading, onRun, onSubmit, onConsole }) => {
  return (
    <div className="p-4 border-t border-base-300 flex justify-between">
      <button className="btn btn-ghost btn-sm" onClick={onConsole}>
        Console
      </button>

      <div className="flex gap-2">
        <button
          className={`btn btn-outline btn-sm ${loading ? "loading" : ""}`}
          onClick={onRun}
          disabled={loading}
        >
          Run
        </button>

        <button
          className={`btn btn-primary btn-sm ${loading ? "loading" : ""}`}
          onClick={onSubmit}
          disabled={loading}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditorActions;
